import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

export default function LocationCard({ location }) {
  return (
    <Link
      to="/properties"
      className="group relative aspect-[3/4] rounded-xl2 overflow-hidden block"
    >
      <img
        src={location.image}
        alt={location.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-serif text-xl font-bold text-white flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-gold" /> {location.name}
        </h3>
        <p className="text-white/70 text-sm">{location.count} Properties</p>
      </div>
    </Link>
  )
}
