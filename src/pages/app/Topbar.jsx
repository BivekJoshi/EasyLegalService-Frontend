import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Icon from '../../components/ui/Icon'
import { useAuth } from '../../auth/useAuth'
import { useSearch } from '../../components/search/useSearch'
import './Topbar.css'

const TITLES = {
  '/app':           { title: 'Overview',        eyebrow: 'Dashboard',      crumbs: ['Workspace', 'Overview'] },
  '/app/clients':   { title: 'Client Records',  eyebrow: 'Data entry',     crumbs: ['Workspace', 'Clients'] },
  '/app/cases':     { title: 'Matters & Cases', eyebrow: 'Data entry',     crumbs: ['Workspace', 'Cases'] },
  '/app/documents': { title: 'Documents',       eyebrow: 'PDF generation', crumbs: ['Workspace', 'Documents'] },
}

const QUICK_CREATE = [
  { to: '/app/clients',   icon: 'users',     label: 'New client',    hint: 'Capture KYC' },
  { to: '/app/cases',     icon: 'briefcase', label: 'New matter',    hint: 'Brief, jurisdiction' },
  { to: '/app/documents', icon: 'file',      label: 'New document',  hint: 'From template' },
]

const NOTIFICATIONS = [
  { id: 1, icon: 'gavel', title: 'Hearing reminder', body: 'Aakash Trading vs. Customs — Patan High Court, 10:00 AM tomorrow.', when: '2 h ago', unread: true },
  { id: 2, icon: 'file',  title: 'Document signed',  body: 'Mutual NDA — Himalaya Hydropower returned with signature.',         when: 'Yesterday', unread: true },
  { id: 3, icon: 'users', title: 'New client intake', body: 'Rita Pradhan submitted the onboarding form.',                       when: '2 days ago', unread: false },
  { id: 4, icon: 'check', title: 'Matter closed',    body: 'Nepal Foods labour dispute marked as settled.',                     would: '5 days ago', when: '5 days ago', unread: false },
]

export default function Topbar({ onToggleSidebar }) {
  const { user, signOut } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { open: openSearch } = useSearch()
  const head = TITLES[pathname] || { title: 'Workspace', eyebrow: '', crumbs: ['Workspace'] }

  const [createOpen, setCreateOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  /* Close any open dropdown on route change. */
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setCreateOpen(false)
    setNotifOpen(false)
    setUserOpen(false)
  }

  /* Outside-click handler for all popovers in one pass. */
  const rootRef = useRef(null)
  useEffect(() => {
    if (!createOpen && !notifOpen && !userOpen) return
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) {
        setCreateOpen(false); setNotifOpen(false); setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [createOpen, notifOpen, userOpen])

  const initials = (user?.name || user?.email || 'U')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length

  const handleSignOut = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  const openOnly = (which) => {
    setCreateOpen(which === 'create')
    setNotifOpen(which === 'notif')
    setUserOpen(which === 'user')
  }

  return (
    <header className="topbar" ref={rootRef}>
      <button
        type="button"
        className="topbar__burger"
        onClick={onToggleSidebar}
        aria-label="Toggle menu"
      >
        <Icon name="menu" size={20} />
      </button>

      <div className="topbar__head">
        <nav className="topbar__crumbs" aria-label="Breadcrumb">
          {head.crumbs.map((c, i) => (
            <span key={c}>
              <span className="topbar__crumb">{c}</span>
              {i < head.crumbs.length - 1 && (
                <Icon name="arrow" size={10} className="topbar__crumb-sep" />
              )}
            </span>
          ))}
        </nav>
        <h1 className="topbar__title">{head.title}</h1>
      </div>

      <div className="topbar__tools">
        <button
          type="button"
          className="topbar__search"
          onClick={openSearch}
          aria-label="Open quick search"
        >
          <Icon name="search" size={16} />
          <span className="topbar__search-placeholder">Search clients, cases, documents…</span>
          <kbd>⌘K</kbd>
        </button>

        {/* Quick-create */}
        <div className="topbar__pop">
          <button
            type="button"
            className={`topbar__create ${createOpen ? 'is-open' : ''}`}
            onClick={() => openOnly(createOpen ? null : 'create')}
            aria-expanded={createOpen}
            aria-label="Quick create"
          >
            <Icon name="plus" size={16} />
            <span>New</span>
          </button>
          <AnimatePresence>
            {createOpen && (
              <motion.div
                className="topbar__menu topbar__menu--create"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <div className="topbar__menu-label">Quick create</div>
                {QUICK_CREATE.map((q) => (
                  <Link key={q.label} to={q.to} className="topbar__menu-item">
                    <span className="topbar__menu-icon"><Icon name={q.icon} size={16} /></span>
                    <span className="topbar__menu-meta">
                      <strong>{q.label}</strong>
                      <small>{q.hint}</small>
                    </span>
                    <Icon name="arrow" size={12} className="topbar__menu-arrow" />
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="topbar__pop">
          <button
            type="button"
            className="topbar__icon-btn"
            onClick={() => openOnly(notifOpen ? null : 'notif')}
            aria-expanded={notifOpen}
            aria-label={`Notifications, ${unreadCount} unread`}
          >
            <Icon name="bell" size={18} />
            {unreadCount > 0 && (
              <span className="topbar__count">{unreadCount}</span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                className="topbar__menu topbar__menu--notif"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <div className="topbar__menu-head">
                  <strong>Notifications</strong>
                  <button type="button" className="topbar__menu-link">Mark all read</button>
                </div>
                <div className="topbar__notif-list">
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className={`topbar__notif ${n.unread ? 'is-unread' : ''}`}>
                      <span className="topbar__notif-icon"><Icon name={n.icon} size={14} /></span>
                      <div className="topbar__notif-body">
                        <strong>{n.title}</strong>
                        <p>{n.body}</p>
                        <small>{n.when}</small>
                      </div>
                      {n.unread && <span className="topbar__notif-dot" aria-label="Unread" />}
                    </div>
                  ))}
                </div>
                <div className="topbar__menu-foot">
                  <button type="button" className="topbar__menu-link">View all activity</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User menu */}
        <div className="topbar__pop">
          <button
            type="button"
            className="topbar__user-btn"
            onClick={() => openOnly(userOpen ? null : 'user')}
            aria-expanded={userOpen}
          >
            <span className="topbar__avatar">{initials}</span>
            <span className="topbar__user-meta">
              <strong>{user?.name?.split(' ')[0] || 'Counsel'}</strong>
              <small>{user?.role}</small>
            </span>
            <Icon name="arrowDn" size={12} />
          </button>
          <AnimatePresence>
            {userOpen && (
              <motion.div
                className="topbar__menu topbar__menu--user"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <div className="topbar__menu-userhead">
                  <span className="topbar__avatar topbar__avatar--lg">{initials}</span>
                  <div>
                    <strong>{user?.name}</strong>
                    <small>{user?.email}</small>
                  </div>
                </div>
                <button type="button" className="topbar__menu-item topbar__menu-item--row">
                  <Icon name="user" size={14} /> Profile
                </button>
                <button type="button" className="topbar__menu-item topbar__menu-item--row">
                  <Icon name="shield" size={14} /> Account & security
                </button>
                <button type="button" className="topbar__menu-item topbar__menu-item--row">
                  <Icon name="cog" size={14} /> Preferences
                </button>
                <div className="topbar__menu-sep" />
                <button type="button" onClick={handleSignOut} className="topbar__menu-item topbar__menu-item--row topbar__menu-item--danger">
                  <Icon name="logout" size={14} /> Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
