import React from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import MagneticButton from '../ui/MagneticButton'
import { PRACTICE_AREAS } from '../../data/practice'
import './PracticeAreas.css'

const META = [
  { num: '08',     label: 'Focused groups' },
  { num: '1,200+', label: 'Matters resolved' },
  { num: '14',     label: 'Jurisdictions' },
]

export default function PracticeAreas() {
  return (
    <section id="practice" className="section practice">
      <div className="practice__deco" aria-hidden>
        <div className="practice__orb practice__orb--a" />
        <div className="practice__orb practice__orb--b" />
      </div>

      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">What we do</div>
          <h2>
            Practice areas, <span className="accent">end-to-end.</span>
          </h2>
          <p>
            Eight focused practice groups — staffed by advocates who only work within their
            domain, so your matter never gets handled by a generalist.
          </p>
        </div>

        {/* Meta strip */}
        <motion.div
          className="practice__meta"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {META.map((m, i) => (
            <React.Fragment key={m.label}>
              <div className="practice__meta-item">
                <span className="practice__meta-num">{m.num}</span>
                <span className="practice__meta-label">{m.label}</span>
              </div>
              {i < META.length - 1 && <span className="practice__meta-sep" />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="areas">
          {PRACTICE_AREAS.map((a, i) => (
            <motion.article
              key={a.title}
              className={`area ${a.featured ? 'is-featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: (i % 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8 }}
            >
              {a.featured && (
                <div className="area__pill">
                  <span className="area__pill-dot" /> Most requested
                </div>
              )}

              <div className="area__head">
                <div className="area__icon">
                  <Icon name={a.icon} />
                </div>
                {!a.featured && <div className="area__num">0{i + 1}</div>}
              </div>

              <h3>{a.title}</h3>
              <p>{a.text}</p>

              <div className="area__rule" aria-hidden />

              <div className="area__list">
                {a.tags.map((t, j) => (
                  <React.Fragment key={t}>
                    {j > 0 && <span className="area__sep">·</span>}
                    <span>{t}</span>
                  </React.Fragment>
                ))}
              </div>

              <div className="area__foot">
                <div className="area__count">
                  <span className="area__count-num">{a.count}</span>
                  <span className="area__count-label">matters</span>
                </div>
                <a className="area__link" href="#contact">
                  Discuss <Icon name="arrow" />
                </a>
              </div>

              <div className="area__glow" aria-hidden />
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          className="practice__cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="practice__cta-rings" aria-hidden>
            <span className="practice__ring practice__ring--a" />
            <span className="practice__ring practice__ring--b" />
          </div>

          <div className="practice__cta-text">
            <div className="eyebrow" style={{ color: 'var(--gold-300)' }}>
              Routed to the right desk
            </div>
            <h3>Don't see your matter?</h3>
            <p>
              We probably handle it — or we know who does. Send a quick brief and we'll route
              you to the right desk within one business day.
            </p>
          </div>

          <div className="practice__cta-actions">
            <MagneticButton href="#contact" className="btn btn--primary" strength={0.25}>
              Talk to an advocate <Icon name="arrow" />
            </MagneticButton>
            <a
              className="btn btn--ghost practice__cta-ghost"
              href="tel:+97714000000"
            >
              <Icon name="phone" /> Call us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
