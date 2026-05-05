import { useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'

// gridArea: 'row / col' within the 4×4 sticky grid (rows = top→bottom, cols = left→right)
// rangeStart/End: % of the section's view-timeline (cover range, sticky phase ≈ 17%–83%)
const WORDS = [
  { text: 'Sin comisiones',    gridArea: '1/1', rangeStart: 17, rangeEnd: 29 },
  { text: 'Menú QR',           gridArea: '1/4', rangeStart: 23, rangeEnd: 35 },
  { text: 'Pedidos en vivo',   gridArea: '4/1', rangeStart: 29, rangeEnd: 41 },
  { text: 'Multi-formato',     gridArea: '4/4', rangeStart: 35, rangeEnd: 47 },
  { text: 'Simple',            gridArea: '1/2', rangeStart: 41, rangeEnd: 53 },
  { text: 'Cobro integrado',   gridArea: '3/4', rangeStart: 47, rangeEnd: 59 },
  { text: 'Catálogo digital',  gridArea: '1/3', rangeStart: 53, rangeEnd: 65 },
  { text: 'Envíos',            gridArea: '2/1', rangeStart: 59, rangeEnd: 71 },
  { text: 'Dominio propio',    gridArea: '4/3', rangeStart: 65, rangeEnd: 77 },
  { text: 'Analíticas',        gridArea: '2/4', rangeStart: 71, rangeEnd: 83 },
  { text: 'Venta de entradas', gridArea: '4/2', rangeStart: 77, rangeEnd: 89 },
]

const STEPS = [
  {
    number: '01',
    title: 'Te registrás',
    desc: 'Creás tu cuenta y elegís el formato: tienda, gastronomía o feria.',
    icon: '/how-it-works/Registras.png',
  },
  {
    number: '02',
    title: 'Configurás',
    desc: 'Nombre, logo, colores, tipografía. Subís tus productos o tu menú.',
    icon: '/how-it-works/Configuras.png',
  },
  {
    number: '03',
    title: 'Compartís el link',
    desc: 'cloomy.com/s/tu-negocio. O imprimís el QR y lo pegás en el stand o las mesas.',
    icon: '/how-it-works/Compartis.png',
  },
  {
    number: '04',
    title: 'Cobrás',
    desc: 'Tus clientes compran. Vos ves los pedidos en tu panel y los gestionás.',
    icon: '/how-it-works/Cobras.png',
  },
]

function CardContent({ step }) {
  return (
    <div
      className="w-full h-full rounded-2xl p-8 flex items-center gap-8"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      <span className="text-7xl font-black text-brand-500 leading-none select-none shrink-0">
        {step.number}
      </span>
      <div className="flex-1">
        <h3 className="text-white font-bold text-2xl mb-2">{step.title}</h3>
        <p className="text-text-secondary text-base leading-relaxed">{step.desc}</p>
      </div>
      {step.icon && (
        <div
          className="shrink-0 w-40 h-40 rounded-2xl flex items-center justify-center p-3"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <img
            src={step.icon}
            alt=""
            draggable={false}
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}

function MobileCard({ step, index }) {
  const [ref, inView] = useInView(0.15)
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <span className="block text-4xl font-black text-brand-500 mb-3">{step.number}</span>
        <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const [titleRef, titleInView] = useInView(0.2)
  const [titleRefDesktop, titleInViewDesktop] = useInView(0.2)
  const containerRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || window.innerWidth < 1024) return

      const scrolled = -containerRef.current.getBoundingClientRect().top
      const vh = window.innerHeight

      let activeCard = 0
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const progress     = i === 0 ? 1 : (scrolled - i * vh) / vh
        const nextProgress = i + 1 < STEPS.length ? (scrolled - (i + 1) * vh) / vh : -Infinity
        // card stays hidden until 40% of the scroll interval has passed, then slides in
        const APPEAR_DELAY = 0.4
        const moveP   = i === 0 ? 1 : Math.max(0, Math.min(1, (progress - APPEAR_DELAY) / (1 - APPEAR_DELAY)))
        const ty      = i === 0 ? 0 : Math.max(0, Math.min(35, (1 - moveP) * 35))
        const fadeIn  = i === 0 ? 1 : Math.max(0, Math.min(1, moveP / 0.5))
        const fadeOut = Math.max(0, Math.min(1, 1 - Math.max(0, nextProgress - 0.5) / 0.5))
        const blurPx  = (ty * 0.18).toFixed(1)
        el.style.transform = `translateY(${ty}%)`
        el.style.opacity   = Math.min(fadeIn, fadeOut)
        el.style.filter    = `blur(${blurPx}px)`
        if (progress >= 0.5 && nextProgress < 0.5) activeCard = i
      })
      STEPS.forEach((_, i) => {
        const dot = document.getElementById(`hiw-dot-${i}`)
        if (dot) dot.style.background = i === activeCard ? 'rgba(108,71,255,0.9)' : 'rgba(255,255,255,0.2)'
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="how-it-works" className="section-divider">

      {/* ── Mobile layout ── */}
      <div className="lg:hidden py-20 max-w-6xl mx-auto px-6">
        <h2
          ref={titleRef}
          className={`text-4xl font-black text-white mb-12 reveal ${titleInView ? 'in-view' : ''}`}
        >
          Cómo arrancás.
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {STEPS.map((step, i) => (
            <MobileCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>

      {/* ── Desktop sticky projector ── */}
      <div
        ref={containerRef}
        className="hiw-scroll-container hidden lg:block relative"
        style={{ height: `${(STEPS.length + 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Floating words — CSS scroll-driven 3D zoom, behind cards */}
          <div
            className="hiw-words-grid absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {WORDS.map((w, j) => (
              <span
                key={j}
                className="hiw-word"
                style={{
                  gridArea: w.gridArea,
                  '--word-range-start': `${w.rangeStart}%`,
                  '--word-range-end': `${w.rangeEnd}%`,
                }}
              >
                {w.text}
              </span>
            ))}
          </div>

          {/* Content — above words */}
          <div className="relative h-full flex flex-col justify-center" style={{ zIndex: 10 }}>
            <div className="max-w-3xl mx-auto w-full px-6">

              {/* Title */}
              <h2
                ref={titleRefDesktop}
                className={`text-4xl lg:text-5xl font-black text-white mb-8 reveal ${titleInViewDesktop ? 'in-view' : ''}`}
              >
                Cómo arrancás.
              </h2>

              {/* Dots + Card stack */}
              <div className="flex items-center gap-4">

                {/* Dots — vertical, aligned to card */}
                <div className="flex flex-col gap-2 shrink-0">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      id={`hiw-dot-${i}`}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: i === 0 ? 'rgba(108,71,255,0.9)' : 'rgba(255,255,255,0.2)',
                        transition: 'background 0.3s',
                      }}
                    />
                  ))}
                </div>

                {/* Cards */}
                <div className="relative flex-1" style={{ height: '260px' }}>
                  {STEPS.map((step, i) => (
                    <div
                      key={step.number}
                      ref={el => { cardRefs.current[i] = el }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: i + 1,
                        transform: i === 0 ? 'translateY(0%)' : 'translateY(100%)',
                        opacity: i === 0 ? 1 : 0,
                        willChange: 'transform, opacity',
                      }}
                    >
                      <CardContent step={step} />
                    </div>
                  ))}
                </div>

              </div>{/* end flex items-center gap-4 */}
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
