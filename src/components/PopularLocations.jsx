import LocationCard from './LocationCard.jsx'
import { locations } from '../data/locations.js'

export default function PopularLocations() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="badge bg-beige text-gold-dark mb-3">POPULAR DESTINATIONS</span>
            <h2 className="section-title">Explore by Location</h2>
          </div>
          <p className="text-muted text-sm max-w-sm">Discover premium properties in India's most sought-after cities and neighborhoods.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {locations.map((l) => (
            <LocationCard key={l.id} location={l} />
          ))}
        </div>
      </div>
    </section>
  )
}
