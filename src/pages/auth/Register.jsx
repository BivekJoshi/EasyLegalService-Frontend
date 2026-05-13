import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Icon from '../../components/ui/Icon'
import { useAuth } from '../../auth/useAuth'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', firm: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [accept, setAccept] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) {
      setError('Please complete the required fields.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (!accept) {
      setError('Please accept the terms to continue.')
      return
    }
    setLoading(true)
    try {
      await signUp(form)
      navigate('/app', { replace: true })
    } catch {
      setError('Could not create your account. Try again.')
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
        <div className="eyebrow">Create account</div>
        <h2>Open your chamber.</h2>
        <p>Set up your workspace — clients, matters, and documents in one place.</p>
      </div>

      <form className="auth-form__body" onSubmit={submit} noValidate>
        <div className="auth-form__grid">
          <label className="field">
            <span className="field__label">Full name</span>
            <span className="field__control">
              <Icon name="user" size={16} className="field__icon" />
              <input
                type="text"
                autoComplete="name"
                placeholder="Adv. Ramesh Shrestha"
                value={form.name}
                onChange={update('name')}
                required
              />
            </span>
          </label>

          <label className="field">
            <span className="field__label">Firm <small className="field__opt">optional</small></span>
            <span className="field__control">
              <Icon name="building" size={16} className="field__icon" />
              <input
                type="text"
                placeholder="Shrestha & Partners"
                value={form.firm}
                onChange={update('firm')}
              />
            </span>
          </label>
        </div>

        <label className="field">
          <span className="field__label">Work email</span>
          <span className="field__control">
            <Icon name="mail" size={16} className="field__icon" />
            <input
              type="email"
              autoComplete="email"
              placeholder="counsel@firm.com"
              value={form.email}
              onChange={update('email')}
              required
            />
          </span>
        </label>

        <label className="field">
          <span className="field__label">Password</span>
          <span className="field__control">
            <Icon name="lock" size={16} className="field__icon" />
            <input
              type={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={update('password')}
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

        <label className="check check--terms">
          <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
          <span />
          I agree to the <Link to="#">Terms</Link> and <Link to="#">Privacy Policy</Link>.
        </label>

        {error && <div className="auth-form__error">{error}</div>}

        <button type="submit" className="btn btn--primary auth-form__submit" disabled={loading}>
          {loading ? 'Creating your chamber…' : 'Create account'} <Icon name="arrow" />
        </button>

        <p className="auth-form__alt">
          Already a member? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </motion.div>
  )
}
