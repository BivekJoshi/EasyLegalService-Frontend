import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Mounts a single Lenis instance for buttery smooth scroll.
 * Disabled when the user prefers reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Hook anchor clicks into Lenis so #section jumps stay smooth
    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const target = document.querySelector(id)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -76, duration: 1.2 })
      }
    }
    document.addEventListener('click', onAnchor)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onAnchor)
      lenis.destroy()
    }
  }, [])
}
