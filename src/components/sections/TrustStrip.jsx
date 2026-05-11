import React from 'react'
import Marquee from '../ui/Marquee'
import { TRUSTED_BY } from '../../data/content'
import './TrustStrip.css'

export default function TrustStrip() {
  return (
    <section className="strip">
      <div className="container strip__label">
        <span>Trusted by businesses & families across Nepal</span>
      </div>
      <Marquee items={TRUSTED_BY} speed={45} />
    </section>
  )
}
