import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="py-20 lg:py-32">
      <div className="container-x text-center">
        <p className="font-serif text-8xl md:text-9xl font-bold text-navy mb-4">404</p>
        <h1 className="font-serif text-2xl font-bold text-navy-dark mb-3">Page Not Found</h1>
        <p className="text-muted mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  )
}
