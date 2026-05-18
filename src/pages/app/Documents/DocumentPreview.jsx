import { useRef, useState } from 'react'
import Icon from '../../../components/ui/Icon'
import { downloadAsPdf, openPdfInTab, printElement } from './pdfUtils'

export default function DocumentPreview({ selectedTemplate, form }) {
  const TemplatePreview = selectedTemplate?.Preview
  const captureRef = useRef(null)
  const [busy, setBusy] = useState(null) // 'view' | 'download' | null

  const filename = selectedTemplate
    ? `${selectedTemplate.id}-${form.party1 || form.matterClient || 'draft'}`
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-|-$/g, '') + '.pdf'
    : 'document.pdf'

  const handleView = async () => {
    if (!captureRef.current) return
    setBusy('view')
    try { await openPdfInTab(captureRef.current, filename) }
    finally { setBusy(null) }
  }

  const handleDownload = async () => {
    if (!captureRef.current) return
    setBusy('download')
    try { await downloadAsPdf(captureRef.current, filename) }
    finally { setBusy(null) }
  }

  return (
    <div className="card docs-preview-card">
      <div className="card__head">
        <h3>Live preview</h3>
        {selectedTemplate ? (
          <div className="docs-preview-actions" role="toolbar" aria-label="Document actions">
            <button
              type="button"
              className="docs-preview-btn"
              onClick={handleView}
              disabled={busy === 'view'}
              title="Open as PDF in a new tab"
            >
              <Icon name="eye" size={14} />
              <span>{busy === 'view' ? 'Opening…' : 'View'}</span>
            </button>
            <button
              type="button"
              className="docs-preview-btn"
              onClick={handleDownload}
              disabled={busy === 'download'}
              title="Download as PDF"
            >
              <Icon name="download" size={14} />
              <span>{busy === 'download' ? 'Saving…' : 'Download'}</span>
            </button>
            <button
              type="button"
              className="docs-preview-btn"
              onClick={printElement}
              title="Print this document"
            >
              <Icon name="printer" size={14} />
              <span>Print</span>
            </button>
          </div>
        ) : (
          <span className="card__head-sub">No template</span>
        )}
      </div>

      {/* Captured container — what View/Download/Print all target. */}
      <div ref={captureRef} className="docs-preview-host">
        {TemplatePreview ? (
          <TemplatePreview form={form} />
        ) : (
          <div className="docs-preview">
            {!selectedTemplate ? (
              <div className="empty docs-preview-empty">
                <Icon name="pdf" size={36} />
                <h3>Pick a template to preview</h3>
                <p>The PDF outline renders here as you fill the form.</p>
              </div>
            ) : (
              <>
                <div className="docs-preview-title">{selectedTemplate.name}</div>
                <p className="docs-preview-body">
                  This {selectedTemplate.name.toLowerCase()} is made and entered into on{' '}
                  <em className="docs-preview-em">
                    {form.effective
                      ? new Date(form.effective).toLocaleDateString('en-GB', {
                          day: '2-digit', month: 'long', year: 'numeric',
                        })
                      : '[Effective date]'}
                  </em>{' '}
                  by and between{' '}
                  <em className="docs-preview-em">{form.party1 || '[Party A]'}</em>
                  {' '}and{' '}
                  <em className="docs-preview-em">{form.party2 || '[Party B]'}</em>
                  {', '}
                  under the jurisdiction of{' '}
                  <em className="docs-preview-em">{form.jurisdiction || '[Jurisdiction]'}</em>.
                </p>
                {form.consideration && (
                  <p className="docs-preview-body docs-preview-subject">
                    <strong className="docs-preview-em">Subject. </strong>
                    {form.consideration}
                  </p>
                )}
                <p className="docs-preview-foot">
                  — Boilerplate clauses, signature blocks, and notarisation fields are appended on export.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
