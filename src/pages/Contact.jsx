import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'

export default function Contact() {
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.name) e.name = 'Name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.message) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (validate()) {
      showToast('Message sent! We\'ll get back to you shortly.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    }
  }

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+91 1800 123 4567', sub: 'Mon–Sat, 9am–7pm' },
    { icon: Mail, label: 'Email', value: 'hello@everhome.com', sub: 'We reply within 24 hours' },
    { icon: MapPin, label: 'Office', value: 'Bandra Kurla Complex, Mumbai 400051', sub: 'Visit us anytime' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9am–7pm', sub: 'Sunday: Closed' },
  ]

  return (
    <div className="py-8 lg:py-12">
      <div className="container-x">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="badge bg-beige text-gold-dark mb-3">GET IN TOUCH</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-dark mb-3">We'd Love to Hear From You</h1>
          <p className="text-muted max-w-lg mx-auto">Have questions about a property or need help? Our team is here to assist you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {contactInfo.map((c) => (
              <div key={c.label} className="card p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-beige flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide font-semibold mb-1">{c.label}</p>
                  <p className="font-medium text-navy-dark text-sm">{c.value}</p>
                  <p className="text-muted text-xs mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={submit} className="card p-6 md:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name *</label>
                  <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className="input" placeholder="Your name" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="label">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input" placeholder="you@example.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="label">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => update('subject', e.target.value)} className="input" placeholder="How can we help?" />
                </div>
              </div>
              <div>
                <label className="label">Message *</label>
                <textarea rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} className="input resize-none" placeholder="Tell us more..." />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
