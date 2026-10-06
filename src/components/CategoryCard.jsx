import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CategoryCard({ category }) {
  return (
    <Link
      to="/properties"
      className="group relative aspect-[4/5] rounded-xl2 overflow-hidden block"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-serif text-lg font-bold text-white mb-1">{category.name}</h3>
        <p className="text-white/70 text-xs flex items-center gap-1">
          {category.count} properties
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  )
}
