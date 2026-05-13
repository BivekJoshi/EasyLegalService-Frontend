import React from 'react'

/**
 * Inline-SVG icon set. Stroke-based with currentColor.
 * Usage: <Icon name="scales" />
 */
const PATHS = {
  scales: (
    <>
      <path d="M12 3v18" />
      <path d="M5 21h14" />
      <path d="M5 7h14" />
      <path d="M5 7l-3 7a4 4 0 0 0 8 0L7 7" />
      <path d="M19 7l-3 7a4 4 0 0 0 8 0L21 7" />
    </>
  ),
  gavel: (
    <>
      <path d="M14 4l6 6" />
      <path d="M9 9l6 6" />
      <path d="M4 14l6 6" />
      <path d="M14 4l-4 4" />
      <path d="M20 10l-4 4" />
      <path d="M3 21h8" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
      <path d="M10 21v-3h4v3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  family: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M14 20c0-2.2 1.6-4 3.5-4S21 17.8 21 20" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a6 6 0 0 0-4-10z" />
    </>
  ),
  handshake: (
    <>
      <path d="M3 12l3-3 4 4 2-2 4 4-3 3-4-4-3 3-3-5z" />
      <path d="M14 7l3-3 4 4-2 2" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H8l-4 4V5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H6v18h12V7l-4-4z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 14c0-5 4-10 9-11 1 5-3 10-8 11l-1 1c-1 0-2-1-2-2l1-1z" />
      <path d="M9 15l-3 3 3 1 1-3" />
      <circle cx="14" cy="9" r="1.5" />
    </>
  ),
  check: <path d="M5 12l4 4L19 6" />,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2.03z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  arrow:    <path d="M5 12h14M13 5l7 7-7 7" />,
  arrowDn:  <path d="M12 5v14M5 13l7 7 7-7" />,
  arrowUp:  <path d="M12 19V5M19 11l-7-7-7 7" />,
  plus:     <path d="M12 5v14M5 12h14" />,
  minus:    <path d="M5 12h14" />,
  star: <path d="M12 3l2.9 6 6.6.6-5 4.4 1.6 6.4L12 17l-6.1 3.4 1.6-6.4-5-4.4 6.6-.6L12 3z" />,
  sparkle: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 9l1.5 1.5L15 12l-1.5 1.5L12 15l-1.5-1.5L9 12l1.5-1.5L12 9z" />
    </>
  ),
  twitter: <path d="M21 6a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.7 1A4.2 4.2 0 0 0 12 9.4c0 .3 0 .6.1.9A11.9 11.9 0 0 1 3.4 5a4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5v.1A4.2 4.2 0 0 0 6.2 14a4.2 4.2 0 0 1-1.9.1A4.2 4.2 0 0 0 8.2 17 8.5 8.5 0 0 1 3 18.7a12 12 0 0 0 6.5 1.9c7.8 0 12-6.4 12-12v-.5A8.5 8.5 0 0 0 21 6z" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01" />
      <path d="M12 17v-4a2 2 0 0 1 4 0v4" />
      <path d="M12 11v6" />
    </>
  ),
  facebook: <path d="M14 9V7a2 2 0 0 1 2-2h2V2h-3a4 4 0 0 0-4 4v3H8v3h3v9h3v-9h2.5l.5-3H14z" />,
  whatsapp: (
    <>
      <path d="M3 21l1.6-4.5A8.5 8.5 0 1 1 12 20.5a8.5 8.5 0 0 1-4.2-1.1L3 21z" />
      <path d="M8.5 9.5c0 4 3 7 7 7l1.5-1.5-2-1.5-1 .8a4.5 4.5 0 0 1-2.8-2.8l.8-1-1.5-2L9 9.5z" />
    </>
  ),

  /* App / dashboard set */
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c0-3.4 2.9-5.5 6.5-5.5s6.5 2.1 6.5 5.5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14.5c2.6.1 5 1.7 5 4.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  logout: (
    <>
      <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
      <path d="M16 8l4 4-4 4" />
      <path d="M20 12H10" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 20h14" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M3 3l18 18" />
      <path d="M10.6 6.2A11 11 0 0 1 12 6c6.5 0 10 6 10 6a18 18 0 0 1-3.3 4.2" />
      <path d="M6.2 6.2A18 18 0 0 0 2 12s3.5 6 10 6c1.6 0 3-.3 4.3-.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
  dots: (
    <>
      <circle cx="5" cy="12" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="19" cy="12" r="1.4" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 8-9" />
      <path d="M14 6h7v7" />
    </>
  ),
  pdf: (
    <>
      <path d="M14 3H6v18h12V7l-4-4z" />
      <path d="M14 3v4h4" />
      <path d="M8 14h1.2a1.3 1.3 0 0 1 0 2.6H8V18M12 14v4M12 14h.8a1.4 1.4 0 0 1 1.4 2 1.4 1.4 0 0 1-1.4 2H12M16.5 14h2M16.5 16h1.7M16.5 18v-4" />
    </>
  ),
  chevronLeft:  <path d="M15 6l-6 6 6 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3z" />,
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </>
  ),
  questionCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 4.9.7c0 1.7-2.4 2.3-2.4 4" />
      <path d="M12 17.5v.01" />
    </>
  ),
  inbox: (
    <>
      <path d="M3 13l3-8h12l3 8" />
      <path d="M3 13v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-6l-2 2h-4l-2-2H3z" />
    </>
  ),
}

export default function Icon({ name, size, stroke = 2, fill = 'none', className = '' }) {
  const path = PATHS[name]
  if (!path) return null
  const isFilled = ['twitter', 'facebook', 'star'].includes(name)
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : fill}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}
