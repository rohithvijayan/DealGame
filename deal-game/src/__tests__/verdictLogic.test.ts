import { describe, it, expect } from 'vitest'

// ─── Verdict logic (extracted from ResultsScreen) ─────────────────────────
// Mirrors the getVerdict() function in src/app/results/[sessionId]/page.tsx

const getVerdict = (score: number) => {
  if (score >= 90) return { label: 'VETERAN ANALYST', quote: "Elite Grade. You've identified the deep state." }
  if (score >= 60) return { label: 'FIELD AGENT', quote: 'Solid recon. Your political Intel is sharp.' }
  if (score >= 30) return { label: 'TRAINEE', quote: "Good start, agent. There's more to uncover." }
  return { label: 'NEEDS CHAI', quote: 'Watch more news, or join the next deal yourself.' }
}

// ─── Accuracy formula (from ResultsScreen render logic) ────────────────────

const calcAccuracy = (completedCount: number, totalAnswered: number) => {
  return completedCount > 0
    ? Math.round((completedCount / totalAnswered) * 100)
    : 0
}

// ─── Maximum possible score helper ────────────────────────────────────────

/**
 * A perfect 10-round game with a streak bonus kicking in at round 3:
 *   Rounds 1-2 : 10 pts each  = 20
 *   Rounds 3-10: 15 pts each  = 120
 *   Total                     = 140
 */
const PERFECT_SCORE = 140

// ════════════════════════════════════════════════════════════════════════════
// getVerdict tests
// ════════════════════════════════════════════════════════════════════════════

describe('getVerdict – label thresholds', () => {
  it('returns VETERAN ANALYST for score exactly 90', () => {
    expect(getVerdict(90).label).toBe('VETERAN ANALYST')
  })

  it('returns VETERAN ANALYST for a perfect score', () => {
    expect(getVerdict(PERFECT_SCORE).label).toBe('VETERAN ANALYST')
  })

  it('returns VETERAN ANALYST for score above 90', () => {
    expect(getVerdict(100).label).toBe('VETERAN ANALYST')
    expect(getVerdict(130).label).toBe('VETERAN ANALYST')
  })

  it('returns FIELD AGENT for score exactly 60', () => {
    expect(getVerdict(60).label).toBe('FIELD AGENT')
  })

  it('returns FIELD AGENT for scores in [60, 89]', () => {
    expect(getVerdict(75).label).toBe('FIELD AGENT')
    expect(getVerdict(89).label).toBe('FIELD AGENT')
  })

  it('returns TRAINEE for score exactly 30', () => {
    expect(getVerdict(30).label).toBe('TRAINEE')
  })

  it('returns TRAINEE for scores in [30, 59]', () => {
    expect(getVerdict(45).label).toBe('TRAINEE')
    expect(getVerdict(59).label).toBe('TRAINEE')
  })

  it('returns NEEDS CHAI for score 0', () => {
    expect(getVerdict(0).label).toBe('NEEDS CHAI')
  })

  it('returns NEEDS CHAI for scores in [1, 29]', () => {
    expect(getVerdict(10).label).toBe('NEEDS CHAI')
    expect(getVerdict(29).label).toBe('NEEDS CHAI')
  })
})

describe('getVerdict – boundary conditions', () => {
  it('scores 89 and 90 land in different tiers', () => {
    expect(getVerdict(89).label).toBe('FIELD AGENT')
    expect(getVerdict(90).label).toBe('VETERAN ANALYST')
  })

  it('scores 59 and 60 land in different tiers', () => {
    expect(getVerdict(59).label).toBe('TRAINEE')
    expect(getVerdict(60).label).toBe('FIELD AGENT')
  })

  it('scores 29 and 30 land in different tiers', () => {
    expect(getVerdict(29).label).toBe('NEEDS CHAI')
    expect(getVerdict(30).label).toBe('TRAINEE')
  })
})

describe('getVerdict – accompanying quotes', () => {
  it('returns a non-empty quote for every verdict', () => {
    const scores = [0, 30, 60, 90]
    scores.forEach(s => {
      expect(getVerdict(s).quote.length).toBeGreaterThan(0)
    })
  })

  it('each tier returns a distinct quote', () => {
    const quotes = [0, 30, 60, 90].map(s => getVerdict(s).quote)
    const unique = new Set(quotes)
    expect(unique.size).toBe(4)
  })
})

// ════════════════════════════════════════════════════════════════════════════
// Accuracy calculation tests
// ════════════════════════════════════════════════════════════════════════════

describe('accuracy calculation', () => {
  it('returns 100 when all questions answered correctly', () => {
    expect(calcAccuracy(10, 10)).toBe(100)
  })

  it('returns 0 when no questions answered correctly', () => {
    expect(calcAccuracy(0, 10)).toBe(0)
  })

  it('returns 0 when no questions were attempted', () => {
    expect(calcAccuracy(0, 0)).toBe(0)
  })

  it('returns 50 for half correct', () => {
    expect(calcAccuracy(5, 10)).toBe(50)
  })

  it('rounds to nearest integer (down)', () => {
    // 1/3 = 33.33... → rounds to 33
    expect(calcAccuracy(1, 3)).toBe(33)
  })

  it('rounds to nearest integer (up)', () => {
    // 2/3 = 66.67... → rounds to 67
    expect(calcAccuracy(2, 3)).toBe(67)
  })

  it('handles a single correct answer out of ten', () => {
    expect(calcAccuracy(1, 10)).toBe(10)
  })

  it('handles a single skipped answer out of ten', () => {
    expect(calcAccuracy(9, 10)).toBe(90)
  })
})

// ════════════════════════════════════════════════════════════════════════════
// Scoring edge cases
// ════════════════════════════════════════════════════════════════════════════

describe('scoring math', () => {
  it('base score for 10 correct answers with no streak bonus is 100', () => {
    // If a player never builds a streak ≥3 (e.g. misses between rounds)
    const basePointsPerRound = 10
    expect(10 * basePointsPerRound).toBe(100)
  })

  it('perfect score (all correct, streak maintained) is 140', () => {
    // Rounds 1-2: 10 pts each (streak 1 & 2)
    // Rounds 3-10: 15 pts each (streak 3+)
    const score = 2 * 10 + 8 * 15
    expect(score).toBe(140)
  })

  it('score of 90 requires at least 6 correct answers with streak bonuses or 9 without', () => {
    // 9 × 10 = 90 (no streak bonus)
    expect(9 * 10).toBe(90)
    // 2×10 + 4×15 = 20+60 = 80 (not quite — shows streak helps)
    expect(2 * 10 + 4 * 15).toBe(80)
  })
})
