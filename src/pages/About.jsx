import { Link } from 'react-router-dom'
import { Target, Eye, Heart, Award, Users, Building2, TrendingUp, ShieldCheck } from 'lucide-react'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import CTA from '../components/CTA.jsx'

export default function About() {
  const values = [
    { icon: Heart, title: 'Client First', desc: 'Your needs guide everything we do.' },
    { icon: ShieldCheck, title: 'Transparency', desc: 'Honest information, no hidden surprises.' },
    { icon: Award, title: 'Excellence', desc: 'We strive for quality in every interaction.' },
    { icon: TrendingUp, title: 'Innovation', desc: 'Modern tools for a better property search.' },
  ]

  const milestones = [
    { year: '2018', title: 'Everhome Founded', desc: 'Started with a vision to simplify real estate.' },
    { year: '2020', title: '5,000+ Clients', desc: 'Reached our first major milestone.' },
    { year: '2023', title: '25 Cities', desc: 'Expanded across India\'s top markets.' },
    { year: '2026', title: '12K+ Happy Clients', desc: 'Trusted by thousands of families.' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-navy-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1486406147468-ac64eb9c4e6c?auto=format&fit=crop&w=1200&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-x relative text-center">
          <span className="badge bg-gold/20 text-gold-light mb-4">ABOUT EVERHOME</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">We're Redefining Real Estate</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">Everhome was built on a simple idea: finding a home should be inspiring, transparent, and effortless.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 lg:py-20">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="Everhome office" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="badge bg-beige text-gold-dark mb-3">OUR STORY</span>
              <h2 className="section-title mb-4">From a Small Idea to India's Trusted Property Platform</h2>
              <p className="text-muted leading-relaxed mb-4">
                Founded in 2018, Everhome started as a small team passionate about making real estate accessible. We saw that finding the right property was often stressful, opaque, and time-consuming.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                Today, we've helped over 12,000 families find homes they love. With verified listings, expert agents, and a platform built for the modern buyer, we're making property search a journey to enjoy.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div><p className="font-serif text-3xl font-bold text-navy">12K+</p><p className="text-muted text-sm">Happy Clients</p></div>
                <div><p className="font-serif text-3xl font-bold text-navy">500+</p><p className="text-muted text-sm">Properties Listed</p></div>
                <div><p className="font-serif text-3xl font-bold text-navy">25+</p><p className="text-muted text-sm">Cities</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 lg:py-20 bg-white border-y border-border">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-8">
              <div className="w-14 h-14 rounded-2xl bg-beige flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-navy" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-navy-dark mb-3">Our Mission</h3>
              <p className="text-muted leading-relaxed">To make property search transparent, accessible, and enjoyable for everyone — whether you're buying your first home or investing in your tenth.</p>
            </div>
            <div className="card p-8">
              <div className="w-14 h-14 rounded-2xl bg-beige flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-navy" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-navy-dark mb-3">Our Vision</h3>
              <p className="text-muted leading-relaxed">To be India's most trusted real estate platform, where every property journey ends with a place that feels like home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 lg:py-20">
        <div className="container-x">
          <div className="text-center mb-10">
            <span className="badge bg-beige text-gold-dark mb-3">WHAT WE STAND FOR</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="card p-6 text-center hover:shadow-lift transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-beige flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-navy" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-navy-dark mb-2">{v.title}</h3>
                <p className="text-muted text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 lg:py-20 bg-white border-y border-border">
        <div className="container-x">
          <div className="text-center mb-10">
            <span className="badge bg-beige text-gold-dark mb-3">OUR JOURNEY</span>
            <h2 className="section-title">Milestones</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative">
                <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm mb-4">{i + 1}</div>
                <p className="font-serif text-2xl font-bold text-gold mb-1">{m.year}</p>
                <h3 className="font-semibold text-navy-dark mb-1">{m.title}</h3>
                <p className="text-muted text-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTA />
    </div>
  )
}
