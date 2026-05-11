import React from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import { ABOUT_FEATURES } from '../../data/content'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section section--cream about">
      <div className="container about__grid">
        <motion.div
          className="about__image"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about__image-glow" />
          <svg className="about__image-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 3v18M5 21h14M5 7h14M5 7l-3 7a4 4 0 0 0 8 0L7 7M19 7l-3 7a4 4 0 0 0 8 0L21 7" />
          </svg>
          <div className="about__image-stats">
            <div>
              <span className="about__image-num">A+</span>
              <span className="about__image-cap">Avg case rating</span>
            </div>
            <div>
              <span className="about__image-num">48h</span>
              <span className="about__image-cap">First response</span>
            </div>
          </div>
          <div className="about__image-quote">
            <p>"The role of a lawyer is not to win the case — it is to make sure the client never has to fight one."</p>
            <span>— Founding Partner</span>
          </div>
        </motion.div>

        <div>
          <div className="eyebrow reveal">About the firm</div>
          <h2 className="reveal" data-delay="1">
            A modern law firm built around <span className="accent">your outcome.</span>
          </h2>
          <p className="reveal" data-delay="2">
            Founded in 2010 in Kathmandu, Easy Legal Service combines deep Nepali courtroom
            experience with the responsiveness of a modern boutique. We act for founders,
            family businesses, multinational investors and individuals — pairing rigorous
            advocacy with a service ethic that, frankly, our profession has long lacked.
          </p>
          <p className="reveal" data-delay="2">
            From entity formation to enforcement, we stay with you through the full lifecycle —
            so the legal side of your business or family stays predictable, documented and ready.
          </p>

          <ul className="about__features">
            {ABOUT_FEATURES.map((f, i) => (
              <li key={f.title} className="reveal" data-delay={Math.min(i + 1, 4)}>
                <span className="about__feat-icon"><Icon name={f.icon} /></span>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
