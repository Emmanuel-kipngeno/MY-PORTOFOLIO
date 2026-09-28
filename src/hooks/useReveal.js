import { useEffect, useRef, useState } from 'react'

const isSupported = typeof IntersectionObserver !== 'undefined'

/**
 * Adds a one-shot `data-visible="true"` attribute when the element first
 * scrolls into view. Pairs with the [data-reveal] CSS transition so content
 * animates in without pulling in an animation library.
 */
export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  // Start visible when the API is unavailable so content is never stuck hidden.
  const [visible, setVisible] = useState(!isSupported)

  useEffect(() => {
    const el = ref.current
    if (!el || !isSupported) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, visible]
}

export default useReveal
