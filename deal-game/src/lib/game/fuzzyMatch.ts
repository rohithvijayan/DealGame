/**
 * Calculates the Levenshtein distance between two strings.
 * This is the minimum number of single-character edits required to change one word into another.
 */
export function getLevenshteinDistance(s1: string, s2: string): number {
    const len1 = s1.length;
    const len2 = s2.length;
    const matrix: number[][] = Array.from({ length: len1 + 1 }, (_, i) => [i]);

    for (let j = 1; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,       // deletion
                matrix[i][j - 1] + 1,       // insertion
                matrix[i - 1][j - 1] + cost  // substitution
            );
        }
    }
    return matrix[len1][len2];
}

/**
 * Checks if a guess matches a target string using exact, substring, or fuzzy matching.
 * @param guess The user's input
 * @param target The correct name or alias
 * @param threshold The maximum allowed edit distance for fuzzy matching (default: 2)
 */
export function matches(guess: string, target: string, threshold = 2): boolean {
    const g = guess.toLowerCase().trim();
    const t = target.toLowerCase().trim();

    // 1. Exact match
    if (g === t) return true;

    // 2. Substring match (for guesses of 4+ characters)
    if (g.length >= 4 && t.includes(g)) return true;

    // 3. Fuzzy match (for guesses of 5+ characters to avoid false positives)
    // Distance threshold is relative to length; but for now, 2 is a safe typo limit
    if (g.length >= 5) {
        const distance = getLevenshteinDistance(g, t);
        return distance <= threshold;
    }

    return false;
}
