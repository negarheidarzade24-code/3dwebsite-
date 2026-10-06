import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Heart, User, Menu, X, Home } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Properties', path: '/properties' },
  { label: 'Buy', path: '/buy' },
  { label: 'Rent', path: '/rent' },
  { label: 'Agents', path: '/agents' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count } = useFavorites()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-border'
            : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="container-x">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-20'}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center">
                <Home className="w-5 h-5 text-gold" strokeWidth={2.5} />
              </div>
              <div className="leading-none">
                <span className="font-serif text-xl font-bold text-navy-dark block">Everhome</span>
                <span className="text-[9px] tracking-[0.2em] text-muted font-semibold">BUY · SELL · RENT</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path))
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                      active ? 'text-navy bg-beige' : 'text-ink hover:text-navy hover:bg-beige/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/favorites"
                className="relative p-2.5 rounded-lg hover:bg-beige transition-colors"
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5 text-navy" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] h-[18px] bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className="hidden sm:block p-2.5 rounded-lg hover:bg-beige transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-navy" />
              </Link>
              <button
                onClick={() => navigate('/sell')}
                className="hidden md:inline-flex btn-primary !py-2.5 !px-5"
              >
                List Your Property
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-lg hover:bg-beige transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5 text-navy" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-navy-dark/40 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-lift animate-slide-up flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
                  <Home className="w-4 h-4 text-gold" strokeWidth={2.5} />
                </div>
                <span className="font-serif text-lg font-bold text-navy-dark">Everhome</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-beige">
                <X className="w-5 h-5 text-navy" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navLinks.map((link) => {
                const active = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path))
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active ? 'text-navy bg-beige' : 'text-ink hover:bg-beige/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-3 mt-3 border-t border-border space-y-1">
                <Link to="/favorites" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-ink hover:bg-beige/60">
                  <Heart className="w-4 h-4" /> Favorites {count > 0 && `(${count})`}
                </Link>
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-ink hover:bg-beige/60">
                  <User className="w-4 h-4" /> My Account
                </Link>
              </div>
            </nav>
            <div className="p-4 border-t border-border">
              <Link to="/sell" className="btn-primary w-full">List Your Property</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
