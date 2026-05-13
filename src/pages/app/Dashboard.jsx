import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Icon from '../../components/ui/Icon'
import { useAuth } from '../../auth/useAuth'

const KPIS = [
  { label: 'Active clients',   value: '142', delta: '+8',  sub: 'this month', icon: 'users' },
  { label: 'Open cases',       value: '37',  delta: '+3',  sub: 'this week',  icon: 'briefcase' },
  { label: 'Documents drafted',value: '218', delta: '+24', sub: 'this month', icon: 'file' },
  { label: 'Pending review',   value: '9',   delta: '-2',  sub: 'this week',  icon: 'clock', down: true },
]

const ACTIVITY = [
  { who: 'Sita Karki',     what: 'filed Writ Petition #2080-21 in Patan High Court', when: '14 min ago', icon: 'gavel' },
  { who: 'Ramesh Shrestha', what: 'generated an Engagement Letter for Aakash Trading', when: '1 h ago',   icon: 'file' },
  { who: 'Anita Pandey',   what: 'added new client "Himalaya Hydropower Pvt. Ltd."',  when: '3 h ago',   icon: 'building' },
  { who: 'Manish Adhikari', what: 'closed matter #2079-114 — settled out of court',   when: 'Yesterday', icon: 'check' },
  { who: 'Sita Karki',     what: 'uploaded 4 evidence exhibits to case #2080-08',     when: 'Yesterday', icon: 'file' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] || 'Counsel'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="banner">
        <div className="banner__body">
          <strong>Good morning, {firstName}.</strong>
          <p>You have 3 matters needing review and 2 drafts pending signature.</p>
        </div>
        <Link to="/app/documents" className="btn btn--primary btn--sm">
          Generate document <Icon name="arrow" />
        </Link>
      </div>

      <div className="kpi-grid">
        {KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            className="kpi"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
          >
            <div className="kpi__head">
              <span className="kpi__icon"><Icon name={k.icon} size={16} /></span>
              {k.label}
            </div>
            <div className="kpi__value">{k.value}</div>
            <span className={`kpi__delta ${k.down ? 'kpi__delta--down' : ''}`}>
              <Icon name="trend" size={14} /> {k.delta}
              <span className="kpi__delta-sub">{k.sub}</span>
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card__head">
            <h3>Recent activity</h3>
            <span className="card__head-sub">Across the chamber</span>
          </div>
          <div className="activity">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="activity__item">
                <span className="activity__dot"><Icon name={a.icon} size={16} /></span>
                <div className="activity__body">
                  <strong>{a.who}</strong>
                  <p>{a.what}</p>
                </div>
                <span className="activity__time">{a.when}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card__head">
            <h3>Quick actions</h3>
          </div>
          <div className="quick-actions">
            <Link to="/app/clients" className="quick-action">
              <span className="quick-action__icon"><Icon name="users" size={18} /></span>
              <div className="quick-action__meta">
                <strong>New client intake</strong>
                <small>Capture KYC & contact details</small>
              </div>
            </Link>
            <Link to="/app/cases" className="quick-action">
              <span className="quick-action__icon"><Icon name="briefcase" size={18} /></span>
              <div className="quick-action__meta">
                <strong>Open a new matter</strong>
                <small>Brief, jurisdiction, practice area</small>
              </div>
            </Link>
            <Link to="/app/documents" className="quick-action">
              <span className="quick-action__icon"><Icon name="file" size={18} /></span>
              <div className="quick-action__meta">
                <strong>Generate document</strong>
                <small>Engagement letters, affidavits, NDAs</small>
              </div>
            </Link>
            <button type="button" className="quick-action">
              <span className="quick-action__icon"><Icon name="download" size={18} /></span>
              <div className="quick-action__meta">
                <strong>Export case ledger</strong>
                <small>CSV of all open matters</small>
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
