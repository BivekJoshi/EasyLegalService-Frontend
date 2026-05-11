import React from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import MagneticButton from '../ui/MagneticButton'
import { CONTACT } from '../../data/nav'
import './CTA.css'

const GUARANTEES = [
  'Free 30-min consultation',
  'No obligation',
  'NDA-backed',
  'Same-day response',
]

const CONTACT_METHODS = [
  {
    icon: 'phone',
    cap: 'Call us',
    strong: CONTACT.phone,
    href: `tel:${CONTACT.phoneTel}`,
  },
  {
    icon: 'whatsapp',
    cap: 'WhatsApp',
    strong: 'Reply within an hour',
    href: 'https://wa.me/97714000000',
  },
  {
    icon: 'mail',
    cap: 'Email',
    strong: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
]

export default function CTA() {
  return (
    <section className="section cta-section">
      <div className="container">
        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background decorations */}
          <div className="cta__bg" aria-hidden>
            <div className="cta__ring cta__ring--a" />
            <div className="cta__ring cta__ring--b" />
            <div className="cta__ring cta__ring--c" />
            <div className="cta__glow" />
            <div className="cta__grid-bg" />
          </div>

          <div className="cta__grid">
            {/* LEFT — copy + primary action */}
            <div className="cta__left">
              <div className="cta__badge">
                <span className="cta__badge-pulse" /> 3 advisors online · Open until 18:00
                NPT
              </div>

              <h2 className="cta__title">
                Ready to begin?
                <br />
                <em>Your matter starts here.</em>
              </h2>

              <p className="cta__lead">
                30-minute consultation, no obligation. We will tell you honestly whether you
                need a lawyer — or just clarity.
              </p>

              <div className="cta__actions">
                <MagneticButton
                  href="#contact"
                  className="btn btn--primary cta__primary"
                  strength={0.3}
                >
                  Book free consultation <Icon name="arrow" />
                </MagneticButton>
                <a className="btn btn--ghost cta__ghost" href={`tel:${CONTACT.phoneTel}`}>
                  <Icon name="phone" /> {CONTACT.phone}
                </a>
              </div>

              <ul className="cta__guarantees">
                {GUARANTEES.map((g) => (
                  <li key={g}>
                    <span className="cta__check">
                      <Icon name="check" size={11} />
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — contact card */}
            <motion.div
              className="cta__card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="cta__card-head">
                <span className="cta__card-dot" />
                <span className="cta__card-status">Available now</span>
                <span className="cta__card-time">
                  <Icon name="clock" size={12} /> Sun – Fri · 9:30 – 18:00
                </span>
              </div>

              <div className="cta__card-body">
                <span className="cta__card-label">Reach us via</span>

                {CONTACT_METHODS.map((m) => (
                  <a key={m.cap} className="cta__contact" href={m.href}>
                    <span className="cta__contact-icon">
                      <Icon name={m.icon} size={16} />
                    </span>
                    <span className="cta__contact-text">
                      <span className="cta__contact-cap">{m.cap}</span>
                      <span className="cta__contact-strong">{m.strong}</span>
                    </span>
                    <Icon name="arrow" size={14} className="cta__contact-arrow" />
                  </a>
                ))}
              </div>

              <div className="cta__card-foot">
                <Icon name="pin" size={13} />
                <span>{CONTACT.address}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
