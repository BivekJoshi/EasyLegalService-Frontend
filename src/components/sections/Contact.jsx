import React, { useState } from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon'
import { CONTACT } from '../../data/nav'
import { PRACTICE_AREAS } from '../../data/practice'
import './Contact.css'

const ROWS = [
  { icon: 'pin',   label: 'Office', value: CONTACT.address },
  { icon: 'phone', label: 'Phone',  value: `${CONTACT.phone}  ·  +977 98XX-XXXXXX` },
  { icon: 'mail',  label: 'Email',  value: CONTACT.email },
  { icon: 'clock', label: 'Hours',  value: CONTACT.hours },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    e.currentTarget.reset()
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" className="section section--cream contact-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow eyebrow--centered">Get in touch</div>
          <h2>Tell us about <span className="accent">your matter.</span></h2>
          <p>Send a quick brief and we will respond within one business day with a clear next step.</p>
        </div>

        <div className="contact__grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h3 style={{ color: 'var(--navy-900)', marginBottom: 8 }}>Reach us directly</h3>
            <p style={{ color: 'var(--muted)' }}>
              Walk-ins welcome by appointment. For urgent matters outside office hours,
              call the after-hours line or message us on WhatsApp.
            </p>
            <div className="contact__info">
              {ROWS.map((r, i) => (
                <motion.div
                  key={r.label}
                  className="contact__row"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <span className="contact__icon"><Icon name={r.icon} /></span>
                  <div>
                    <h4>{r.label}</h4>
                    <p>{r.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {sent && (
              <div className="form__success">
                <Icon name="check" />
                Thank you — your message is in. We will reply within one business day.
              </div>
            )}

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
              <label htmlFor="f-area">Practice area</label>
              <select id="f-area" name="area" defaultValue="">
                <option value="" disabled>Select a practice area</option>
                {PRACTICE_AREAS.map((a) => <option key={a.title}>{a.title}</option>)}
                <option>Other / Not sure</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="f-msg">Brief description</label>
              <textarea id="f-msg" name="message" required rows={4} placeholder="A short summary of what you need help with…" />
            </div>

            <button className="btn btn--primary form__submit" type="submit">
              Send brief <Icon name="arrow" />
            </button>
            <div className="form__note">
              By submitting you agree to our confidentiality undertaking. No legal relationship is formed until we send an engagement letter.
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
