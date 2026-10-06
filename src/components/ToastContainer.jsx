import { useToast } from '../context/ToastContext.jsx'
import { CheckCircle, Info, XCircle } from 'lucide-react'

export default function ToastContainer() {
  const { toasts } = useToast() || { toasts: [] }
  if (!toasts?.length) return null

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    info: <Info className="w-5 h-5 text-navy" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-white shadow-lift border border-border rounded-xl px-4 py-3 animate-slide-up min-w-[260px]"
        >
          {icons[t.type] || icons.success}
          <span className="text-sm font-medium text-ink">{t.message}</span>
        </div>
      ))}
    </div>
  )
}
