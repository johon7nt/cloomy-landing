import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const PLANS = [
  {
    id: 'trial',
    name: 'Trial',
    price: { mensual: '$0', anual: '$0' },
    period: '/14 días',
    description: 'Para probar Cloomy sin compromiso.',
    cta: 'Empezar gratis',
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
    description: 'Para negocios chicos que recién arrancan.',
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
      className={`rounded-2xl p-8 flex flex-col reveal ${inView ? 'in-view' : ''}`}
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

      <button
        className={`w-full rounded-xl py-3 font-semibold text-sm transition-all duration-200 mb-8 ${
          plan.highlight
            ? 'bg-brand-500 text-white hover:bg-brand-600'
            : 'border border-white/20 text-white hover:bg-white/5'
        }`}
      >
        {plan.cta} →
      </button>

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
  const [billing, setBilling] = useState('mensual')
  const [headingRef, headingInView] = useInView(0.2)

  return (
    <section id="pricing" className="section-divider py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          ref={headingRef}
          className={`text-4xl lg:text-5xl font-black text-white mb-8 reveal ${headingInView ? 'in-view' : ''}`}
        >
          Pagás un plan,{' '}
          <span className="text-text-secondary">no una comisión.</span>
        </h2>

        {/* Toggle */}
        <div className="inline-flex border border-white/20 rounded-xl p-1 mb-12">
          {['mensual', 'anual'].map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
                billing === b ? 'bg-white text-bg-page' : 'text-text-secondary hover:text-white'
              }`}
            >
              {b}
              {b === 'anual' && (
                <span className="ml-1.5 text-[10px] text-brand-500 font-bold uppercase">−20%</span>
              )}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
