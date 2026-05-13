/* ============================================================
   Sidebar menu config.
   ----
   Schema:
     { id, label, icon?, badge?, to?, end?, disabled?, children? }
   • Leaf:  has `to` (and optionally `end` for exact match).
   • Group: has `children` instead of `to`. A group is purely
            expandable — its first child should be the canonical
            "All …" route so the section still has an entry point.
   • Either kind may have `badge`, `icon`, or `disabled`.

   To add a new item, edit this file — components below auto-render.
   ============================================================ */
export const SECTIONS = [
  {
    label: 'Workspace',
    items: [
      { id: 'overview', to: '/app',          label: 'Overview', icon: 'grid',      end: true },
      { id: 'clients',  to: '/app/clients',  label: 'Clients',  icon: 'users' },
      { id: 'cases',    to: '/app/cases',    label: 'Cases',    icon: 'briefcase' },
      {
        id: 'documents',
        label: 'Documents',
        icon: 'file',
        badge: '3',
        children: [
          { id: 'docs-all',       to: '/app/documents', label: 'All documents', end: true },
          { id: 'docs-templates', label: 'Templates',   disabled: true },
          { id: 'docs-drafts',    label: 'Drafts',      disabled: true, badge: '2' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      {
        id: 'library',
        label: 'Library',
        icon: 'bookmark',
        children: [
          { id: 'lib-snippets', label: 'Snippets', disabled: true },
          { id: 'lib-forms',    label: 'Forms',    disabled: true },
        ],
      },
      { id: 'inbox', label: 'Inbox', icon: 'inbox', disabled: true, badge: '12' },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'settings', label: 'Settings', icon: 'cog',            disabled: true },
      { id: 'help',     label: 'Help',     icon: 'questionCircle', disabled: true },
    ],
  },
]

/* Walks an item (and its descendants) — true if any leaf's `to`
 * matches the given pathname. Used by NavGroup to highlight
 * itself and auto-open when one of its children is active. */
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
