import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

const LOGIN_URL = 'https://cloomybuild-production.up.railway.app/login'

const DOTS = [
  { size: 5, top: '14%',  left:  '7%',   delay: 0.0 },
  { size: 3, top: '72%',  left:  '5%',   delay: 0.4 },
  { size: 4, top: '18%',  right: '9%',   delay: 0.2 },
  { size: 6, top: '76%',  right: '6%',   delay: 0.6 },
  { size: 3, top: '48%',  left:  '2.5%', delay: 0.8 },
  { size: 4, top: '52%',  right: '3%',   delay: 0.3 },
  { size: 3, top: '35%',  left:  '14%',  delay: 0.5 },
  { size: 3, top: '60%',  right: '14%',  delay: 0.7 },
]

export default function CTA() {
  const [ref, inView] = useInView(0.25)
  const sectionRef = useRef(null)
  const [overlayOpacity, setOverlayOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const sectionH = el.offsetHeight
      // t goes 0→1 as section travels from entering to leaving viewport
      const totalTravel = vh + sectionH
      const traveled = vh - rect.top
      const t = Math.max(0, Math.min(1, traveled / totalTravel))
      // bell curve: peaks at t=0.5 (section centered in viewport)
      const bell = 1 - Math.abs(t - 0.5) * 2
      setOverlayOpacity(Math.max(0, bell) * 0.62)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const anim = (delay, extra = '') =>
    `transition-all duration-700 ${extra} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`

  return (
    <>
      {/* Dark overlay — fixed behind content, fades in/out as section scrolls through viewport */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.72)',
          opacity: overlayOpacity,
          pointerEvents: 'none',
          zIndex: 11,
          transition: 'opacity 0.08s linear',
        }}
      />
    <section ref={sectionRef} className="section-divider overflow-hidden flex items-center" style={{ position: 'relative', zIndex: 12, minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-6 w-full py-20">
        <div
          ref={ref}
          className="relative rounded-3xl text-center px-8 py-16 lg:px-16 lg:py-20 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(108,71,255,0.13) 0%, rgba(76,46,204,0.07) 100%)',
            border: '1px solid rgba(108,71,255,0.38)',
            boxShadow: inView
              ? '0 0 80px rgba(108,71,255,0.18), 0 0 140px rgba(108,71,255,0.09), inset 0 0 60px rgba(108,71,255,0.04)'
              : 'none',
            transition: 'box-shadow 1.2s ease',
          }}
        >
          {/* Glow central pulsante */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: '50%', left: '50%',
              width: '65%', height: '75%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(108,71,255,0.22) 0%, transparent 70%)',
              animation: 'ctaGlow 4s ease-in-out infinite',
            }}
          />

          {/* Línea decorativa superior */}
          <div
            aria-hidden
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: inView ? '60%' : '0%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(108,71,255,0.7), transparent)',
              transition: 'width 1s ease 0.1s',
            }}
          />
          {/* Línea decorativa inferior */}
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: inView ? '40%' : '0%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(108,71,255,0.5), transparent)',
              transition: 'width 1s ease 0.2s',
            }}
          />

          {/* Partículas flotantes */}
          {DOTS.map((d, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute rounded-full pointer-events-none"
              style={{
                width:  d.size,
                height: d.size,
                top:    d.top,
                left:   d.left  ?? undefined,
                right:  d.right ?? undefined,
                background: 'rgba(108,71,255,0.75)',
                boxShadow:  '0 0 6px rgba(108,71,255,0.9)',
                opacity:    inView ? 1 : 0,
                transition: `opacity 0.5s ease ${d.delay + 0.4}s`,
                animation:  'ctaFloat 3s ease-in-out infinite alternate',
                animationDelay: `${d.delay}s`,
              }}
            />
          ))}

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-1.5 border border-brand-500/35 rounded-full px-4 py-1.5 text-xs text-brand-400 tracking-wide mb-8 ${anim(0.05)}`}
            style={{ transitionDelay: '0.05s' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            Sin comisiones por venta
          </div>

          {/* Titular */}
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight ${anim(0.15)}`}
            style={{ transitionDelay: '0.15s' }}
          >
            Tu negocio merece<br className="hidden sm:block" /> estar online.
          </h2>

          {/* Subtítulo */}
          <p
            className={`text-text-secondary text-lg lg:text-xl mb-10 max-w-lg mx-auto leading-relaxed ${anim(0.28)}`}
            style={{ transitionDelay: '0.28s' }}
          >
            Creá tu tienda, menú o catálogo en minutos. Sin comisiones, sin técnicos, sin vueltas.
          </p>

          {/* Botón CTA */}
          <div
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
            style={{ transitionDelay: '0.42s' }}
          >
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2"
              style={{ boxShadow: '0 0 32px rgba(108,71,255,0.55), 0 0 64px rgba(108,71,255,0.22)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 52px rgba(108,71,255,0.75), 0 0 100px rgba(108,71,255,0.32)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 32px rgba(108,71,255,0.55), 0 0 64px rgba(108,71,255,0.22)' }}
            >
              Empezar gratis <span aria-hidden>→</span>
            </a>
          </div>

          {/* Fine print */}
          <p
            className={`text-text-tertiary text-sm mt-6 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.58s' }}
          >
            Sin tarjeta de crédito · 14 días gratis · Cancelás cuando quieras
          </p>
        </div>
      </div>

      <style>{`
        @keyframes ctaGlow {
          0%, 100% { opacity: 0.65; transform: translate(-50%, -50%) scale(1);    }
          50%       { opacity: 1;    transform: translate(-50%, -50%) scale(1.18); }
        }
        @keyframes ctaFloat {
          from { transform: translateY(0px);  }
          to   { transform: translateY(-9px); }
        }
      `}</style>
    </section>
    </>
  )
}
