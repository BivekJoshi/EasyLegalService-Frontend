import React, { useState } from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import { PRACTICE_AREAS } from '../../data/practice'
import './PracticeAreas.css'

export default function PracticeAreas() {
  const [hover, setHover] = useState(null)

  return (
    <section id="practice" className="section practice">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">What we do</div>
          <h2>Practice areas, <span className="accent">end-to-end.</span></h2>
          <p>Eight focused practice groups — staffed by advocates who only work within their domain, so your matter never gets handled by a generalist.</p>
        </div>

        <div className="areas">
          {PRACTICE_AREAS.map((a, i) => (
            <motion.article
              key={a.title}
              className={`area reveal ${hover === i ? 'is-hover' : ''}`}
              data-delay={(i % 4) + 1}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            >
              <div className="area__num">0{i + 1}</div>
              <div className="area__icon"><Icon name={a.icon} /></div>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <div className="area__tags">
                {a.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <a className="area__link" href="#contact">
                Discuss your matter <Icon name="arrow" />
              </a>
              <div className="area__glow" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
