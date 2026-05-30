import { Component, type ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default class ErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FFFCF7]">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-full bg-[#E63946]/10 flex items-center justify-center mx-auto mb-5"><AlertTriangle size={30} className="text-[#E63946]" /></div>
            <h2 className="font-display text-2xl font-bold">Ada masalah</h2>
            <p className="text-[#1A1410]/50 mt-2">Something went wrong. Let's try again.</p>
            <button onClick={() => location.reload()} className="mt-6 inline-flex items-center gap-2 bg-[#E63946] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#c92d3a] transition-all duration-200">
              <RotateCcw size={18} /> Muat ulang
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}