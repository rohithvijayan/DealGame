import { afterEach } from 'vitest'

// Clear localStorage between tests so persist middleware starts fresh
afterEach(() => {
  localStorage.clear()
})
