import { Link } from 'react-router-dom'
import { Heart, Bed, Bath, Maximize, MapPin, ArrowRight } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const fav = isFavorite(property.id)

  const handleFav = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(property.id)
    showToast(fav ? 'Removed from favorites' : 'Added to favorites', fav ? 'info' : 'success')
  }

  return (
    <Link
      to={`/properties/${property.slug}`}
      className="card group overflow-hidden hover:shadow-lift hover:-translate-y-1 block"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl2">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className={`badge absolute top-3 left-3 ${property.status === 'For Sale' ? 'bg-navy text-white' : 'bg-gold text-white'}`}>
          {property.status}
        </span>
        <button
          onClick={handleFav}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all hover:scale-110"
        >
          <Heart
            className={`w-4.5 h-4.5 transition-all ${fav ? 'fill-red-500 text-red-500 scale-110' : 'text-navy'}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-lg font-bold text-navy-dark leading-tight group-hover:text-navy transition-colors">
            {property.title}
          </h3>
        </div>
        <p className="flex items-center gap-1 text-muted text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" /> {property.location}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-muted text-xs mb-4 pb-4 border-b border-border">
          <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {property.bedrooms || '—'}</span>
          <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {property.bathrooms}</span>
          <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {property.area.toLocaleString()} sq ft</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-navy">{property.priceDisplay}</span>
          <span className="w-9 h-9 rounded-xl bg-beige group-hover:bg-navy flex items-center justify-center transition-colors">
            <ArrowRight className="w-4 h-4 text-navy group-hover:text-white transition-colors" />
          </span>
        </div>
      </div>
    </Link>
  )
}
