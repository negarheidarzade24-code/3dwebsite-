import { useState } from 'react'
import { Search, MapPin, Home, DollarSign, Bed, Building2 } from 'lucide-react'
import { propertyTypes, cities } from '../data/properties.js'

export default function SearchBar({ onSearch, compact = false }) {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    purpose: '',
    budget: '',
    bedrooms: '',
  })

  const handleChange = (key, value) => setFilters((p) => ({ ...p, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(filters)
  }

  const fields = [
    { key: 'location', icon: MapPin, placeholder: 'Where do you want to live?', options: cities, label: 'Location' },
    { key: 'type', icon: Building2, placeholder: 'Any property', options: propertyTypes, label: 'Property Type' },
    { key: 'purpose', icon: Home, placeholder: 'Buy / Rent', options: ['For Sale', 'For Rent'], label: 'Purpose' },
    { key: 'budget', icon: DollarSign, placeholder: 'Any budget', options: ['Under ₹50L', '₹50L - ₹2Cr', '₹2Cr - ₹5Cr', 'Above ₹5Cr'], label: 'Budget' },
    { key: 'bedrooms', icon: Bed, placeholder: 'Any', options: ['1', '2', '3', '4', '5+'], label: 'Bedrooms' },
  ]

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-card border border-border p-2 ${compact ? '' : 'md:p-3'}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-2">
        {fields.map((field) => (
          <div key={field.key} className="flex-1 relative">
            <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <select
              value={filters[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full pl-10 pr-3 py-3 text-sm bg-beige/40 rounded-xl border border-transparent focus:outline-none focus:border-navy focus:bg-white transition-all cursor-pointer appearance-none"
            >
              <option value="">{field.placeholder}</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit" className="btn-primary lg:px-8 !rounded-xl">
          <Search className="w-4 h-4" /> Search
        </button>
      </div>
    </form>
  )
}
