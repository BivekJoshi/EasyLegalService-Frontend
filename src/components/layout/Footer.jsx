import React from 'react'
import Icon from '../ui/Icon'
import { CONTACT } from '../../data/nav'
import { PRACTICE_AREAS } from '../../data/practice'
import './Footer.css'

const FIRM_LINKS = [
  { label: 'About us',       href: '#about' },
  { label: 'Our advocates',  href: '#team' },
  { label: 'How we work',    href: '#process' },
  { label: 'Contact',        href: '#contact' },
  { label: 'Careers',        href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__deco" aria-hidden>
        <span className="footer__orb footer__orb--a" />
        <span className="footer__orb footer__orb--b" />
      </div>

      <div className="container footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <a className="brand" href="#home">
              <span className="brand__mark">
                <Icon name="scales" />
              </span>
              <span className="brand__text">
                <span className="brand__name" style={{ color: '#fff' }}>Easy Legal</span>
                <span className="brand__sub">Advocates · Kathmandu</span>
              </span>
            </a>
            <p className="footer__tagline">
              A modern Nepali law firm helping individuals and businesses navigate the law with
              clarity, speed and fair pricing.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" /></a>
              <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
              <a href="#" aria-label="Twitter"><Icon name="twitter" /></a>
              <a href="#" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
            </div>
          </div>

          <div>
            <h4>Practice</h4>
            <ul>
              {PRACTICE_AREAS.slice(0, 5).map((a) => (
                <li key={a.title}><a href="#practice">{a.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Firm</h4>
            <ul>
              {FIRM_LINKS.map((l) => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li>{CONTACT.address}</li>
              <li>{CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Easy Legal Service. All rights reserved.</span>
          <span className="footer__legal">
            <a href="#">Privacy</a>
            <span>·</span>
            <a href="#">Terms</a>
            <span>·</span>
            <a href="#">Disclaimer</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
