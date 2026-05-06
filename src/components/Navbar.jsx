import { useState, useEffect } from 'react'
import Logo from './Logo'

const NAV_LINKS = [
  { label: 'Casos de uso',       href: '#features'    },
  { label: 'Funciones',          href: '#all-features' },
  { label: 'Demo',               href: '#demo'         },
  { label: 'Planes',             href: '#pricing'      },
  { label: 'Preguntas frecuentes', href: '#faq'        },
]

// Navigate to href, jumping instantly past the HowItWorks sticky section
// so its 500vh scroll animation doesn't play at high speed
function scrollTo(href) {
  const target = document.querySelector(href)
  if (!target) return

  const hiw = document.getElementById('how-it-works')
  if (!hiw) { target.scrollIntoView({ behavior: 'smooth' }); return }

  const currentY  = window.scrollY
  const hiwTop    = hiw.getBoundingClientRect().top  + currentY
  const hiwBottom = hiwTop + hiw.offsetHeight
  const targetTop = target.getBoundingClientRect().top + currentY

  const crosses = (currentY < hiwBottom && targetTop > hiwTop) ||
                  (currentY > hiwTop    && targetTop < hiwBottom)

  if (crosses) {
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, targetTop)
    requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = '' })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

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

  const handleLink = (e, href) => {
    e.preventDefault()
    if (menuOpen) {
      setMenuOpen(false)
      setTimeout(() => scrollTo(href), 370)
    } else {
      scrollTo(href)
    }
  }

  return (
    <>
      {/* ── Navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: scrolled ? 'rgba(10, 10, 20, 0.75)' : 'rgba(10, 10, 20, 0.35)',
          borderBottom: scrolled ? '1px solid rgba(108, 71, 255, 0.15)' : '1px solid transparent',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.4s ease-out, background 0.3s, border-color 0.3s',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <Logo desktopClassName="h-8 w-auto" mobileClassName="h-10 w-auto" />
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                className="relative group text-text-secondary hover:text-white transition-colors duration-200 text-sm font-medium py-1"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-full h-[2px] rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{
                    background: '#6C47FF',
                    boxShadow: '0 0 8px rgba(108,71,255,0.7), 0 0 16px rgba(108,71,255,0.3)',
                  }}
                />
              </a>
            ))}
          </nav>

          <a
            href="#pricing"
            onClick={(e) => handleLink(e, '#pricing')}
            className="hidden lg:inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm"
            style={{
              boxShadow: '0 0 16px rgba(108,71,255,0.4), 0 0 32px rgba(108,71,255,0.15)',
              transition: 'background 0.2s, box-shadow 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 26px rgba(108,71,255,0.65), 0 0 52px rgba(108,71,255,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 16px rgba(108,71,255,0.4), 0 0 32px rgba(108,71,255,0.15)' }}
          >
            Empezar gratis <span aria-hidden>→</span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-white transition-colors"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </header>

      {/* ── Mobile overlay — blurs page behind drawer ── */}
      <div
        className="lg:hidden fixed inset-0 z-40"
        aria-hidden
        onClick={() => setMenuOpen(false)}
        style={{
          background: menuOpen ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0)',
          backdropFilter: menuOpen ? 'blur(5px)' : 'blur(0px)',
          WebkitBackdropFilter: menuOpen ? 'blur(5px)' : 'blur(0px)',
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'background 0.35s ease, backdrop-filter 0.35s ease',
        }}
      />

      {/* ── Mobile drawer — slides in from left ── */}
      <div
        className="lg:hidden fixed top-0 left-0 h-full z-50 w-72 flex flex-col"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(10, 10, 20, 0.90)',
          borderRight: '1px solid rgba(108, 71, 255, 0.18)',
          boxShadow: menuOpen ? '8px 0 40px rgba(0,0,0,0.5)' : 'none',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center px-5 h-16 border-b border-white/10 shrink-0">
          <a href="#" onClick={() => setMenuOpen(false)}>
            <Logo mobileClassName="h-9 w-auto" staticEye />
          </a>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-3 py-6 gap-1 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLink(e, link.href)}
              className="text-text-secondary hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-white/5 font-medium text-base"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-5 pb-8 shrink-0">
          <a
            href="#pricing"
            onClick={(e) => handleLink(e, '#pricing')}
            className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white w-full py-3 rounded-xl font-semibold text-sm transition-colors"
            style={{ boxShadow: '0 0 16px rgba(108,71,255,0.4), 0 0 32px rgba(108,71,255,0.15)' }}
          >
            Empezar gratis →
          </a>
        </div>
      </div>
    </>
  )
}
