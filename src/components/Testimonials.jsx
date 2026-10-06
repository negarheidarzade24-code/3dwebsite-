import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestimonialCard from './TestimonialCard.jsx'
import { testimonials } from '../data/testimonials.js'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const perView = 3

  const maxIndex = Math.max(0, testimonials.length - perView)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((p) => (p >= maxIndex ? 0 : p + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [maxIndex])

  const prev = () => setIndex((p) => Math.max(0, p - 1))
  const next = () => setIndex((p) => Math.min(maxIndex, p + 1))

  return (
    <section className="py-14 lg:py-20">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="badge bg-beige text-gold-dark mb-3">CLIENT STORIES</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={prev} disabled={index === 0} className="w-10 h-10 rounded-xl border border-border bg-white flex items-center justify-center hover:bg-beige disabled:opacity-40 transition-colors">
              <ChevronLeft className="w-5 h-5 text-navy" />
            </button>
            <button onClick={next} disabled={index >= maxIndex} className="w-10 h-10 rounded-xl border border-border bg-white flex items-center justify-center hover:bg-beige disabled:opacity-40 transition-colors">
              <ChevronRight className="w-5 h-5 text-navy" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-5"
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="w-full lg:w-1/3 shrink-0">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
