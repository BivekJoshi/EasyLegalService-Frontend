import Icon from '../../../components/ui/Icon'
import { TEMPLATES, groupFieldsBySection } from './templates'

/* Renders the right input for a single field declared on a template. */
function FieldInput({ field, value, onChange }) {
  const common = {
    placeholder: field.placeholder,
    value: value ?? '',
    onChange,
  }
  if (field.type === 'date') return <input type="date" {...common} />
  if (field.type === 'textarea') {
    return (
      <textarea
        rows={3}
        className="docs-textarea"
        {...common}
      />
    )
  }
  return <input type="text" {...common} />
}

function FieldRow({ field, value, onChange }) {
  const isTextarea = field.type === 'textarea'
  return (
    <label className={`field field-span--${field.span ?? 'half'}`}>
      <span className="field__label">
        {field.label}
        {field.optional && <small className="field__opt">optional</small>}
      </span>
      <span
        className={`field__control ${isTextarea ? 'docs-textarea-control' : ''}`}
      >
        {field.icon && (
          <Icon
            name={field.icon}
            size={16}
            className={`field__icon ${isTextarea ? 'docs-textarea-icon' : ''}`}
          />
        )}
        <FieldInput field={field} value={value} onChange={onChange} />
      </span>
    </label>
  )
}

export default function DocumentForm({
  form,
  selectedTemplate,
  building,
  onChange,
  onSelectTemplate,
  onSubmit,
  onCancel,
}) {
  const sections = groupFieldsBySection(selectedTemplate?.fields)

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

      {/* -------- Step 2 · Dynamic fields (driven by selectedTemplate.fields) -------- */}
      {selectedTemplate && sections.length > 0 && (
        <>
          <div className="card__head docs-step2-head">
            <h3>Step 2 · Fill the document</h3>
            <span className="card__head-sub">Inputs merge into the PDF as you type</span>
          </div>

          {sections.map((section) => (
            <div key={section.name} className="docs-form-section">
              <div className="docs-form-section__title">{section.name}</div>
              <div className="docs-form-grid">
                {section.fields.map((field) => (
                  <FieldRow
                    key={field.key}
                    field={field}
                    value={form[field.key]}
                    onChange={onChange(field.key)}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}

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
    </form>
  )
}
