import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Icon from '../../components/ui/Icon'
import { SECTIONS } from './Sidebar/nav'
import './Breadcrumbs.css'

/* Build a path → { labelKey, icon } map from the sidebar config once.
 * Adding a route in nav.js automatically gives it a labeled crumb. */
const ROUTE_INFO = (() => {
  const map = new Map()
  const walk = (item) => {
    if (item.to) map.set(item.to, { labelKey: item.labelKey, icon: item.icon })
    if (item.children) item.children.forEach(walk)
  }
  SECTIONS.forEach((section) => section.items.forEach(walk))
  return map
})()

/* Translation keys for path segments that aren't sidebar routes. */
const SEGMENT_KEYS = {
  app: 'section.workspace',
  new: 'common.new',
  edit: 'common.edit',
}

function humanize(segment) {
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ')
}

function buildCrumbs(pathname) {
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = []
  let cumulative = ''

  segments.forEach((seg, i) => {
    cumulative += '/' + seg
    const isLast = i === segments.length - 1

    let info
    /* /app reads as "Workspace" when it's not the leaf. */
    if (seg === 'app' && !isLast) {
      info = { labelKey: 'section.workspace', icon: 'grid' }
    } else if (ROUTE_INFO.has(cumulative)) {
      info = ROUTE_INFO.get(cumulative)
    } else {
      info = { labelKey: SEGMENT_KEYS[seg], label: humanize(seg) }
    }

    crumbs.push({ to: cumulative, ...info, isLast })
  })

  return crumbs
}

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const crumbs = buildCrumbs(pathname)
  if (crumbs.length === 0) return null

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) => {
          const label = c.labelKey ? t(c.labelKey, { defaultValue: c.label }) : c.label
          return (
            <motion.li
              key={c.to}
              className="crumbs__item"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 * i, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {c.isLast ? (
                <span className="crumbs__crumb crumbs__crumb--current" aria-current="page">
                  {c.icon && <Icon name={c.icon} size={11} />}
                  <span>{label}</span>
                </span>
              ) : (
                <Link to={c.to} className="crumbs__crumb crumbs__crumb--link">
                  {c.icon && <Icon name={c.icon} size={11} />}
                  <span>{label}</span>
                </Link>
              )}
              {!c.isLast && (
                <span className="crumbs__sep" aria-hidden>
                  <Icon name="arrow" size={9} />
                </span>
              )}
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}
