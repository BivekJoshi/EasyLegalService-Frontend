import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import TeamMemberPage from './pages/TeamMemberPage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import Loader from './components/ui/Loader'
import DevCredit from './components/ui/DevCredit'
import { useReveal } from './hooks/useReveal'
import { useLenis, getLenis } from './hooks/useLenis'
import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import AuthShell from './pages/auth/AuthShell'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AppLayout from './pages/app/AppLayout'
import Dashboard from './pages/app/Dashboard'
import Clients from './pages/app/Clients'
import Cases from './pages/app/Cases'
import Documents from './pages/app/Documents'

const LOADER_MS = 3000

/* Scroll to top on each route change (or to a hashed section if the URL
 * includes one). Goes through Lenis so its internal scroll state stays in
 * sync with the actual scroll position. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const lenis = getLenis()
    if (hash) {
      const id = setTimeout(() => {
        const el = document.querySelector(hash)
        if (!el) return
        if (lenis) lenis.scrollTo(el, { offset: -76, duration: 0.9 })
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 220)
      return () => clearTimeout(id)
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  return null
}

/* Wrapper that keys TeamMemberPage by slug, so navigating to another
 * advocate from "Also on the bench" remounts the page — entrance
 * animations replay and component state resets. */
function TeamMemberRoute() {
  const { slug } = useParams()
  return <TeamMemberPage key={slug} />
}

/* Marketing-site chrome: navbar + footer + scroll progress + smooth scroll.
 * Auth and workspace routes opt out of this entire shell. */
function PublicLayout() {
  const [loading, setLoading] = useState(true)
  useLenis()
  useReveal(!loading)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), LOADER_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" duration={LOADER_MS} />}
      </AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <Outlet />
      <Footer />
      <DevCredit />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          {/* Marketing site (navbar, footer, loader, smooth scroll) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/team/:slug" element={<TeamMemberRoute />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Auth — split-screen, no public chrome */}
          <Route element={<AuthShell />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected workspace (sidebar + topbar) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<Clients />} />
              <Route path="cases" element={<Cases />} />
              <Route path="documents" element={<Documents />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
