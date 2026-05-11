import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon'
import MagneticButton from '../ui/MagneticButton'
import { NAV_LINKS, CONTACT } from '../../data/nav'
import { PRACTICE_AREAS } from '../../data/practice'
import './Navbar.css'

/* Smart anchor: when on a sub-route, navigate to "/" first then scroll. */
function useAnchorNavigate() {
  const location = useLocation()
  const navigate = useNavigate()
  return (href) => (e) => {
    if (!href?.startsWith('#') || href.length < 2) return
    if (location.pathname === '/') return // let Lenis intercept handle smooth scroll
    e.preventDefault()
    navigate('/' + href)
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navigateAnchor = useAnchorNavigate()
  const [open, setOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })
  const linksRef = useRef(null)
  const megaTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const moveIndicator = (el) => {
    if (!el || !linksRef.current) return
    const parentRect = linksRef.current.getBoundingClientRect()
    const rect = el.getBoundingClientRect()
    setIndicator({ left: rect.left - parentRect.left, width: rect.width, visible: true })
  }
  const hideIndicator = () => setIndicator((s) => ({ ...s, visible: false }))

  const openMega = () => { clearTimeout(megaTimer.current); setMegaOpen(true) }
  const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(false), 140) }

  const close = () => setOpen(false)

  return (
    <>
      {/* Slim top bar */}
      <div className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__left">
            <a className="topbar__item" href={`tel:${CONTACT.phoneTel}`}>
              <Icon name="phone" /> {CONTACT.phone}
            </a>
            <a className="topbar__item topbar__item--email" href={`mailto:${CONTACT.email}`}>
              <Icon name="mail" /> {CONTACT.email}
            </a>
          </div>
          <div className="topbar__right">
            <span className="topbar__item"><Icon name="clock" /> {CONTACT.hours}</span>
            <a href="#" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
            <a href="#" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
          </div>
        </div>
      </div>

      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav__inner">
          {/* Animated brand */}
          <a
            className="brand"
            href="#home"
            onClick={(e) => { navigateAnchor('#home')(e); close() }}
          >
            <span className="brand__mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v18" />
                <path d="M5 21h14" />
                <path d="M5 7h14" />
                <path className="brand__pan brand__pan--l" d="M5 7l-3 7a4 4 0 0 0 8 0L7 7" />
                <path className="brand__pan brand__pan--r" d="M19 7l-3 7a4 4 0 0 0 8 0L21 7" />
              </svg>
            </span>
            <span className="brand__text">
              <span className="brand__name">Easy Legal</span>
              <span className="brand__sub">Advocates · Kathmandu</span>
            </span>
          </a>

          {/* Desktop links with sliding indicator */}
          <nav className="nav__center" onMouseLeave={hideIndicator}>
            <ul ref={linksRef} className="nav__links">
              <span
                className={`nav__indicator ${indicator.visible ? 'is-visible' : ''}`}
                style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
              />
              {NAV_LINKS.map((l) => (
                <li
                  key={l.href}
                  onMouseEnter={(e) => {
                    moveIndicator(e.currentTarget)
                    if (l.hasMega) openMega()
                  }}
                  onMouseLeave={l.hasMega ? closeMega : undefined}
                >
                  <a href={l.href} onClick={navigateAnchor(l.href)}>
                    {l.label}
                    {l.hasMega && <Icon name="arrowDn" size={12} />}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mega menu */}
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  className="mega"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <div className="mega__inner">
                    <div className="mega__head">
                      <div className="eyebrow">Practice areas</div>
                      <h3>End-to-end legal counsel.</h3>
                      <p>Eight focused practices — each staffed by domain specialists.</p>
                      <a
                        className="mega__cta"
                        href="#practice"
                        onClick={navigateAnchor('#practice')}
                      >
                        View all areas <Icon name="arrow" size={14} />
                      </a>
                    </div>
                    <div className="mega__grid">
                      {PRACTICE_AREAS.map((a, i) => (
                        <motion.a
                          key={a.title}
                          href="#practice"
                          onClick={navigateAnchor('#practice')}
                          className="mega__item"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.04 + i * 0.025, duration: 0.3 }}
                        >
                          <span className="mega__icon"><Icon name={a.icon} size={18} /></span>
                          <span className="mega__copy">
                            <strong>{a.title}</strong>
                            <small>{a.tags.join(' · ')}</small>
                          </span>
                          <Icon name="arrow" size={14} className="mega__arrow" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Right side actions */}
          <div className="nav__cta">
            <a className="nav__phone" href={`tel:${CONTACT.phoneTel}`}>
              <Icon name="phone" /> Call
            </a>
            <MagneticButton
              href="#contact"
              onClick={navigateAnchor('#contact')}
              className="btn btn--primary nav__book"
              strength={0.25}
            >
              Book consultation <Icon name="arrow" />
            </MagneticButton>
            <button
              className={`nav__toggle ${open ? 'is-open' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="nav__mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="nav__mobile-bg" aria-hidden>
                <div className="orb orb--gold" />
                <div className="orb orb--navy" />
              </div>

              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              >
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    variants={{
                      hidden: { opacity: 0, x: 40 },
                      show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                    }}
                  >
                    <a
                      href={l.href}
                      onClick={(e) => { navigateAnchor(l.href)(e); close() }}
                    >
                      <span className="nav__mobile-num">0{i + 1}</span>
                      {l.label}
                      <Icon name="arrow" size={18} />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="nav__mobile-foot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <a
                  className="btn btn--primary"
                  href="#contact"
                  onClick={(e) => { navigateAnchor('#contact')(e); close() }}
                >
                  Free consultation <Icon name="arrow" />
                </a>
                <a className="nav__mobile-link" href={`tel:${CONTACT.phoneTel}`}>
                  <Icon name="phone" /> {CONTACT.phone}
                </a>
                <a className="nav__mobile-link" href={`mailto:${CONTACT.email}`}>
                  <Icon name="mail" /> {CONTACT.email}
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
