import { useState } from 'react'
import { motion } from 'motion/react'
import Icon from '../../components/ui/Icon'

const TEMPLATES = [
  { id: 'engagement',  icon: 'handshake', name: 'Engagement Letter',  desc: 'Scope, fees, retainer terms.' },
  { id: 'nda',         icon: 'shield',    name: 'Non-Disclosure (NDA)',desc: 'Mutual or one-way confidentiality.' },
  { id: 'affidavit',   icon: 'scales',    name: 'Affidavit',          desc: 'Sworn statement template.' },
  { id: 'power',       icon: 'gavel',     name: 'Power of Attorney',  desc: 'General or special POA.' },
  { id: 'notice',      icon: 'chat',      name: 'Legal Notice',       desc: 'Demand or cease-and-desist.' },
  { id: 'lease',       icon: 'building',  name: 'Lease Agreement',    desc: 'Commercial or residential.' },
]

const SEED_DOCS = [
  { id: 'DOC-2418', title: 'Engagement Letter — Aakash Trading',  template: 'Engagement Letter', client: 'Aakash Trading Pvt. Ltd.', author: 'R. Shrestha', generated: '14 Apr 2025 · 10:42', status: 'Signed'   },
  { id: 'DOC-2417', title: 'Mutual NDA — Himalaya Hydropower',     template: 'NDA',               client: 'Himalaya Hydropower',     author: 'A. Pandey',    generated: '12 Apr 2025 · 16:18', status: 'Sent'     },
  { id: 'DOC-2416', title: 'Affidavit — Sita Karki property',      template: 'Affidavit',         client: 'Sita Karki',              author: 'A. Pandey',    generated: '08 Apr 2025 · 09:05', status: 'Draft'    },
  { id: 'DOC-2415', title: 'Legal Notice — Nepal Foods labour',    template: 'Legal Notice',      client: 'Nepal Foods Co.',         author: 'R. Shrestha', generated: '02 Apr 2025 · 13:30', status: 'Signed'   },
  { id: 'DOC-2414', title: 'Power of Attorney — Maharjan',         template: 'Power of Attorney', client: 'Bishnu Maharjan',         author: 'M. Adhikari', generated: '28 Mar 2025 · 11:11', status: 'Archived' },
]

const STATUS_FILTERS = ['All', 'Draft', 'Sent', 'Signed', 'Archived']

const EMPTY_FORM = {
  template: '',
  matterClient: '',
  party1: '',
  party2: '',
  effective: new Date().toISOString().slice(0, 10),
  consideration: '',
  jurisdiction: 'Kathmandu, Nepal',
}

export default function Documents() {
  const [docs, setDocs] = useState(SEED_DOCS)
  const [view, setView] = useState('list')
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState(EMPTY_FORM)
  const [building, setBuilding] = useState(false)

  const filtered = docs.filter((d) => filter === 'All' || d.status === filter)
  const selectedTemplate = TEMPLATES.find((t) => t.id === form.template)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const generate = (e) => {
    e.preventDefault()
    setBuilding(true)
    setTimeout(() => {
      const tpl = TEMPLATES.find((t) => t.id === form.template)
      const next = {
        id: 'DOC-' + (2418 + docs.length + 1).toString(),
        title: `${tpl?.name || 'Document'} — ${form.party1 || form.matterClient || 'New'}`,
        template: tpl?.name || 'Custom',
        client: form.matterClient || form.party1 || '—',
        author: 'You',
        generated: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'Draft',
      }
      setDocs((d) => [next, ...d])
      setBuilding(false)
      setForm(EMPTY_FORM)
      setView('list')
    }, 700)
  }

  const badgeClass = (s) =>
    s === 'Signed' ? 'badge--active' :
    s === 'Sent' ? 'badge--pending' :
    s === 'Archived' ? 'badge--closed' : 'badge--draft'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="page-actions">
        <div className="page-actions__title">
          <h2>{view === 'list' ? 'Documents' : 'Generate a new document'}</h2>
          <p>
            {view === 'list'
              ? `${filtered.length} of ${docs.length} drafts and finals · all PDFs sit on the firm's audit trail.`
              : 'Pick a template, fill the structured fields, and export a signed-ready PDF.'}
          </p>
        </div>
        {view === 'list' ? (
          <button type="button" className="btn btn--primary btn--sm" onClick={() => setView('new')}>
            <Icon name="plus" /> Generate document
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
            <span style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>Filter by status</span>
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
              <Icon name="file" size={36} />
              <h3>No documents in this view.</h3>
              <p>Generate a new one from a template to see it here.</p>
            </div>
          ) : (
            <table className="t">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Template</th>
                  <th>Client / Matter</th>
                  <th>Author</th>
                  <th>Generated</th>
                  <th>Status</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <div className="cell-primary">
                        <div className="cell-avatar" style={{ background: 'linear-gradient(135deg, var(--gold-500), var(--gold-300))', color: 'var(--navy-900)' }}>
                          <Icon name="pdf" size={16} />
                        </div>
                        <div className="cell-meta">
                          <strong>{d.title}</strong>
                          <small>{d.id}</small>
                        </div>
                      </div>
                    </td>
                    <td>{d.template}</td>
                    <td>{d.client}</td>
                    <td>{d.author}</td>
                    <td>{d.generated}</td>
                    <td><span className={`badge ${badgeClass(d.status)}`}>{d.status}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <button type="button" className="row-action" aria-label="Download">
                        <Icon name="download" size={16} />
                      </button>
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
        <div className="grid-2">
          <form className="card" onSubmit={generate}>
            <div className="card__head">
              <h3>Step 1 · Choose a template</h3>
              {selectedTemplate && (
                <span className="card__head-sub">
                  Selected: <strong style={{ color: 'var(--navy-900)' }}>{selectedTemplate.name}</strong>
                </span>
              )}
            </div>
            <div className="template-grid">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`template ${form.template === t.id ? 'is-selected' : ''}`}
                  onClick={() => setForm((f) => ({ ...f, template: t.id }))}
                >
                  <span className="template__icon"><Icon name={t.icon} size={18} /></span>
                  <strong>{t.name}</strong>
                  <small>{t.desc}</small>
                </button>
              ))}
            </div>

            <div className="card__head" style={{ marginTop: '1.75rem', marginBottom: '1rem' }}>
              <h3>Step 2 · Fill the brief</h3>
              <span className="card__head-sub">Fields below merge into the PDF</span>
            </div>

            <div className="stack-form">
              <label className="field">
                <span className="field__label">Client / Matter</span>
                <span className="field__control">
                  <Icon name="briefcase" size={16} className="field__icon" />
                  <input type="text" placeholder="Search or pick a matter" value={form.matterClient} onChange={update('matterClient')} />
                </span>
              </label>
              <div className="stack-form__row">
                <label className="field">
                  <span className="field__label">Party A</span>
                  <span className="field__control">
                    <Icon name="user" size={16} className="field__icon" />
                    <input type="text" placeholder="First Party name" value={form.party1} onChange={update('party1')} />
                  </span>
                </label>
                <label className="field">
                  <span className="field__label">Party B</span>
                  <span className="field__control">
                    <Icon name="user" size={16} className="field__icon" />
                    <input type="text" placeholder="Second Party name" value={form.party2} onChange={update('party2')} />
                  </span>
                </label>
              </div>
              <div className="stack-form__row">
                <label className="field">
                  <span className="field__label">Effective date</span>
                  <span className="field__control">
                    <Icon name="clock" size={16} className="field__icon" />
                    <input type="date" value={form.effective} onChange={update('effective')} />
                  </span>
                </label>
                <label className="field">
                  <span className="field__label">Jurisdiction</span>
                  <span className="field__control">
                    <Icon name="pin" size={16} className="field__icon" />
                    <input type="text" value={form.jurisdiction} onChange={update('jurisdiction')} />
                  </span>
                </label>
              </div>
              <label className="field">
                <span className="field__label">Consideration / Subject matter <small className="field__opt">optional</small></span>
                <span className="field__control" style={{ alignItems: 'flex-start' }}>
                  <Icon name="receipt" size={16} className="field__icon" style={{ marginTop: '14px' }} />
                  <textarea
                    rows={3}
                    placeholder="Fee, asset, scope of work, or subject of the document…"
                    value={form.consideration}
                    onChange={update('consideration')}
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: 'inherit', padding: '13px 0', resize: 'vertical' }}
                  />
                </span>
              </label>

              <div className="stack-form__actions">
                <button type="button" className="btn btn--soft btn--sm" onClick={() => { setForm(EMPTY_FORM); setView('list') }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary btn--sm" disabled={!form.template || building}>
                  {building ? 'Generating…' : 'Generate PDF'} <Icon name="download" />
                </button>
              </div>
            </div>
          </form>

          {/* Preview pane */}
          <div className="card" style={{ position: 'sticky', top: 'calc(var(--topbar-h) + 1.5rem)', alignSelf: 'start' }}>
            <div className="card__head">
              <h3>Live preview</h3>
              <span className="card__head-sub">{selectedTemplate ? selectedTemplate.name : 'No template'}</span>
            </div>
            <div style={{
              background: 'var(--cream)',
              border: '1px solid var(--line-2)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
              minHeight: '320px',
              fontFamily: 'var(--font-serif)',
              color: 'var(--ink)',
              fontSize: '0.88rem',
              lineHeight: 1.7,
            }}>
              {!selectedTemplate ? (
                <div className="empty" style={{ padding: '2rem 0' }}>
                  <Icon name="pdf" size={36} />
                  <h3>Pick a template to preview</h3>
                  <p>The PDF outline renders here as you fill the form.</p>
                </div>
              ) : (
                <>
                  <div style={{ textAlign: 'center', fontWeight: 700, color: 'var(--navy-900)', fontSize: '1.05rem', marginBottom: '1.25rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    {selectedTemplate.name}
                  </div>
                  <p style={{ color: 'var(--ink-2)', margin: 0 }}>
                    This {selectedTemplate.name.toLowerCase()} is made and entered into on{' '}
                    <em style={{ color: 'var(--navy-900)' }}>
                      {new Date(form.effective).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </em>{' '}
                    by and between{' '}
                    <em style={{ color: 'var(--navy-900)' }}>{form.party1 || '[Party A]'}</em>
                    {' '}and{' '}
                    <em style={{ color: 'var(--navy-900)' }}>{form.party2 || '[Party B]'}</em>
                    {', '}
                    under the jurisdiction of <em style={{ color: 'var(--navy-900)' }}>{form.jurisdiction || '[Jurisdiction]'}</em>.
                  </p>
                  {form.consideration && (
                    <p style={{ marginTop: '1rem', color: 'var(--ink-2)' }}>
                      <strong style={{ color: 'var(--navy-900)' }}>Subject. </strong>
                      {form.consideration}
                    </p>
                  )}
                  <p style={{ marginTop: '1.5rem', color: 'var(--muted)', fontSize: '0.78rem', fontStyle: 'italic' }}>
                    — Boilerplate clauses, signature blocks, and notarisation fields are appended on export.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
