import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Home, Building, User, Mail, Calendar, Settings, LogOut } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { properties } from '../data/properties.js'
import PropertyCard from '../components/PropertyCard.jsx'
import { useToast } from '../context/ToastContext.jsx'

const navItems = [
  { id: 'saved', label: 'Saved Properties', icon: Heart },
  { id: 'viewed', label: 'Recently Viewed', icon: Home },
  { id: 'listings', label: 'My Listings', icon: Building },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'messages', label: 'Messages', icon: Mail },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Profile() {
  const [active, setActive] = useState('saved')
  const { favorites } = useFavorites()
  const { showToast } = useToast()

  const savedProperties = properties.filter((p) => favorites.includes(p.id))
  const recentProperties = properties.slice(0, 3)

  return (
    <div className="py-8 lg:py-12">
      <div className="container-x">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-5 sticky top-24">
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-white font-bold text-lg">U</div>
                <div>
                  <p className="font-semibold text-navy-dark">Welcome back</p>
                  <p className="text-muted text-xs">user@everhome.com</p>
                </div>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active === item.id ? 'bg-navy text-white' : 'text-ink hover:bg-beige'
                    }`}
                  >
                    <item.icon className="w-4 h-4" /> {item.label}
                    {item.id === 'saved' && favorites.length > 0 && (
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${active === item.id ? 'bg-white/20' : 'bg-beige'}`}>{favorites.length}</span>
                    )}
                  </button>
                ))}
              </nav>
              <button onClick={() => showToast('Logged out successfully')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-4 pt-4 border-t border-border">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {active === 'saved' && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-dark mb-6">Saved Properties</h2>
                {savedProperties.length === 0 ? (
                  <div className="card p-10 text-center">
                    <Heart className="w-10 h-10 text-muted mx-auto mb-3" />
                    <p className="text-muted mb-4">No saved properties yet.</p>
                    <Link to="/properties" className="btn-primary">Browse Properties</Link>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {savedProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
                  </div>
                )}
              </div>
            )}
            {active === 'viewed' && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-dark mb-6">Recently Viewed</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {recentProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
                </div>
              </div>
            )}
            {active === 'listings' && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-dark mb-6">My Listings</h2>
                <div className="card p-10 text-center">
                  <Building className="w-10 h-10 text-muted mx-auto mb-3" />
                  <p className="text-muted mb-4">You haven't listed any properties yet.</p>
                  <Link to="/sell" className="btn-primary">List Your Property</Link>
                </div>
              </div>
            )}
            {active === 'profile' && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-dark mb-6">Profile Settings</h2>
                <div className="card p-6 space-y-4">
                  {['Full Name', 'Email', 'Phone', 'City'].map((f) => (
                    <div key={f}>
                      <label className="label">{f}</label>
                      <input type="text" defaultValue={f === 'Email' ? 'user@everhome.com' : ''} placeholder={`Enter your ${f.toLowerCase()}`} className="input" />
                    </div>
                  ))}
                  <button onClick={() => showToast('Profile updated successfully')} className="btn-primary">Save Changes</button>
                </div>
              </div>
            )}
            {active === 'messages' && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-dark mb-6">Messages</h2>
                <div className="card p-10 text-center">
                  <Mail className="w-10 h-10 text-muted mx-auto mb-3" />
                  <p className="text-muted">No messages yet.</p>
                </div>
              </div>
            )}
            {active === 'appointments' && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-dark mb-6">Appointment Requests</h2>
                <div className="card p-10 text-center">
                  <Calendar className="w-10 h-10 text-muted mx-auto mb-3" />
                  <p className="text-muted">No appointment requests yet.</p>
                </div>
              </div>
            )}
            {active === 'settings' && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-dark mb-6">Settings</h2>
                <div className="card p-6 space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-navy-dark">Email notifications</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-navy" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-navy-dark">SMS alerts</span>
                    <input type="checkbox" className="w-5 h-5 accent-navy" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-navy-dark">Marketing emails</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-navy" />
                  </label>
                  <button onClick={() => showToast('Settings saved')} className="btn-primary">Save Settings</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
