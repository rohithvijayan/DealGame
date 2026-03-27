import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { DefectorFrontmatter, DefectorMeta } from '@/types/intel';
import { defectors as gameDefectors } from '@/data/defectors';

const INTEL_DIR = path.join(process.cwd(), 'content', 'intel');
const ANALYSIS_DIR = path.join(INTEL_DIR, 'analysis');

// Kerala defectors from the game dataset — the intel archive's primary focus
const KERALA_IDS = new Set([
    'tom-vadakkan',
    'ap-abdullakutty',
    'anil-antony',
    'padmaja-venugopal',
]);

// Rough district mapping for known Kerala defectors
const KERALA_DISTRICT: Record<string, string> = {
    'tom-vadakkan': 'Thrissur',
    'ap-abdullakutty': 'Kannur',
    'anil-antony': 'Ernakulam',
    'padmaja-venugopal': 'Thrissur',
};

function estimateReadingTime(content: string): number {
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / 200);
}

function readMdxFile(filePath: string): { frontmatter: Record<string, unknown>; content: string } | null {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(raw);
        return { frontmatter: data, content };
    } catch {
        return null;
    }
}

/** Map a game Defector record to DefectorMeta for intel listings */
function mapGameDefector(d: typeof gameDefectors[0]): DefectorMeta {
    const isKerala = d.state === 'Kerala';
    const district = isKerala
        ? (KERALA_DISTRICT[d.id] ?? d.state)
        : d.state;

    // Extract a clean BJP role from the outcome string (take text before first semicolon/parenthesis)
    const bjpRole = d.outcome.split(/[;(]/)[0].trim();

    return {
        slug: d.id,
        name: d.name,
        aliases: d.aliases,
        photo: d.photo_url,
        congressRole: d.position,
        congressFrom: d.year - 8, // approximate — not in source data
        district,
        stateOrNational: isKerala ? 'state' : 'national',
        yearOfDefection: d.year,
        triggerEvent: d.clue.split(/[.!?]/)[0].trim(),
        defectionType: 'voluntary',
        bjpRole,
        bjpOutcome: d.outcome,
        currentStatus: d.outcome,
        difficulty: d.difficulty as 1 | 2 | 3 | 4 | 5,
        featured: d.difficulty <= 2,
        publishedAt: `${d.year}-06-01`,
        updatedAt: '2026-03-28',
        author: 'Editorial Team',
        tags: [
            d.state.toLowerCase().replace(/\s+/g, '-'),
            String(d.year),
            ...(isKerala ? ['kerala'] : []),
        ],
        pullQuote: '',
        pullQuoteSource: '',
        sources: [
            {
                title: `${d.name} joins BJP`,
                publication: 'Archived Source',
                date: `${d.year}-06-01`,
                url: d.source_url,
            },
        ],
        readingTimeMinutes: 5,
    };
}

/** Read all MDX defector files, keyed by slug */
function getMdxDefectors(): Map<string, DefectorMeta> {
    const map = new Map<string, DefectorMeta>();
    let files: string[] = [];
    try {
        files = fs.readdirSync(INTEL_DIR).filter((f) => f.endsWith('.mdx'));
    } catch {
        return map;
    }
    for (const file of files) {
        const parsed = readMdxFile(path.join(INTEL_DIR, file));
        if (!parsed) continue;
        const { frontmatter, content } = parsed;
        const slug = (frontmatter.slug as string) ?? file.replace('.mdx', '');
        map.set(slug, {
            ...(frontmatter as unknown as DefectorFrontmatter),
            slug,
            readingTimeMinutes: estimateReadingTime(content),
        });
    }
    return map;
}

/**
 * Returns all defectors — MDX articles take precedence; game data fills the rest.
 * Sorted by year of defection descending.
 */
export async function getAllDefectors(): Promise<DefectorMeta[]> {
    const mdxMap = getMdxDefectors();

    const merged = gameDefectors.map((d) =>
        mdxMap.has(d.id) ? mdxMap.get(d.id)! : mapGameDefector(d)
    );

    // Include any MDX files that don't exist in the game dataset
    for (const [slug, meta] of mdxMap) {
        if (!gameDefectors.find((d) => d.id === slug)) {
            merged.push(meta);
        }
    }

    return merged.sort((a, b) => b.yearOfDefection - a.yearOfDefection);
}

/**
 * Returns a single defector — MDX article if available, game data otherwise.
 * Returns null if the slug doesn't exist in either source.
 */
export async function getDefector(
    slug: string
): Promise<{ frontmatter: DefectorFrontmatter; content: string } | null> {
    // Prefer MDX for full article content
    const filePath = path.join(INTEL_DIR, `${slug}.mdx`);
    const parsed = readMdxFile(filePath);
    if (parsed) {
        return {
            frontmatter: parsed.frontmatter as unknown as DefectorFrontmatter,
            content: parsed.content,
        };
    }

    // Fall back to game data — generate a content stub from the clue + hints
    const game = gameDefectors.find((d) => d.id === slug);
    if (!game) return null;

    const meta = mapGameDefector(game);
    const content = [
        game.clue,
        '',
        '## Hints',
        ...game.hints.map((h) => `- ${h}`),
    ].join('\n');

    return { frontmatter: meta, content };
}

export async function getAnalysis(slug: string): Promise<{
    frontmatter: {
        title: string;
        description: string;
        publishedAt: string;
        author: string;
        tags: string[];
    };
    content: string;
} | null> {
    const filePath = path.join(ANALYSIS_DIR, `${slug}.mdx`);
    const parsed = readMdxFile(filePath);
    if (!parsed) return null;
    return {
        frontmatter: parsed.frontmatter as {
            title: string;
            description: string;
            publishedAt: string;
            author: string;
            tags: string[];
        },
        content: parsed.content,
    };
}

export async function getAllAnalysis(): Promise<
    Array<{ slug: string; title: string; description: string; publishedAt: string }>
> {
    let files: string[] = [];
    try {
        files = fs.readdirSync(ANALYSIS_DIR).filter((f) => f.endsWith('.mdx'));
    } catch {
        return [];
    }

    const articles: Array<{ slug: string; title: string; description: string; publishedAt: string }> = [];
    for (const file of files) {
        const parsed = readMdxFile(path.join(ANALYSIS_DIR, file));
        if (!parsed) continue;
        const { frontmatter } = parsed;
        articles.push({
            slug: file.replace('.mdx', ''),
            title: (frontmatter.title as string) ?? '',
            description: (frontmatter.description as string) ?? '',
            publishedAt: (frontmatter.publishedAt as string) ?? '',
        });
    }

    return articles.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function getDefectorsByDistrict(district: string): Promise<DefectorMeta[]> {
    const all = await getAllDefectors();
    return all.filter((d) => d.district.toLowerCase() === district.toLowerCase());
}

export async function getDefectorsByYear(year: number): Promise<DefectorMeta[]> {
    const all = await getAllDefectors();
    return all.filter((d) => d.yearOfDefection === year);
}
