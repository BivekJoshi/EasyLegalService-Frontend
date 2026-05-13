import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useAuth } from '../../auth/useAuth'
import SearchProvider from '../../components/search/SearchProvider'
import ThemeProvider from '../../components/theme/ThemeProvider'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import './AppLayout.css'

const COLLAPSED_KEY = 'els_sidebar_collapsed'

export default function AppLayout() {
  const { signOut } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(COLLAPSED_KEY) === '1' } catch { return false }
  })

  useEffect(() => {
    try { localStorage.setItem(COLLAPSED_KEY, collapsed ? '1' : '0') } catch { /* no-op */ }
  }, [collapsed])

  /* Close mobile drawer on route change. */
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setDrawerOpen(false)
  }

  const handleSignOut = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <ThemeProvider>
      <SearchProvider>
        <div className={`app ${collapsed ? 'app--collapsed' : ''} ${drawerOpen ? 'app--drawer' : ''}`}>
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((v) => !v)}
            onSignOut={handleSignOut}
          />

          <AnimatePresence>
            {drawerOpen && (
              <motion.div
                className="app__scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
              />
            )}
          </AnimatePresence>

          <div className="app__main">
            <Topbar onToggleSidebar={() => setDrawerOpen((v) => !v)} />
            <main className="app__content" key={pathname}>
              <Outlet />
            </main>
          </div>
        </div>
      </SearchProvider>
    </ThemeProvider>
  )
}
