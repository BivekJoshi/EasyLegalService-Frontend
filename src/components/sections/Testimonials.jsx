import React from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import { TESTIMONIALS } from '../../data/testimonials'
import './Testimonials.css'

export default function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">Client voices</div>
          <h2>The trust we are <span className="accent">proudest of.</span></h2>
          <p>Verified reviews from individuals and companies we have advised over the past five years.</p>
        </div>

        <div className="testimonials">
          {TESTIMONIALS.map((q, i) => (
            <motion.figure
              key={q.name}
              className="t-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <span className="t-card__mark" aria-hidden>"</span>
              <div className="t-card__stars">
                {Array.from({ length: 5 }).map((_, j) => <Icon key={j} name="star" size={16} />)}
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
      </div>
    </section>
  )
}
