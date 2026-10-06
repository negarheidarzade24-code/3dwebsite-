import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PropertyCard from './PropertyCard.jsx'
import { getFeaturedProperties } from '../data/properties.js'

export default function FeaturedProperties() {
  const featured = getFeaturedProperties()

  return (
    <section className="py-14 lg:py-20">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="section-title mb-2">Handpicked Properties for You</h2>
            <p className="text-muted text-base">Explore exceptional homes selected for their location, quality, and lifestyle.</p>
          </div>
          <Link to="/properties" className="text-navy font-semibold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all whitespace-nowrap">
            View All Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
