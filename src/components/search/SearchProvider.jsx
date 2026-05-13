import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { SearchContext } from './searchContext'
import { buildIndex } from './searchIndex'
import CommandPalette from './CommandPalette'

/* Provides the open-state for the command palette + a stable
 * search index. Mounts the palette inline so consumers only
 * need useSearch().open(). */
export default function SearchProvider({ children }) {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  const items = useMemo(
    () => buildIndex({ onSignOut: handleSignOut }),
    [handleSignOut],
  )

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  /* Global ⌘K / Ctrl+K opens the palette from anywhere. */
  useEffect(() => {
    const onKey = (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
      if (!isCmdK) return
      e.preventDefault()
      toggle()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [toggle])

  const select = useCallback((item) => {
    if (item.onSelect) item.onSelect()
    if (item.to) navigate(item.to)
    setIsOpen(false)
  }, [navigate])

  const value = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle],
  )

  return (
    <SearchContext.Provider value={value}>
      {children}
      <CommandPalette
        isOpen={isOpen}
        onClose={close}
        items={items}
        onSelect={select}
      />
    </SearchContext.Provider>
  )
}
