import Hero from '../components/Hero.jsx'
import TrustBar from '../components/TrustBar.jsx'
import FeaturedProperties from '../components/FeaturedProperties.jsx'
import Categories from '../components/Categories.jsx'
import PopularLocations from '../components/PopularLocations.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import Testimonials from '../components/Testimonials.jsx'
import BlogSection from '../components/BlogSection.jsx'
import CTA from '../components/CTA.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import { getRecentProperties } from '../data/properties.js'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const recent = getRecentProperties(3)

  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProperties />
      <Categories />
      <PopularLocations />

      {/* Latest Listings */}
      <section className="py-14 lg:py-20">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="badge bg-beige text-gold-dark mb-3">FRESH ON THE MARKET</span>
              <h2 className="section-title">Latest Listings</h2>
            </div>
            <Link to="/properties" className="text-navy font-semibold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all whitespace-nowrap">
              View All Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials />
      <BlogSection />
      <CTA />
    </>
  )
}
