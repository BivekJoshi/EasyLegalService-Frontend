import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Icon from '../ui/Icon'
import { useTheme } from './useTheme'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  /* Close on outside click. */
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const active = themes.find((tm) => tm.id === theme) ?? themes[0]
  const activeName = t(`theme.${active.id}.name`)

  return (
    <div className="theme-toggle" ref={rootRef}>
      <button
        type="button"
        className={`theme-toggle__btn ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${t('theme.title')}: ${activeName}`}
        title={activeName}
      >
        <Icon name="palette" size={18} />
        <span className="theme-toggle__swatches" aria-hidden>
          {active.swatches.map((c, i) => (
            <span key={i} style={{ background: c }} />
          ))}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="theme-toggle__menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="menu"
          >
            <div className="theme-toggle__head">
              <strong>{t('theme.title')}</strong>
              <small>{t('theme.subtitle')}</small>
            </div>
            <div className="theme-toggle__grid">
              {themes.map((tm) => {
                const isActive = tm.id === theme
                const name = t(`theme.${tm.id}.name`)
                const description = t(`theme.${tm.id}.description`)
                return (
                  <button
                    key={tm.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isActive}
                    className={`theme-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => { setTheme(tm.id); setOpen(false) }}
                  >
                    <span className="theme-card__preview" data-mood={tm.mood}>
                      <span className="theme-card__bar" style={{ background: tm.swatches[0] }} />
                      <span className="theme-card__chip theme-card__chip--a" style={{ background: tm.swatches[2] }} />
                      <span className="theme-card__chip theme-card__chip--b" style={{ background: tm.swatches[1] }} />
                      <span className="theme-card__chip theme-card__chip--c" style={{ background: tm.swatches[2], opacity: 0.4 }} />
                    </span>
                    <span className="theme-card__meta">
                      <span className="theme-card__name">
                        {name}
                        {tm.mood === 'dark' && (
                          <span className="theme-card__pill"><Icon name="moon" size={10} /> {t('theme.dark')}</span>
                        )}
                        {isActive && <Icon name="check" size={14} className="theme-card__tick" />}
                      </span>
                      <small>{description}</small>
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
