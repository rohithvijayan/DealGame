import { describe, it, expect } from 'vitest';
import { matches, getLevenshteinDistance } from '@/lib/game/fuzzyMatch';

describe('Levenshtein Distance', () => {
    it('calculates the distance between two strings', () => {
        expect(getLevenshteinDistance('jyotiraditya', 'jyotiraditya')).toBe(0);
        expect(getLevenshteinDistance('jyotiraditya', 'jyotiradtya')).toBe(1);
        expect(getLevenshteinDistance('himanta', 'himnata')).toBe(2); // Transposition = 2 in standard Levenshtein
        expect(getLevenshteinDistance('scindia', 'sindia')).toBe(1);
        expect(getLevenshteinDistance('scindia', 'abc')).toBe(7);
    });
});

describe('Fuzzy Name Matching', () => {
    const targetFullName = 'Jyotiraditya Scindia';
    const aliases = ['Scindia', 'Jyotiraditya', 'Maharaja', 'Mahadev'];
    const candidates = [targetFullName, ...aliases];

    const compositeMatch = (guess: string) => candidates.some(c => matches(guess, c));

    it('accepts exact matches', () => {
        expect(compositeMatch('Jyotiraditya Scindia')).toBe(true);
        expect(compositeMatch('jyotiraditya scindia')).toBe(true);
        expect(compositeMatch('Scindia')).toBe(true);
    });

    it('accepts substring matches (length >= 4)', () => {
        expect(compositeMatch('Jyotiradit')).toBe(true); // Part of Jyotiraditya
        expect(compositeMatch('Scind')).toBe(true);    // Part of Scindia
    });

    it('accepts typos with distance <= 2 (length >= 5)', () => {
        // Missing character in Jyotiraditya
        expect(compositeMatch('Jyotiradtya')).toBe(true);
        // Missing character in Scindia
        expect(compositeMatch('Sindia')).toBe(true);
        // Swapped characters
        expect(compositeMatch('Himnata')).toBe(false); // Not in Jyotiraditya candidates

        // Match against another set of candidates for Himanta
        const himantaCandidates = ['Himanta Biswa Sarma', 'Himanta', 'HBS', 'Sarma', 'Hemanta'];
        const matchesHimanta = (guess: string) => himantaCandidates.some(c => matches(guess, c));
        expect(matchesHimanta('Himnata')).toBe(true);
    });

    it('rejects completely wrong names', () => {
        expect(compositeMatch('Rahul Gandhi')).toBe(false);
        expect(compositeMatch('Modi')).toBe(false);
    });

    it('rejects short typos to prevent false positives (length < 5)', () => {
        // "Sindia" has distance 1 from "Scindia" alias?
        // Let's test with a name like "Rane"
        expect(matches('Rane', 'Rane')).toBe(true);
        expect(matches('Rann', 'Rane')).toBe(false); // Length < 5
    });

    it('accepts short strings if they are exact', () => {
        expect(matches('HBS', 'HBS')).toBe(true);
        expect(matches('hbs', 'HBS')).toBe(true);
    });
});
