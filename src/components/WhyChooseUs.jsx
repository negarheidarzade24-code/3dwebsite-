import { useEffect, useRef, useState } from 'react'

export default function WhyChooseUs() {
  const [counts, setCounts] = useState({ c1: 0, c2: 0, c3: 0, c4: 0 })
  const ref = useRef(null)
  const animated = useRef(false)

  const stats = [
    { id: 'c1', value: 12000, suffix: '+', label: 'Happy Clients' },
    { id: 'c2', value: 500, suffix: '+', label: 'Properties Listed' },
    { id: 'c3', value: 25, suffix: '+', label: 'Cities' },
    { id: 'c4', value: 98, suffix: '%', label: 'Success Rate' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          stats.forEach((s) => {
            const duration = 1500
            const steps = 60
            const inc = s.value / steps
            let current = 0
            const interval = setInterval(() => {
              current += inc
              if (current >= s.value) {
                current = s.value
                clearInterval(interval)
              }
              setCounts((p) => ({ ...p, [s.id]: Math.floor(current) }))
            }, duration / steps)
          })
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const format = (n) => n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : n.toString()

  return (
    <section ref={ref} className="py-14 lg:py-20 bg-white border-y border-border">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Premium living space"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3">
              <span className="font-script text-2xl text-gold">More Than Just a Home</span>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="badge bg-beige text-gold-dark mb-3">WHY CHOOSE US</span>
            <h2 className="section-title mb-4">
              More Than Properties.
              <br />
              We Build Better Futures.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-8">
              At Everhome, we go beyond listings. We help you make informed decisions with expert guidance, verified information, and a commitment to finding you a place that truly feels like home.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.id} className="text-center p-4 rounded-2xl bg-cream border border-border">
                  <p className="font-serif text-3xl font-bold text-navy">
                    {format(counts[s.id])}{s.suffix}
                  </p>
                  <p className="text-muted text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
