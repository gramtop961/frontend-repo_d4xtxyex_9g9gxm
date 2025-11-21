import { useState, useEffect } from 'react'
import { Menu, X, Linkedin } from 'lucide-react'

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'backdrop-blur bg-slate-900/70 border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight text-white text-lg">
          Your Name
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Work</NavLink>
          <NavLink href="#contact">Contact</NavLink>
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

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X /> : <Menu />}
        </button>
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
