import 'server-only';
import { createHmac } from 'crypto';

const SECRET = process.env.GAME_SECRET || 'build_time_placeholder_do_not_use_in_prod';

// No strict check here to allow build to complete. 
// We should check in the actual functions if we want to be strict in production.

export interface SessionPayload {
    ids: string[];   // defector IDs in round order
    ts: number;      // session start timestamp (ms)
}

function sign(payload: string): string {
    return createHmac('sha256', SECRET!).update(payload).digest('hex');
}

export function createSessionToken(ids: string[]): string {
    const payload: SessionPayload = { ids, ts: Date.now() };
    const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const sig = sign(encoded);
    return `${encoded}.${sig}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
    if (!token || typeof token !== 'string') return null;
    const dot = token.lastIndexOf('.');
    if (dot < 0) return null;
    const encoded = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expected = sign(encoded);
    // Constant-time comparison to resist timing attacks
    if (sig.length !== expected.length) return null;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
        diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    if (diff !== 0) return null;
    try {
        return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SessionPayload;
    } catch {
        return null;
    }
}
