import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard.jsx'
import { properties } from '../data/properties.js'

export default function Buy() {
  const navigate = useNavigate()
  const [visibleCount, setVisibleCount] = useState(6)
  const list = useMemo(() => properties.filter((p) => p.status === 'For Sale'), [])

  return (
    <div className="py-8 lg:py-12">
      <div className="container-x">
        <div className="rounded-3xl overflow-hidden bg-navy-dark p-8 md:p-12 mb-8 relative">
          <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1564013799919-ab6000fcffc6?auto=format&fit=crop&w=1200&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative">
            <span className="badge bg-gold/20 text-gold-light mb-3">BUY A PROPERTY</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">Find Your Dream Home to Buy</h1>
            <p className="text-white/70 max-w-lg">Browse verified properties for sale across India's most desirable locations.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.slice(0, visibleCount).map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        {visibleCount < list.length && (
          <div className="text-center mt-8">
            <button onClick={() => setVisibleCount((c) => c + 3)} className="btn-outline">Load More</button>
          </div>
        )}

        <div className="text-center mt-8">
          <button onClick={() => navigate('/properties')} className="text-navy font-semibold text-sm hover:underline">
            View All Properties →
          </button>
        </div>
      </div>
    </div>
  )
}
