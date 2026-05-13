import Icon from '../../../components/ui/Icon'

export default function DocumentPreview({ selectedTemplate, form }) {
  return (
    <div className="card docs-preview-card">
      <div className="card__head">
        <h3>Live preview</h3>
        <span className="card__head-sub">
          {selectedTemplate ? selectedTemplate.name : 'No template'}
        </span>
      </div>
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
                {new Date(form.effective).toLocaleDateString('en-GB', {
                  day: '2-digit', month: 'long', year: 'numeric',
                })}
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
    </div>
  )
}
