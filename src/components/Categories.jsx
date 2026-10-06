import CategoryCard from './CategoryCard.jsx'
import { categories } from '../data/categories.js'

export default function Categories() {
  return (
    <section className="py-14 lg:py-20 bg-white border-y border-border">
      <div className="container-x">
        <div className="text-center mb-10">
          <span className="badge bg-beige text-gold-dark mb-3">EXPLORE BY TYPE</span>
          <h2 className="section-title">Browse by Category</h2>
          <p className="text-muted text-base mt-2 max-w-lg mx-auto">Find the perfect property type that matches your lifestyle and investment goals.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
