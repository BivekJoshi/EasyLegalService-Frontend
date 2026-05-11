import React from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import MagneticButton from '../ui/MagneticButton'
import { TEAM, TEAM_META } from '../../data/team'
import './Team.css'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

export default function Team() {
  return (
    <section id="team" className="section section--cream team-section">
      <div className="team__deco" aria-hidden>
        <div className="team__orb team__orb--a" />
        <div className="team__orb team__orb--b" />
      </div>

      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">The advocates</div>
          <h2>
            Meet the people behind <span className="accent">your case.</span>
          </h2>
          <p>
            A senior-heavy team that takes pride in answering your calls, not just your
            emails.
          </p>
        </div>

        {/* Meta strip — partners / advocates counts */}
        <motion.div
          className="team__meta"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {TEAM_META.map((m, i) => (
            <React.Fragment key={m.label}>
              <div className="team__meta-item">
                <span className="team__meta-num">{m.num}</span>
                <span className="team__meta-label">{m.label}</span>
              </div>
              {i < TEAM_META.length - 1 && <span className="team__meta-sep" />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Member cards */}
        <div className="team">
          {TEAM.map((m, i) => (
            <motion.article
              key={m.name}
              className={`member ${m.featured ? 'is-featured' : ''}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            >
              {m.featured && <span className="member__featured-strip" aria-hidden />}

              <div className="member__photo">
                <div className="member__photo-pattern" aria-hidden />

                {/* Years badge */}
                <div className="member__years">
                  <span className="member__years-num">{m.years}</span>
                  <span className="member__years-unit">+ yrs</span>
                </div>

                {/* LinkedIn link */}
                <a
                  className="member__social"
                  href="#"
                  aria-label={`${m.name} on LinkedIn`}
                >
                  <Icon name="linkedin" size={14} />
                </a>

                <span className="member__initials">{m.initials}</span>

                {/* Corner ornaments */}
                <span className="member__corner member__corner--bl" aria-hidden />
                <span className="member__corner member__corner--br" aria-hidden />

                <div className="member__shine" aria-hidden />
              </div>

              <div className="member__info">
                <div className="member__role">
                  {m.featured && <Icon name="star" size={11} />}
                  {m.role}
                </div>
                <h3>{m.name}</h3>
                <p className="member__bio">{m.bio}</p>

                <div className="member__tags">
                  {m.tags.map((t) => <span key={t}>{t}</span>)}
                </div>

                {/* Meta row — bar council + languages */}
                <div className="member__meta-row">
                  <div className="member__meta-cell" title="Nepal Bar Association">
                    <Icon name="shield" size={12} />
                    <span>{m.barCouncil}</span>
                  </div>
                  <div className="member__meta-cell" title="Languages">
                    <Icon name="globe" size={12} />
                    <span>{m.languages.join(' · ')}</span>
                  </div>
                </div>

                <a className="member__cta" href="#contact">
                  Talk to {m.firstName} <Icon name="arrow" size={12} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom footer CTA */}
        <motion.div
          className="team__footer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="team__footer-rings" aria-hidden>
            <span className="team__ring team__ring--a" />
            <span className="team__ring team__ring--b" />
          </div>

          <div className="team__footer-text">
            <div className="eyebrow" style={{ color: 'var(--gold-300)' }}>
              The full bench
            </div>
            <h3>Eight more advocates across our practice groups.</h3>
            <p>
              From senior arbitrators to junior associates, we deploy the right level of
              seniority for the matter in front of us — never more, never less.
            </p>
          </div>

          <div className="team__footer-actions">
            <MagneticButton href="#contact" className="btn btn--primary" strength={0.25}>
              Browse the full bench <Icon name="arrow" />
            </MagneticButton>
            <a
              className="btn btn--ghost team__footer-ghost"
              href="#contact"
            >
              <Icon name="mail" /> Careers enquiries
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
