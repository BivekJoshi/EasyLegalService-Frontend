import React from 'react'
import { motion } from 'motion/react'
import { TEAM } from '../../data/team'
import './Team.css'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 } }),
}

export default function Team() {
  return (
    <section id="team" className="section section--cream team-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">The advocates</div>
          <h2>Meet the people behind <span className="accent">your case.</span></h2>
          <p>A senior-heavy team that takes pride in answering your calls, not just your emails.</p>
        </div>

        <div className="team">
          {TEAM.map((m, i) => (
            <motion.article
              key={m.name}
              className="member"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            >
              <div className="member__photo">
                <span className="member__initials">{m.initials}</span>
                <div className="member__shine" />
              </div>
              <div className="member__info">
                <div className="member__role">{m.role}</div>
                <h3>{m.name}</h3>
                <p className="member__bio">{m.bio}</p>
                <div className="member__tags">
                  {m.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
