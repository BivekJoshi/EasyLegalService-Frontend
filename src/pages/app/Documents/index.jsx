import { useCallback, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import Icon from '../../../components/ui/Icon'
import { DOCUMENT_SEED } from '../../../data/seed'
import { TEMPLATES, EMPTY_FORM } from './templates'
import DocumentsList from './DocumentsList'
import DocumentForm from './DocumentForm'
import DocumentPreview from './DocumentPreview'
import './Documents.css'

export default function Documents() {
  const [docs, setDocs]         = useState(DOCUMENT_SEED)
  const [view, setView]         = useState('list')   // 'list' | 'new'
  const [filter, setFilter]     = useState('All')
  const [form, setForm]         = useState(EMPTY_FORM)
  const [building, setBuilding] = useState(false)

  const filtered = useMemo(
    () => docs.filter((d) => filter === 'All' || d.status === filter),
    [docs, filter],
  )
  const selectedTemplate = TEMPLATES.find((t) => t.id === form.template)

  const onFieldChange = useCallback(
    (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    [],
  )
  const onSelectTemplate = useCallback(
    (id) => setForm((f) => ({ ...f, template: id })),
    [],
  )
  const cancelNew = useCallback(() => {
    setForm(EMPTY_FORM)
    setView('list')
  }, [])

  const generate = useCallback(
    (e) => {
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
          generated: new Date().toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
          }),
          status: 'Draft',
        }
        setDocs((d) => [next, ...d])
        setBuilding(false)
        setForm(EMPTY_FORM)
        setView('list')
      }, 700)
    },
    [form, docs.length],
  )

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
        <DocumentsList docs={filtered} filter={filter} onFilter={setFilter} />
      )}

      {view === 'new' && (
        <div className="grid-2">
          <DocumentForm
            form={form}
            selectedTemplate={selectedTemplate}
            building={building}
            onChange={onFieldChange}
            onSelectTemplate={onSelectTemplate}
            onSubmit={generate}
            onCancel={cancelNew}
          />
          <DocumentPreview selectedTemplate={selectedTemplate} form={form} />
        </div>
      )}
    </motion.div>
  )
}
