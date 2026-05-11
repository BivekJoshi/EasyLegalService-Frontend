import React, { useState } from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import { CONTACT } from '../../data/nav'
import { PRACTICE_AREAS } from '../../data/practice'
import './Contact.css'

const NEXT_STEPS = [
  {
    title: 'We confirm receipt',
    text: 'A senior advocate reads your brief within one business hour.',
  },
  {
    title: '30-min consultation',
    text: 'We hold a free call, video or in-person consult to scope the matter.',
  },
  {
    title: 'Written plan',
    text: 'You receive an engagement letter — scope, fixed fee and timeline.',
  },
]

const CHANNELS = [
  {
    icon: 'phone',
    cap: 'Call us',
    strong: CONTACT.phone,
    sub: 'Sun – Fri · 9:30 – 18:00 NPT',
    href: `tel:${CONTACT.phoneTel}`,
  },
  {
    icon: 'whatsapp',
    cap: 'WhatsApp',
    strong: 'Reply within an hour',
    sub: '24 / 7 for urgent matters',
    href: 'https://wa.me/97714000000',
  },
  {
    icon: 'mail',
    cap: 'Email',
    strong: CONTACT.email,
    sub: 'NDA-backed on every brief',
    href: `mailto:${CONTACT.email}`,
  },
]

const MAX_MSG = 600

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [area, setArea] = useState('')
  const [msgLen, setMsgLen] = useState(0)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    e.currentTarget.reset()
    setArea('')
    setMsgLen(0)
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <section id="contact" className="section section--cream contact-section">
      <div className="contact__deco" aria-hidden>
        <div className="contact__orb contact__orb--a" />
        <div className="contact__orb contact__orb--b" />
      </div>

      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">Get in touch</div>
          <h2>
            Tell us about <span className="accent">your matter.</span>
          </h2>
          <p>
            Send a quick brief and we will respond within one business day with a clear next
            step. Confidentiality is automatic.
          </p>
        </div>

        <div className="contact__grid">
          {/* ============ LEFT — info column ============ */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Office card with map-pattern background */}
            <div className="office-card">
              <div className="office-card__map" aria-hidden>
                <span className="office-card__pin">
                  <Icon name="pin" />
                </span>
                <span className="office-card__pulse" />
              </div>
              <div className="office-card__body">
                <div className="office-card__cap">Visit our office</div>
                <h3 className="office-card__title">Putalisadak, Kathmandu</h3>
                <p className="office-card__addr">
                  Nepal Bar Building, 4th Floor<br />
                  Kathmandu 44600, Nepal
                </p>
                <a
                  className="office-card__link"
                  href="https://maps.google.com/?q=Putalisadak+Kathmandu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions <Icon name="arrow" size={13} />
                </a>
              </div>
            </div>

            {/* Channel rows */}
            <div className="channels">
              {CHANNELS.map((c) => (
                <a key={c.cap} className="channel" href={c.href}>
                  <span className="channel__icon">
                    <Icon name={c.icon} size={18} />
                  </span>
                  <div className="channel__body">
                    <span className="channel__cap">{c.cap}</span>
                    <span className="channel__strong">{c.strong}</span>
                    <span className="channel__sub">{c.sub}</span>
                  </div>
                  <Icon name="arrow" size={14} className="channel__arrow" />
                </a>
              ))}
            </div>

            {/* What happens next */}
            <div className="next-steps">
              <div className="next-steps__head">
                <span className="next-steps__seal">
                  <Icon name="check" size={13} />
                </span>
                <div>
                  <span className="next-steps__cap">What happens next</span>
                  <span className="next-steps__strong">From your brief to engagement</span>
                </div>
              </div>
              <ol className="next-steps__list">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s.title}>
                    <span className="next-steps__num">0{i + 1}</span>
                    <div>
                      <span className="next-steps__title">{s.title}</span>
                      <span className="next-steps__text">{s.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* ============ RIGHT — form column ============ */}
          <motion.form
            className="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="form__head">
              <div>
                <span className="form__head-cap">Send a brief</span>
                <h3 className="form__head-title">It takes about 2 minutes.</h3>
              </div>
              <span className="form__head-meta">
                <span className="form__head-dot" /> Open now
              </span>
            </div>

            {sent && (
              <motion.div
                className="form__success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="form__success-icon">
                  <Icon name="check" />
                </span>
                <div>
                  <strong>Brief received.</strong>
                  <span>We'll reply within one business day with next steps.</span>
                </div>
              </motion.div>
            )}

            {/* Practice area — chip picker */}
            <div className="field">
              <label>What can we help with?</label>
              <div className="form__chips">
                {PRACTICE_AREAS.map((a) => (
                  <button
                    key={a.title}
                    type="button"
                    className={`form__chip ${area === a.title ? 'is-active' : ''}`}
                    onClick={() => setArea(a.title)}
                    aria-pressed={area === a.title}
                  >
                    {a.title}
                  </button>
                ))}
                <button
                  type="button"
                  className={`form__chip ${area === 'Other' ? 'is-active' : ''}`}
                  onClick={() => setArea('Other')}
                  aria-pressed={area === 'Other'}
                >
                  Other / Not sure
                </button>
              </div>
              <input type="hidden" name="area" value={area} />
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="f-name">Full name</label>
                <input id="f-name" name="name" type="text" required placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="f-phone">Phone</label>
                <input id="f-phone" name="phone" type="tel" required placeholder="+977 98XX-XXXXXX" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="f-email">Email</label>
              <input id="f-email" name="email" type="email" required placeholder="you@example.com" />
            </div>

            <div className="field">
              <div className="field__label-row">
                <label htmlFor="f-msg">Brief description</label>
                <span className={`field__counter ${msgLen >= MAX_MSG ? 'is-max' : ''}`}>
                  {msgLen} / {MAX_MSG}
                </span>
              </div>
              <textarea
                id="f-msg"
                name="message"
                required
                rows={4}
                maxLength={MAX_MSG}
                placeholder="A short summary of what you need help with… include any deadlines, parties involved, and what outcome you're seeking."
                onChange={(e) => setMsgLen(e.target.value.length)}
              />
            </div>

            <div className="form__trust">
              <span><Icon name="shield" size={12} /> End-to-end encrypted</span>
              <span><Icon name="clock" size={12} /> 1 business day reply</span>
              <span><Icon name="file" size={12} /> NDA-backed</span>
            </div>

            <button className="btn btn--primary form__submit" type="submit">
              Send brief <Icon name="arrow" />
            </button>

            <div className="form__note">
              By submitting you agree to our confidentiality undertaking. No legal
              relationship is formed until we send an engagement letter.
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
