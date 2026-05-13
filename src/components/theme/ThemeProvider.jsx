import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './themeContext'
import { DEFAULT_THEME_ID, THEMES, isValidThemeId } from './themes'

const STORAGE_KEY = 'els_theme'

function readStoredTheme() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return isValidThemeId(v) ? v : DEFAULT_THEME_ID
  } catch {
    return DEFAULT_THEME_ID
  }
}

/* Owns the current theme id + persistence. Children render the
 * dashboard root which should set `data-theme={theme}` so the
 * CSS overrides in themes.css take effect. */
export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStoredTheme)

  const setTheme = useCallback((id) => {
    if (!isValidThemeId(id)) return
    setThemeState(id)
    try { localStorage.setItem(STORAGE_KEY, id) } catch { /* no-op */ }
  }, [])

  /* Mark <html> with the active theme too — so portal-rendered
   * surfaces (command palette scrim) can pick up the theme even
   * though they sit outside .app in the DOM. */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    return () => {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [theme])

  const value = useMemo(
    () => ({ theme, setTheme, themes: THEMES }),
    [theme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
