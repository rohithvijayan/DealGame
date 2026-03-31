import { NextRequest, NextResponse } from 'next/server';
import { defectors } from '@/data/defectors';
import { verifySessionToken } from '@/lib/session';
import { matches } from '@/lib/game/fuzzyMatch';
import { performTranslation } from '@/lib/translate';

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
        typeof (body as Record<string, unknown>).round !== 'number' ||
        typeof (body as Record<string, unknown>).guess !== 'string'
    ) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { sessionToken, round, guess } = body as { sessionToken: string; round: number; guess: string };

    if (guess.length > 100) {
        return NextResponse.json({ correct: false });
    }

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

    const possibleNames = [
        defector.name,
        ...defector.aliases,
    ];

    // Detection for Malayalam characters (U+0D00 to U+0D7F)
    const isMalayalamGuess = /[\u0D00-\u0D7F]/.test(guess);

    if (isMalayalamGuess) {
        // Translate primary name to Malayalam to compare
        try {
            const mlName = await performTranslation(defector.name, 'ml');
            if (mlName && mlName !== defector.name) {
                possibleNames.push(mlName);
            }
        } catch (e) {
            console.error("ML Validation translation error:", e);
        }
    }

    const isMatch = possibleNames.some(n => matches(guess, n));

    if (isMatch) {
        return NextResponse.json({ correct: true, revealedName: defector.name });
    }
    return NextResponse.json({ correct: false });
}
