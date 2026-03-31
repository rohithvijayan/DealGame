import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import IntelLandingClient from './IntelLandingClient';

// Mock dependencies
vi.mock('next/link', () => {
    return {
        default: ({ children, onClick, href }: any) => (
            <a href={href} onClick={onClick} data-testid="mock-link">
                {children}
            </a>
        ),
    };
});

vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />,
}));

vi.mock('@/hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: {
            intel: {
                hero_tag: 'Hero Tag',
                hero_title_line1: 'Line 1',
                hero_title_line2: 'Line 2',
                hero_title_accent: 'Accent',
                hero_sub: 'Sub',
                stat_defectors: 'Defectors',
                stat_years: 'Years',
                stat_articles: 'Articles',
                browse_archive: 'SEE THE DEALS',
                play_game: 'Play Game',
                open_dossiers: 'Open Dossiers',
                filed_dossiers: 'Filed Dossiers',
                on_record: (n: number) => `On record: ${n}`,
                no_dossiers: 'No dossiers',
                challenge_title: 'Challenge Title',
                challenge_sub: 'Challenge Sub',
            },
            common: {
                classified: 'Classified',
            }
        },
        lang: 'en',
    }),
}));

vi.mock('@/components/ui/LangToggle', () => ({
    LangToggle: () => <div data-testid="lang-toggle" />,
}));

vi.mock('@/components/intel/ArticleCard', () => ({
    default: () => <div data-testid="article-card" />,
}));

vi.mock('@/utils/translate', () => ({
    translateToMalayalam: vi.fn(),
}));

// Mock framer-motion to avoid animation issues
vi.mock('framer-motion', () => {
    const React = require('react');
    const filterProps = (props: any) => {
        const { whileHover, whileTap, whileInView, animate, initial, transition, viewport, ...rest } = props;
        return rest;
    };
    return {
        motion: {
            div: React.forwardRef(({ children, ...props }: any, ref: any) => <div ref={ref} {...filterProps(props)}>{children}</div>),
            h1: React.forwardRef(({ children, ...props }: any, ref: any) => <h1 ref={ref} {...filterProps(props)}>{children}</h1>),
            p: React.forwardRef(({ children, ...props }: any, ref: any) => <p ref={ref} {...filterProps(props)}>{children}</p>),
            a: React.forwardRef(({ children, ...props }: any, ref: any) => <a ref={ref} {...filterProps(props)}>{children}</a>),
        },
    };
});

// Mock window.matchMedia and HTMLElement.prototype.scrollIntoView
beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

const mockStats = {
    total: 10,
    districts: 5,
    minYear: 2010,
    maxYear: 2020,
    articles: 10,
};

describe('IntelLandingClient', () => {
    it('scrolls to #archive when SEE THE DEALS is clicked', () => {
        render(<IntelLandingClient defectors={[]} stats={mockStats} />);

        // Find the "SEE THE DEALS" link
        const browseLink = screen.getByText(/SEE THE DEALS/i);
        expect(browseLink).toBeDefined();

        // Create a mock element for the intersection target
        const mockArchiveElement = document.createElement('section');
        mockArchiveElement.id = 'archive';
        document.body.appendChild(mockArchiveElement);

        const scrollSpy = vi.spyOn(mockArchiveElement, 'scrollIntoView');
        vi.spyOn(document, 'getElementById').mockReturnValue(mockArchiveElement);

        fireEvent.click(browseLink);

        expect(document.getElementById).toHaveBeenCalledWith('archive');
        expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });

        // Cleanup
        document.body.removeChild(mockArchiveElement);
        vi.restoreAllMocks();
    });

    it('renders correctly with stats and translation mocks', () => {
        render(<IntelLandingClient defectors={[]} stats={mockStats} />);

        // Basic checks for rendered text
        expect(screen.getByText(/Line 1/i)).toBeDefined();
        expect(screen.getByText(/10\+/i)).toBeDefined();
        expect(screen.getByText(/2010–2020/i)).toBeDefined();
    });
});
