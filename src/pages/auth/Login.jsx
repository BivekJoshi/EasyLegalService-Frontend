import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Icon from '../../components/ui/Icon'
import { useAuth } from '../../auth/useAuth'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/app'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in both fields.')
      return
    }
    setLoading(true)
    try {
      await signIn({ email, remember })
      navigate(redirectTo, { replace: true })
    } catch {
      setError('Could not sign you in. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="auth-form"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="auth-form__head">
        <div className="eyebrow">Sign in</div>
        <h2>Welcome back, counsel.</h2>
        <p>Enter your credentials to open your chamber.</p>
      </div>

      <form className="auth-form__body" onSubmit={submit} noValidate>
        <label className="field">
          <span className="field__label">Email</span>
          <span className="field__control">
            <Icon name="mail" size={16} className="field__icon" />
            <input
              type="email"
              autoComplete="email"
              placeholder="counsel@firm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </span>
        </label>

        <label className="field">
          <span className="field__label">
            Password
            <Link to="#" className="field__hint">Forgot?</Link>
          </span>
          <span className="field__control">
            <Icon name="lock" size={16} className="field__icon" />
            <input
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="field__toggle"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPw ? 'eyeOff' : 'eye'} size={16} />
            </button>
          </span>
        </label>

        <div className="auth-form__row">
          <label className="check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span />
            Keep me signed in
          </label>
        </div>

        {error && <div className="auth-form__error">{error}</div>}

        <button type="submit" className="btn btn--primary auth-form__submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'} <Icon name="arrow" />
        </button>

        <div className="auth-form__divider"><span>or</span></div>

        <p className="auth-form__alt">
          New to Easy Legal? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </motion.div>
  )
}
