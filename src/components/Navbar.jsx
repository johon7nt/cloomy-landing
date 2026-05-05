import { useState, useEffect } from 'react'
import Logo from './Logo'

const NAV_LINKS = [
  { label: 'Casos de uso', href: '#features' },
  { label: 'Funciones', href: '#all-features' },
  { label: 'Precios', href: '#pricing' },
]

export default function Navbar({ visible = true }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 20
      setScrolled(prev => prev === next ? prev : next)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: scrolled
          ? 'rgba(10, 10, 20, 0.75)'
          : 'rgba(10, 10, 20, 0.35)',
        borderBottom: scrolled
          ? '1px solid rgba(108, 71, 255, 0.15)'
          : '1px solid transparent',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.4s ease-out, background 0.3s, border-color 0.3s',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 shrink-0">
          <Logo desktopClassName="h-8 w-auto" mobileClassName="h-10 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#pricing" className="hidden lg:inline-flex btn-primary text-sm">
          Empezar gratis <span aria-hidden>→</span>
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-text-secondary hover:text-white transition-colors"
          aria-label="Abrir menú"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-bg-card border-t border-brand-500/20 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-text-secondary hover:text-white transition-colors py-2 font-medium"
            >
              {link.label}
            </a>
          ))}
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="btn-primary mt-2 justify-center">
            Empezar gratis →
          </a>
        </div>
      )}
    </header>
  )
}
