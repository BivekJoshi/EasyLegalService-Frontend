import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './context'

/* Lightweight client-side mock auth. Real backend swaps the
 * three functions below for fetch calls — the rest of the app
 * only sees `user` and `signOut`. */

const STORAGE_KEY = 'els_auth'

function readUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readUser())

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const signIn = useCallback(async ({ email }) => {
    const name = email.split('@')[0].replace(/[._-]+/g, ' ')
    setUser({
      email,
      name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
      firm: 'Easy Legal Advocates',
      role: 'Senior Associate',
    })
  }, [])

  const signUp = useCallback(async ({ name, email, firm }) => {
    setUser({ email, name, firm: firm || 'Easy Legal Advocates', role: 'Member' })
  }, [])

  const signOut = useCallback(() => setUser(null), [])

  const value = useMemo(
    () => ({ user, isAuthed: !!user, signIn, signUp, signOut }),
    [user, signIn, signUp, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
