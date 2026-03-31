import { NextResponse } from 'next/server';
import { defectors, toDisplay } from '@/data/defectors';
import { createSessionToken } from '@/lib/session';

export async function POST() {
    const FIXED_IDS = ["padmaja-venugopal", "anil-antony", "khushbu-sundar"];

    // 1. Get the fixed first three defectors
    const fixedDefectors = FIXED_IDS.map(id => defectors.find(d => d.id === id)).filter(Boolean) as typeof defectors;

    // 2. Filter out fixed ones from the pool and shuffle the rest
    const remainingPool = defectors.filter(d => !FIXED_IDS.includes(d.id));
    const shuffledOthers = [...remainingPool]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10 - fixedDefectors.length);

    // 3. Combine them
    const finalSet = [...fixedDefectors, ...shuffledOthers];

    const sessionToken = createSessionToken(finalSet.map(d => d.id));
    const displayDefectors = finalSet.map(toDisplay);

    return NextResponse.json({ defectors: displayDefectors, sessionToken });
}
