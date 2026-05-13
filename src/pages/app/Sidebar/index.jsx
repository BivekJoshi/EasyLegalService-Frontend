import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Icon from '../../../components/ui/Icon'
import { useAuth } from '../../../auth/useAuth'
import { useSearch } from '../../../components/search/useSearch'
import NavItem from './items'
import { SECTIONS } from './nav'
import './Sidebar.css'

export default function Sidebar({ collapsed, onToggleCollapse, onSignOut }) {
  const { user } = useAuth()
  const { open: openSearch } = useSearch()
  const initials = (user?.name || user?.email || 'U')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''}`} aria-label="Workspace navigation">
      <div className="sidebar__glow" aria-hidden />

      {/* Workspace switcher header */}
      <Link to="/app" className="sidebar__workspace">
        <span className="sidebar__brand-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3v18" />
            <path d="M5 21h14" />
            <path d="M5 7h14" />
            <path d="M5 7l-3 7a4 4 0 0 0 8 0L7 7" />
            <path d="M19 7l-3 7a4 4 0 0 0 8 0L21 7" />
          </svg>
        </span>
        <span className="sidebar__workspace-meta">
          <span className="sidebar__workspace-title">
            <strong>Easy Legal</strong>
            <span className="sidebar__tier">Pro</span>
          </span>
          <small>Counsel workspace</small>
        </span>
      </Link>

      {/* Quick-search pill — opens the command palette */}
      <button
        type="button"
        className="sidebar__search"
        onClick={openSearch}
        title="Quick search"
      >
        <Icon name="search" size={14} />
        <span className="sidebar__search-text">Quick search…</span>
        <kbd className="sidebar__search-kbd">⌘K</kbd>
        <span className="sidebar__tooltip" aria-hidden>Quick search</span>
      </button>

      {/* Nav sections */}
      <nav className="sidebar__nav">
        {SECTIONS.map((section, sIdx) => (
          <div key={section.label} className="sidebar__section">
            <span className="sidebar__section-label">
              <span>{section.label}</span>
              <span className="sidebar__section-rule" aria-hidden />
            </span>
            <ul>
              {section.items.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.04 * (sIdx * 4 + i), ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavItem item={item} collapsed={collapsed} />
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Foot */}
      <div className="sidebar__foot">
        <div className="sidebar__usercard">
          <span className="sidebar__avatar">
            {initials}
            <span className="sidebar__avatar-status" aria-label="Online" />
          </span>
          <div className="sidebar__userinfo">
            <strong>
              {user?.name || 'Counsel'}
              <span className="sidebar__usertier">Pro</span>
            </strong>
            <small>{user?.firm}</small>
          </div>
          <button
            type="button"
            className="sidebar__logout"
            onClick={onSignOut}
            aria-label="Sign out"
            title="Sign out"
          >
            <Icon name="logout" size={16} />
          </button>
        </div>

        <button
          type="button"
          className="sidebar__collapse"
          onClick={onToggleCollapse}
          aria-pressed={collapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={collapsed ? 'chevronRight' : 'chevronLeft'} size={14} />
          <span className="sidebar__collapse-text">Collapse</span>
        </button>
      </div>
    </aside>
  )
}
