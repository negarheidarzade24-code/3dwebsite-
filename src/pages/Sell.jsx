import { useState } from 'react'
import { Check, ChevronRight, ChevronLeft, Upload, Home, MapPin, DollarSign, Bed, Sparkles, Camera, User, FileCheck } from 'lucide-react'
import { propertyTypes, cities } from '../data/properties.js'
import { useToast } from '../context/ToastContext.jsx'

const steps = [
  { id: 1, label: 'Property Type', icon: Home },
  { id: 2, label: 'Location', icon: MapPin },
  { id: 3, label: 'Price', icon: DollarSign },
  { id: 4, label: 'Details', icon: Bed },
  { id: 5, label: 'Amenities', icon: Sparkles },
  { id: 6, label: 'Photos', icon: Camera },
  { id: 7, label: 'Contact', icon: User },
  { id: 8, label: 'Review', icon: FileCheck },
]

const allAmenities = ['Swimming Pool', 'Gym', '24/7 Security', 'Power Backup', 'CCTV', 'Garden', 'Children\'s Play Area', 'Clubhouse', 'Parking', 'Elevator', 'AC', 'Water Storage', 'Rainwater Harvesting', 'Solar Panels']

export default function Sell() {
  const { showToast } = useToast()
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    type: '', city: '', address: '', price: '', bedrooms: '', bathrooms: '', area: '', parking: '',
    furnished: '', amenities: [], photos: [], name: '', email: '', phone: '',
  })

  const update = (key, value) => setData((p) => ({ ...p, [key]: value }))
  const toggleAmenity = (a) => {
    setData((p) => ({
      ...p,
      amenities: p.amenities.includes(a) ? p.amenities.filter((x) => x !== a) : [...p.amenities, a],
    }))
  }

  const canProceed = () => {
    switch (step) {
      case 1: return !!data.type
      case 2: return !!data.city && !!data.address
      case 3: return !!data.price
      case 4: return !!data.bedrooms && !!data.bathrooms && !!data.area
      case 7: return !!data.name && !!data.email && !!data.phone
      default: return true
    }
  }

  const next = () => canProceed() && setStep((s) => Math.min(8, s + 1))
  const prev = () => setStep((s) => Math.max(1, s - 1))

  const submit = () => {
    showToast('Property listed successfully! Our team will review it shortly.')
    setStep(1)
    setData({ type: '', city: '', address: '', price: '', bedrooms: '', bathrooms: '', area: '', parking: '', furnished: '', amenities: [], photos: [], name: '', email: '', phone: '' })
  }

  return (
    <div className="py-8 lg:py-12 bg-cream min-h-screen">
      <div className="container-x max-w-3xl">
        {/* Hero */}
        <div className="text-center mb-8">
          <span className="badge bg-beige text-gold-dark mb-3">SELL YOUR PROPERTY</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-dark mb-3">Ready to Sell Your Property?</h1>
          <p className="text-muted max-w-lg mx-auto">Reach qualified buyers and showcase your property with a professional listing.</p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Camera, title: 'Premium Presentation', desc: 'Professional listing quality' },
            { icon: User, title: 'Qualified Buyers', desc: 'Reach serious buyers' },
            { icon: Sparkles, title: 'Expert Support', desc: 'Dedicated agent help' },
            { icon: FileCheck, title: 'Easy Management', desc: 'Manage with ease' },
          ].map((b) => (
            <div key={b.title} className="card p-4 text-center">
              <b.icon className="w-6 h-6 text-gold mx-auto mb-2" strokeWidth={1.5} />
              <p className="font-semibold text-sm text-navy-dark">{b.title}</p>
              <p className="text-muted text-xs mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-navy-dark">Step {step} of 8</span>
            <span className="text-sm text-muted">{steps[step - 1].label}</span>
          </div>
          <div className="h-2 bg-beige rounded-full overflow-hidden mb-6">
            <div className="h-full bg-navy rounded-full transition-all duration-300" style={{ width: `${(step / 8) * 100}%` }} />
          </div>

          {/* Step icons */}
          <div className="hidden md:flex items-center justify-between mb-8">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  step > s.id ? 'bg-navy text-white' : step === s.id ? 'bg-gold text-white' : 'bg-beige text-muted'
                }`}>
                  {step > s.id ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                {s.id < 8 && <div className={`h-0.5 flex-1 mx-1 ${step > s.id ? 'bg-navy' : 'bg-border'}`} />}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="min-h-[200px]">
            {step === 1 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">What type of property?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {propertyTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => update('type', t)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${data.type === t ? 'border-navy bg-beige' : 'border-border hover:border-navy/50'}`}
                    >
                      <Home className="w-5 h-5 text-gold mb-2" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-navy-dark">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">Where is it located?</h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">City</label>
                    <select value={data.city} onChange={(e) => update('city', e.target.value)} className="input">
                      <option value="">Select city</option>
                      {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Full Address</label>
                    <input type="text" value={data.address} onChange={(e) => update('address', e.target.value)} placeholder="Enter the property address" className="input" />
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">What's the asking price?</h3>
                <div>
                  <label className="label">Price (₹)</label>
                  <input type="number" value={data.price} onChange={(e) => update('price', e.target.value)} placeholder="e.g. 42500000" className="input" />
                  {data.price && <p className="text-sm text-muted mt-2">≈ ₹{(parseInt(data.price) / 10000000).toFixed(2)} Cr</p>}
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">Property details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="label">Bedrooms</label><input type="number" value={data.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} placeholder="0" className="input" /></div>
                  <div><label className="label">Bathrooms</label><input type="number" value={data.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} placeholder="0" className="input" /></div>
                  <div><label className="label">Area (sq ft)</label><input type="number" value={data.area} onChange={(e) => update('area', e.target.value)} placeholder="0" className="input" /></div>
                  <div><label className="label">Parking Spaces</label><input type="number" value={data.parking} onChange={(e) => update('parking', e.target.value)} placeholder="0" className="input" /></div>
                  <div className="col-span-2">
                    <label className="label">Furnished Status</label>
                    <select value={data.furnished} onChange={(e) => update('furnished', e.target.value)} className="input">
                      <option value="">Select</option>
                      <option>Furnished</option>
                      <option>Semi-Furnished</option>
                      <option>Unfurnished</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {step === 5 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">Select amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {allAmenities.map((a) => (
                    <button
                      key={a}
                      onClick={() => toggleAmenity(a)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${data.amenities.includes(a) ? 'bg-navy text-white border-navy' : 'bg-white text-muted border-border hover:border-navy'}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 6 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">Upload photos</h3>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-navy transition-colors cursor-pointer" onClick={() => showToast('Photo upload would open here')}>
                  <Upload className="w-10 h-10 text-muted mx-auto mb-3" />
                  <p className="text-sm font-medium text-navy-dark mb-1">Click to upload photos</p>
                  <p className="text-muted text-xs">PNG, JPG up to 10MB each</p>
                </div>
              </div>
            )}
            {step === 7 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">Your contact information</h3>
                <div className="space-y-4">
                  <div><label className="label">Full Name</label><input type="text" value={data.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className="input" /></div>
                  <div><label className="label">Email</label><input type="email" value={data.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className="input" /></div>
                  <div><label className="label">Phone</label><input type="tel" value={data.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" className="input" /></div>
                </div>
              </div>
            )}
            {step === 8 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-dark mb-4">Review your listing</h3>
                <div className="space-y-2">
                  {[
                    ['Type', data.type], ['Location', `${data.city}, ${data.address}`],
                    ['Price', data.price ? `₹${parseInt(data.price).toLocaleString()}` : ''],
                    ['Bedrooms', data.bedrooms], ['Bathrooms', data.bathrooms], ['Area', data.area ? `${data.area} sq ft` : ''],
                    ['Furnished', data.furnished], ['Amenities', data.amenities.join(', ') || 'None'],
                    ['Name', data.name], ['Email', data.email], ['Phone', data.phone],
                  ].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted text-sm">{k}</span>
                      <span className="font-medium text-sm text-navy-dark text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button onClick={prev} disabled={step === 1} className="btn-ghost disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < 8 ? (
              <button onClick={next} disabled={!canProceed()} className="btn-primary disabled:opacity-40">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={submit} className="btn-gold">
                <Check className="w-4 h-4" /> Publish Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
