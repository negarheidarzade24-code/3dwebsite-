import { useState } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { propertyTypes, cities } from '../data/properties.js'

export default function FilterPanel({ filters, setFilters, onClear }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const update = (key, value) => setFilters((p) => ({ ...p, [key]: value }))

  const sections = [
    {
      title: 'Purpose',
      key: 'purpose',
      options: ['For Sale', 'For Rent'],
    },
    {
      title: 'Property Type',
      key: 'type',
      options: propertyTypes,
    },
    {
      title: 'Location',
      key: 'city',
      options: cities,
    },
    {
      title: 'Bedrooms',
      key: 'bedrooms',
      options: ['1', '2', '3', '4', '5+'],
    },
    {
      title: 'Bathrooms',
      key: 'bathrooms',
      options: ['1', '2', '3', '4+'],
    },
  ]

  const priceRanges = [
    { label: 'Any budget', min: 0, max: Infinity },
    { label: 'Under ₹50L', min: 0, max: 5000000 },
    { label: '₹50L - ₹2Cr', min: 5000000, max: 20000000 },
    { label: '₹2Cr - ₹5Cr', min: 20000000, max: 50000000 },
    { label: 'Above ₹5Cr', min: 50000000, max: Infinity },
  ]

  const PanelContent = () => (
    <div className="space-y-5">
      {sections.map((s) => (
        <div key={s.key}>
          <h4 className="label mb-2">{s.title}</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => update(s.key, '')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                !filters[s.key] ? 'bg-navy text-white border-navy' : 'bg-white text-muted border-border hover:border-navy'
              }`}
            >
              Any
            </button>
            {s.options.map((opt) => (
              <button
                key={opt}
                onClick={() => update(s.key, filters[s.key] === opt ? '' : opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filters[s.key] === opt ? 'bg-navy text-white border-navy' : 'bg-white text-muted border-border hover:border-navy'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h4 className="label mb-2">Price Range</h4>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((pr) => {
            const active = filters.priceMin === pr.min && filters.priceMax === pr.max
            return (
              <button
                key={pr.label}
                onClick={() => {
                  if (active) {
                    update('priceMin', undefined)
                    update('priceMax', undefined)
                  } else {
                    update('priceMin', pr.min)
                    update('priceMax', pr.max)
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  active ? 'bg-navy text-white border-navy' : 'bg-white text-muted border-border hover:border-navy'
                }`}
              >
                {pr.label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h4 className="label mb-2">Furnished</h4>
        <div className="flex flex-wrap gap-2">
          {['Any', 'Furnished', 'Semi-Furnished', 'Unfurnished'].map((opt) => (
            <button
              key={opt}
              onClick={() => update('furnished', opt === 'Any' ? '' : opt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                (filters.furnished || '') === (opt === 'Any' ? '' : opt) ? 'bg-navy text-white border-navy' : 'bg-white text-muted border-border hover:border-navy'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button onClick={onClear} className="btn-outline w-full !py-2.5">Clear All Filters</button>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="card p-5 sticky top-24">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
            <SlidersHorizontal className="w-4 h-4 text-navy" />
            <h3 className="font-semibold text-navy-dark">Filters</h3>
          </div>
          <PanelContent />
        </div>
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden btn-outline !py-2.5 !px-4 mb-4"
      >
        <SlidersHorizontal className="w-4 h-4" /> Filters
      </button>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-navy-dark/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-3xl overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-navy-dark flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </h3>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-beige">
                <X className="w-5 h-5 text-navy" />
              </button>
            </div>
            <div className="p-4">
              <PanelContent />
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t border-border">
              <button onClick={() => setMobileOpen(false)} className="btn-primary w-full">Show Results</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
