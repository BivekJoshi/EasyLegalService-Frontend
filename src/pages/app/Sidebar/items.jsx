import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Icon from '../../../components/ui/Icon'
import { containsActivePath } from './nav'

/* ---- Persisted expanded state for groups ---- */
const EXPANDED_KEY = 'els_sidebar_groups_v1'

function readExpanded() {
  try { return JSON.parse(localStorage.getItem(EXPANDED_KEY) || '{}') }
  catch { return {} }
}
function writeExpanded(id, value) {
  try {
    const map = readExpanded()
    map[id] = value
    localStorage.setItem(EXPANDED_KEY, JSON.stringify(map))
  } catch { /* no-op */ }
}

/* ============================================================
   NavItem — dispatches based on shape
   ============================================================ */
export default function NavItem({ item, depth = 0, collapsed }) {
  if (item.children) return <NavGroup item={item} depth={depth} collapsed={collapsed} />
  return <NavLeaf item={item} depth={depth} />
}

/* ============================================================
   NavLeaf — a single navigable (or disabled) link
   ============================================================ */
function NavLeaf({ item, depth }) {
  const inner = <LinkInner item={item} depth={depth} />

  if (item.disabled || !item.to) {
    return (
      <span
        className={`sidebar__link is-disabled depth-${depth}`}
        aria-disabled="true"
      >
        {inner}
        <Tooltip item={item} />
      </span>
    )
  }

  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={`sidebar__link depth-${depth}`}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="sidebar-active-pill"
              className="sidebar__active-pill"
              transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.8 }}
            />
          )}
          {inner}
          <Tooltip item={item} />
        </>
      )}
    </NavLink>
  )
}

/* ============================================================
   NavGroup — expandable parent with nested children
   ============================================================ */
function NavGroup({ item, depth, collapsed }) {
  const { pathname } = useLocation()
  const hasActive = containsActivePath(item, pathname)

  /* Default to open so children are immediately visible. User
   * toggle actions are persisted and override this default on
   * subsequent loads. */
  const [open, setOpen] = useState(() => {
    const stored = readExpanded()[item.id]
    if (stored !== undefined) return stored
    return true
  })

  const toggle = () => {
    const next = !open
    setOpen(next)
    writeExpanded(item.id, next)
  }

  return (
    <div className={`sidebar__group ${open ? 'is-open' : ''} ${hasActive ? 'has-active' : ''}`}>
      <button
        type="button"
        className={`sidebar__link sidebar__group-head depth-${depth}`}
        onClick={toggle}
        aria-expanded={open}
      >
        <LinkInner item={item} depth={depth} isGroup />
        <Flyout item={item} />
      </button>

      <AnimatePresence initial={false}>
        {open && !collapsed && (
          <motion.ul
            className="sidebar__sublist"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open:   { height: 'auto', opacity: 1 },
              closed: { height: 0,      opacity: 0 },
            }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {item.children.map((child) => (
              <motion.li
                key={child.id}
                variants={{
                  open:   { opacity: 1, x: 0  },
                  closed: { opacity: 0, x: -6 },
                }}
                transition={{ duration: 0.2 }}
              >
                <NavItem item={child} depth={depth + 1} collapsed={collapsed} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ============================================================
   Link inner row (shared between leaf + group head)
   ============================================================ */
function LinkInner({ item, depth, isGroup }) {
  const { t } = useTranslation()
  const label = item.labelKey ? t(item.labelKey) : item.label
  return (
    <span className="sidebar__link-content">
      {depth > 0 && <span className="sidebar__link-bullet" aria-hidden />}
      {item.icon && (
        <span className="sidebar__link-icon">
          <Icon name={item.icon} size={depth > 0 ? 14 : 18} />
        </span>
      )}
      <span className="sidebar__link-text">{label}</span>
      {item.badge && <span className="sidebar__badge">{item.badge}</span>}

      {isGroup ? (
        <span className="sidebar__group-caret" aria-hidden>
          <Icon name="arrowDn" size={12} />
        </span>
      ) : (
        <span className="sidebar__link-chevron" aria-hidden>
          <Icon name="arrow" size={11} />
        </span>
      )}
    </span>
  )
}

/* ============================================================
   Simple tooltip — used for leaves when sidebar is collapsed.
   Groups render <Flyout/> instead, which shows their children.
   ============================================================ */
function Tooltip({ item }) {
  const { t } = useTranslation()
  const label = item.labelKey ? t(item.labelKey) : item.label
  return (
    <span className="sidebar__tooltip" aria-hidden>
      {label}
      {item.badge && <em>· {item.badge}</em>}
    </span>
  )
}

/* ============================================================
   Flyout — child list for collapsed groups (hover-revealed)
   ============================================================ */
function Flyout({ item }) {
  const { t } = useTranslation()
  const label = item.labelKey ? t(item.labelKey) : item.label
  return (
    <span className="sidebar__flyout" role="menu" aria-label={label}>
      <strong className="sidebar__flyout-title">{label}</strong>
      <ul>
        {item.children.map((child) => (
          <li key={child.id}>
            {child.disabled || !child.to ? (
              <span className="sidebar__flyout-item is-disabled">
                <FlyoutInner child={child} />
              </span>
            ) : (
              <NavLink
                to={child.to}
                end={child.end}
                className={({ isActive }) =>
                  `sidebar__flyout-item ${isActive ? 'is-active' : ''}`
                }
              >
                <FlyoutInner child={child} />
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </span>
  )
}

function FlyoutInner({ child }) {
  const { t } = useTranslation()
  const label = child.labelKey ? t(child.labelKey) : child.label
  return (
    <>
      {child.icon && <Icon name={child.icon} size={14} />}
      <span>{label}</span>
      {child.badge && (
        <span className="sidebar__badge sidebar__badge--soft">{child.badge}</span>
      )}
    </>
  )
}
