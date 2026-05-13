import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import Icon from '../../components/ui/Icon'
import { useSearch } from '../../components/search/useSearch'
import './BottomNav.css'

const TABS = [
  { to: '/app',           label: 'Home',    icon: 'grid',      end: true },
  { to: '/app/clients',   label: 'Clients', icon: 'users' },
  { to: '/app/cases',     label: 'Cases',   icon: 'briefcase' },
  { to: '/app/documents', label: 'Docs',    icon: 'file' },
]

export default function BottomNav() {
  const { open: openSearch } = useSearch()

  return (
    <nav className="botnav" aria-label="Quick navigation">
      {TABS.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className="botnav__item"
        >
          {({ isActive }) => (
            <>
              <span className="botnav__icon"><Icon name={t.icon} size={22} /></span>
              <span className="botnav__label">{t.label}</span>
              {isActive && (
                <motion.span
                  layoutId="botnav-dot"
                  className="botnav__dot"
                  transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.7 }}
                />
              )}
            </>
          )}
        </NavLink>
      ))}

      {/* Search — opens the command palette */}
      <button
        type="button"
        className="botnav__item botnav__item--btn"
        onClick={openSearch}
        aria-label="Open quick search"
      >
        <span className="botnav__icon"><Icon name="search" size={22} /></span>
        <span className="botnav__label">Search</span>
      </button>
    </nav>
  )
}
