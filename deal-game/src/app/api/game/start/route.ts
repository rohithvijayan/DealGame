import { NextResponse } from 'next/server';
import { defectors, toDisplay } from '@/data/defectors';
import { createSessionToken } from '@/lib/session';

export async function POST() {
    const shuffled = [...defectors]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    const sessionToken = createSessionToken(shuffled.map(d => d.id));
    const displayDefectors = shuffled.map(toDisplay);

    return NextResponse.json({ defectors: displayDefectors, sessionToken });
}
