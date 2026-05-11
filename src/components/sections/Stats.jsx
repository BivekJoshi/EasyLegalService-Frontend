import React from 'react'
import CountUp from '../ui/CountUp'
import { STATS } from '../../data/content'
import './Stats.css'

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats reveal reveal--scale">
          <div className="stats__glow" />
          {STATS.map((it) => (
            <div key={it.label} className="stat">
              <CountUp to={it.num} suffix={it.suffix} />
              <div className="stat__label">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
