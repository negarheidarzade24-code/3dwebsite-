import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'

export default function Hero() {
  const navigate = useNavigate()

  const handleSearch = (filters) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v) })
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-x pt-10 pb-8 lg:pt-16 lg:pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div className="animate-slide-up">
            <span className="badge bg-beige text-gold-dark font-semibold tracking-wide mb-4">
              PREMIUM PROPERTIES · BETTER LIVING
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy-dark leading-[1.1] mb-3">
              Find a Place
              <br />
              You'll Love to
              <span className="relative inline-block ml-3">
                <span className="text-navy">Call Home</span>
                <span className="font-script text-gold text-3xl md:text-4xl absolute -bottom-3 right-0">with Everhome</span>
              </span>
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-md mb-6">
              Discover exceptional homes, apartments, and investment properties in the locations that matter most.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/properties')} className="btn-primary">
                Explore Properties
              </button>
              <button onClick={() => navigate('/sell')} className="btn-outline">
                List Your Property
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[4/3] lg:aspect-[5/4]">
              <img
                src="https://images.unsplash.com/photo-1600607687938-ce553fd45959?auto=format&fit=crop&w=900&q=80"
                alt="Premium modern home"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 lg:-left-6 bg-white rounded-2xl shadow-lift border border-border p-4 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-beige flex items-center justify-center">
                  <span className="font-serif text-xl font-bold text-navy">12K+</span>
                </div>
                <div>
                  <p className="text-xs text-muted">Happy Clients</p>
                  <p className="text-sm font-semibold text-navy-dark">Across India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container-x pb-10 lg:pb-14">
        <SearchBar onSearch={handleSearch} />
      </div>
    </section>
  )
}
