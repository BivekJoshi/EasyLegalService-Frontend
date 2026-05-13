/* Catalogue of available themes. The `id` matches the value
 * applied as data-theme on the dashboard root. Swatches drive
 * the toggle's preview chips and are illustrative only. */
export const THEMES = [
  {
    id: 'parchment',
    name: 'Parchment',
    description: 'Warm cream paper, navy ink, gold accents.',
    mood: 'light',
    swatches: ['#fdfaf3', '#061230', '#c9a55c'],
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep navy night with brass highlights.',
    mood: 'dark',
    swatches: ['#0a0f24', '#f5f7ff', '#d8b97a'],
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Cool minimalist greys for focused work.',
    mood: 'light',
    swatches: ['#f1f5f9', '#0f172a', '#c9a55c'],
  },
  {
    id: 'sepia',
    name: 'Sepia',
    description: 'Vintage warm tones with library feel.',
    mood: 'light',
    swatches: ['#f4ebe0', '#3c2c1f', '#a87a4e'],
  },
]

export const DEFAULT_THEME_ID = 'parchment'

export const isValidThemeId = (id) => THEMES.some((t) => t.id === id)
