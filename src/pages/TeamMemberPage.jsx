import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import Icon from '../components/ui/Icon'
import MagneticButton from '../components/ui/MagneticButton'
import { findMemberBySlug, resolveTeamPhoto, TEAM } from '../data/team'
import { CONTACT } from '../data/nav'
import './TeamMemberPage.css'

function NotFound({ slug }) {
  return (
    <main className="member-page member-page--missing">
      <div className="container">
        <Link to="/" className="member-page__back">
          <Icon name="arrow" size={14} className="member-page__back-arrow" />
          Back to home
        </Link>
        <div className="member-missing">
          <div className="eyebrow">404 · Member not found</div>
          <h1>No advocate matches "{slug}".</h1>
          <p>The page you tried to open does not exist. Browse the team instead.</p>
          <Link to="/" className="btn btn--primary">
            Back to all advocates <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function TeamMemberPage() {
  const { slug } = useParams()
  const member = findMemberBySlug(slug)
  if (!member) return <NotFound slug={slug} />

  const photoSrc = resolveTeamPhoto(member.photo)
  const others = TEAM.filter((m) => m.slug !== member.slug).slice(0, 3)

  return (
    <main className="member-page">
      {/* ============ HERO ============ */}
      <section className="member-hero">
        <div className="member-hero__bg" aria-hidden>
          <div className="member-hero__gradient" />
          <div className="member-hero__grid" />
          <div className="member-hero__orb member-hero__orb--a" />
          <div className="member-hero__orb member-hero__orb--b" />
        </div>

        <div className="container">
          <Link to="/" className="member-page__back">
            <Icon name="arrow" size={14} className="member-page__back-arrow" />
            Back to all advocates
          </Link>

          <div className="member-hero__grid-cols">
            {/* Photo */}
            <motion.div
              className="member-hero__photo"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {photoSrc ? (
                <>
                  <img src={photoSrc} alt={member.name} className="member-hero__img" />
                  <div className="member-hero__img-overlay" aria-hidden />
                </>
              ) : (
                <span className="member-hero__initials">{member.initials}</span>
              )}

              <span className="member-hero__corner member-hero__corner--tl" aria-hidden />
              <span className="member-hero__corner member-hero__corner--tr" aria-hidden />
              <span className="member-hero__corner member-hero__corner--bl" aria-hidden />
              <span className="member-hero__corner member-hero__corner--br" aria-hidden />

              <div className="member-hero__year-badge">
                <span className="num">{member.years}</span>+ years
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              className="member-hero__info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="member-hero__role">
                {member.featured && <Icon name="star" size={12} />}
                {member.role}
              </div>
              <h1 className="member-hero__name">{member.name}</h1>
              <p className="member-hero__bio">{member.bio}</p>

              <div className="member-hero__tags">
                {member.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <ul className="member-hero__quick">
                <li>
                  <span className="cap">Bar council</span>
                  <span className="val">{member.barCouncil}</span>
                </li>
                <li>
                  <span className="cap">Languages</span>
                  <span className="val">{member.languages.join(' · ')}</span>
                </li>
                <li>
                  <span className="cap">In practice</span>
                  <span className="val">{member.years}+ years</span>
                </li>
              </ul>

              <div className="member-hero__actions">
                <MagneticButton
                  href={`mailto:${member.email}`}
                  className="btn btn--primary"
                  strength={0.25}
                >
                  Email {member.firstName} <Icon name="arrow" />
                </MagneticButton>
                <a className="btn btn--ghost member-hero__ghost" href={member.linkedin}>
                  <Icon name="linkedin" /> LinkedIn
                </a>
                <a
                  className="btn btn--ghost member-hero__ghost"
                  href={`tel:${CONTACT.phoneTel}`}
                >
                  <Icon name="phone" /> Call the firm
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ BODY ============ */}
      <section className="member-body section--cream">
        <div className="container">
          <div className="member-body__grid">
            {/* MAIN */}
            <div className="member-body__main">
              <h2 className="member-body__h2">
                About <span className="accent">{member.firstName}</span>
              </h2>
              {member.longBio?.map((p, i) => (
                <p key={i} className="member-body__p">
                  {p}
                </p>
              ))}

              {member.quote && (
                <motion.blockquote
                  className="member-quote"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="member-quote__mark" aria-hidden>
                    "
                  </span>
                  {member.quote}
                  <span className="member-quote__by">
                    — {member.firstName}, {member.role}
                  </span>
                </motion.blockquote>
              )}

              {member.matters?.length > 0 && (
                <>
                  <h3 className="member-body__h3">Notable matters</h3>
                  <ol className="member-matters">
                    {member.matters.map((m, i) => (
                      <motion.li
                        key={m.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                      >
                        <span className="member-matters__year">{m.year}</span>
                        <div>
                          <strong className="member-matters__title">{m.title}</strong>
                          <p className="member-matters__desc">{m.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </>
              )}
            </div>

            {/* ASIDE */}
            <aside className="member-body__side">
              {member.practiceAreas?.length > 0 && (
                <div className="aside-card">
                  <h4>Practice areas</h4>
                  <ul className="aside-list">
                    {member.practiceAreas.map((p) => (
                      <li key={p}>
                        <span className="aside-bullet" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {member.education?.length > 0 && (
                <div className="aside-card">
                  <h4>Education</h4>
                  <ul className="aside-edu">
                    {member.education.map((e) => (
                      <li key={`${e.degree}-${e.year}`}>
                        <span className="aside-edu__year">{e.year}</span>
                        <div>
                          <strong>{e.degree}</strong>
                          <span className="aside-edu__school">{e.school}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {member.awards?.length > 0 && (
                <div className="aside-card">
                  <h4>Recognition</h4>
                  <ul className="aside-list">
                    {member.awards.map((a) => (
                      <li key={a}>
                        <Icon name="star" size={12} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="aside-card aside-card--contact">
                <h4>Direct contact</h4>
                <a
                  className="aside-channel"
                  href={`mailto:${member.email}`}
                >
                  <Icon name="mail" size={14} />
                  <span>{member.email}</span>
                </a>
                <a className="aside-channel" href={member.linkedin}>
                  <Icon name="linkedin" size={14} />
                  <span>LinkedIn profile</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ "Other advocates" ============ */}
      <section className="member-others">
        <div className="container">
          <div className="member-others__head">
            <div className="eyebrow eyebrow--centered">Also on the bench</div>
            <h2>
              More <span className="accent">advocates</span> at the firm.
            </h2>
          </div>

          <div className="member-others__grid">
            {others.map((m) => {
              const src = resolveTeamPhoto(m.photo)
              return (
                <Link
                  key={m.slug}
                  to={`/team/${m.slug}`}
                  className="member-others__card"
                >
                  <div className="member-others__photo">
                    {src ? (
                      <img src={src} alt={m.name} />
                    ) : (
                      <span className="member-others__initials">{m.initials}</span>
                    )}
                  </div>
                  <div className="member-others__info">
                    <div className="member-others__role">{m.role}</div>
                    <div className="member-others__name">{m.name}</div>
                    <div className="member-others__arrow">
                      View profile <Icon name="arrow" size={12} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="member-cta-section">
        <div className="container">
          <motion.div
            className="member-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="member-cta__rings" aria-hidden>
              <span className="member-cta__ring member-cta__ring--a" />
              <span className="member-cta__ring member-cta__ring--b" />
            </div>

            <div className="member-cta__text">
              <div className="eyebrow" style={{ color: 'var(--gold-300)' }}>
                Ready to begin
              </div>
              <h2>
                Talk to <span className="accent">{member.firstName}</span> this week.
              </h2>
              <p>
                A free 30-minute consultation — call, video or in-person. {member.firstName}{' '}
                will tell you honestly whether you need a lawyer, or just clarity.
              </p>
            </div>

            <div className="member-cta__actions">
              <MagneticButton
                href={`mailto:${member.email}`}
                className="btn btn--primary"
                strength={0.25}
              >
                Email {member.firstName} <Icon name="arrow" />
              </MagneticButton>
              <Link to="/#contact" className="btn btn--ghost member-cta__ghost">
                Use the contact form
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
