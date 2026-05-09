import { useState, useRef } from 'react'
import PageTransition from './PageTransition'
import Footer from './Footer'

const LOGIN_URL = 'https://cloomybuild-production.up.railway.app/login'

const PLANS = [
  {
    id: 'trial',
    name: 'Trial',
    price: { mensual: '$0', anual: '$0' },
    priceNum: { mensual: 0, anual: 0 },
    period: '/14 días',
    description: 'Para probar Cloomy sin compromiso.',
    cta: 'Empezar gratis',
    href: LOGIN_URL,
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
    priceNum: { mensual: 12000, anual: 9600 },
    period: '/mes',
    description: 'Para negocios que recién arrancan.',
    cta: 'Elegir Basic',
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
    priceNum: { mensual: 24000, anual: 19200 },
    period: '/mes',
    description: 'Para negocios que quieren más.',
    cta: 'Elegir Pro',
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

const SECTIONS = [
  {
    id: 'catalogo',
    category: 'Catálogo',
    iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    rows: [
      { label: 'Productos',  trial: 'Hasta 10',     basic: 'Ilimitados',   pro: 'Ilimitados'     },
      { label: 'Formatos',   trial: '1',             basic: '1',            pro: 'Multi-formato'  },
    ],
  },
  {
    id: 'presencia',
    category: 'Presencia digital',
    iconPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    rows: [
      { label: 'Subdominio Cloomy', trial: true,  basic: true,  pro: true  },
      { label: 'Dominio propio',    trial: false, basic: true,  pro: true  },
      { label: 'QR por mesa/stand', trial: false, basic: true,  pro: true  },
    ],
  },
  {
    id: 'funciones',
    category: 'Funciones',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    rows: [
      { label: 'Pedidos en vivo',      trial: false, basic: true,  pro: true  },
      { label: 'Múltiples sucursales', trial: false, basic: false, pro: true  },
      { label: 'API + webhooks',       trial: false, basic: false, pro: true  },
      { label: 'Analíticas',           trial: false, basic: true,  pro: true  },
    ],
  },
  {
    id: 'soporte',
    category: 'Soporte',
    iconPath: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
    rows: [
      { label: 'Canal de soporte', trial: 'Email',   basic: 'Email',         pro: 'Prioritario'    },
      { label: 'Duración',         trial: '14 días', basic: 'Mensual/anual', pro: 'Mensual/anual'  },
    ],
  },
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 mx-auto shrink-0" style={{ color: '#6C47FF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-4 h-4 mx-auto shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function Cell({ value, highlight }) {
  if (value === true)  return <CheckIcon />
  if (value === false) return <XIcon />
  return (
    <span className="block text-center text-xs sm:text-sm font-medium leading-tight"
      style={{ color: highlight ? '#fff' : 'rgba(255,255,255,0.7)' }}>
      {value}
    </span>
  )
}

function FeatureCheckIcon({ highlight }) {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
      style={{ color: highlight ? '#fff' : '#6C47FF' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function PlanCard({ plan, billing, onSelectPlan }) {
  const handleCTA = () => {
    if (plan.href) {
      window.open(plan.href, '_blank')
    } else {
      onSelectPlan({
        id: plan.id, name: plan.name, description: plan.description,
        priceNum: plan.priceNum, highlight: plan.highlight,
      }, billing)
    }
  }

  return (
    <div
      className="rounded-2xl p-7 flex flex-col h-full"
      style={{
        background: plan.highlight ? 'rgba(108,71,255,0.18)' : 'rgba(255,255,255,0.06)',
        border:     plan.highlight ? '1px solid rgba(108,71,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow:  plan.highlight ? '0 8px 32px rgba(108,71,255,0.2), 0 2px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      <div className="mb-6">
        {plan.highlight && (
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3"
            style={{ background: 'rgba(108,71,255,0.3)', color: '#c4b5fd', border: '1px solid rgba(108,71,255,0.4)' }}>
            Más popular
          </span>
        )}
        <h3 className="text-xl font-black text-white mb-1">{plan.name}</h3>
        <p className="text-sm" style={{ color: plan.highlight ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)' }}>
          {plan.description}
        </p>

        <div className="mt-4">
          {billing === 'anual' && plan.price.mensual !== '$0' && (
            <p className="text-sm line-through mb-1"
              style={{ color: plan.highlight ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.3)' }}>
              {plan.price.mensual}<span className="text-xs">/mes</span>
            </p>
          )}
          <div className="flex items-end gap-1">
            <span className="text-4xl lg:text-5xl font-black leading-none text-white">{plan.price[billing]}</span>
            <span className="text-sm mb-1" style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)' }}>
              {plan.period}
            </span>
          </div>
          {billing === 'anual' && plan.price.mensual !== '$0' && (
            <p className="text-xs mt-1.5 font-medium" style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#a78bfa' }}>
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
          className={`block w-full text-center rounded-xl py-3 font-semibold text-sm mb-8 transition-colors duration-300 ${
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
          onClick={handleCTA}
          className={`w-full rounded-xl py-3 font-semibold text-sm mb-8 transition-colors duration-300 ${
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
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2.5">
            <FeatureCheckIcon highlight={plan.highlight} />
            <span className="text-sm" style={{ color: plan.highlight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)' }}>
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AccordionSection({ section, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const bodyRef = useRef(null)

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 group"
        style={{ background: open ? 'rgba(108,71,255,0.07)' : 'transparent', transition: 'background 0.2s' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: open ? 'rgba(108,71,255,0.25)' : 'rgba(255,255,255,0.06)',
              border: open ? '1px solid rgba(108,71,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
              transition: 'background 0.2s, border-color 0.2s',
            }}>
            <svg className="w-4 h-4" style={{ color: open ? '#a78bfa' : 'rgba(255,255,255,0.4)' }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d={section.iconPath} />
            </svg>
          </div>
          <span className="font-bold text-sm sm:text-base transition-colors duration-200"
            style={{ color: open ? '#fff' : 'rgba(255,255,255,0.7)' }}>
            {section.category}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
            {section.rows.length} funciones
          </span>
        </div>
        <svg
          className="w-4 h-4 shrink-0 transition-transform duration-300"
          style={{
            color: 'rgba(255,255,255,0.4)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Body */}
      <div
        ref={bodyRef}
        style={{
          maxHeight: open ? '600px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Column headers */}
        <div className="grid grid-cols-4 border-t border-b"
          style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="px-5 sm:px-6 py-2.5" />
          {PLANS.map(p => (
            <div key={p.id} className="py-2.5 text-center">
              <span className="text-[11px] font-bold tracking-wide uppercase"
                style={{ color: p.highlight ? '#a78bfa' : 'rgba(255,255,255,0.35)' }}>
                {p.name}
              </span>
            </div>
          ))}
        </div>

        {/* Rows */}
        {section.rows.map((row, ri) => (
          <div
            key={row.label}
            className="grid grid-cols-4 border-b"
            style={{
              borderColor: 'rgba(255,255,255,0.05)',
              background: ri % 2 === 1 ? 'rgba(255,255,255,0.015)' : 'transparent',
            }}
          >
            <div className="px-5 sm:px-6 py-3.5 flex items-center">
              <span className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{row.label}</span>
            </div>
            {PLANS.map(plan => (
              <div
                key={plan.id}
                className="py-3.5 px-2 flex items-center justify-center"
                style={{
                  background: plan.highlight ? 'rgba(108,71,255,0.04)' : 'transparent',
                  borderLeft: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <Cell value={row[plan.id]} highlight={plan.highlight} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ComparePlans({ onBack, onSelectPlan }) {
  const [billing, setBilling] = useState('anual')
  const [tableOpen, setTableOpen] = useState(false)

  return (
    <>
      <PageTransition />

      {/* Page */}
      <div className="min-h-screen pt-24 pb-0 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-10 sm:mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#a78bfa' }}>Planes</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Comparar planes</h1>
            <p className="text-base sm:text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Elegí el plan que mejor se adapta a tu negocio. Sin comisiones, sin letra chica.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="inline-flex rounded-xl p-1"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: billing === 'anual' ? '1px solid rgba(108,71,255,0.5)' : '1px solid rgba(255,255,255,0.15)',
                boxShadow: billing === 'anual' ? '0 0 18px rgba(108,71,255,0.25)' : 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
            >
              {['mensual', 'anual'].map(b => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className="relative px-5 py-2 rounded-lg text-sm font-semibold capitalize z-10 transition-colors duration-300"
                  style={{ color: billing === b ? (b === 'anual' ? '#fff' : '#0a0a14') : 'rgba(255,255,255,0.45)' }}
                >
                  {billing === b && (
                    <span className="absolute inset-0 rounded-lg" style={{
                      background: b === 'anual'
                        ? 'linear-gradient(135deg, #7C5CFF 0%, #6C47FF 100%)'
                        : '#ffffff',
                      boxShadow: b === 'anual' ? '0 0 12px rgba(108,71,255,0.6)' : 'none',
                    }} />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {b}
                    {b === 'anual' && (
                      <span className="text-[10px] font-bold uppercase"
                        style={{ color: billing === 'anual' ? 'rgba(255,255,255,0.85)' : 'rgba(108,71,255,0.8)' }}>
                        −20%
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
            {billing === 'anual' && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(34,197,94,0.12)', color: 'rgb(74,222,128)', border: '1px solid rgba(34,197,94,0.25)' }}>
                Ahorrás 20%
              </span>
            )}
          </div>

          {/* Plan cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {PLANS.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                onSelectPlan={onSelectPlan}
              />
            ))}
          </div>

          {/* Expand/collapse button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setTableOpen(v => !v)}
              className="group flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-200"
              style={{
                background: tableOpen ? 'rgba(108,71,255,0.15)' : 'rgba(255,255,255,0.05)',
                border: tableOpen ? '1px solid rgba(108,71,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                color: tableOpen ? '#c4b5fd' : 'rgba(255,255,255,0.6)',
                boxShadow: tableOpen ? '0 0 20px rgba(108,71,255,0.2)' : 'none',
              }}
              onMouseEnter={e => {
                if (!tableOpen) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = '#fff'
                }
              }}
              onMouseLeave={e => {
                if (!tableOpen) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                }
              }}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              {tableOpen ? 'Ocultar funcionalidades' : 'Ver todas las funcionalidades'}
              <svg
                className="w-4 h-4 shrink-0 transition-transform duration-300"
                style={{ transform: tableOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Accordion table */}
          <div
            style={{
              maxHeight: tableOpen ? '2000px' : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <div className="space-y-3 pb-2">
              {SECTIONS.map((section, i) => (
                <AccordionSection key={section.id} section={section} defaultOpen={i === 0} />
              ))}
            </div>
          </div>

          {/* Fine print */}
          <p className="text-center text-xs mt-12 mb-16" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Todos los planes incluyen acceso completo a la plataforma durante su vigencia · Sin comisiones por venta · Cancelás cuando quieras
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}
