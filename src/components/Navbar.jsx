import { useState, useEffect } from 'react'
import { Menu, X, Linkedin, Gauge } from 'lucide-react'
import { getLiteFlag, setLiteFlag, shouldReduce } from '../utils/perf'

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-slate-200/90 hover:text-white transition-colors"
    >
      {children}
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lite, setLite] = useState(false)

  useEffect(() => {
    setLite(getLiteFlag() || shouldReduce())
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLite = () => {
    const next = !getLiteFlag()
    setLiteFlag(next)
    setLite(next)
    // Immediate feedback: soft reload components relying on flag
    window.location.reload()
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'backdrop-blur bg-slate-900/70 border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight text-white text-lg">
          Your Name
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Work</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <button
            onClick={toggleLite}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${lite ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800/60 text-slate-200 border-white/10 hover:bg-slate-700/60'}`}
            title="Toggle performance mode"
          >
            <Gauge size={14} /> {lite ? 'Performance On' : 'Performance Off'}
          </button>
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white px-4 py-2 text-sm transition-colors"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLite}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium ${lite ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800/60 text-slate-200 border-white/10'}`}
            title="Toggle performance mode"
          >
            <Gauge size={12} /> {lite ? 'Perf' : 'Perf'}
          </button>
          <button onClick={() => setOpen(!open)} className="text-white">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6">
          <div className="flex flex-col gap-4 bg-slate-800/60 border border-white/10 rounded-xl p-4">
            <NavLink href="#about" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink href="#projects" onClick={() => setOpen(false)}>Work</NavLink>
            <NavLink href="#contact" onClick={() => setOpen(false)}>Contact</NavLink>
            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white px-4 py-2 text-sm transition-colors"
              onClick={() => setOpen(false)}
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
