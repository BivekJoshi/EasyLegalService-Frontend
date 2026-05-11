import { useEffect, useRef } from 'react'

/**
 * Returns a ref that, when attached, pulls the element gently toward the cursor.
 * Skipped on touch / coarse-pointer devices.
 */
export function useMagnetic({ strength = 0.35 } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(pointer: coarse)').matches) return

    let raf = 0
    let tx = 0, ty = 0, cx = 0, cy = 0

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      tx = x * strength
      ty = y * strength
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick) }

    const tick = () => {
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [strength])
  return ref
}
