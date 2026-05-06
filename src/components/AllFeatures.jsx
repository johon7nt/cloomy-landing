import { useEffect, useRef, useState, useCallback } from 'react'
import { useInView } from '../hooks/useInView'

const TYPED_TEXT = 'En un solo lugar.'

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Multi-formato',
    desc: 'Tienda, menú QR o stand. Cambiás de formato cuando quieras.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Multi-tenant',
    desc: 'Cada negocio aislado, con su dominio, sus pedidos, sus reglas.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: 'Diseño tuyo',
    desc: 'Logo, paleta, tipografía. Tu marca, no la nuestra.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'Pedidos en vivo',
    desc: 'Notificación al toque cuando entra un pedido. Sin refrescar.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Sin comisiones',
    desc: 'Pagás un plan fijo. Lo que vendés es tuyo, completo.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'API y export',
    desc: 'Tus datos son tuyos. Exportás cuando quieras, sin vueltas.',
  },
]

function FeatureCardMobile({ feature }) {
  return (
    <div className="w-full shrink-0 px-1" style={{ minWidth: '100%' }}>
      <div
        className="p-7 rounded-2xl h-full"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(108,71,255,0.2)',
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-500 mb-5">
          {feature.icon}
        </div>
        <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
      </div>
    </div>
  )
}

function MobileCarousel() {
  const [current, setCurrent] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const [dragDelta, setDragDelta] = useState(0)
  const [dragging, setDragging] = useState(false)
  const total = FEATURES.length

  const goTo = (i) => setCurrent((i + total) % total)

  const onTouchStart = (e) => { setTouchStartX(e.touches[0].clientX); setDragging(true); setDragDelta(0) }
  const onTouchMove  = (e) => { if (touchStartX === null) return; setDragDelta(e.touches[0].clientX - touchStartX) }
  const onTouchEnd   = () => {
    if (dragDelta < -45) goTo(current + 1)
    else if (dragDelta > 45) goTo(current - 1)
    setTouchStartX(null); setDragDelta(0); setDragging(false)
  }

  return (
    <div>
      {/* Track + arrows in a row */}
      <div className="flex items-center gap-4">

        {/* Arrow prev */}
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Anterior"
          className="shrink-0 text-white/40 hover:text-white/80 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Track */}
        <div
          className="flex-1 overflow-hidden rounded-2xl"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(${-current * 100}% + ${dragDelta}px))`,
              transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {FEATURES.map((f) => <FeatureCardMobile key={f.title} feature={f} />)}
          </div>
        </div>

        {/* Arrow next */}
        <button
          onClick={() => goTo(current + 1)}
          aria-label="Siguiente"
          className="shrink-0 text-white/40 hover:text-white/80 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {FEATURES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '20px' : '8px',
              height: '8px',
              background: i === current ? '#6C47FF' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function TabletCarousel() {
  const [current, setCurrent] = useState(0)
  const [containerWidth, setContainerWidth] = useState(700)
  const containerRef = useRef(null)
  const [touchStartX, setTouchStartX] = useState(null)
  const total = FEATURES.length

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const goTo = useCallback((i) => setCurrent((i + total) % total), [total])

  const getOffset = (index) => {
    let d = index - current
    if (d > total / 2) d -= total
    if (d < -total / 2) d += total
    return d
  }

  const CARD_RATIO   = 0.38
  const SIDE_VISIBLE = 185
  const cardWidth    = containerWidth * CARD_RATIO
  const sideShift    = containerWidth / 2 + cardWidth / 2 - SIDE_VISIBLE

  const getStyle = (index) => {
    const offset = getOffset(index)
    const abs    = Math.abs(offset)
    const shift  = abs === 0 ? 0
      : abs === 1 ? Math.sign(offset) * sideShift
      : Math.sign(offset) * (sideShift + cardWidth)

    return {
      left:      '50%',
      width:     `${CARD_RATIO * 100}%`,
      transform: `translateX(calc(-50% + ${shift}px)) scale(${abs === 0 ? 1 : 0.93})`,
      opacity:   abs === 0 ? 1 : abs === 1 ? 0.5 : 0,
      filter:    abs === 0 ? 'none' : 'blur(3px)',
      zIndex:    abs === 0 ? 10 : abs === 1 ? 5 : 1,
      transition:'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s, filter 0.4s',
      cursor:    abs === 1 ? 'pointer' : 'default',
    }
  }

  const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const onTouchEnd   = (e) => {
    if (touchStartX === null) return
    const delta = e.changedTouches[0].clientX - touchStartX
    if (delta < -50) goTo(current + 1)
    else if (delta > 50) goTo(current - 1)
    setTouchStartX(null)
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: '280px' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {FEATURES.map((f, i) => {
          const offset = getOffset(i)
          const abs    = Math.abs(offset)
          return (
            <div
              key={f.title}
              className="absolute top-2 bottom-2"
              style={getStyle(i)}
              onClick={abs === 1 ? () => goTo(i) : undefined}
            >
              <div
                className="h-full p-6 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border:     '1px solid rgba(108,71,255,0.2)',
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-500 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          )
        })}

        <button
          onClick={() => goTo(current - 1)}
          aria-label="Anterior"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white/80 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goTo(current + 1)}
          aria-label="Siguiente"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white/80 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {FEATURES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width:      i === current ? '20px' : '8px',
              height:     '8px',
              background: i === current ? '#6C47FF' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function FeatureCell({ feature, index }) {
  const [ref, inView] = useInView(0.15)
  return (
    <div
      ref={ref}
      className={`bg-bg-card p-8 hover:bg-bg-elevated transition-colors duration-300 group reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-500 mb-5 group-hover:bg-brand-500/25 transition-colors duration-300">
        {feature.icon}
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
    </div>
  )
}

export default function AllFeatures() {
  const [headingRef, headingInView] = useInView(0.2)
  const [typed, setTyped] = useState(0)
  const [typingDone, setTypingDone] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!headingInView || typingDone) return
    const delay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setTyped(prev => {
          const next = prev + 1
          if (next >= TYPED_TEXT.length) {
            clearInterval(intervalRef.current)
            setTypingDone(true)
          }
          return next
        })
      }, 70)
    }, 400)
    return () => {
      clearTimeout(delay)
      clearInterval(intervalRef.current)
    }
  }, [headingInView])

  return (
    <section id="all-features" className="section-divider py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className={`reveal ${headingInView ? 'in-view' : ''}`}>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 max-w-2xl leading-tight">
            Todo lo que necesitás.
            <span className="block mt-2">
              {typed > 0 && (
                <mark className="highlight-brand text-white not-italic">
                  {TYPED_TEXT.slice(0, typed)}
                </mark>
              )}
              {!typingDone && <span className="cursor-blink" aria-hidden />}
            </span>
          </h2>
          <br></br>
          <p className="text-text-secondary text-lg mb-12">
            Cada función tiene un motivo real.
          </p>
        </div>

        {/* Mobile: carousel — solo < md */}
        <div className="md:hidden">
          <MobileCarousel />
        </div>

        {/* Tablet: cover-flow carousel — md a lg */}
        <div className="hidden md:block lg:hidden">
          <TabletCarousel />
        </div>

        {/* Desktop: grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-px bg-brand-500/20 rounded-2xl overflow-hidden border border-brand-500/20">
          {FEATURES.map((feature, i) => (
            <FeatureCell key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
