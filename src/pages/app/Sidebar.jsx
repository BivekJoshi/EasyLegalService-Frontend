import { Link, NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import Icon from '../../components/ui/Icon'
import { useAuth } from '../../auth/useAuth'
import './Sidebar.css'

const SECTIONS = [
  {
    label: 'Workspace',
    items: [
      { to: '/app',           label: 'Overview',  icon: 'grid',      end: true },
      { to: '/app/clients',   label: 'Clients',   icon: 'users' },
      { to: '/app/cases',     label: 'Cases',     icon: 'briefcase' },
      { to: '/app/documents', label: 'Documents', icon: 'file', badge: '3' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { to: '/app',           label: 'Templates', icon: 'bookmark', disabled: true },
      { to: '/app',           label: 'Inbox',     icon: 'inbox',    disabled: true, badge: '12' },
    ],
  },
  {
    label: 'Account',
    items: [
      { to: '/app',           label: 'Settings',  icon: 'cog',     disabled: true },
      { to: '/app',           label: 'Help',      icon: 'questionCircle', disabled: true },
    ],
  },
]

export default function Sidebar({ collapsed, onToggleCollapse, onSignOut }) {
  const { user } = useAuth()
  const initials = (user?.name || user?.email || 'U')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''}`} aria-label="Workspace navigation">
      <Link to="/app" className="sidebar__brand">
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
        <span className="sidebar__brand-text">
          <strong>Easy Legal</strong>
          <small>Counsel workspace</small>
        </span>
      </Link>

      <nav className="sidebar__nav">
        {SECTIONS.map((section) => (
          <div key={section.label} className="sidebar__section">
            <span className="sidebar__section-label">{section.label}</span>
            <ul>
              {section.items.map((item) => {
                const content = (
                  <>
                    <span className="sidebar__link-icon">
                      <Icon name={item.icon} size={18} />
                    </span>
                    <span className="sidebar__link-text">{item.label}</span>
                    {item.badge && (
                      <span className="sidebar__badge">{item.badge}</span>
                    )}
                    {/* Tooltip flyout (visible only when collapsed) */}
                    <span className="sidebar__tooltip" aria-hidden>{item.label}</span>
                  </>
                )

                if (item.disabled) {
                  return (
                    <li key={item.label}>
                      <span className="sidebar__link is-disabled" aria-disabled="true">
                        {content}
                      </span>
                    </li>
                  )
                }

                return (
                  <li key={item.label}>
                    <NavLink to={item.to} end={item.end} className="sidebar__link">
                      {content}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar__foot">
        <motion.div
          className="sidebar__usercard"
          layout
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="sidebar__avatar">
            {initials}
            <span className="sidebar__avatar-status" aria-label="Online" />
          </span>
          <div className="sidebar__userinfo">
            <strong>{user?.name || 'Counsel'}</strong>
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
        </motion.div>

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
