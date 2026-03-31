import { NextRequest, NextResponse } from 'next/server';
import { performTranslation } from '@/lib/translate';

export async function POST(request: NextRequest) {
    try {
        const { text, targetLang = 'ml' } = await request.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const translatedText = await performTranslation(text, targetLang);

        return NextResponse.json({ translatedText });
    } catch (error) {
        console.error('Translation API error:', error);
        return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
    }
}
