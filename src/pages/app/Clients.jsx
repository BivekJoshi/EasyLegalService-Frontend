import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import Icon from '../../components/ui/Icon'

const SEED = [
  { id: 'CL-2401', name: 'Aakash Trading Pvt. Ltd.', type: 'Corporate',  email: 'legal@aakash.com.np',   phone: '+977 9801-110011', cases: 4, since: '12 Apr 2025' },
  { id: 'CL-2400', name: 'Sita Karki',                type: 'Individual', email: 'sita.karki@gmail.com', phone: '+977 9841-220022', cases: 1, since: '08 Apr 2025' },
  { id: 'CL-2399', name: 'Himalaya Hydropower',       type: 'Corporate',  email: 'counsel@hhpower.com',  phone: '+977 9803-330033', cases: 2, since: '02 Apr 2025' },
  { id: 'CL-2398', name: 'Bishnu Maharjan',           type: 'Individual', email: 'b.maharjan@yahoo.com', phone: '+977 9842-440044', cases: 1, since: '28 Mar 2025' },
  { id: 'CL-2397', name: 'Nepal Foods Co.',           type: 'Corporate',  email: 'office@nepalfoods.np', phone: '+977 9851-550055', cases: 3, since: '19 Mar 2025' },
  { id: 'CL-2396', name: 'Rita Pradhan',              type: 'Individual', email: 'rita.p@outlook.com',   phone: '+977 9802-660066', cases: 1, since: '11 Mar 2025' },
]

const FILTERS = ['All', 'Individual', 'Corporate']

const EMPTY_FORM = { name: '', type: 'Individual', email: '', phone: '', address: '', notes: '' }

export default function Clients() {
  const [clients, setClients] = useState(SEED)
  const [view, setView] = useState('list') // 'list' | 'new'
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState(EMPTY_FORM)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return clients.filter((c) => {
      if (filter !== 'All' && c.type !== filter) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      )
    })
  }, [clients, query, filter])

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const next = {
      id: 'CL-' + (2401 + clients.length + 1).toString(),
      name: form.name,
      type: form.type,
      email: form.email,
      phone: form.phone,
      cases: 0,
      since: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
    setClients((c) => [next, ...c])
    setForm(EMPTY_FORM)
    setView('list')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="page-actions">
        <div className="page-actions__title">
          <h2>{view === 'list' ? 'Client records' : 'New client intake'}</h2>
          <p>
            {view === 'list'
              ? `${filtered.length} of ${clients.length} clients · master ledger for all engagements.`
              : 'Capture KYC, contact, and engagement details. Saved entries become referenceable across matters and documents.'}
          </p>
        </div>
        {view === 'list' ? (
          <button type="button" className="btn btn--primary btn--sm" onClick={() => setView('new')}>
            <Icon name="plus" /> New client
          </button>
        ) : (
          <button type="button" className="btn btn--soft btn--sm" onClick={() => setView('list')}>
            <Icon name="arrow" className="auth__back-arrow" /> Back to list
          </button>
        )}
      </div>

      {view === 'list' && (
        <div className="table-wrap">
          <div className="table-tools">
            <label className="table-search">
              <Icon name="search" size={14} />
              <input
                type="search"
                placeholder="Search by name, email, or ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="chip-row">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`chip ${filter === f ? 'is-active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <Icon name="users" size={36} />
              <h3>No clients match that search.</h3>
              <p>Adjust your filters or add a new client.</p>
            </div>
          ) : (
            <table className="t">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Type</th>
                  <th>Contact</th>
                  <th>Cases</th>
                  <th>Onboarded</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const initials = c.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="cell-primary">
                          <div className="cell-avatar">{initials}</div>
                          <div className="cell-meta">
                            <strong>{c.name}</strong>
                            <small>{c.id}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${c.type === 'Corporate' ? 'badge--pending' : 'badge--draft'}`}>
                          {c.type}
                        </span>
                      </td>
                      <td>
                        <div className="cell-meta">
                          <strong style={{ fontWeight: 500 }}>{c.email}</strong>
                          <small>{c.phone}</small>
                        </div>
                      </td>
                      <td>{c.cases}</td>
                      <td>{c.since}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button type="button" className="row-action" aria-label="More">
                          <Icon name="dots" size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {view === 'new' && (
        <div className="card">
          <form className="stack-form" onSubmit={submit}>
            <div className="stack-form__row">
              <label className="field">
                <span className="field__label">Full name / Entity</span>
                <span className="field__control">
                  <Icon name="user" size={16} className="field__icon" />
                  <input type="text" placeholder="Aakash Trading Pvt. Ltd." value={form.name} onChange={update('name')} required />
                </span>
              </label>
              <label className="field">
                <span className="field__label">Client type</span>
                <span className="field__control">
                  <Icon name="building" size={16} className="field__icon" />
                  <select value={form.type} onChange={update('type')} style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: 'inherit', padding: '13px 0' }}>
                    <option>Individual</option>
                    <option>Corporate</option>
                    <option>NGO / INGO</option>
                    <option>Government</option>
                  </select>
                </span>
              </label>
            </div>

            <div className="stack-form__row">
              <label className="field">
                <span className="field__label">Email</span>
                <span className="field__control">
                  <Icon name="mail" size={16} className="field__icon" />
                  <input type="email" placeholder="legal@firm.com" value={form.email} onChange={update('email')} required />
                </span>
              </label>
              <label className="field">
                <span className="field__label">Phone</span>
                <span className="field__control">
                  <Icon name="phone" size={16} className="field__icon" />
                  <input type="tel" placeholder="+977 98XX-XXXXXX" value={form.phone} onChange={update('phone')} required />
                </span>
              </label>
            </div>

            <label className="field">
              <span className="field__label">Address</span>
              <span className="field__control">
                <Icon name="pin" size={16} className="field__icon" />
                <input type="text" placeholder="Ward, Municipality, District" value={form.address} onChange={update('address')} />
              </span>
            </label>

            <label className="field">
              <span className="field__label">Engagement notes <small className="field__opt">optional</small></span>
              <span className="field__control" style={{ alignItems: 'flex-start' }}>
                <Icon name="chat" size={16} className="field__icon" style={{ marginTop: '14px' }} />
                <textarea
                  rows={3}
                  placeholder="Scope of engagement, conflict-of-interest notes, referral source…"
                  value={form.notes}
                  onChange={update('notes')}
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: 'inherit', padding: '13px 0', resize: 'vertical' }}
                />
              </span>
            </label>

            <div className="stack-form__actions">
              <button type="button" className="btn btn--soft btn--sm" onClick={() => { setForm(EMPTY_FORM); setView('list') }}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary btn--sm">
                Save client <Icon name="check" />
              </button>
            </div>
          </form>
        </div>
      )}
    </motion.div>
  )
}
