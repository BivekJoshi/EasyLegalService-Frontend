import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import './Loader.css'

/**
 * Full-screen page loader — animated SVG scales of justice + progress bar.
 * Shows for `duration` ms then plays an exit animation (handled by parent's
 * AnimatePresence).
 */
export default function Loader({ duration = 3000 }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(t)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [duration])

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      aria-busy="true"
      aria-label="Loading Easy Legal Service"
    >
      <div className="loader__bg" aria-hidden>
        <div className="loader__halo" />
        <div className="loader__grid" />
        <div className="loader__beams">
          <span className="loader__beam loader__beam--1" />
          <span className="loader__beam loader__beam--2" />
        </div>
      </div>

      <motion.div
        className="loader__content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top mark */}
        <div className="loader__mark">
          <span className="loader__mark-line" />
          <span>EST · MMX</span>
          <span className="loader__mark-line" />
        </div>

        {/* Scales of justice */}
        <div className="loader__scales-wrap" aria-hidden>
          <div className="loader__scales-halo" />

          {/* Orbiting particles */}
          <div className="loader__particles">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="loader__particle" style={{ '--i': i }} />
            ))}
          </div>

          <svg className="loader__scales" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="loader-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#e6c98a" />
                <stop offset="50%"  stopColor="#c9a55c" />
                <stop offset="100%" stopColor="#9c7a36" />
              </linearGradient>
              <linearGradient id="loader-gold-h" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#9c7a36" />
                <stop offset="50%"  stopColor="#e6c98a" />
                <stop offset="100%" stopColor="#9c7a36" />
              </linearGradient>
              <radialGradient id="loader-knob" cx="0.35" cy="0.35" r="0.65">
                <stop offset="0%"   stopColor="#f7e6c1" />
                <stop offset="60%"  stopColor="#c9a55c" />
                <stop offset="100%" stopColor="#6e521f" />
              </radialGradient>
              <filter id="loader-glow">
                <feGaussianBlur stdDeviation="1.4" />
              </filter>
            </defs>

            {/* Base — stepped */}
            <ellipse cx="100" cy="182" rx="38" ry="3.5" fill="url(#loader-gold)" opacity="0.55" />
            <rect x="68"  y="172" width="64" height="8" rx="2" fill="url(#loader-gold)" />
            <rect x="80"  y="164" width="40" height="8" rx="2" fill="url(#loader-gold)" opacity="0.92" />
            <rect x="88"  y="158" width="24" height="6" rx="1" fill="url(#loader-gold-h)" opacity="0.85" />

            {/* Pole */}
            <rect x="97" y="62" width="6" height="98" rx="1" fill="url(#loader-gold)" />
            <rect x="95" y="118" width="10" height="3" rx="0.8" fill="url(#loader-gold)" opacity="0.8" />
            <rect x="95" y="80" width="10" height="3" rx="0.8" fill="url(#loader-gold)" opacity="0.8" />

            {/* Finial — knob + cone */}
            <circle cx="100" cy="55" r="7" fill="url(#loader-knob)" />
            <polygon points="93,50 107,50 100,38" fill="url(#loader-gold)" />

            {/* ===== Rocking beam group ===== */}
            <g className="loader__beam-grp">
              {/* Horizontal beam */}
              <rect x="30" y="59" width="140" height="4.5" rx="1.2" fill="url(#loader-gold-h)" />
              {/* Decorative beam ridges */}
              <rect x="30" y="58" width="140" height="1" fill="#f7e6c1" opacity="0.4" />

              {/* End balls */}
              <circle cx="30"  cy="61" r="5.5" fill="url(#loader-knob)" />
              <circle cx="170" cy="61" r="5.5" fill="url(#loader-knob)" />

              {/* Left side — V-chains + pan */}
              <line x1="30"  y1="66" x2="14"  y2="108" stroke="url(#loader-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="30"  y1="66" x2="46"  y2="108" stroke="url(#loader-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="30"  cy="110" rx="24" ry="3.2" fill="url(#loader-gold)" />
              <path d="M 8,110 Q 30,124 52,110 Z" fill="url(#loader-gold)" opacity="0.7" />
              <ellipse cx="30" cy="109" rx="22" ry="1.4" fill="#f7e6c1" opacity="0.35" />

              {/* Right side — V-chains + pan */}
              <line x1="170" y1="66" x2="154" y2="108" stroke="url(#loader-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="170" y1="66" x2="186" y2="108" stroke="url(#loader-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="170" cy="110" rx="24" ry="3.2" fill="url(#loader-gold)" />
              <path d="M 148,110 Q 170,124 192,110 Z" fill="url(#loader-gold)" opacity="0.7" />
              <ellipse cx="170" cy="109" rx="22" ry="1.4" fill="#f7e6c1" opacity="0.35" />
            </g>
          </svg>
        </div>

        {/* Brand */}
        <div className="loader__brand">
          <div className="loader__name">Easy Legal Service</div>
          <div className="loader__sub">Advocates · Kathmandu</div>
        </div>

        {/* Progress */}
        <div className="loader__progress-wrap">
          <div className="loader__progress">
            <div
              className="loader__progress-bar"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <div className="loader__status">
            <span>Preparing your counsel</span>
            <span className="loader__pct">{Math.round(progress * 100).toString().padStart(2, '0')}%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
