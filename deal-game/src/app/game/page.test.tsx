import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import GameScreen from './page';

// Mock dependencies
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

vi.mock('@/store/gameStore', () => ({
    useGameStore: () => ({
        currentRound: 0,
        score: 0,
        streak: 0,
        sessionDefectors: [{ id: '1', name: 'Defector 1', position: 'Pos 1', state: 'State 1', clue: 'Clue 1', outcome: 'Outcome 1', hints: [] }],
        startNewGame: vi.fn(),
        submitGuess: vi.fn(),
        revealRound: vi.fn(),
        markAsSkipped: vi.fn(),
        nextRound: vi.fn(),
        prevRound: vi.fn(),
        isGameComplete: false,
        completedIds: [],
        skippedIds: [],
        revealedNames: {},
    }),
}));

vi.mock('@/hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: {
            howToPlay: {
                title: 'How to Play',
                intro: 'Intro',
                step1_title: 'Step 1',
                step1_desc: 'Desc 1',
                step2_title: 'Step 2',
                step2_desc: 'Desc 2',
                step3_title: 'Step 3',
                step3_desc: 'Desc 3',
                scoring_title: 'Scoring',
                points_10: '10 pts',
                points_10_desc: '10 pts desc',
                points_multi: 'Multi',
                points_multi_desc: 'Multi desc',
                mistakes_title: 'Mistakes',
                mistakes_desc: 'Mistakes desc',
                streak_title: 'Streak',
                streak_desc: 'Streak desc',
                eyes_only: 'Eyes Only',
                understood: 'Understood',
            },
            game: {
                home: 'Home',
                back: 'Back',
                score: 'Score',
                streak: 'Streak',
                hints_exhausted: 'Hints Exhausted',
                new_hint: 'New Hint',
                hints_remaining: 'Hints Remaining',
                submit: 'Submit',
                next_case: 'Next Case',
                try_again: 'Try Again',
                skip_case: 'Skip Case',
                share_results: 'Share Results',
                input_placeholder: 'Input',
                revealed: 'Revealed',
                mission_brief: 'Brief',
                field_intel: 'Intel',
            },
            common: {
                classified: 'Classified',
            }
        },
        lang: 'en',
    }),
}));

vi.mock('@/utils/translate', () => ({
    translateToMalayalam: vi.fn(),
}));

// Mock sub-components
vi.mock('@/components/screens/SplashScreen', () => ({
    default: () => <div data-testid="splash-screen" />,
}));
vi.mock('@/components/ui/LotusSpinner', () => ({
    default: () => <div data-testid="lotus-spinner" />,
}));
vi.mock('@/components/ui/LangToggle', () => ({
    LangToggle: () => <div data-testid="lang-toggle" />,
}));
vi.mock('@/components/game/DealConfirmedOverlay', () => ({
    default: () => <div data-testid="deal-confirmed" />,
}));
vi.mock('@/components/game/WrongLeadOverlay', () => ({
    default: () => <div data-testid="wrong-lead" />,
}));
vi.mock('@/components/game/CaseUnsolvedOverlay', () => ({
    default: () => <div data-testid="case-unsolved" />,
}));
vi.mock('@/components/screens/HowToPlayModal', () => ({
    default: ({ isOpen }: any) => {
        if (!isOpen) return null;
        return <div data-testid="how-to-play-modal">How to Play</div>;
    },
}));
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />,
}));
vi.mock('next/link', () => ({
    default: ({ children }: any) => <a>{children}</a>,
}));

// Mock framer-motion
vi.mock('framer-motion', () => {
    const React = require('react');
    const filterProps = (props: any) => {
        const { whileHover, whileTap, whileInView, animate, initial, transition, viewport, exit, ...rest } = props;
        return rest;
    };
    return {
        motion: {
            div: React.forwardRef(({ children, ...props }: any, ref: any) => <div ref={ref} {...filterProps(props)}>{children}</div>),
            h1: React.forwardRef(({ children, ...props }: any, ref: any) => <h1 ref={ref} {...filterProps(props)}>{children}</h1>),
            h2: React.forwardRef(({ children, ...props }: any, ref: any) => <h2 ref={ref} {...filterProps(props)}>{children}</h2>),
            p: React.forwardRef(({ children, ...props }: any, ref: any) => <p ref={ref} {...filterProps(props)}>{children}</p>),
            form: React.forwardRef(({ children, ...props }: any, ref: any) => <form ref={ref} {...filterProps(props)}>{children}</form>),
            button: React.forwardRef(({ children, ...props }: any, ref: any) => <button ref={ref} {...filterProps(props)}>{children}</button>),
            img: React.forwardRef(({ children, ...props }: any, ref: any) => <img ref={ref} {...filterProps(props)} />),
        },
        AnimatePresence: ({ children }: any) => <>{children}</>,
    };
});

// Setup fake timers
beforeEach(() => {
    vi.useFakeTimers();
    sessionStorage.clear();
});

afterEach(() => {
    vi.useRealTimers();
});

describe('GameScreen Auto Tutorial Popup', () => {
    it('shows the tutorial popup automatically on first visit without sessionStorage', async () => {
        render(<GameScreen />);

        // At initial render, tutorial shouldn't be visible (isOpen is false, but AnimatePresence might render it out conditionally)
        expect(screen.queryByText('How to Play')).toBeNull();

        // Fast forward timers
        act(() => {
            vi.advanceTimersByTime(1500);
        });

        // The HowToPlayModal should now be visible
        expect(screen.getByText('How to Play')).toBeDefined();

        // Check if sessionStorage was updated
        expect(sessionStorage.getItem('hasSeenGameTutorial')).toBe('true');
    });

    it('does NOT show the tutorial popup if it has been seen in session', () => {
        sessionStorage.setItem('hasSeenGameTutorial', 'true');
        render(<GameScreen />);

        // Fast forward timers
        act(() => {
            vi.advanceTimersByTime(1500);
        });

        // The HowToPlayModal should remain hidden
        expect(screen.queryByText('How to Play')).toBeNull();
    });
});
