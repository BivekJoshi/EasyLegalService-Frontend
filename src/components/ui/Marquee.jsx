import React from 'react'
import './Marquee.css'

/**
 * Infinite horizontal marquee.
 * Duplicates children so the animation loops seamlessly.
 */
export default function Marquee({ items, speed = 40, reverse = false, separator = '·' }) {
  const dir = reverse ? 'reverse' : 'normal'
  return (
    <div className="marquee" style={{ '--marquee-duration': `${speed}s`, '--marquee-dir': dir }}>
      <div className="marquee__track">
        {[0, 1].map((i) => (
          <ul key={i} className="marquee__group" aria-hidden={i === 1}>
            {items.map((item, idx) => (
              <li key={idx}>
                <span>{item}</span>
                <span className="marquee__sep">{separator}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
