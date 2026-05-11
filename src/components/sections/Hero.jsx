import React, { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Icon from '../ui/Icon'
import MagneticButton from '../ui/MagneticButton'
import './Hero.css'

const HeroScene = lazy(() => import('../three/HeroScene'))

const HEAD_LEAD = ['Trusted', 'legal', 'counsel,']
const HEAD_TAIL = ['delivered', 'with']
const ROTATING  = ['clarity', 'conviction', 'integrity']

const PRACTICE_CHIPS = ['Corporate', 'Foreign Investment', 'Tax', 'Disputes', 'IP', 'Real Estate']

const AWARDS = ['Chambers Asia-Pacific', 'Asialaw Profiles', 'Legal 500', 'Benchmark Litigation']

const wordVariants = {
  hidden: { opacity: 0, y: '110%', rotate: 3 },
  show:   { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const [rot, setRot] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setRot((i) => (i + 1) % ROTATING.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden>
        <div className="hero__gradient" />
        <div className="hero__grid" />
        <div className="hero__beam" />
        <div className="hero__ornament hero__ornament--l" />
        <div className="hero__ornament hero__ornament--r" />
      </div>

      {/* Decorative vertical side-mark */}
      <div className="hero__side-mark" aria-hidden>
        <span>EST · MMX · KATHMANDU · NEPAL</span>
      </div>

      <div className="container hero__inner">
        {/* ============= LEFT — copy ============= */}
        <div className="hero__copy">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="hero__badge-seal" aria-hidden>
              <Icon name="scales" size={14} />
            </span>
            <span>Established 2010 · Putalisadak, Kathmandu</span>
            <span className="hero__badge-dot" />
            <span className="hero__badge-live">
              <span className="hero__badge-pulse" /> Open today
            </span>
          </motion.div>

          <h1 className="hero__headline">
            <motion.span
              className="hero__line"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1, delayChildren: 0.25 }}
            >
              {HEAD_LEAD.map((w, i) => (
                <span key={i} className="hero__word-wrap">
                  <motion.span className="hero__word" variants={wordVariants}>
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </motion.span>

            <motion.span
              className="hero__line"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1, delayChildren: 0.55 }}
            >
              {HEAD_TAIL.map((w, i) => (
                <span key={i} className="hero__word-wrap">
                  <motion.span className="hero__word" variants={wordVariants}>
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
              <span className="hero__rotator" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING[rot]}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-110%', opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {ROTATING[rot]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
          </h1>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
          >
            A modern Nepali law firm advising founders, family businesses and global investors
            on corporate, foreign investment, tax, IP and dispute matters — with a senior
            advocate on every brief.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <MagneticButton href="#contact" className="btn btn--primary" strength={0.25}>
              Book a consultation <Icon name="arrow" />
            </MagneticButton>
            <a className="btn btn--ghost hero__btn-ghost" href="#practice">
              Our practice areas
            </a>
          </motion.div>

          {/* Practice chips */}
          <motion.div
            className="hero__chips"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 1.3 } } }}
          >
            <span className="hero__chips-label">Focus areas</span>
            {PRACTICE_CHIPS.map((c) => (
              <motion.a
                key={c}
                href="#practice"
                className="hero__chip"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                {c}
              </motion.a>
            ))}
          </motion.div>

          {/* Credentials row */}
          <motion.ul
            className="hero__creds"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <li>
              <span className="hero__creds-num">15+</span>
              <span className="hero__creds-label">Years in practice</span>
            </li>
            <li>
              <span className="hero__creds-num">1,200+</span>
              <span className="hero__creds-label">Matters resolved</span>
            </li>
            <li>
              <span className="hero__creds-stars" aria-label="4.9 out of 5">
                {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={14} />)}
              </span>
              <span className="hero__creds-label">4.9 · 200+ reviews</span>
            </li>
          </motion.ul>

          {/* Awards / recognition */}
          <motion.div
            className="hero__awards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.75 }}
          >
            <span className="hero__awards-label">Recognised in</span>
            <div className="hero__awards-list">
              {AWARDS.map((a, i) => (
                <React.Fragment key={a}>
                  <span className="hero__awards-name">{a}</span>
                  {i < AWARDS.length - 1 && <span className="hero__dot">·</span>}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ============= RIGHT — 3D scales + accolade cards ============= */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__pedestal" aria-hidden />
          <div className="hero__halo" aria-hidden />

          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>

          {/* Rotating circular wax-seal stamp */}
          <svg className="hero__stamp" viewBox="0 0 200 200" aria-hidden>
            <defs>
              <path
                id="stamp-circle"
                d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
              />
            </defs>
            <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
            <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 4" />
            <text className="hero__stamp-text" fontSize="11">
              <textPath href="#stamp-circle" startOffset="0">
                EST · 2010 · KATHMANDU · NEPAL · ADVOCATES & COUNSEL ·
              </textPath>
            </text>
          </svg>

          {/* Floating accolade — top-left */}
          <motion.div
            className="hero__float hero__float--accolade"
            initial={{ opacity: 0, x: -20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero__float-icon"><Icon name="shield" size={18} /></span>
            <div className="hero__float-text">
              <span className="hero__float-cap">Ranked</span>
              <span className="hero__float-title">Chambers Asia‑Pacific 2024</span>
            </div>
          </motion.div>

          {/* Floating availability — bottom-left */}
          <motion.div
            className="hero__float hero__float--status"
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero__float-pulse" aria-hidden />
            <div className="hero__float-text">
              <span className="hero__float-cap">Available today</span>
              <span className="hero__float-title">3 advisors online · 1 hr response</span>
            </div>
          </motion.div>

          {/* Floating recent matter — top-right under the stamp */}
          <motion.div
            className="hero__float hero__float--matter"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero__float-cap">Recent matter</span>
            <span className="hero__float-title">Series A close · 6 weeks · NRB approved</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom notable-matters ribbon */}
      <motion.div
        className="hero__ribbon"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.85 }}
      >
        <span className="hero__ribbon-label">Notable matters</span>
        <span>Cross-border M&A · Sept 2024</span>
        <span className="hero__ribbon-sep">/</span>
        <span>IRD appeal win · Aug 2024</span>
        <span className="hero__ribbon-sep">/</span>
        <span>Trademark enforcement (apparel) · Jul 2024</span>
        <span className="hero__ribbon-sep">/</span>
        <span>FDI structuring, Singapore HoldCo · Jun 2024</span>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        className="hero__scroll"
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        aria-label="Scroll to next section"
      >
        <span>Scroll</span>
        <span className="hero__scroll-track">
          <span className="hero__scroll-dot" />
        </span>
      </motion.a>
    </section>
  )
}
