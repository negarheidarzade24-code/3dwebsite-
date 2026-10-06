import AgentCard from '../components/AgentCard.jsx'
import { agents } from '../data/agents.js'

export default function Agents() {
  return (
    <div className="py-8 lg:py-12">
      <div className="container-x">
        <div className="text-center mb-10">
          <span className="badge bg-beige text-gold-dark mb-3">MEET THE TEAM</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-dark mb-3">Our Expert Agents</h1>
          <p className="text-muted max-w-lg mx-auto">Connect with experienced real estate professionals dedicated to helping you find the perfect property.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>
      </div>
    </div>
  )
}
