import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Icon from '../ui/Icon'
import { SUPPORTED } from '../../i18n/config'
import './LanguageToggle.css'

export default function LanguageToggle() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const active = SUPPORTED.find((l) => l.id === i18n.language) ?? SUPPORTED[0]

  return (
    <div className="lang-toggle" ref={rootRef}>
      <button
        type="button"
        className={`lang-toggle__btn ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t('lang.switchTo')}
        title={active.label}
      >
        <span className="lang-toggle__short">{active.short}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lang-toggle__menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="menu"
          >
            <div className="lang-toggle__head">
              <strong>{t('lang.title')}</strong>
              <small>{t('lang.subtitle')}</small>
            </div>
            <ul>
              {SUPPORTED.map((l) => {
                const isActive = l.id === i18n.language
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      className={`lang-toggle__item ${isActive ? 'is-active' : ''}`}
                      onClick={() => { i18n.changeLanguage(l.id); setOpen(false) }}
                    >
                      <span className="lang-toggle__code">{l.short}</span>
                      <span className="lang-toggle__label">{l.label}</span>
                      {isActive && <Icon name="check" size={14} />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
