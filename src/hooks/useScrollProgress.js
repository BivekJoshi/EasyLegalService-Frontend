import { useEffect, useState } from 'react'

/** Returns scroll progress 0..1 across the full document. */
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const update = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return p
}
