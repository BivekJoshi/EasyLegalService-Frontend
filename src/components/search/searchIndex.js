import { CLIENT_SEED, CASE_SEED, DOCUMENT_SEED } from '../../data/seed'
import { SECTIONS } from '../../pages/app/Sidebar/nav'

/* Walks the sidebar SECTIONS tree and emits a "page" index entry
 * for every navigable leaf — including children inside groups. */
function collectNavLeaves() {
  const out = []
  for (const section of SECTIONS) {
    for (const item of section.items) {
      walk(item, null, section.sectionKey, [], out)
    }
  }
  return out
}
function walk(item, parent, sectionKey, trail, out) {
  if (item.disabled) return
  if (item.to) {
    out.push({
      type: 'page',
      id: 'nav-' + item.id,
      titleKey: item.labelKey,         // resolves via t() at render time
      subtitleKey: sectionKey,          // breadcrumb-style subtitle
      icon: item.icon || parent?.icon || 'grid',
      to: item.to,
      keywords: [sectionKey, ...trail, parent?.labelKey].filter(Boolean),
    })
  }
  if (item.children) {
    for (const child of item.children) {
      walk(child, item, sectionKey, [...trail, item.labelKey], out)
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
    { type: 'action', id: 'act-new-client', titleKey: 'cmdk.actions.newClientTitle', subtitleKey: 'cmdk.actions.newClientHint', icon: 'plus',   to: '/app/clients',   keywords: ['create', 'add', 'intake', 'नयाँ'] },
    { type: 'action', id: 'act-new-case',   titleKey: 'cmdk.actions.newCaseTitle',   subtitleKey: 'cmdk.actions.newCaseHint',   icon: 'plus',   to: '/app/cases',     keywords: ['create', 'add', 'open case', 'मुद्दा'] },
    { type: 'action', id: 'act-new-doc',    titleKey: 'cmdk.actions.newDocTitle',    subtitleKey: 'cmdk.actions.newDocHint',    icon: 'plus',   to: '/app/documents', keywords: ['create', 'pdf', 'generate', 'कागजात'] },
    { type: 'action', id: 'act-signout',    titleKey: 'cmdk.actions.signOutTitle',   subtitleKey: 'cmdk.actions.signOutHint',   icon: 'logout', to: '/login',         keywords: ['logout', 'leave', 'साइन'], onSelect: onSignOut },

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

/* Translation keys for each group label — read by CommandPalette. */
export const TYPE_LABEL_KEYS = {
  page:     'cmdk.section.page',
  action:   'cmdk.section.action',
  client:   'cmdk.section.client',
  case:     'cmdk.section.case',
  document: 'cmdk.section.document',
}

const TYPE_ORDER = ['page', 'action', 'client', 'case', 'document']

/* Substring-scored search. Empty query → just pages + actions
 * (the most useful jump targets when the user just opened the palette). */
export function searchItems(items, query, resolver = (s) => s) {
  const q = query.trim().toLowerCase()

  if (!q) {
    return items.filter((i) => i.type === 'page' || i.type === 'action')
  }

  const scored = []
  for (const item of items) {
    const resolvedTitle    = item.titleKey    ? resolver(item.titleKey)    : item.title
    const resolvedSubtitle = item.subtitleKey ? resolver(item.subtitleKey) : item.subtitle

    const title    = (resolvedTitle || '').toLowerCase()
    const subtitle = (resolvedSubtitle || '').toLowerCase()
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
    .map((t) => ({ type: t, items: groups.get(t) }))
}
