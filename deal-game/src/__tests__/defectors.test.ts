import { describe, it, expect } from 'vitest'
import { defectors } from '@/data/defectors'
import type { Defector } from '@/data/defectors'

// ════════════════════════════════════════════════════════════════════════════
// Defector data integrity tests
// ════════════════════════════════════════════════════════════════════════════

describe('defectors dataset', () => {
  it('has at least 10 entries (enough for one full game)', () => {
    expect(defectors.length).toBeGreaterThanOrEqual(10)
  })

  it('contains exactly 50 entries (current implementation)', () => {
    // PRD targets 60; 50 are implemented as of this writing
    expect(defectors.length).toBe(50)
  })

  it('exports an array', () => {
    expect(Array.isArray(defectors)).toBe(true)
  })
})

describe('defectors – required fields', () => {
  it.each(defectors)('$name has all required fields', (d: Defector) => {
    expect(d.id).toBeTruthy()
    expect(typeof d.id).toBe('string')

    expect(d.name).toBeTruthy()
    expect(typeof d.name).toBe('string')

    expect(Array.isArray(d.aliases)).toBe(true)

    expect(d.position).toBeTruthy()
    expect(typeof d.position).toBe('string')

    expect(d.state).toBeTruthy()
    expect(typeof d.state).toBe('string')

    expect(typeof d.year).toBe('number')

    expect(d.outcome).toBeTruthy()
    expect(typeof d.outcome).toBe('string')

    expect(d.clue).toBeTruthy()
    expect(typeof d.clue).toBe('string')

    expect(Array.isArray(d.hints)).toBe(true)

    expect(typeof d.source_url).toBe('string')
    expect(d.source_url.length).toBeGreaterThan(0)
  })
})

describe('defectors – uniqueness', () => {
  it('all IDs are unique', () => {
    const ids = defectors.map(d => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('all names are unique', () => {
    const names = defectors.map(d => d.name)
    expect(new Set(names).size).toBe(names.length)
  })
})

describe('defectors – data validity', () => {
  it('every defector has exactly 3 hints', () => {
    defectors.forEach(d => {
      expect(d.hints).toHaveLength(3)
    })
  })

  it('all difficulty values are in [1, 2, 3, 4, 5]', () => {
    const validDifficulties = new Set([1, 2, 3, 4, 5])
    defectors.forEach(d => {
      expect(validDifficulties.has(d.difficulty)).toBe(true)
    })
  })

  it('all defection years are between 2000 and 2026', () => {
    // Most defections are post-2014 but the dataset includes Jagdambika Pal (2004)
    defectors.forEach(d => {
      expect(d.year).toBeGreaterThanOrEqual(2000)
      expect(d.year).toBeLessThanOrEqual(2026)
    })
  })

  it('all hints are non-empty strings', () => {
    defectors.forEach(d => {
      d.hints.forEach(hint => {
        expect(typeof hint).toBe('string')
        expect(hint.trim().length).toBeGreaterThan(0)
      })
    })
  })

  it('all clues are non-empty strings longer than 20 chars', () => {
    defectors.forEach(d => {
      expect(d.clue.trim().length).toBeGreaterThan(20)
    })
  })

  it('aliases contain only strings', () => {
    defectors.forEach(d => {
      d.aliases.forEach(alias => {
        expect(typeof alias).toBe('string')
      })
    })
  })
})

describe('defectors – alias matching coverage', () => {
  it('every defector has at least one alias', () => {
    defectors.forEach(d => {
      expect(d.aliases.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('no alias duplicates within a single defector', () => {
    defectors.forEach(d => {
      const lower = d.aliases.map(a => a.toLowerCase())
      expect(new Set(lower).size).toBe(lower.length)
    })
  })

  it('at most 2 defectors have their own full name as an alias (known data)', () => {
    // Anil Antony and Ravi Kishan have their full name duplicated in aliases.
    // This is harmless (matching still works) but tracked here for awareness.
    const redundant = defectors.filter(d =>
      d.aliases.some(a => a.toLowerCase() === d.name.toLowerCase())
    )
    expect(redundant.length).toBeLessThanOrEqual(2)
  })
})

describe('defectors – source URLs', () => {
  it('all source_urls start with https://', () => {
    defectors.forEach(d => {
      expect(d.source_url.startsWith('https://')).toBe(true)
    })
  })
})

describe('defectors – difficulty distribution', () => {
  it('dataset contains entries at every difficulty level', () => {
    const difficulties = new Set(defectors.map(d => d.difficulty))
    ;[1, 2, 3, 4, 5].forEach(level => {
      expect(difficulties.has(level as 1 | 2 | 3 | 4 | 5)).toBe(true)
    })
  })

  it('no single difficulty level dominates (>80% of entries)', () => {
    const counts: Record<number, number> = {}
    defectors.forEach(d => {
      counts[d.difficulty] = (counts[d.difficulty] ?? 0) + 1
    })
    Object.values(counts).forEach(count => {
      expect(count / defectors.length).toBeLessThan(0.8)
    })
  })
})
