import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

export default function AgentCard({ agent }) {
  return (
    <Link to={`/agents/${agent.slug}`} className="card group overflow-hidden hover:shadow-lift hover:-translate-y-1 block">
      <div className="relative aspect-square overflow-hidden rounded-t-xl2">
        <img
          src={agent.photo}
          alt={agent.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-bold text-navy-dark group-hover:text-navy transition-colors">{agent.name}</h3>
        <p className="text-muted text-sm mb-1">{agent.role}</p>
        <p className="text-muted text-xs mb-3">{agent.location}</p>
        <div className="flex items-center gap-3 text-xs text-muted mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" /> {agent.rating}
          </span>
          <span>·</span>
          <span>{agent.propertiesListed} listings</span>
          <span>·</span>
          <span>{agent.experience} yrs</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="btn-outline !py-2 !px-4 !text-xs flex-1">View Profile</span>
          <span className="w-9 h-9 rounded-xl bg-beige group-hover:bg-navy flex items-center justify-center transition-colors shrink-0">
            <MessageCircle className="w-4 h-4 text-navy group-hover:text-white transition-colors" />
          </span>
        </div>
      </div>
    </Link>
  )
}
