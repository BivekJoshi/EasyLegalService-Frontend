import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import TeamMemberPage from './pages/TeamMemberPage'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import Loader from './components/ui/Loader'
import { useReveal } from './hooks/useReveal'
import { useLenis, getLenis } from './hooks/useLenis'

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

export default function App() {
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
    <BrowserRouter>
      <AnimatePresence>
        {loading && <Loader key="loader" duration={LOADER_MS} />}
      </AnimatePresence>

      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team/:slug" element={<TeamMemberRoute />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
