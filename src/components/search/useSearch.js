import { useContext } from 'react'
import { SearchContext } from './searchContext'

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used inside <SearchProvider>')
  return ctx
}
