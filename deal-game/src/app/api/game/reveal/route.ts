import { NextRequest, NextResponse } from 'next/server';
import { defectors } from '@/data/defectors';
import { verifySessionToken } from '@/lib/session';

const defectorMap = new Map(defectors.map(d => [d.id, d]));

export async function POST(request: NextRequest) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (
        typeof body !== 'object' || body === null ||
        typeof (body as Record<string, unknown>).sessionToken !== 'string' ||
        typeof (body as Record<string, unknown>).round !== 'number'
    ) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { sessionToken, round } = body as { sessionToken: string; round: number };

    const payload = verifySessionToken(sessionToken);
    if (!payload) {
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    if (round < 0 || round >= payload.ids.length) {
        return NextResponse.json({ error: 'Invalid round' }, { status: 400 });
    }

    const defector = defectorMap.get(payload.ids[round]);
    if (!defector) {
        return NextResponse.json({ error: 'Unknown defector' }, { status: 500 });
    }

    return NextResponse.json({ revealedName: defector.name });
}
