import Icon from '../../../components/ui/Icon'
import { TEMPLATES } from './templates'

export default function DocumentForm({
  form,
  selectedTemplate,
  building,
  onChange,
  onSelectTemplate,
  onSubmit,
  onCancel,
}) {
  return (
    <form className="card" onSubmit={onSubmit}>
      {/* -------- Step 1 · Template picker -------- */}
      <div className="card__head">
        <h3>Step 1 · Choose a template</h3>
        {selectedTemplate && (
          <span className="card__head-sub">
            Selected: <strong className="docs-selected">{selectedTemplate.name}</strong>
          </span>
        )}
      </div>
      <div className="template-grid">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`template ${form.template === t.id ? 'is-selected' : ''}`}
            onClick={() => onSelectTemplate(t.id)}
          >
            <span className="template__icon"><Icon name={t.icon} size={18} /></span>
            <strong>{t.name}</strong>
            <small>{t.desc}</small>
          </button>
        ))}
      </div>

      {/* -------- Step 2 · Field form -------- */}
      <div className="card__head docs-step2-head">
        <h3>Step 2 · Fill the brief</h3>
        <span className="card__head-sub">Fields below merge into the PDF</span>
      </div>

      <div className="stack-form">
        <label className="field">
          <span className="field__label">Client / Matter</span>
          <span className="field__control">
            <Icon name="briefcase" size={16} className="field__icon" />
            <input
              type="text"
              placeholder="Search or pick a matter"
              value={form.matterClient}
              onChange={onChange('matterClient')}
            />
          </span>
        </label>

        <div className="stack-form__row">
          <label className="field">
            <span className="field__label">Party A</span>
            <span className="field__control">
              <Icon name="user" size={16} className="field__icon" />
              <input
                type="text"
                placeholder="First Party name"
                value={form.party1}
                onChange={onChange('party1')}
              />
            </span>
          </label>
          <label className="field">
            <span className="field__label">Party B</span>
            <span className="field__control">
              <Icon name="user" size={16} className="field__icon" />
              <input
                type="text"
                placeholder="Second Party name"
                value={form.party2}
                onChange={onChange('party2')}
              />
            </span>
          </label>
        </div>

        <div className="stack-form__row">
          <label className="field">
            <span className="field__label">Effective date</span>
            <span className="field__control">
              <Icon name="clock" size={16} className="field__icon" />
              <input
                type="date"
                value={form.effective}
                onChange={onChange('effective')}
              />
            </span>
          </label>
          <label className="field">
            <span className="field__label">Jurisdiction</span>
            <span className="field__control">
              <Icon name="pin" size={16} className="field__icon" />
              <input
                type="text"
                value={form.jurisdiction}
                onChange={onChange('jurisdiction')}
              />
            </span>
          </label>
        </div>

        <label className="field">
          <span className="field__label">
            Consideration / Subject matter <small className="field__opt">optional</small>
          </span>
          <span className="field__control docs-textarea-control">
            <Icon name="receipt" size={16} className="field__icon docs-textarea-icon" />
            <textarea
              rows={3}
              placeholder="Fee, asset, scope of work, or subject of the document…"
              value={form.consideration}
              onChange={onChange('consideration')}
              className="docs-textarea"
            />
          </span>
        </label>

        <div className="stack-form__actions">
          <button type="button" className="btn btn--soft btn--sm" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn--primary btn--sm"
            disabled={!form.template || building}
          >
            {building ? 'Generating…' : 'Generate PDF'} <Icon name="download" />
          </button>
        </div>
      </div>
    </form>
  )
}
