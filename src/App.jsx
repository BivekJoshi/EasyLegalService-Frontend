import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import TrustStrip from './components/sections/TrustStrip'
import About from './components/sections/About'
import PracticeAreas from './components/sections/PracticeAreas'
import Process from './components/sections/Process'
import Stats from './components/sections/Stats'
import Team from './components/sections/Team'
import Testimonials from './components/sections/Testimonials'
import CTA from './components/sections/CTA'
import Contact from './components/sections/Contact'
import ScrollProgress from './components/ui/ScrollProgress'
import Loader from './components/ui/Loader'
import { useReveal } from './hooks/useReveal'
import { useLenis } from './hooks/useLenis'

const LOADER_MS = 3000

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
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" duration={LOADER_MS} />}
      </AnimatePresence>

      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <PracticeAreas />
        <Process />
        <Stats />
        <Team />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
