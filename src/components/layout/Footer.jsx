import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon'
import { CONTACT } from '../../data/nav'
import { PRACTICE_AREAS } from '../../data/practice'
import { getLenis } from '../../hooks/useLenis'
import './Footer.css'

const FIRM_LINKS = [
  { label: 'About us',      href: '#about' },
  { label: 'Our advocates', href: '#team' },
  { label: 'How we work',   href: '#process' },
  { label: 'Contact',       href: '#contact' },
  { label: 'Careers',       href: '#contact' },
]

const MEMBERSHIPS = [
  'Nepal Bar Association',
  'ICA Nepal',
  'SAARCLAW',
  'Chambers Asia-Pacific',
  'Asialaw Profiles',
]

/* Smart anchor: when on a sub-route, route to "/" + hash so the section
 * scroll happens after the home page mounts. */
function useAnchorNavigate() {
  const location = useLocation()
  const navigate = useNavigate()
  return (href) => (e) => {
    if (!href?.startsWith('#') || href.length < 2) return
    if (location.pathname === '/') return
    e.preventDefault()
    navigate('/' + href)
  }
}

function scrollToTop() {
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer() {
  const navigateAnchor = useAnchorNavigate()
  const year = new Date().getFullYear()

  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="footer">
      {/* Decorations */}
      <div className="footer__top-accent" aria-hidden />
      <div className="footer__deco" aria-hidden>
        <span className="footer__orb footer__orb--a" />
        <span className="footer__orb footer__orb--b" />
        <div className="footer__grid-bg" />
      </div>

      <div className="container footer__inner">
        {/* ============ Main grid ============ */}
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link
              to="/"
              className="brand"
              onClick={navigateAnchor('#home')}
            >
              <span className="brand__mark">
                <Icon name="scales" />
              </span>
              <span className="brand__text">
                <span className="brand__name" style={{ color: '#fff' }}>Easy Legal</span>
                <span className="brand__sub">Advocates · Kathmandu</span>
              </span>
            </Link>

            <p className="footer__tagline">
              A modern Nepali law firm helping individuals and businesses navigate the law
              with clarity, speed and fair pricing.
            </p>

            <div className="footer__bilingual">
              <Icon name="globe" size={14} />
              <span>
                Bilingual practice · <strong>English</strong> · <strong>नेपाली</strong>
              </span>
            </div>

            <div className="footer__social">
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" /></a>
              <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
              <a href="#" aria-label="Twitter"><Icon name="twitter" /></a>
              <a href="#" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
            </div>
          </div>

          {/* Practice */}
          <div className="footer__col">
            <h4>Practice</h4>
            <ul>
              {PRACTICE_AREAS.slice(0, 5).map((a) => (
                <li key={a.title}>
                  <a href="#practice" onClick={navigateAnchor('#practice')}>
                    {a.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#practice"
                  onClick={navigateAnchor('#practice')}
                  className="footer__more"
                >
                  All practice areas <Icon name="arrow" size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Firm */}
          <div className="footer__col">
            <h4>Firm</h4>
            <ul>
              {FIRM_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={navigateAnchor(l.href)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col footer__col--contact">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`tel:${CONTACT.phoneTel}`} className="footer__contact-row">
                  <span className="footer__contact-icon">
                    <Icon name="phone" size={12} />
                  </span>
                  <span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="footer__contact-row">
                  <span className="footer__contact-icon">
                    <Icon name="mail" size={12} />
                  </span>
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <span className="footer__contact-row footer__contact-row--static">
                  <span className="footer__contact-icon">
                    <Icon name="pin" size={12} />
                  </span>
                  <span>{CONTACT.address}</span>
                </span>
              </li>
              <li>
                <span className="footer__contact-row footer__contact-row--static">
                  <span className="footer__contact-icon">
                    <Icon name="clock" size={12} />
                  </span>
                  <span>{CONTACT.hours}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ============ Memberships strip ============ */}
        <div className="footer__memberships">
          <span className="footer__memberships-label">
            <Icon name="shield" size={11} />
            Member of
          </span>
          <div className="footer__memberships-list">
            {MEMBERSHIPS.map((m, i) => (
              <React.Fragment key={m}>
                <span className="footer__membership">{m}</span>
                {i < MEMBERSHIPS.length - 1 && (
                  <span className="footer__membership-dot" aria-hidden>·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ============ Bottom row ============ */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <span>© {year} Easy Legal Service</span>
            <span className="footer__bottom-sep" aria-hidden>·</span>
            <span>Est. <strong>MMX</strong></span>
            <span className="footer__bottom-sep" aria-hidden>·</span>
            <span>Made in Kathmandu, Nepal</span>
          </div>
          <nav className="footer__legal" aria-label="Legal">
            <a href="#">Privacy</a>
            <span aria-hidden>·</span>
            <a href="#">Terms</a>
            <span aria-hidden>·</span>
            <a href="#">Disclaimer</a>
          </nav>
        </div>
      </div>

      {/* Floating back-to-top */}
      <button
        className={`footer__top-btn ${showTop ? 'is-visible' : ''}`}
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <Icon name="arrowUp" />
      </button>
    </footer>
  )
}
