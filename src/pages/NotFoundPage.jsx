import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import Icon from '../components/ui/Icon'
import './NotFoundPage.css'

const QUICK_LINKS = [
  { label: 'About',          to: '/#about' },
  { label: 'Practice areas', to: '/#practice' },
  { label: 'How we work',    to: '/#process' },
  { label: 'Advocates',      to: '/#team' },
  { label: 'Contact',        to: '/#contact' },
]

export default function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <main className="nf">
      <div className="nf__bg" aria-hidden>
        <div className="nf__gradient" />
        <div className="nf__grid" />
        <div className="nf__beam" />
        <div className="nf__orb nf__orb--a" />
        <div className="nf__orb nf__orb--b" />
      </div>

      <div className="container nf__inner">
        <motion.div
          className="nf__tag"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="nf__tag-pulse" />
          <span>HTTP 404 · Not found</span>
        </motion.div>

        {/* Rotating seal with static 404 */}
        <motion.div
          className="nf__seal"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <svg className="nf__seal-rotor" viewBox="0 0 200 200">
            <defs>
              <path
                id="nf-seal-circle"
                d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
              />
            </defs>
            <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
            <circle cx="100" cy="100" r="64" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" strokeDasharray="2 4" />
            <text className="nf__seal-text" fontSize="11">
              <textPath href="#nf-seal-circle" startOffset="0">
                CASE NOT FOUND · OFF THE DOCKET · ERROR 404 · CASE NOT FOUND ·
              </textPath>
            </text>
          </svg>

          {/* Static "404" in the middle */}
          <span className="nf__seal-num">404</span>
          <span className="nf__seal-halo" />
        </motion.div>

        <motion.h1
          className="nf__title"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          Off the <span className="accent">docket.</span>
        </motion.h1>

        <motion.p
          className="nf__lead"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          We searched the records — that page isn't in our files. The URL may have moved,
          or never existed. Try one of the quick links below, or head back to the home page.
        </motion.p>

        {pathname && pathname !== '/' && (
          <motion.div
            className="nf__url"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Icon name="file" size={12} />
            <code>{pathname}</code>
          </motion.div>
        )}

        <motion.div
          className="nf__actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <Link to="/" className="btn btn--primary">
            Back to home <Icon name="arrow" />
          </Link>
          <Link to="/#contact" className="btn btn--ghost nf__ghost">
            Contact us
          </Link>
        </motion.div>

        <motion.div
          className="nf__quick"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <span className="nf__quick-label">Quick links</span>
          <ul className="nf__quick-list">
            {QUICK_LINKS.map((l, i) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
                {i < QUICK_LINKS.length - 1 && (
                  <span className="nf__quick-dot" aria-hidden>·</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </main>
  )
}
