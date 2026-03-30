import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LangState {
    lang: 'en' | 'ml';
    toggleLang: () => void;
}

export const useLangStore = create<LangState>()(
    persist(
        (set, get) => ({
            lang: 'ml',
            toggleLang: () => set({ lang: get().lang === 'ml' ? 'en' : 'ml' }),
        }),
        { name: 'deal-game-lang' }
    )
);
