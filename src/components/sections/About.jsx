import React from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import { ABOUT_FEATURES, MILESTONES } from '../../data/content'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section section--cream about">
      <div className="about__deco" aria-hidden>
        <div className="about__orb about__orb--a" />
        <div className="about__orb about__orb--b" />
      </div>

      <div className="container">
        {/* ============ Section head ============ */}
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">About the firm</div>
          <h2>
            A modern law firm built around{' '}
            <span className="accent">your outcome.</span>
          </h2>
          <p>
            Founded in 2010, Easy Legal Service combines deep Nepali courtroom experience
            with the responsiveness of a modern boutique — for founders, family businesses,
            multinational investors and individuals.
          </p>
        </div>

        <div className="about__grid">
          {/* ============ LEFT: Founder portrait card ============ */}
          <motion.div
            className="about__portrait"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about__portrait-frame">
              <span className="about__corner about__corner--tl" aria-hidden />
              <span className="about__corner about__corner--tr" aria-hidden />
              <span className="about__corner about__corner--bl" aria-hidden />
              <span className="about__corner about__corner--br" aria-hidden />

              <div className="about__year">EST · MMX</div>

              <div className="about__mono">
                <span>AS</span>
              </div>

              {/* Signature flourish */}
              <svg className="about__signature" viewBox="0 0 240 60" aria-hidden>
                <path
                  d="M 10,42 Q 25,15 45,32 T 80,38 Q 100,20 120,38 T 160,42 Q 188,26 208,40 L 220,40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 220,40 L 230,46"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <div className="about__credit">
                <div className="about__credit-name">Easy Legal Service</div>
                <div className="about__credit-role">Founding Partner</div>
              </div>

              <div className="about__rule" aria-hidden />

              <blockquote className="about__quote">
                "The role of a lawyer is not to win the case — it is to make sure the
                client never has to fight one."
              </blockquote>
            </div>

            {/* Rotating circular seal in the top-right */}
            <svg className="about__seal" viewBox="0 0 200 200" aria-hidden>
              <defs>
                <path
                  id="about-seal-circle"
                  d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
                />
              </defs>
              <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.55" />
              <text className="about__seal-text" fontSize="10">
                <textPath href="#about-seal-circle" startOffset="0">
                  ADVOCATES · COUNSEL · KATHMANDU · NEPAL · ADVOCATES · COUNSEL ·
                </textPath>
              </text>
              <path
                d="M 100,86 v 28 M 88,96 h 24 M 88,96 l -3,8 a 4,4 0 0 0 6.5,0 z M 112,96 l -3,8 a 4,4 0 0 0 6.5,0 z"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Floating "pro-bono" card */}
            <div className="about__float about__float--pro">
              <div className="about__float-num">1,000<sup>+</sup></div>
              <div className="about__float-label">Pro-bono hours since 2018</div>
            </div>

            {/* Floating "confidential" card */}
            <div className="about__float about__float--secure">
              <span className="about__float-icon">
                <Icon name="shield" />
              </span>
              <div>
                <div className="about__float-cap">Confidential</div>
                <div className="about__float-strong">ISO 27001 secure</div>
              </div>
            </div>
          </motion.div>

          {/* ============ RIGHT: Story + principles + CTA ============ */}
          <div className="about__content">
            <motion.p
              className="about__lead"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              We act for founders, family businesses, multinational investors and
              individuals — pairing rigorous advocacy with a service ethic that, frankly,
              our profession has long lacked. From entity formation to enforcement, we
              stay with you through the full lifecycle.
            </motion.p>

            <motion.div
              className="about__principles-head"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Our principles</span>
            </motion.div>

            <ul className="about__features">
              {ABOUT_FEATURES.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="about__feat-num">0{i + 1}</span>
                  <span className="about__feat-icon">
                    <Icon name={f.icon} />
                  </span>
                  <div className="about__feat-text">
                    <h4>{f.title}</h4>
                    <p>{f.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#team"
              className="about__cta"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Meet our advocates <Icon name="arrow" />
            </motion.a>
          </div>
        </div>

        {/* ============ Timeline strip ============ */}
        <div className="about__timeline-head reveal">
          <div className="eyebrow eyebrow--centered">Our journey</div>
        </div>

        <div className="about__timeline">
          <div className="about__timeline-rail" aria-hidden />
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              className="about__milestone"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="about__milestone-dot" aria-hidden />
              <div className="about__milestone-year">{m.year}</div>
              <h4>{m.title}</h4>
              <p>{m.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
