import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Icon from '../ui/Icon'
import { searchItems, groupByType, TYPE_LABEL_KEYS } from './searchIndex'
import './CommandPalette.css'

export default function CommandPalette({ isOpen, onClose, items, onSelect }) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef  = useRef(null)

  /* Filter + group memoised together — both react to query alone. */
  const { flat, groups } = useMemo(() => {
    const filtered = searchItems(items, query, t)
    return { flat: filtered, groups: groupByType(filtered) }
  }, [items, query, t])

  /* Reset state every time the palette opens; lock body scroll while open. */
  useEffect(() => {
    if (!isOpen) return
    setQuery('')
    setActiveIndex(0)
    const t = setTimeout(() => inputRef.current?.focus(), 30)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  /* Keep activeIndex within bounds as the result set changes. */
  useEffect(() => {
    if (activeIndex > flat.length - 1) setActiveIndex(Math.max(0, flat.length - 1))
  }, [flat.length, activeIndex])

  /* Scroll the highlighted result into view. */
  useEffect(() => {
    if (!isOpen) return
    const el = listRef.current?.querySelector(`[data-idx="${activeIndex}"]`)
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, isOpen])

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const item = flat[activeIndex]
      if (item) onSelect(item)
      return
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cmdk-scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <motion.div
            className="cmdk"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Quick search"
            aria-modal="true"
          >
            <div className="cmdk__head">
              <Icon name="search" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t('cmdk.placeholder')}
                spellCheck="false"
                autoComplete="off"
              />
              <button type="button" className="cmdk__esc" onClick={onClose} aria-label={t('cmdk.close')}>
                Esc
              </button>
            </div>

            <div className="cmdk__list" ref={listRef}>
              {flat.length === 0 ? (
                <div className="cmdk__empty">
                  <Icon name="search" size={28} />
                  <strong>{t('cmdk.noMatches', { query })}</strong>
                  <p>{t('cmdk.noMatchesHint')}</p>
                </div>
              ) : (
                groups.map((group) => {
                  const baseIdx = flat.indexOf(group.items[0])
                  return (
                    <div key={group.type} className="cmdk__section">
                      <div className="cmdk__section-label">{t(TYPE_LABEL_KEYS[group.type])}</div>
                      <ul>
                        {group.items.map((item, i) => {
                          const idx = baseIdx + i
                          const isActive = idx === activeIndex
                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                data-idx={idx}
                                className={`cmdk__item ${isActive ? 'is-active' : ''}`}
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => onSelect(item)}
                              >
                                <span className="cmdk__icon">
                                  <Icon name={item.icon} size={16} />
                                </span>
                                <span className="cmdk__meta">
                                  <strong>{item.titleKey ? t(item.titleKey) : item.title}</strong>
                                  {(item.subtitleKey || item.subtitle) && (
                                    <small>{item.subtitleKey ? t(item.subtitleKey) : item.subtitle}</small>
                                  )}
                                </span>
                                <span className="cmdk__hint" aria-hidden>
                                  {isActive && <Icon name="arrow" size={14} />}
                                </span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })
              )}
            </div>

            <div className="cmdk__foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> {t('cmdk.navigate')}</span>
              <span><kbd>↵</kbd> {t('cmdk.select')}</span>
              <span><kbd>esc</kbd> {t('cmdk.close')}</span>
              <span className="cmdk__foot-end">
                {t('cmdk.results', { count: flat.length })}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
