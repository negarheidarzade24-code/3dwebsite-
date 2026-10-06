import { BadgeCheck, ShieldCheck, Headphones, HeartHandshake } from 'lucide-react'

const items = [
  { icon: BadgeCheck, title: 'Verified Listings', desc: 'Every property is carefully reviewed for quality and accuracy.' },
  { icon: ShieldCheck, title: 'Trusted & Secure', desc: 'Transparent information and a safer property search experience.' },
  { icon: Headphones, title: 'Expert Guidance', desc: 'Get support from experienced real estate professionals.' },
  { icon: HeartHandshake, title: 'Better Living', desc: 'Find properties that actually fit your lifestyle.' },
]

export default function TrustBar() {
  return (
    <section className="py-12 lg:py-16 bg-white border-y border-border">
      <div className="container-x">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col items-center text-center p-4 rounded-2xl hover:bg-beige/40 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-beige flex items-center justify-center mb-4 group-hover:bg-navy group-hover:scale-105 transition-all">
                <item.icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-navy-dark mb-1.5">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
