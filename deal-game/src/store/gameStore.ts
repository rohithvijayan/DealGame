import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DefectorDisplay } from '@/types/game';

interface GameState {
    currentRound: number;
    score: number;
    streak: number;
    maxStreak: number;
    sessionToken: string;
    sessionDefectors: DefectorDisplay[];
    completedIds: string[];
    skippedIds: string[];
    revealedNames: Record<number, string>;
    isGameComplete: boolean;

    // Actions
    startNewGame: () => Promise<void>;
    submitGuess: (guess: string, points?: number) => Promise<{ correct: boolean; points: number }>;
    revealRound: (round: number) => Promise<string>;
    skipRound: () => Promise<void>;
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
            sessionToken: '',
            sessionDefectors: [],
            completedIds: [],
            skippedIds: [],
            revealedNames: {},
            isGameComplete: false,

            startNewGame: async () => {
                const res = await fetch('/api/game/start', { method: 'POST' });
                if (!res.ok) throw new Error('Failed to start game');
                const { defectors, sessionToken } = await res.json() as {
                    defectors: DefectorDisplay[];
                    sessionToken: string;
                };
                set({
                    currentRound: 0,
                    score: 0,
                    streak: 0,
                    sessionToken,
                    sessionDefectors: defectors,
                    completedIds: [],
                    skippedIds: [],
                    revealedNames: {},
                    isGameComplete: false,
                });
            },

            submitGuess: async (guess: string, pointsOverride?: number) => {
                const { sessionToken, currentRound, streak, sessionDefectors } = get();
                const currentDefector = sessionDefectors[currentRound];
                if (!currentDefector) return { correct: false, points: 0 };

                const res = await fetch('/api/game/validate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionToken, round: currentRound, guess }),
                });
                if (!res.ok) return { correct: false, points: 0 };

                const data = await res.json() as { correct: boolean; revealedName?: string };

                if (data.correct && data.revealedName) {
                    const pointsGained = pointsOverride ?? 10;
                    const newStreak = streak + 1;
                    const streakBonus = newStreak >= 3 ? 5 : 0;
                    const totalPoints = pointsGained + streakBonus;

                    set((state) => ({
                        score: state.score + totalPoints,
                        streak: newStreak,
                        maxStreak: Math.max(state.streak + 1, state.maxStreak),
                        completedIds: [...state.completedIds, currentDefector.id],
                        revealedNames: { ...state.revealedNames, [currentRound]: data.revealedName! },
                    }));
                    return { correct: true, points: totalPoints };
                } else {
                    set({ streak: 0 });
                    return { correct: false, points: 0 };
                }
            },

            revealRound: async (round: number) => {
                const { sessionToken, revealedNames } = get();
                if (revealedNames[round]) return revealedNames[round];

                const res = await fetch('/api/game/reveal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionToken, round }),
                });
                if (!res.ok) return '';

                const data = await res.json() as { revealedName?: string };
                const name = data.revealedName ?? '';
                if (name) {
                    set((state) => ({
                        revealedNames: { ...state.revealedNames, [round]: name },
                    }));
                }
                return name;
            },

            markAsSkipped: (id: string) => {
                set((state) => ({
                    streak: 0,
                    skippedIds: state.skippedIds.includes(id) ? state.skippedIds : [...state.skippedIds, id],
                }));
            },

            skipRound: async () => {
                const { sessionDefectors, currentRound } = get();
                const currentDefector = sessionDefectors[currentRound];
                get().markAsSkipped(currentDefector.id);
                await get().revealRound(currentRound);
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
                    revealedNames: {},
                });
            },
        }),
        {
            name: 'congress-bjp-deal-storage',
        }
    )
);
