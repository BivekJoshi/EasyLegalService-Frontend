import React from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import MagneticButton from '../ui/MagneticButton'
import { PROCESS_STEPS, PROCESS_GUARANTEES } from '../../data/process'
import './Process.css'

export default function Process() {
  return (
    <section id="process" className="section section--dark process-section">
      <div className="process-orbs" aria-hidden>
        <span className="process-orb process-orb--a" />
        <span className="process-orb process-orb--b" />
      </div>
      <div className="process-grid-bg" aria-hidden />

      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">How it works</div>
          <h2>
            Four easy steps from <span className="accent">inquiry to outcome.</span>
          </h2>
          <p>
            No long onboarding, no opaque pricing. Most clients move from first call to
            engagement letter inside 48 hours.
          </p>
        </div>

        {/* Cards row */}
        <div className="process">
          <div className="process__rail" aria-hidden>
            <span className="process__rail-spark" />
          </div>

          {PROCESS_STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              className="step"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <span className="step__bg-num" aria-hidden>0{i + 1}</span>

              <div className="step__top">
                <span className="step__day">{s.day}</span>
                <span className="step__num">Step 0{i + 1}</span>
              </div>

              <div className="step__icon">
                <Icon name={s.icon} />
              </div>

              <h3>{s.title}</h3>
              <p>{s.text}</p>

              <ul className="step__bullets">
                {s.bullets.map((b) => (
                  <li key={b}>
                    <span className="step__check">
                      <Icon name="check" size={12} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {i < PROCESS_STEPS.length - 1 && (
                <div className="step__arrow" aria-hidden>
                  <Icon name="arrow" size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* "Our promise" guarantee strip */}
        <motion.div
          className="process__promise"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="process__promise-glow" aria-hidden />

          <div className="process__promise-label">
            <span className="process__promise-seal">
              <Icon name="shield" size={14} />
            </span>
            <div>
              <span className="process__promise-cap">Our promise</span>
              <span className="process__promise-strong">No surprises, ever.</span>
            </div>
          </div>

          <ul className="process__guarantees">
            {PROCESS_GUARANTEES.map((g) => (
              <li key={g}>
                <span className="process__guarantee-check">
                  <Icon name="check" size={12} />
                </span>
                {g}
              </li>
            ))}
          </ul>

          <div className="process__promise-cta">
            <MagneticButton href="#contact" className="btn btn--primary" strength={0.25}>
              Start your matter <Icon name="arrow" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
