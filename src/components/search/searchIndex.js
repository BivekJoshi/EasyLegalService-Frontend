import { CLIENT_SEED, CASE_SEED, DOCUMENT_SEED } from '../../data/seed'
import { SECTIONS } from '../../pages/app/Sidebar/nav'

/* Walks the sidebar SECTIONS tree and emits a "page" index entry
 * for every navigable leaf — including children inside groups. */
function collectNavLeaves() {
  const out = []
  for (const section of SECTIONS) {
    for (const item of section.items) {
      walk(item, null, section.label, [], out)
    }
  }
  return out
}
function walk(item, parent, sectionLabel, trail, out) {
  if (item.disabled) return
  if (item.to) {
    const breadcrumb = trail.length
      ? `${sectionLabel} · ${trail.join(' › ')}`
      : sectionLabel
    out.push({
      type: 'page',
      id: 'nav-' + item.id,
      title: item.label,
      subtitle: breadcrumb,
      icon: item.icon || parent?.icon || 'grid',
      to: item.to,
      keywords: [sectionLabel, ...trail, parent?.label].filter(Boolean),
    })
  }
  if (item.children) {
    for (const child of item.children) {
      walk(child, item, sectionLabel, [...trail, item.label], out)
    }
  }
}

/* Builds the full searchable index. Some action items need
 * callbacks (e.g. Sign out) — those are passed in by the
 * SearchProvider, which has the auth context handy. */
export function buildIndex({ onSignOut }) {
  return [
    /* ---- Pages: auto-derived from the sidebar nav tree ---- */
    ...collectNavLeaves(),

    /* ---- Actions ---- */
    { type: 'action', id: 'act-new-client', title: 'New client',         subtitle: 'Open the client intake form', icon: 'plus',   to: '/app/clients',   keywords: ['create', 'add', 'intake'] },
    { type: 'action', id: 'act-new-case',   title: 'New matter',         subtitle: 'Open a case',                  icon: 'plus',   to: '/app/cases',     keywords: ['create', 'add', 'open case'] },
    { type: 'action', id: 'act-new-doc',    title: 'Generate document',  subtitle: 'From a template',              icon: 'plus',   to: '/app/documents', keywords: ['create', 'pdf', 'new doc', 'generate'] },
    { type: 'action', id: 'act-signout',    title: 'Sign out',           subtitle: 'End your session',             icon: 'logout', to: '/login',         keywords: ['logout', 'leave'], onSelect: onSignOut },

    /* ---- Clients ---- */
    ...CLIENT_SEED.map((c) => ({
      type: 'client',
      id: 'client-' + c.id,
      title: c.name,
      subtitle: `${c.type} · ${c.email}`,
      icon: 'users',
      to: '/app/clients',
      keywords: [c.id, c.phone, c.type],
    })),

    /* ---- Cases ---- */
    ...CASE_SEED.map((c) => ({
      type: 'case',
      id: 'case-' + c.id,
      title: c.title,
      subtitle: `${c.id} · ${c.client}`,
      icon: 'briefcase',
      to: '/app/cases',
      keywords: [c.area, c.status, c.lead],
    })),

    /* ---- Documents ---- */
    ...DOCUMENT_SEED.map((d) => ({
      type: 'document',
      id: 'doc-' + d.id,
      title: d.title,
      subtitle: `${d.template} · ${d.client}`,
      icon: 'pdf',
      to: '/app/documents',
      keywords: [d.id, d.status, d.author, d.template],
    })),
  ]
}

const TYPE_LABEL = {
  page:     'Pages',
  action:   'Actions',
  client:   'Clients',
  case:     'Cases',
  document: 'Documents',
}

const TYPE_ORDER = ['page', 'action', 'client', 'case', 'document']

/* Substring-scored search. Empty query → just pages + actions
 * (the most useful jump targets when the user just opened the palette). */
export function searchItems(items, query) {
  const q = query.trim().toLowerCase()

  if (!q) {
    return items.filter((i) => i.type === 'page' || i.type === 'action')
  }

  const scored = []
  for (const item of items) {
    const title = item.title.toLowerCase()
    const subtitle = (item.subtitle || '').toLowerCase()
    const keywords = (item.keywords || []).join(' ').toLowerCase()

    let score = 0
    if (title.startsWith(q))           score = 100
    else if (title.includes(q))        score = 80
    else if (subtitle.startsWith(q))   score = 60
    else if (subtitle.includes(q))     score = 40
    else if (keywords.includes(q))     score = 25

    if (score > 0) scored.push({ item, score })
  }

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 30).map((s) => s.item)
}

/* Groups in TYPE_ORDER, preserving each group's internal order. */
export function groupByType(items) {
  const groups = new Map()
  for (const item of items) {
    if (!groups.has(item.type)) groups.set(item.type, [])
    groups.get(item.type).push(item)
  }
  return TYPE_ORDER
    .filter((t) => groups.has(t))
    .map((t) => ({ type: t, label: TYPE_LABEL[t], items: groups.get(t) }))
}
