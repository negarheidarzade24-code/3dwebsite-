import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  const navigate = useNavigate()

  return (
    <section className="py-14 lg:py-20">
      <div className="container-x">
        <div className="relative rounded-3xl overflow-hidden bg-navy-dark">
          <img
            src="https://images.unsplash.com/photo-1486406147468-ac64eb9c4e6c?auto=format&fit=crop&w=1200&q=80"
            alt="City skyline"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-transparent" />
          <div className="relative p-8 md:p-14 lg:p-16 max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Let's Make Your Next Move Happen.
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
              Explore exceptional properties, connect with trusted professionals, and find a place that feels right.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/properties')} className="btn-gold">
                Explore Properties <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/sell')} className="btn-outline !bg-white/10 !border-white/20 !text-white hover:!bg-white/20 hover:!text-white">
                List Your Property
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
