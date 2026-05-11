import React from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import MagneticButton from '../ui/MagneticButton'
import { TESTIMONIALS, REVIEW_SUMMARY } from '../../data/testimonials'
import './Testimonials.css'

export default function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="t-deco" aria-hidden>
        <div className="t-orb t-orb--a" />
        <div className="t-orb t-orb--b" />
      </div>

      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">Client voices</div>
          <h2>
            The trust we are <span className="accent">proudest of.</span>
          </h2>
          <p>
            Verified reviews from clients we have advised over the past five years.
          </p>
        </div>

        {/* Rating summary panel */}
        <motion.div
          className="t-summary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="t-summary__rating">
            <span className="t-summary__num">{REVIEW_SUMMARY.rating}</span>
            <div className="t-summary__rating-meta">
              <div className="t-summary__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={18} />
                ))}
              </div>
              <div className="t-summary__count">
                From <strong>{REVIEW_SUMMARY.count}</strong> verified reviews
              </div>
            </div>
          </div>

          <div className="t-summary__divider" aria-hidden />

          <div className="t-summary__sources">
            <span className="t-summary__sources-label">Verified on</span>
            <ul className="t-summary__sources-list">
              {REVIEW_SUMMARY.sources.map((s, i) => (
                <React.Fragment key={s}>
                  <li>{s}</li>
                  {i < REVIEW_SUMMARY.sources.length - 1 && (
                    <li className="t-summary__sources-dot" aria-hidden>·</li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Cards grid (asymmetric: featured spans 2 cols) */}
        <div className="testimonials">
          {TESTIMONIALS.map((q, i) => (
            <motion.figure
              key={q.name}
              className={`t-card ${q.featured ? 'is-featured' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <span className="t-card__mark" aria-hidden>"</span>

              <div className="t-card__top">
                <span className="t-card__matter">{q.matter}</span>
                <span className="t-card__date">{q.date}</span>
              </div>

              <div className="t-card__row">
                <div className="t-card__stars">
                  {Array.from({ length: q.rating }).map((_, j) => (
                    <Icon key={j} name="star" size={14} />
                  ))}
                </div>
                <div className="t-card__verified">
                  <Icon name="check" size={11} /> {q.source}
                </div>
              </div>

              <blockquote className="t-card__quote">{q.quote}</blockquote>

              <figcaption className="t-card__person">
                <div className="t-card__avatar">{q.initials}</div>
                <div>
                  <div className="t-card__name">{q.name}</div>
                  <div className="t-card__title">{q.title}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          className="t-cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="t-cta-rings" aria-hidden>
            <span className="t-cta-ring t-cta-ring--a" />
            <span className="t-cta-ring t-cta-ring--b" />
          </div>

          <div className="t-cta-text">
            <div className="eyebrow" style={{ color: 'var(--gold-300)' }}>
              200+ reviews & counting
            </div>
            <h3>Read what real clients say.</h3>
            <p>
              Every review on this page is verified. Browse the full set on Google Business
              or Clutch — or talk to us about being our next happy client.
            </p>
          </div>

          <div className="t-cta-actions">
            <MagneticButton href="#" className="btn btn--primary" strength={0.25}>
              Read all reviews <Icon name="arrow" />
            </MagneticButton>
            <a className="btn btn--ghost t-cta-ghost" href="#contact">
              Become a client
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
