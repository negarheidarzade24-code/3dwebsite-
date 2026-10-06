import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { blogPosts } from '../data/blog.js'

export default function BlogSection() {
  return (
    <section className="py-14 lg:py-20 bg-white border-y border-border">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="badge bg-beige text-gold-dark mb-3">REAL ESTATE INSIGHTS</span>
            <h2 className="section-title">Latest from Our Blog</h2>
          </div>
          <Link to="/properties" className="text-navy font-semibold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all whitespace-nowrap">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blogPosts.map((post) => (
            <Link key={post.id} to="/properties" className="card group overflow-hidden hover:shadow-lift hover:-translate-y-1 block">
              <div className="aspect-[16/10] overflow-hidden rounded-t-xl2">
                <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted mb-2">
                  <span className="badge bg-beige text-gold-dark !px-2 !py-0.5">{post.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-navy-dark group-hover:text-navy transition-colors leading-tight mb-2">
                  {post.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                <p className="text-muted text-xs mt-3">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
