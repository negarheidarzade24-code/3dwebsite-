import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Heart, Bed, Bath, Maximize, Car, Calendar, Home, MapPin,
  Check, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight, X,
  Share2, ArrowLeft, Star
} from 'lucide-react'
import { getPropertyBySlug, getPropertiesByAgent } from '../data/properties.js'
import { getAgentById } from '../data/agents.js'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import PropertyCard from '../components/PropertyCard.jsx'

export default function PropertyDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const property = getPropertyBySlug(slug)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()

  const [activeImage, setActiveImage] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  if (!property) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-navy-dark mb-4">Property Not Found</h1>
        <p className="text-muted mb-6">The property you're looking for doesn't exist.</p>
        <Link to="/properties" className="btn-primary">Browse Properties</Link>
      </div>
    )
  }

  const agent = getAgentById(property.agentId)
  const fav = isFavorite(property.id)
  const similarProperties = getPropertiesByAgent(property.agentId).filter((p) => p.id !== property.id).slice(0, 3)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'location', label: 'Location' },
  ]

  const stats = [
    { icon: Bed, label: 'Bedrooms', value: property.bedrooms || '—' },
    { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
    { icon: Maximize, label: 'Area', value: `${property.area.toLocaleString()} sq ft` },
    { icon: Car, label: 'Parking', value: property.parking },
    { icon: Home, label: 'Type', value: property.type },
    { icon: Calendar, label: 'Year Built', value: property.yearBuilt },
  ]

  const handleFav = () => {
    toggleFavorite(property.id)
    showToast(fav ? 'Removed from favorites' : 'Added to favorites', fav ? 'info' : 'success')
  }

  const handleContact = (type) => {
    showToast(`${type} request sent! Our agent will respond shortly.`)
  }

  return (
    <div className="py-6 lg:py-10">
      <div className="container-x">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link to="/" className="hover:text-navy">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-navy">Properties</Link>
          <span>/</span>
          <span className="text-navy-dark font-medium">{property.title}</span>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-4 gap-3 mb-8 rounded-2xl overflow-hidden">
          {/* Main image */}
          <div
            className="col-span-4 md:col-span-2 row-span-2 relative aspect-[4/3] md:aspect-auto cursor-pointer group"
            onClick={() => setLightbox(true)}
          >
            <img src={property.images[activeImage]} alt={property.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm bg-navy-dark/60 px-4 py-2 rounded-lg">
                Click to enlarge
              </span>
            </div>
          </div>
          {/* Thumbnails */}
          {property.images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(i + 1)}
              className="relative aspect-square cursor-pointer overflow-hidden group"
            >
              <img src={img} alt={`${property.title} ${i + 2}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              {i === 3 && property.images.length > 5 && (
                <div className="absolute inset-0 bg-navy-dark/60 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">+{property.images.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main content + sidebar */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${property.status === 'For Sale' ? 'bg-navy text-white' : 'bg-gold text-white'}`}>
                    {property.status}
                  </span>
                  <span className="badge bg-beige text-gold-dark">{property.type}</span>
                  <span className="badge bg-beige text-muted">{property.furnished}</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-navy-dark mb-1">{property.title}</h1>
                <p className="flex items-center gap-1.5 text-muted">
                  <MapPin className="w-4 h-4" /> {property.location}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={handleFav} className="w-11 h-11 rounded-xl border border-border bg-white flex items-center justify-center hover:bg-beige transition-colors">
                  <Heart className={`w-5 h-5 ${fav ? 'fill-red-500 text-red-500' : 'text-navy'}`} />
                </button>
                <button onClick={() => showToast('Link copied to clipboard!')} className="w-11 h-11 rounded-xl border border-border bg-white flex items-center justify-center hover:bg-beige transition-colors">
                  <Share2 className="w-5 h-5 text-navy" />
                </button>
              </div>
            </div>

            {/* Price */}
            <p className="font-serif text-3xl font-bold text-navy mb-6">{property.priceDisplay}</p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="card p-4 text-center">
                  <s.icon className="w-5 h-5 text-gold mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-semibold text-navy-dark text-sm">{s.value}</p>
                  <p className="text-muted text-xs">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <div className="flex gap-1 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id ? 'border-navy text-navy' : 'border-transparent text-muted hover:text-navy'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="mb-8">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-navy-dark mb-3">Description</h3>
                    <p className="text-muted leading-relaxed">{property.description}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-navy-dark mb-3">Property Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ['Property Type', property.type],
                        ['Status', property.status],
                        ['Price', property.priceDisplay],
                        ['Furnished', property.furnished],
                        ['Year Built', property.yearBuilt],
                        ['Parking', `${property.parking} spaces`],
                        ['Area', `${property.area.toLocaleString()} sq ft`],
                        ['Bedrooms', property.bedrooms || '—'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted text-sm">{label}</span>
                          <span className="font-medium text-sm text-navy-dark">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'features' && (
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">Property Features</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {property.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 p-3 rounded-xl bg-cream border border-border">
                        <div className="w-6 h-6 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-gold" />
                        </div>
                        <span className="text-sm text-ink">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'amenities' && (
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">Amenities</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {property.amenities.map((a) => (
                      <div key={a} className="flex items-center gap-2.5 p-3 rounded-xl bg-cream border border-border">
                        <div className="w-6 h-6 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-navy" />
                        </div>
                        <span className="text-sm text-ink">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'location' && (
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">Location & Nearby</h3>
                  <div className="rounded-2xl overflow-hidden mb-6 aspect-[16/9] bg-beige flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-navy mx-auto mb-2" />
                      <p className="text-muted text-sm">{property.location}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {property.nearby.map((n) => (
                      <div key={n.name} className="flex items-center justify-between p-3 rounded-xl bg-cream border border-border">
                        <span className="text-sm font-medium text-navy-dark">{n.name}</span>
                        <span className="text-muted text-sm">{n.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Agent info */}
            {agent && (
              <div className="card p-5">
                <h3 className="font-serif text-lg font-bold text-navy-dark mb-4">Listed by</h3>
                <Link to={`/agents/${agent.slug}`} className="flex items-center gap-4 group">
                  <img src={agent.photo} alt={agent.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-navy-dark group-hover:text-navy transition-colors">{agent.name}</p>
                    <p className="text-muted text-sm">{agent.role}</p>
                    <div className="flex items-center gap-1 text-xs text-muted mt-1">
                      <Star className="w-3 h-3 fill-gold text-gold" /> {agent.rating} · {agent.propertiesListed} listings
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Right: Contact card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-navy-dark mb-1">Interested in this property?</h3>
              <p className="text-muted text-sm mb-5">Get in touch with our agent today.</p>

              <div className="space-y-3 mb-5">
                <button onClick={() => handleContact('Schedule visit')} className="btn-primary w-full">
                  Schedule a Visit
                </button>
                <button onClick={() => handleContact('Contact agent')} className="btn-outline w-full">
                  Contact Agent
                </button>
              </div>

              <div className="space-y-2.5 pt-5 border-t border-border">
                {agent && (
                  <>
                    <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-sm text-ink hover:text-navy transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-beige flex items-center justify-center"><Phone className="w-4 h-4 text-navy" /></div>
                      {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-sm text-ink hover:text-navy transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-beige flex items-center justify-center"><Mail className="w-4 h-4 text-navy" /></div>
                      {agent.email}
                    </a>
                    <a href={`https://wa.me/${agent.whatsapp.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-ink hover:text-navy transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-beige flex items-center justify-center"><MessageCircle className="w-4 h-4 text-navy" /></div>
                      WhatsApp
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similarProperties.length > 0 && (
          <div className="mt-14">
            <h2 className="section-title mb-6">Similar Properties</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-navy-dark/95 flex items-center justify-center p-4" onClick={() => setLightbox(false)}>
          <button className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" onClick={() => setLightbox(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute left-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setActiveImage((p) => (p === 0 ? property.images.length - 1 : p - 1)) }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <img src={property.images[activeImage]} alt={property.title} className="max-w-full max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button
            className="absolute right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setActiveImage((p) => (p === property.images.length - 1 ? 0 : p + 1)) }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <p className="absolute bottom-6 text-white/60 text-sm">{activeImage + 1} / {property.images.length}</p>
        </div>
      )}

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border p-4 flex gap-3">
        <button onClick={handleFav} className="w-12 h-12 rounded-xl border border-border flex items-center justify-center shrink-0">
          <Heart className={`w-5 h-5 ${fav ? 'fill-red-500 text-red-500' : 'text-navy'}`} />
        </button>
        <button onClick={() => handleContact('Contact agent')} className="btn-primary flex-1">
          Contact Agent
        </button>
      </div>
    </div>
  )
}
