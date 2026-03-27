import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from '@/store/gameStore'
import type { Defector } from '@/data/defectors'

// ─── Helpers ───────────────────────────────────────────────────────────────

const makeDefector = (
  id: string,
  name: string,
  aliases: string[] = [],
  difficulty: 1 | 2 | 3 | 4 | 5 = 1
): Defector => ({
  id,
  name,
  aliases,
  position: 'MP',
  state: 'Test State',
  year: 2020,
  outcome: 'Became minister',
  clue: 'A clue about this person.',
  hints: ['hint 1', 'hint 2', 'hint 3'],
  difficulty,
  source_url: 'https://example.com',
})

const makeSession = (count: number): Defector[] =>
  Array.from({ length: count }, (_, i) =>
    makeDefector(`d-${i}`, `Defector ${i}`, [`Alias${i}`])
  )

/** Reset the store to a clean baseline before each test. */
const resetStore = () => {
  useGameStore.setState({
    currentRound: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    sessionDefectors: [],
    completedIds: [],
    skippedIds: [],
    isGameComplete: false,
  })
}

// ─── startNewGame ──────────────────────────────────────────────────────────

describe('startNewGame', () => {
  beforeEach(resetStore)

  it('selects exactly 10 defectors from the pool', () => {
    useGameStore.getState().startNewGame()
    expect(useGameStore.getState().sessionDefectors).toHaveLength(10)
  })

  it('resets currentRound to 0', () => {
    useGameStore.setState({ currentRound: 7 })
    useGameStore.getState().startNewGame()
    expect(useGameStore.getState().currentRound).toBe(0)
  })

  it('resets score to 0', () => {
    useGameStore.setState({ score: 120 })
    useGameStore.getState().startNewGame()
    expect(useGameStore.getState().score).toBe(0)
  })

  it('resets streak to 0', () => {
    useGameStore.setState({ streak: 5 })
    useGameStore.getState().startNewGame()
    expect(useGameStore.getState().streak).toBe(0)
  })

  it('clears completedIds', () => {
    useGameStore.setState({ completedIds: ['a', 'b'] })
    useGameStore.getState().startNewGame()
    expect(useGameStore.getState().completedIds).toHaveLength(0)
  })

  it('clears skippedIds', () => {
    useGameStore.setState({ skippedIds: ['c'] })
    useGameStore.getState().startNewGame()
    expect(useGameStore.getState().skippedIds).toHaveLength(0)
  })

  it('resets isGameComplete to false', () => {
    useGameStore.setState({ isGameComplete: true })
    useGameStore.getState().startNewGame()
    expect(useGameStore.getState().isGameComplete).toBe(false)
  })

  it('does NOT reset maxStreak', () => {
    useGameStore.setState({ maxStreak: 7 })
    useGameStore.getState().startNewGame()
    expect(useGameStore.getState().maxStreak).toBe(7)
  })

  it('produces different sessions on successive calls (shuffle)', () => {
    useGameStore.getState().startNewGame()
    const first = useGameStore.getState().sessionDefectors.map(d => d.id).join(',')
    useGameStore.getState().startNewGame()
    const second = useGameStore.getState().sessionDefectors.map(d => d.id).join(',')
    // With 60 defectors the chance of an identical 10-element ordered draw is negligible
    expect(first).not.toBe(second)
  })
})

// ─── submitGuess — matching logic ─────────────────────────────────────────

describe('submitGuess – name matching', () => {
  const defector = makeDefector(
    'scindia',
    'Jyotiraditya Scindia',
    ['Scindia', 'Jyotiraditya', 'Maharaja', 'HBS']
  )

  beforeEach(() => {
    resetStore()
    useGameStore.setState({ sessionDefectors: [defector], currentRound: 0 })
  })

  it('accepts an exact full-name match', () => {
    expect(useGameStore.getState().submitGuess('Jyotiraditya Scindia').correct).toBe(true)
  })

  it('is case-insensitive', () => {
    expect(useGameStore.getState().submitGuess('jyotiraditya scindia').correct).toBe(true)
    expect(useGameStore.getState().submitGuess('JYOTIRADITYA SCINDIA').correct).toBe(true)
  })

  it('trims surrounding whitespace', () => {
    expect(useGameStore.getState().submitGuess('  Jyotiraditya Scindia  ').correct).toBe(true)
  })

  it('accepts an exact alias match', () => {
    expect(useGameStore.getState().submitGuess('Scindia').correct).toBe(true)
    expect(useGameStore.getState().submitGuess('Maharaja').correct).toBe(true)
  })

  it('accepts a short alias that matches exactly (length < 4 but exact)', () => {
    // "HBS" is a 3-char alias — exact match should still pass
    expect(useGameStore.getState().submitGuess('HBS').correct).toBe(true)
  })

  it('accepts a partial match when guess length ≥ 4 and is substring of a name', () => {
    // "scin" (4 chars) is inside alias "scindia"
    expect(useGameStore.getState().submitGuess('Scin').correct).toBe(true)
    // "jyoti" (5 chars) is inside alias "jyotiraditya"
    expect(useGameStore.getState().submitGuess('Jyoti').correct).toBe(true)
  })

  it('rejects a partial match when guess length < 4', () => {
    // "Sci" has 3 chars — length check fails, and it's not an exact name/alias
    expect(useGameStore.getState().submitGuess('Sci').correct).toBe(false)
  })

  it('rejects a completely wrong guess', () => {
    expect(useGameStore.getState().submitGuess('Rahul Gandhi').correct).toBe(false)
  })

  it('rejects an empty-ish guess', () => {
    expect(useGameStore.getState().submitGuess('   ').correct).toBe(false)
  })
})

// ─── submitGuess — score & streak effects ─────────────────────────────────

describe('submitGuess – score and streak', () => {
  beforeEach(resetStore)

  it('awards 10 base points on a correct guess', () => {
    useGameStore.setState({
      sessionDefectors: [makeDefector('a', 'Alice')],
      currentRound: 0,
    })
    const result = useGameStore.getState().submitGuess('Alice')
    expect(result.points).toBe(10)
    expect(useGameStore.getState().score).toBe(10)
  })

  it('awards 0 points on a wrong guess', () => {
    useGameStore.setState({
      sessionDefectors: [makeDefector('a', 'Alice')],
      currentRound: 0,
    })
    const result = useGameStore.getState().submitGuess('Bob')
    expect(result.points).toBe(0)
    expect(useGameStore.getState().score).toBe(0)
  })

  it('increments streak on correct', () => {
    useGameStore.setState({
      sessionDefectors: [makeDefector('a', 'Alice')],
      currentRound: 0,
    })
    useGameStore.getState().submitGuess('Alice')
    expect(useGameStore.getState().streak).toBe(1)
  })

  it('resets streak to 0 on wrong', () => {
    useGameStore.setState({
      sessionDefectors: [makeDefector('a', 'Alice')],
      currentRound: 0,
      streak: 4,
    })
    useGameStore.getState().submitGuess('Wrong')
    expect(useGameStore.getState().streak).toBe(0)
  })

  it('adds the defector id to completedIds on correct', () => {
    useGameStore.setState({
      sessionDefectors: [makeDefector('a', 'Alice')],
      currentRound: 0,
    })
    useGameStore.getState().submitGuess('Alice')
    expect(useGameStore.getState().completedIds).toContain('a')
  })

  it('does not add to completedIds on wrong', () => {
    useGameStore.setState({
      sessionDefectors: [makeDefector('a', 'Alice')],
      currentRound: 0,
    })
    useGameStore.getState().submitGuess('Wrong')
    expect(useGameStore.getState().completedIds).not.toContain('a')
  })

  it('grants no streak bonus for streak < 3', () => {
    const session = makeSession(3)
    useGameStore.setState({ sessionDefectors: session, currentRound: 0 })

    useGameStore.getState().submitGuess('Defector 0') // streak → 1
    useGameStore.getState().nextRound()
    const result = useGameStore.getState().submitGuess('Defector 1') // streak → 2
    expect(result.points).toBe(10)
  })

  it('grants +5 bonus when streak reaches 3', () => {
    const session = makeSession(5)
    useGameStore.setState({ sessionDefectors: session, currentRound: 0 })

    useGameStore.getState().submitGuess('Defector 0') // streak 1
    useGameStore.getState().nextRound()
    useGameStore.getState().submitGuess('Defector 1') // streak 2
    useGameStore.getState().nextRound()
    const result = useGameStore.getState().submitGuess('Defector 2') // streak 3 → bonus
    expect(result.points).toBe(15)
    expect(useGameStore.getState().score).toBe(10 + 10 + 15)
  })

  it('continues granting the +5 bonus beyond streak 3', () => {
    const session = makeSession(5)
    useGameStore.setState({ sessionDefectors: session, currentRound: 0 })

    for (let i = 0; i < 3; i++) {
      useGameStore.getState().submitGuess(`Defector ${i}`)
      useGameStore.getState().nextRound()
    }
    const result = useGameStore.getState().submitGuess('Defector 3') // streak 4
    expect(result.points).toBe(15)
  })

  it('updates maxStreak correctly over a session', () => {
    const session = makeSession(4)
    useGameStore.setState({ sessionDefectors: session, currentRound: 0 })

    useGameStore.getState().submitGuess('Defector 0')
    useGameStore.getState().nextRound()
    useGameStore.getState().submitGuess('Defector 1')
    useGameStore.getState().nextRound()
    useGameStore.getState().submitGuess('Defector 2')

    expect(useGameStore.getState().maxStreak).toBe(3)
  })

  it('preserves maxStreak even when current streak drops', () => {
    const session = makeSession(3)
    useGameStore.setState({ sessionDefectors: session, currentRound: 0, maxStreak: 5 })

    useGameStore.getState().submitGuess('Defector 0') // streak 1, max still 5
    expect(useGameStore.getState().maxStreak).toBe(5)
  })

  it('accumulates score across multiple correct rounds', () => {
    const session = makeSession(4)
    useGameStore.setState({ sessionDefectors: session, currentRound: 0 })

    for (let i = 0; i < 4; i++) {
      useGameStore.getState().submitGuess(`Defector ${i}`)
      if (i < 3) useGameStore.getState().nextRound()
    }
    // Streaks: 1→10, 2→10, 3→15, 4→15  total = 50
    expect(useGameStore.getState().score).toBe(50)
  })
})

// ─── submitGuess — edge cases ──────────────────────────────────────────────

describe('submitGuess – edge cases', () => {
  beforeEach(resetStore)

  it('returns {correct: false, points: 0} when sessionDefectors is empty', () => {
    useGameStore.setState({ sessionDefectors: [], currentRound: 0 })
    expect(useGameStore.getState().submitGuess('anyone')).toEqual({ correct: false, points: 0 })
  })

  it('returns {correct: false, points: 0} when currentRound is out of bounds', () => {
    useGameStore.setState({
      sessionDefectors: [makeDefector('a', 'Alice')],
      currentRound: 5,
    })
    expect(useGameStore.getState().submitGuess('Alice')).toEqual({ correct: false, points: 0 })
  })
})

// ─── skipRound ─────────────────────────────────────────────────────────────

describe('skipRound', () => {
  const session = makeSession(3)

  beforeEach(() => {
    resetStore()
    useGameStore.setState({ sessionDefectors: session, currentRound: 0, streak: 3 })
  })

  it('adds the current defector to skippedIds', () => {
    useGameStore.getState().skipRound()
    expect(useGameStore.getState().skippedIds).toContain('d-0')
  })

  it('resets streak to 0', () => {
    useGameStore.getState().skipRound()
    expect(useGameStore.getState().streak).toBe(0)
  })

  it('advances to the next round', () => {
    useGameStore.getState().skipRound()
    expect(useGameStore.getState().currentRound).toBe(1)
  })

  it('sets isGameComplete when skipping the last round', () => {
    useGameStore.setState({ currentRound: 2 })
    useGameStore.getState().skipRound()
    expect(useGameStore.getState().isGameComplete).toBe(true)
  })

  it('does not modify completedIds', () => {
    useGameStore.setState({ completedIds: ['other-id'] })
    useGameStore.getState().skipRound()
    expect(useGameStore.getState().completedIds).toEqual(['other-id'])
  })

  it('does not award points', () => {
    useGameStore.getState().skipRound()
    expect(useGameStore.getState().score).toBe(0)
  })
})

// ─── nextRound ─────────────────────────────────────────────────────────────

describe('nextRound', () => {
  beforeEach(resetStore)

  it('increments currentRound by 1', () => {
    useGameStore.setState({ sessionDefectors: makeSession(3), currentRound: 0 })
    useGameStore.getState().nextRound()
    expect(useGameStore.getState().currentRound).toBe(1)
  })

  it('sets isGameComplete on the last round', () => {
    useGameStore.setState({ sessionDefectors: makeSession(1), currentRound: 0 })
    useGameStore.getState().nextRound()
    expect(useGameStore.getState().isGameComplete).toBe(true)
  })

  it('does not advance currentRound past the end', () => {
    useGameStore.setState({ sessionDefectors: makeSession(1), currentRound: 0 })
    useGameStore.getState().nextRound() // completes game
    useGameStore.getState().nextRound() // should be a no-op for currentRound
    // currentRound stays at 0 (the last index) — only isGameComplete toggles
    expect(useGameStore.getState().currentRound).toBe(0)
  })

  it('does not change score', () => {
    useGameStore.setState({ sessionDefectors: makeSession(3), currentRound: 0, score: 30 })
    useGameStore.getState().nextRound()
    expect(useGameStore.getState().score).toBe(30)
  })
})

// ─── prevRound ─────────────────────────────────────────────────────────────

describe('prevRound', () => {
  const session = makeSession(3)

  beforeEach(() => {
    resetStore()
    useGameStore.setState({ sessionDefectors: session })
  })

  it('decrements currentRound by 1', () => {
    useGameStore.setState({ currentRound: 2 })
    useGameStore.getState().prevRound()
    expect(useGameStore.getState().currentRound).toBe(1)
  })

  it('does nothing when already at round 0', () => {
    useGameStore.setState({ currentRound: 0 })
    useGameStore.getState().prevRound()
    expect(useGameStore.getState().currentRound).toBe(0)
  })

  it('does not modify completedIds when going back', () => {
    useGameStore.setState({ currentRound: 2, completedIds: ['d-0', 'd-1'] })
    useGameStore.getState().prevRound()
    // prevRound navigates back without touching completedIds
    expect(useGameStore.getState().completedIds).toEqual(['d-0', 'd-1'])
  })

  it('does not modify skippedIds when going back', () => {
    useGameStore.setState({ currentRound: 2, skippedIds: ['d-0', 'd-1'] })
    useGameStore.getState().prevRound()
    expect(useGameStore.getState().skippedIds).toEqual(['d-0', 'd-1'])
  })

  it('clears isGameComplete when going back from a completed game', () => {
    useGameStore.setState({ currentRound: 2, isGameComplete: true })
    useGameStore.getState().prevRound()
    expect(useGameStore.getState().isGameComplete).toBe(false)
  })

  it('does not change score', () => {
    useGameStore.setState({ currentRound: 2, score: 40 })
    useGameStore.getState().prevRound()
    expect(useGameStore.getState().score).toBe(40)
  })
})

// ─── reset ────────────────────────────────────────────────────────────────

describe('reset', () => {
  const session = makeSession(2)

  beforeEach(resetStore)

  it('resets currentRound to 0', () => {
    useGameStore.setState({ currentRound: 5 })
    useGameStore.getState().reset()
    expect(useGameStore.getState().currentRound).toBe(0)
  })

  it('resets score to 0', () => {
    useGameStore.setState({ score: 80 })
    useGameStore.getState().reset()
    expect(useGameStore.getState().score).toBe(0)
  })

  it('resets streak to 0', () => {
    useGameStore.setState({ streak: 4 })
    useGameStore.getState().reset()
    expect(useGameStore.getState().streak).toBe(0)
  })

  it('clears completedIds', () => {
    useGameStore.setState({ completedIds: ['x', 'y'] })
    useGameStore.getState().reset()
    expect(useGameStore.getState().completedIds).toHaveLength(0)
  })

  it('clears skippedIds', () => {
    useGameStore.setState({ skippedIds: ['z'] })
    useGameStore.getState().reset()
    expect(useGameStore.getState().skippedIds).toHaveLength(0)
  })

  it('resets isGameComplete to false', () => {
    useGameStore.setState({ isGameComplete: true })
    useGameStore.getState().reset()
    expect(useGameStore.getState().isGameComplete).toBe(false)
  })

  it('preserves sessionDefectors', () => {
    useGameStore.setState({ sessionDefectors: session })
    useGameStore.getState().reset()
    expect(useGameStore.getState().sessionDefectors).toEqual(session)
  })

  it('preserves maxStreak', () => {
    useGameStore.setState({ maxStreak: 9 })
    useGameStore.getState().reset()
    expect(useGameStore.getState().maxStreak).toBe(9)
  })
})
