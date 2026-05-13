import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import Icon from '../../components/ui/Icon'
import { CASE_SEED } from '../../data/seed'

const STATUS_FILTERS = ['All', 'Active', 'Pending', 'Draft', 'Closed']
const PRACTICE_AREAS = [
  'Property', 'Corporate / Reg.', 'Family', 'Tax & Customs',
  'Employment', 'Contracts', 'Criminal', 'IP & Trademarks',
]

const EMPTY_FORM = {
  title: '',
  client: '',
  area: 'Contracts',
  jurisdiction: 'District Court, Kathmandu',
  filed: new Date().toISOString().slice(0, 10),
  lead: '',
  brief: '',
}

export default function Cases() {
  const [cases, setCases] = useState(CASE_SEED)
  const [view, setView] = useState('list')
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cases.filter((c) => {
      if (filter !== 'All' && c.status !== filter) return false
      if (!q) return true
      return c.title.toLowerCase().includes(q) || c.client.toLowerCase().includes(q) || c.id.includes(q)
    })
  }, [cases, query, filter])

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const next = {
      id: '2080-' + (22 + cases.length).toString().padStart(3, '0'),
      title: form.title,
      client: form.client,
      area: form.area,
      status: 'Draft',
      filed: new Date(form.filed).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      lead: form.lead || '—',
    }
    setCases((c) => [next, ...c])
    setForm(EMPTY_FORM)
    setView('list')
  }

  const badgeClass = (s) =>
    s === 'Active' ? 'badge--active' :
    s === 'Pending' ? 'badge--pending' :
    s === 'Closed' ? 'badge--closed' : 'badge--draft'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="page-actions">
        <div className="page-actions__title">
          <h2>{view === 'list' ? 'Matters & cases' : 'Open a new matter'}</h2>
          <p>
            {view === 'list'
              ? `${filtered.length} of ${cases.length} matters · the firm's working docket.`
              : 'Link a matter to a client, choose the practice area, and assign a lead counsel.'}
          </p>
        </div>
        {view === 'list' ? (
          <button type="button" className="btn btn--primary btn--sm" onClick={() => setView('new')}>
            <Icon name="plus" /> New matter
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
                placeholder="Search by case #, title, or client"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="chip-row">
              {STATUS_FILTERS.map((f) => (
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
              <Icon name="briefcase" size={36} />
              <h3>No matters in this view.</h3>
              <p>Try a different filter or open a new case.</p>
            </div>
          ) : (
            <table className="t">
              <thead>
                <tr>
                  <th>Case #</th>
                  <th>Matter</th>
                  <th>Practice area</th>
                  <th>Status</th>
                  <th>Filed</th>
                  <th>Lead</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td><code style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>{c.id}</code></td>
                    <td>
                      <div className="cell-meta">
                        <strong>{c.title}</strong>
                        <small>{c.client}</small>
                      </div>
                    </td>
                    <td>{c.area}</td>
                    <td><span className={`badge ${badgeClass(c.status)}`}>{c.status}</span></td>
                    <td>{c.filed}</td>
                    <td>{c.lead}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button type="button" className="row-action" aria-label="More">
                        <Icon name="dots" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {view === 'new' && (
        <div className="card">
          <form className="stack-form" onSubmit={submit}>
            <label className="field">
              <span className="field__label">Matter title</span>
              <span className="field__control">
                <Icon name="briefcase" size={16} className="field__icon" />
                <input type="text" placeholder="e.g. Aakash Trading vs. Customs Office" value={form.title} onChange={update('title')} required />
              </span>
            </label>

            <div className="stack-form__row">
              <label className="field">
                <span className="field__label">Client</span>
                <span className="field__control">
                  <Icon name="users" size={16} className="field__icon" />
                  <input type="text" placeholder="Search or pick a client" value={form.client} onChange={update('client')} required />
                </span>
              </label>
              <label className="field">
                <span className="field__label">Practice area</span>
                <span className="field__control">
                  <Icon name="scales" size={16} className="field__icon" />
                  <select value={form.area} onChange={update('area')} style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: 'inherit', padding: '13px 0' }}>
                    {PRACTICE_AREAS.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </span>
              </label>
            </div>

            <div className="stack-form__row">
              <label className="field">
                <span className="field__label">Jurisdiction / Forum</span>
                <span className="field__control">
                  <Icon name="building" size={16} className="field__icon" />
                  <input type="text" placeholder="District Court, Kathmandu" value={form.jurisdiction} onChange={update('jurisdiction')} />
                </span>
              </label>
              <label className="field">
                <span className="field__label">Date filed</span>
                <span className="field__control">
                  <Icon name="clock" size={16} className="field__icon" />
                  <input type="date" value={form.filed} onChange={update('filed')} />
                </span>
              </label>
            </div>

            <label className="field">
              <span className="field__label">Lead counsel</span>
              <span className="field__control">
                <Icon name="user" size={16} className="field__icon" />
                <input type="text" placeholder="Adv. Ramesh Shrestha" value={form.lead} onChange={update('lead')} />
              </span>
            </label>

            <label className="field">
              <span className="field__label">Brief summary</span>
              <span className="field__control" style={{ alignItems: 'flex-start' }}>
                <Icon name="file" size={16} className="field__icon" style={{ marginTop: '14px' }} />
                <textarea
                  rows={4}
                  placeholder="Facts of the case, relief sought, and key dates…"
                  value={form.brief}
                  onChange={update('brief')}
                  style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: 'inherit', padding: '13px 0', resize: 'vertical' }}
                />
              </span>
            </label>

            <div className="stack-form__actions">
              <button type="button" className="btn btn--soft btn--sm" onClick={() => { setForm(EMPTY_FORM); setView('list') }}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary btn--sm">
                Open matter <Icon name="check" />
              </button>
            </div>
          </form>
        </div>
      )}
    </motion.div>
  )
}
