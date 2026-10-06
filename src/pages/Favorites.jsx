import { Link } from 'react-router-dom'
import { Heart, Search } from 'lucide-react'
import PropertyCard from '../components/PropertyCard.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { properties } from '../data/properties.js'

export default function Favorites() {
  const { favorites } = useFavorites()
  const savedProperties = properties.filter((p) => favorites.includes(p.id))

  return (
    <div className="py-8 lg:py-12">
      <div className="container-x">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-dark mb-2">Your Favorites</h1>
          <p className="text-muted">{savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved</p>
        </div>

        {savedProperties.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-muted" />
            </div>
            <h3 className="font-serif text-xl font-bold text-navy-dark mb-2">You haven't saved any properties yet</h3>
            <p className="text-muted text-sm mb-6 max-w-sm mx-auto">Tap the heart icon on any property to save it here for later.</p>
            <Link to="/properties" className="btn-primary">
              <Search className="w-4 h-4" /> Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
