import React from 'react'
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
import { useReveal } from './hooks/useReveal'
import { useLenis } from './hooks/useLenis'

export default function App() {
  useLenis()
  useReveal()

  return (
    <>
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
