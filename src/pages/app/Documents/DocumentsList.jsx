import Icon from '../../../components/ui/Icon'
import { STATUS_FILTERS, badgeClass } from './templates'

export default function DocumentsList({ docs, filter, onFilter }) {
  return (
    <div className="table-wrap">
      <div className="table-tools">
        <span className="docs-filter-label">Filter by status</span>
        <div className="chip-row">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`chip ${filter === f ? 'is-active' : ''}`}
              onClick={() => onFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {docs.length === 0 ? (
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
            {docs.map((d) => (
              <tr key={d.id}>
                <td>
                  <div className="cell-primary">
                    <div className="cell-avatar docs-pdf-avatar">
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
                <td className="docs-row-actions">
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
  )
}
