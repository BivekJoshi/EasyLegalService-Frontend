import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Icon from '../../components/ui/Icon'
import { useSearch } from '../../components/search/useSearch'
import './BottomNav.css'

const TABS = [
  { to: '/app',           labelKey: 'bottomNav.home',    icon: 'grid',      end: true },
  { to: '/app/clients',   labelKey: 'bottomNav.clients', icon: 'users' },
  { to: '/app/cases',     labelKey: 'bottomNav.cases',   icon: 'briefcase' },
  { to: '/app/documents', labelKey: 'bottomNav.docs',    icon: 'file' },
]

export default function BottomNav() {
  const { open: openSearch } = useSearch()
  const { t } = useTranslation()

  return (
    <nav className="botnav" aria-label="Quick navigation">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className="botnav__item"
        >
          {({ isActive }) => (
            <>
              <span className="botnav__icon"><Icon name={tab.icon} size={22} /></span>
              <span className="botnav__label">{t(tab.labelKey)}</span>
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
        aria-label={t('bottomNav.search')}
      >
        <span className="botnav__icon"><Icon name="search" size={22} /></span>
        <span className="botnav__label">{t('bottomNav.search')}</span>
      </button>
    </nav>
  )
}
