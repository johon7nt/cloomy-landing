import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'

function PlanCardContent({ plan, billing }) {
  return (
    <div
      className="h-full p-7 rounded-2xl flex flex-col"
      style={{
        background:  plan.highlight ? 'rgba(108,71,255,0.18)' : 'rgba(255,255,255,0.06)',
        border:      plan.highlight ? '1px solid rgba(108,71,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow:   plan.highlight ? '0 8px 32px rgba(108,71,255,0.2), 0 2px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      <div className="mb-5">
        <h3 className="text-xl font-black mb-1 text-white">{plan.name}</h3>
        <p className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-text-secondary'}`}>{plan.description}</p>
        <div className="mt-4">
          {billing === 'anual' && plan.price.mensual !== '$0' && (
            <p className={`text-sm line-through mb-1 ${plan.highlight ? 'text-white/50' : 'text-text-secondary/60'}`}>
              {plan.price.mensual}<span className="text-xs">/mes</span>
            </p>
          )}
          <div className="flex items-end gap-1">
            <span className="text-4xl font-black leading-none">{plan.price[billing]}</span>
            <span className={`text-sm mb-1 ${plan.highlight ? 'text-white/70' : 'text-text-secondary'}`}>{plan.period}</span>
          </div>
          {billing === 'anual' && plan.price.mensual !== '$0' && (
            <p className={`text-xs mt-1.5 font-medium ${plan.highlight ? 'text-white/70' : 'text-brand-400'}`}>
              Pagás {plan.price.anual} × 12 al año
            </p>
          )}
        </div>
      </div>

      <button
        className={`w-full rounded-xl py-3 font-semibold text-sm mb-6 transition-colors duration-300 ${
          plan.highlight
            ? 'bg-brand-500 text-white hover:bg-brand-600'
            : 'border border-white/20 text-white hover:border-brand-500/70 hover:bg-brand-500/10'
        }`}
      >
        {plan.cta} →
      </button>

      <ul className="space-y-3 flex-grow">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className={plan.highlight ? 'text-white' : 'text-brand-500'}>
              <CheckIcon />
            </span>
            <span className={`text-sm ${plan.highlight ? 'text-white/90' : 'text-text-secondary'}`}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PricingTabletCarousel({ billing }) {
  const [current, setCurrent] = useState(2)
  const [containerWidth, setContainerWidth] = useState(700)
  const containerRef = useRef(null)
  const [touchStartX, setTouchStartX] = useState(null)
  const total = PLANS.length

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const goTo = (i) => setCurrent((i + total) % total)

  const getOffset = (index) => {
    let d = index - current
    if (d > total / 2) d -= total
    if (d < -total / 2) d += total
    return d
  }

  const CARD_RATIO   = 0.55
  const SIDE_VISIBLE = 140
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
        className="relative"
        style={{ height: '500px' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {PLANS.map((plan, i) => {
          const offset = getOffset(i)
          const abs    = Math.abs(offset)
          return (
            <div
              key={plan.id}
              className="absolute top-2 bottom-4"
              style={getStyle(i)}
              onClick={abs === 1 ? () => goTo(i) : undefined}
            >
              <PlanCardContent plan={plan} billing={billing} />
            </div>
          )
        })}

        <button onClick={() => goTo(current - 1)} aria-label="Anterior"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white/80 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={() => goTo(current + 1)} aria-label="Siguiente"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-white/40 hover:text-white/80 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {PLANS.map((_, i) => (
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

const TYPED_TEXT = 'no una comisión.'

const PLANS = [
  {
    id: 'trial',
    name: 'Trial',
    price: { mensual: '$0', anual: '$0' },
    period: '/14 días',
    description: 'Para probar Cloomy sin compromiso.',
    cta: 'Empezar gratis',
    href: 'https://cloomybuild-production.up.railway.app/login',
    ctaStyle: 'outline',
    features: [
      'Hasta 10 productos',
      '1 formato',
      'Subdominio cloomy.com/s/...',
      'Soporte por mail',
    ],
    highlight: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: { mensual: '$12.000', anual: '$9.600' },
    period: '/mes',
    description: 'Para negocios que recién arrancan.',
    cta: 'Elegir Basic',
    ctaStyle: 'outline-white',
    features: [
      'Productos ilimitados',
      '1 formato',
      'Dominio propio',
      'QR por mesa o stand',
      'Pedidos en vivo',
    ],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { mensual: '$24.000', anual: '$19.200' },
    period: '/mes',
    description: 'Para negocios que quieren más.',
    cta: 'Elegir Pro',
    ctaStyle: 'solid-white',
    features: [
      'Todo lo de Basic',
      'Multi-formato (tienda + gastro)',
      'Múltiples sucursales',
      'API + webhooks',
      'Soporte prioritario',
    ],
    highlight: true,
  },
]

function CheckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function PlanCard({ plan, billing, index }) {
  const [ref, inView] = useInView(0.15)
  return (
    <div
      ref={ref}
      className={`rounded-2xl p-8 flex flex-col h-full reveal ${inView ? 'in-view' : ''}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        background: plan.highlight
          ? 'rgba(108,71,255,0.18)'
          : 'rgba(255,255,255,0.06)',
        border: plan.highlight
          ? '1px solid rgba(108,71,255,0.5)'
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: plan.highlight
          ? '0 8px 32px rgba(108,71,255,0.2), 0 2px 8px rgba(0,0,0,0.3)'
          : '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-black mb-1 text-white">{plan.name}</h3>
        <p className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-text-secondary'}`}>
          {plan.description}
        </p>

        <div className="mt-4">
          {billing === 'anual' && plan.price.mensual !== '$0' && (
            <p className={`text-sm line-through mb-1 ${plan.highlight ? 'text-white/50' : 'text-text-secondary/60'}`}>
              {plan.price.mensual}<span className="text-xs">/mes</span>
            </p>
          )}
          <div className="flex items-end gap-1">
            <span className="text-4xl lg:text-5xl font-black leading-none">
              {plan.price[billing]}
            </span>
            <span className={`text-sm mb-1 ${plan.highlight ? 'text-white/70' : 'text-text-secondary'}`}>
              {plan.period}
            </span>
          </div>
          {billing === 'anual' && plan.price.mensual !== '$0' && (
            <p className={`text-xs mt-1.5 font-medium ${plan.highlight ? 'text-white/70' : 'text-brand-400'}`}>
              Pagás {plan.price.anual} × 12 al año
            </p>
          )}
        </div>
      </div>

      {plan.href ? (
        <a
          href={plan.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full text-center rounded-xl py-3 font-semibold text-sm mb-8 ${
            plan.highlight
              ? 'bg-brand-500 text-white hover:bg-brand-600'
              : 'border border-white/20 text-white hover:border-brand-500/70 hover:bg-brand-500/10'
          }`}
          style={{ transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 22px rgba(108,71,255,0.45)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
        >
          {plan.cta} →
        </a>
      ) : (
        <button
          className={`w-full rounded-xl py-3 font-semibold text-sm mb-8 ${
            plan.highlight
              ? 'bg-brand-500 text-white hover:bg-brand-600'
              : 'border border-white/20 text-white hover:border-brand-500/70 hover:bg-brand-500/10'
          }`}
          style={{ transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 22px rgba(108,71,255,0.45)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
        >
          {plan.cta} →
        </button>
      )}

      <ul className="space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className={plan.highlight ? 'text-white' : 'text-brand-500'}>
              <CheckIcon />
            </span>
            <span className={`text-sm ${plan.highlight ? 'text-white/90' : 'text-text-secondary'}`}>
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Pricing() {
  const [billing, setBilling] = useState('anual')
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
    <section id="pricing" className="section-divider py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          ref={headingRef}
          className={`text-4xl lg:text-5xl font-black text-white mb-8 leading-snug reveal ${headingInView ? 'in-view' : ''}`}
        >
          Pagás un plan,{' '}
          <span className="block mt-4">
            {typed > 0 && (
              <mark className="highlight-brand text-white not-italic">
                {TYPED_TEXT.slice(0, typed)}
              </mark>
            )}
            {!typingDone && <span className="cursor-blink" aria-hidden />}
          </span>
        </h2>

        {/* Toggle */}
        <div
          className="inline-flex rounded-xl p-1 mb-12 relative"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: billing === 'anual'
              ? '1px solid rgba(108,71,255,0.5)'
              : '1px solid rgba(255,255,255,0.15)',
            boxShadow: billing === 'anual'
              ? '0 0 18px rgba(108,71,255,0.35)'
              : 'none',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          {['mensual', 'anual'].map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className="relative px-5 py-2 rounded-lg text-sm font-semibold capitalize z-10 transition-colors duration-300"
              style={{
                color: billing === b ? (b === 'anual' ? '#fff' : '#0a0a14') : 'rgba(255,255,255,0.45)',
              }}
            >
              {billing === b && (
                <span
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: b === 'anual'
                      ? 'linear-gradient(135deg, #7C5CFF 0%, #6C47FF 100%)'
                      : '#ffffff',
                    boxShadow: b === 'anual' ? '0 0 12px rgba(108,71,255,0.6)' : 'none',
                    transition: 'background 0.3s ease, box-shadow 0.3s ease',
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {b}
                {b === 'anual' && (
                  <span
                    className="text-[10px] font-bold uppercase"
                    style={{ color: billing === 'anual' ? 'rgba(255,255,255,0.85)' : 'rgba(108,71,255,0.8)' }}
                  >
                    −20%
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Cards — mobile: columna; tablet: cover-flow; desktop: grid */}
        <div className="md:hidden grid gap-4">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} index={i} />
          ))}
        </div>

        <div className="hidden md:block lg:hidden -mx-6 overflow-hidden">
          <PricingTabletCarousel billing={billing} />
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-4">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
