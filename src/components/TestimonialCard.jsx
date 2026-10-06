import { Star, Quote } from 'lucide-react'

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card p-6 flex flex-col h-full">
      <Quote className="w-8 h-8 text-gold/30 mb-3" />
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
        ))}
      </div>
      <p className="text-ink text-sm leading-relaxed flex-1 mb-5">"{testimonial.review}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" className="w-11 h-11 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-sm text-navy-dark">{testimonial.name}</p>
          <p className="text-muted text-xs">{testimonial.role} · {testimonial.location}</p>
        </div>
      </div>
    </div>
  )
}
