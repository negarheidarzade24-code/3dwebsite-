import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const { showToast } = useToast()
  const navigate = useNavigate()

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    showToast(mode === 'login' ? 'Welcome back!' : 'Account created successfully!')
    navigate('/profile')
  }

  return (
    <div className="py-12 lg:py-20">
      <div className="container-x max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
              <Home className="w-5 h-5 text-gold" strokeWidth={2.5} />
            </div>
            <span className="font-serif text-xl font-bold text-navy-dark">Everhome</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-navy-dark mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted text-sm">
            {mode === 'login' ? 'Sign in to access your account' : 'Join Everhome to find your dream home'}
          </p>
        </div>

        <form onSubmit={submit} className="card p-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className="input pl-10" />
              </div>
            </div>
          )}
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className="input pl-10" />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input type={showPassword ? 'text' : 'password'} required value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="••••••••" className="input pl-10 pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-navy">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {mode === 'login' && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted">
                <input type="checkbox" className="accent-navy" /> Remember me
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent!') }} className="text-navy hover:underline">Forgot password?</a>
            </div>
          )}
          <button type="submit" className="btn-primary w-full">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-5">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-navy font-semibold hover:underline">
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
