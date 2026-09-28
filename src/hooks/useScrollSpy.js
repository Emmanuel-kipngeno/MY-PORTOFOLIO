import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the nav can highlight it.
 * Uses a scroll listener rather than IntersectionObserver because the
 * "active" section is the one crossing the upper third of the viewport,
 * which is awkward to express with per-section observers.
 */
export function useScrollSpy(ids, offset = 140) {
  const [activeId, setActiveId] = useState(ids[0] ?? null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let frame = 0

    const compute = () => {
      frame = 0
      const scrollY = window.scrollY + offset

      let current = ids[0] ?? null

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= scrollY) current = id
      }

      // Pin the last section once the page is scrolled to the bottom,
      // otherwise short trailing sections can never become active.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 24
      if (atBottom) current = ids[ids.length - 1] ?? current

      setActiveId((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return activeId
}

export default useScrollSpy
