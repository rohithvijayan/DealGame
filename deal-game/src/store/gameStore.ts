import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Defector, defectors } from '@/data/defectors';

interface GameState {
    currentRound: number;
    score: number;
    streak: number;
    maxStreak: number;
    sessionDefectors: Defector[];
    completedIds: string[];
    skippedIds: string[];
    isGameComplete: boolean;

    // Actions
    startNewGame: () => void;
    submitGuess: (name: string, p?: number) => { correct: boolean; points: number };
    skipRound: () => void;
    markAsSkipped: (id: string) => void;
    nextRound: () => void;
    prevRound: () => void;
    reset: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            currentRound: 0,
            score: 0,
            streak: 0,
            maxStreak: 0,
            sessionDefectors: [],
            completedIds: [],
            skippedIds: [],
            isGameComplete: false,

            startNewGame: () => {
                const shuffled = [...defectors]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 10);
                set({
                    currentRound: 0,
                    score: 0,
                    streak: 0,
                    sessionDefectors: shuffled,
                    completedIds: [],
                    skippedIds: [],
                    isGameComplete: false,
                });
            },

            submitGuess: (guess: string, pointsOverride?: number) => {
                const { sessionDefectors, currentRound, streak, score } = get();
                const currentDefector = sessionDefectors[currentRound];

                if (!currentDefector) return { correct: false, points: 0 };
                if (guess.length > 100) return { correct: false, points: 0 };

                const isMatch = [
                    currentDefector.name.toLowerCase(),
                    ...currentDefector.aliases.map(a => a.toLowerCase())
                ].some(n => {
                    const normalizedGuess = guess.toLowerCase().trim();
                    return n === normalizedGuess || (normalizedGuess.length >= 4 && n.includes(normalizedGuess));
                });

                if (isMatch) {
                    const pointsGained = pointsOverride ?? 10;
                    const newStreak = streak + 1;
                    const streakBonus = newStreak >= 3 ? 5 : 0;

                    set((state) => ({
                        score: state.score + pointsGained + streakBonus,
                        streak: newStreak,
                        maxStreak: Math.max(state.streak + 1, state.maxStreak),
                        completedIds: [...state.completedIds, currentDefector.id],
                    }));
                    return { correct: true, points: pointsGained + streakBonus };
                } else {
                    set({ streak: 0 });
                    return { correct: false, points: 0 };
                }
            },

            markAsSkipped: (id: string) => {
                set((state) => ({
                    streak: 0,
                    skippedIds: state.skippedIds.includes(id) ? state.skippedIds : [...state.skippedIds, id],
                }));
            },

            skipRound: () => {
                const { sessionDefectors, currentRound } = get();
                const currentDefector = sessionDefectors[currentRound];
                get().markAsSkipped(currentDefector.id);
                get().nextRound();
            },

            nextRound: () => {
                const { currentRound, sessionDefectors } = get();
                if (currentRound >= sessionDefectors.length - 1) {
                    set({ isGameComplete: true });
                } else {
                    set({ currentRound: currentRound + 1 });
                }
            },

            prevRound: () => {
                const { currentRound } = get();
                if (currentRound <= 0) return;
                set({
                    currentRound: currentRound - 1,
                    isGameComplete: false,
                });
            },

            reset: () => {
                set({
                    currentRound: 0,
                    score: 0,
                    streak: 0,
                    isGameComplete: false,
                    completedIds: [],
                    skippedIds: [],
                });
            },
        }),
        {
            name: 'congress-bjp-deal-storage',
        }
    )
);
