/* ============================================================
   Sidebar menu config.
   ----
   Schema:
     { id, labelKey, sectionKey, icon?, badge?, to?, end?, disabled?, children? }
   • Leaf:  has `to` (and optionally `end` for exact match).
   • Group: has `children` instead of `to`. A group is purely
            expandable — its first child should be the canonical
            "All …" route so the section still has an entry point.
   • `labelKey` resolves through react-i18next so menu items
     translate automatically (English ↔ Nepali ↔ etc.).
   ============================================================ */
export const SECTIONS = [
  {
    sectionKey: 'section.workspace',
    items: [
      { id: 'overview', to: '/app',          labelKey: 'nav.overview', icon: 'grid',      end: true },
      { id: 'clients',  to: '/app/clients',  labelKey: 'nav.clients',  icon: 'users' },
      { id: 'cases',    to: '/app/cases',    labelKey: 'nav.cases',    icon: 'briefcase' },
      {
        id: 'documents',
        labelKey: 'nav.documents',
        icon: 'file',
        badge: '3',
        children: [
          { id: 'docs-all',       to: '/app/documents', labelKey: 'nav.allDocuments', end: true },
          { id: 'docs-templates', labelKey: 'nav.templates', disabled: true },
          { id: 'docs-drafts',    labelKey: 'nav.drafts',    disabled: true, badge: '2' },
        ],
      },
    ],
  },
  {
    sectionKey: 'section.resources',
    items: [
      {
        id: 'library',
        labelKey: 'nav.library',
        icon: 'bookmark',
        children: [
          { id: 'lib-snippets', labelKey: 'nav.snippets', disabled: true },
          { id: 'lib-forms',    labelKey: 'nav.forms',    disabled: true },
        ],
      },
      { id: 'inbox', labelKey: 'nav.inbox', icon: 'inbox', disabled: true, badge: '12' },
    ],
  },
  {
    sectionKey: 'section.account',
    items: [
      { id: 'settings', labelKey: 'nav.settings', icon: 'cog',            disabled: true },
      { id: 'help',     labelKey: 'nav.help',     icon: 'questionCircle', disabled: true },
    ],
  },
]

export function containsActivePath(item, pathname) {
  if (item.to) {
    if (item.end) return pathname === item.to
    return pathname === item.to || pathname.startsWith(item.to + '/')
  }
  if (item.children) {
    return item.children.some((c) => containsActivePath(c, pathname))
  }
  return false
}
