import React from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import { PROCESS_STEPS } from '../../data/process'
import './Process.css'

export default function Process() {
  return (
    <section id="process" className="section section--dark process-section">
      <div className="process-orbs" aria-hidden>
        <span className="process-orb process-orb--a" />
        <span className="process-orb process-orb--b" />
      </div>

      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">How it works</div>
          <h2>Four easy steps from <span className="accent">inquiry to outcome.</span></h2>
          <p>No long onboarding, no opaque pricing. Most clients move from first call to engagement letter inside 48 hours.</p>
        </div>

        <div className="process">
          <div className="process__rail" aria-hidden />
          {PROCESS_STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              className="step"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <div className="step__head">
                <div className="step__num">0{i + 1}</div>
                <div className="step__icon"><Icon name={s.icon} /></div>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
