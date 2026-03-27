import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LangState {
    lang: 'en' | 'ml';
    toggleLang: () => void;
}

export const useLangStore = create<LangState>()(
    persist(
        (set, get) => ({
            lang: 'en',
            toggleLang: () => set({ lang: get().lang === 'en' ? 'ml' : 'en' }),
        }),
        { name: 'deal-game-lang' }
    )
);
