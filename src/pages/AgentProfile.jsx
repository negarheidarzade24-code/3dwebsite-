import { useParams, Link } from 'react-router-dom'
import { Star, Phone, Mail, MessageCircle, MapPin, Briefcase, Home, Award, Check } from 'lucide-react'
import { getAgentBySlug } from '../data/agents.js'
import { getPropertiesByAgent } from '../data/properties.js'
import PropertyCard from '../components/PropertyCard.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function AgentProfile() {
  const { slug } = useParams()
  const agent = getAgentBySlug(slug)
  const { showToast } = useToast()

  if (!agent) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-navy-dark mb-4">Agent Not Found</h1>
        <Link to="/agents" className="btn-primary">Browse Agents</Link>
      </div>
    )
  }

  const listings = getPropertiesByAgent(agent.id)

  return (
    <div className="py-8 lg:py-12">
      <div className="container-x">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link to="/" className="hover:text-navy">Home</Link>
          <span>/</span>
          <Link to="/agents" className="hover:text-navy">Agents</Link>
          <span>/</span>
          <span className="text-navy-dark font-medium">{agent.name}</span>
        </div>

        {/* Profile header */}
        <div className="card p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <img src={agent.photo} alt={agent.name} className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shrink-0 mx-auto md:mx-0" />
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-serif text-3xl font-bold text-navy-dark mb-1">{agent.name}</h1>
              <p className="text-muted mb-2">{agent.role}</p>
              <p className="flex items-center gap-1.5 text-muted text-sm justify-center md:justify-start">
                <MapPin className="w-4 h-4" /> {agent.location}
              </p>
              <div className="flex items-center gap-4 mt-3 justify-center md:justify-start">
                <span className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 fill-gold text-gold" /> {agent.rating} ({agent.reviews} reviews)</span>
                <span className="flex items-center gap-1 text-sm"><Briefcase className="w-4 h-4 text-muted" /> {agent.experience} years</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                {agent.specializations.map((s) => (
                  <span key={s} className="badge bg-beige text-gold-dark">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex md:flex-col gap-2 justify-center md:justify-start">
              <button onClick={() => showToast('Contact request sent!')} className="btn-primary">Contact</button>
              <a href={`tel:${agent.phone}`} className="btn-outline !px-3"><Phone className="w-4 h-4" /></a>
              <a href={`mailto:${agent.email}`} className="btn-outline !px-3"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Home, label: 'Active Listings', value: agent.propertiesListed },
            { icon: Award, label: 'Properties Sold', value: agent.propertiesSold },
            { icon: Star, label: 'Rating', value: agent.rating },
            { icon: Briefcase, label: 'Experience', value: `${agent.experience} yrs` },
          ].map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <s.icon className="w-6 h-6 text-gold mx-auto mb-2" strokeWidth={1.5} />
              <p className="font-serif text-2xl font-bold text-navy">{s.value}</p>
              <p className="text-muted text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="card p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-navy-dark mb-3">About {agent.name}</h2>
          <p className="text-muted leading-relaxed">{agent.bio}</p>
        </div>

        {/* Contact info */}
        <div className="card p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-navy-dark mb-4">Contact Information</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href={`tel:${agent.phone}`} className="flex items-center gap-3 p-4 rounded-xl bg-cream border border-border hover:border-navy transition-colors">
              <Phone className="w-5 h-5 text-navy" />
              <div><p className="text-xs text-muted">Phone</p><p className="text-sm font-medium text-navy-dark">{agent.phone}</p></div>
            </a>
            <a href={`mailto:${agent.email}`} className="flex items-center gap-3 p-4 rounded-xl bg-cream border border-border hover:border-navy transition-colors">
              <Mail className="w-5 h-5 text-navy" />
              <div><p className="text-xs text-muted">Email</p><p className="text-sm font-medium text-navy-dark">{agent.email}</p></div>
            </a>
            <a href={`https://wa.me/${agent.whatsapp.replace(/\s/g, '')}`} className="flex items-center gap-3 p-4 rounded-xl bg-cream border border-border hover:border-navy transition-colors">
              <MessageCircle className="w-5 h-5 text-navy" />
              <div><p className="text-xs text-muted">WhatsApp</p><p className="text-sm font-medium text-navy-dark">Chat now</p></div>
            </a>
          </div>
        </div>

        {/* Active listings */}
        {listings.length > 0 && (
          <div>
            <h2 className="section-title mb-6">Active Listings ({listings.length})</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
