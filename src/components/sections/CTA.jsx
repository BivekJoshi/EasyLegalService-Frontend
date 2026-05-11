import React from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import MagneticButton from '../ui/MagneticButton'
import { CONTACT } from '../../data/nav'
import './CTA.css'

export default function CTA() {
  return (
    <section className="section cta-section">
      <div className="container">
        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cta__bg" aria-hidden>
            <div className="cta__ring cta__ring--a" />
            <div className="cta__ring cta__ring--b" />
            <div className="cta__ring cta__ring--c" />
          </div>

          <div className="cta__copy">
            <div className="eyebrow" style={{ color: 'var(--gold-300)' }}>Ready to begin?</div>
            <h2>Talk to a senior advocate <br />this week.</h2>
            <p>30-minute consultation, no obligation. We will tell you honestly whether you need a lawyer — or just clarity.</p>
          </div>
          <div className="cta__actions">
            <MagneticButton href="#contact" className="btn btn--primary" strength={0.3}>
              Book consultation <Icon name="arrow" />
            </MagneticButton>
            <a className="btn btn--ghost" href={`tel:${CONTACT.phoneTel}`} style={{ borderColor: 'rgba(255,255,255,.45)', color: '#fff' }}>
              <Icon name="phone" /> {CONTACT.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
