import { useEffect, useState } from 'react'

/**
 * Mount-time entrance flag. Unlike `useReveal`, this does not wait for the
 * element to scroll into view — it flips to true shortly after mount so the
 * `[data-reveal]` CSS transition actually runs.
 *
 * Needed for above-the-fold content (the hero), where hardcoding
 * `data-visible="true"` in the initial markup would render at full opacity
 * with no transition, and the staggered `--reveal-delay` would do nothing.
 */
export function useEnter(delay = 0) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (delay <= 0) {
      const frame = requestAnimationFrame(() => setEntered(true))
      return () => cancelAnimationFrame(frame)
    }

    const timer = setTimeout(() => setEntered(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return entered
}

export default useEnter
