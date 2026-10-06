import { Link } from 'react-router-dom'
import { Home, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, Send } from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'

export default function Footer() {
  const { showToast } = useToast()

  const handleSubscribe = (e) => {
    e.preventDefault()
    showToast('Subscribed! You\'ll receive our latest property updates.')
    e.target.reset()
  }

  return (
    <footer className="bg-navy-dark text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-x py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-1">Stay in the Loop</h3>
              <p className="text-white/60 text-sm">Get the latest property listings and market insights delivered to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold"
              />
              <button type="submit" className="btn-gold shrink-0">
                <Send className="w-4 h-4" /> Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-x py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Home className="w-5 h-5 text-gold" strokeWidth={2.5} />
              </div>
              <div className="leading-none">
                <span className="font-serif text-xl font-bold block">Everhome</span>
                <span className="text-[9px] tracking-[0.2em] text-white/40 font-semibold">BUY · SELL · RENT</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Your trusted partner for finding exceptional homes and investment properties across India.
            </p>
            <div className="flex gap-2">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => { e.preventDefault(); showToast('Follow us on social media!') }}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Properties', path: '/properties' },
                { label: 'Buy', path: '/buy' },
                { label: 'Rent', path: '/rent' },
                { label: 'Sell', path: '/sell' },
                { label: 'Agents', path: '/agents' },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-white/50 text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gold">Resources</h4>
            <ul className="space-y-2.5">
              {['Blog', 'FAQs', 'Privacy Policy', 'Terms & Conditions', 'About Us', 'Contact'].map((l) => (
                <li key={l}>
                  <Link to={l === 'About Us' ? '/about' : l === 'Contact' ? '/contact' : '/properties'} className="text-white/50 text-sm hover:text-white transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gold">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/50 text-sm">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" /> +91 1800 123 4567
              </li>
              <li className="flex items-start gap-2.5 text-white/50 text-sm">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" /> hello@everhome.com
              </li>
              <li className="flex items-start gap-2.5 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Everhome Tower, Bandra Kurla Complex, Mumbai 400051
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">© 2026 Everhome. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" className="text-white/40 text-xs hover:text-white transition-colors">Privacy</Link>
            <Link to="/" className="text-white/40 text-xs hover:text-white transition-colors">Terms</Link>
            <Link to="/" className="text-white/40 text-xs hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
