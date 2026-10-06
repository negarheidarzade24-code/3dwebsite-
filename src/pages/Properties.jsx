import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import PropertyCard from '../components/PropertyCard.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import { properties } from '../data/properties.js'

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'largest', label: 'Largest Area' },
]

export default function Properties() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    purpose: searchParams.get('purpose') || '',
    type: searchParams.get('type') || '',
    city: searchParams.get('location') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: '',
    priceMin: undefined,
    priceMax: undefined,
    furnished: '',
    search: '',
  })
  const [sort, setSort] = useState('recommended')
  const [visibleCount, setVisibleCount] = useState(9)
  const [sortOpen, setSortOpen] = useState(false)

  useEffect(() => {
    setVisibleCount(9)
  }, [filters, sort])

  const filtered = useMemo(() => {
    let result = [...properties]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      )
    }
    if (filters.purpose) result = result.filter((p) => p.status === filters.purpose)
    if (filters.type) result = result.filter((p) => p.type === filters.type)
    if (filters.city) result = result.filter((p) => p.city === filters.city)
    if (filters.bedrooms) {
      const bed = filters.bedrooms === '5+' ? 5 : parseInt(filters.bedrooms)
      result = result.filter((p) => filters.bedrooms === '5+' ? p.bedrooms >= 5 : p.bedrooms === bed)
    }
    if (filters.bathrooms) {
      const bath = filters.bathrooms === '4+' ? 4 : parseInt(filters.bathrooms)
      result = result.filter((p) => filters.bathrooms === '4+' ? p.bathrooms >= 4 : p.bathrooms === bath)
    }
    if (filters.furnished) result = result.filter((p) => p.furnished === filters.furnished)
    if (filters.priceMin !== undefined) result = result.filter((p) => p.price >= filters.priceMin)
    if (filters.priceMax !== undefined) result = result.filter((p) => p.price <= filters.priceMax)

    switch (sort) {
      case 'newest': result.sort((a, b) => new Date(b.dateListed) - new Date(a.dateListed)); break
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'largest': result.sort((a, b) => b.area - a.area); break
    }

    return result
  }, [filters, sort])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const clearFilters = () => {
    setFilters({ purpose: '', type: '', city: '', bedrooms: '', bathrooms: '', priceMin: undefined, priceMax: undefined, furnished: '', search: '' })
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="container-x">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-dark mb-2">Properties</h1>
          <p className="text-muted">Browse our complete collection of premium properties.</p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
            placeholder="Search by property name, city, or location..."
            className="w-full pl-12 pr-4 py-3.5 text-sm bg-white border border-border rounded-xl focus:outline-none focus:border-navy transition-colors"
          />
        </div>

        {/* Result count + sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted">
            <span className="font-semibold text-navy-dark">{filtered.length}</span> properties found
          </p>
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-border rounded-xl hover:border-navy transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-navy" />
              Sort: {sortOptions.find((s) => s.value === sort)?.label}
              <ChevronDown className="w-4 h-4" />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 top-full mt-2 z-20 bg-white border border-border rounded-xl shadow-lift py-2 min-w-[200px]">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setSortOpen(false) }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-beige transition-colors ${
                        sort === opt.value ? 'text-navy font-semibold' : 'text-ink'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Layout */}
        <div className="flex gap-6">
          <FilterPanel filters={filters} setFilters={setFilters} onClear={clearFilters} />
          <div className="flex-1 min-w-0">
            {visible.length === 0 ? (
              <div className="card p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-muted" />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy-dark mb-2">No properties found</h3>
                <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
                  Try adjusting your filters or searching in another location.
                </p>
                <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {visible.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
                {hasMore && (
                  <div className="text-center mt-8">
                    <button onClick={() => setVisibleCount((c) => c + 6)} className="btn-outline">
                      Load More Properties
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
