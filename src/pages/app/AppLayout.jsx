import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import SearchProvider from '../../components/search/SearchProvider'
import ThemeProvider from '../../components/theme/ThemeProvider'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import BottomNav from './BottomNav'
import './AppLayout.css'

const COLLAPSED_KEY = 'els_sidebar_collapsed'

export default function AppLayout() {
  const { signOut } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(COLLAPSED_KEY) === '1' } catch { return false }
  })

  useEffect(() => {
    try { localStorage.setItem(COLLAPSED_KEY, collapsed ? '1' : '0') } catch { /* no-op */ }
  }, [collapsed])

  const handleSignOut = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <ThemeProvider>
      <SearchProvider>
        <div className={`app ${collapsed ? 'app--collapsed' : ''}`}>
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((v) => !v)}
            onSignOut={handleSignOut}
          />

          <div className="app__main">
            <Topbar />
            <main className="app__content" key={pathname}>
              <Outlet />
            </main>
          </div>

          {/* Mobile-only sticky bottom nav */}
          <BottomNav />
        </div>
      </SearchProvider>
    </ThemeProvider>
  )
}
