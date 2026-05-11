import React from 'react'
import { motion } from 'motion/react'
import { CLIENT_LOGOS_A, CLIENT_LOGOS_B } from '../../data/content'
import './TrustStrip.css'

function LogoCard({ logo }) {
  return (
    <div className="logo-card">
      <div className="logo-card__mono">
        <span>{logo.initials}</span>
      </div>
      <div className="logo-card__text">
        <span className="logo-card__name">{logo.name}</span>
        <span className="logo-card__industry">{logo.industry}</span>
      </div>
    </div>
  )
}

function LogoRail({ items, speed = 55, reverse = false }) {
  return (
    <div className="logo-rail" style={{ '--rail-duration': `${speed}s` }}>
      <div className={`logo-rail__track ${reverse ? 'is-reverse' : ''}`}>
        {[0, 1].map((i) => (
          <ul key={i} className="logo-rail__row" aria-hidden={i === 1}>
            {items.map((logo) => (
              <li key={logo.name + i}>
                <LogoCard logo={logo} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default function TrustStrip() {
  return (
    <section className="strip">
      <div className="strip__deco strip__deco--top" aria-hidden />
      <div className="strip__pattern" aria-hidden />

      <div className="container">
        <motion.div
          className="strip__head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow eyebrow--centered">Our clients</div>
          <p>
            From early‑stage founders to listed enterprises — we counsel businesses and families
            across more than a dozen jurisdictions.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="strip__rows"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <LogoRail items={CLIENT_LOGOS_A} speed={55} />
        <LogoRail items={CLIENT_LOGOS_B} speed={68} reverse />
      </motion.div>

      <div className="container">
        <motion.p
          className="strip__tagline"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <span>Counselors of record</span>
          <span className="strip__dot">·</span>
          <span>from incorporation to exit</span>
          <span className="strip__dot">·</span>
          <span>since 2010</span>
        </motion.p>
      </div>

      <div className="strip__deco strip__deco--bot" aria-hidden />
    </section>
  )
}
