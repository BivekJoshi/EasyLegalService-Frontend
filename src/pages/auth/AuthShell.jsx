import { Link, Outlet } from 'react-router-dom'
import { motion } from 'motion/react'
import Icon from '../../components/ui/Icon'
import './auth.css'

const HIGHLIGHTS = [
  'Centralised client & matter records',
  'One-click document generation',
  'Audit trail on every signature',
]

export default function AuthShell() {
  return (
    <main className="auth">
      {/* Brand panel */}
      <aside className="auth__panel" aria-hidden>
        <div className="auth__bg">
          <div className="auth__grid" />
          <div className="auth__orb auth__orb--a" />
          <div className="auth__orb auth__orb--b" />
          <div className="auth__beam" />
        </div>

        <div className="auth__panel-inner">
          <Link to="/" className="auth__brand">
            <span className="auth__brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v18" />
                <path d="M5 21h14" />
                <path d="M5 7h14" />
                <path d="M5 7l-3 7a4 4 0 0 0 8 0L7 7" />
                <path d="M19 7l-3 7a4 4 0 0 0 8 0L21 7" />
              </svg>
            </span>
            <span>
              <strong>Easy Legal</strong>
              <small>Advocates · Kathmandu</small>
            </span>
          </Link>

          <motion.div
            className="auth__pitch"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow">Counsel workspace</div>
            <h1>
              The chamber, <span className="accent">organised.</span>
            </h1>
            <p>
              A quiet workspace for advocates — capture matters, generate
              briefs, and keep every record in one trusted ledger.
            </p>

            <ul className="auth__bullets">
              {HIGHLIGHTS.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                >
                  <span className="auth__bullet-dot"><Icon name="check" size={12} /></span>
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="auth__foot">
            <span>© {new Date().getFullYear()} Easy Legal Advocates</span>
            <Link to="/" className="auth__back">
              <Icon name="arrow" size={14} className="auth__back-arrow" />
              Back to site
            </Link>
          </div>
        </div>
      </aside>

      {/* Form pane */}
      <section className="auth__form-wrap">
        <Link to="/" className="auth__form-back">
          <Icon name="arrow" size={14} className="auth__back-arrow" />
          Back to site
        </Link>
        <div className="auth__form-inner">
          <Outlet />
        </div>
      </section>
    </main>
  )
}
