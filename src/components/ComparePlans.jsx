import Logo from './Logo'

const PLANS_META = [
  { id: 'trial', name: 'Trial',  price: 'Gratis',     period: '14 días',  highlight: false },
  { id: 'basic', name: 'Basic',  price: '$12.000',    period: '/mes',     highlight: false },
  { id: 'pro',   name: 'Pro',    price: '$24.000',    period: '/mes',     highlight: true  },
]

const SECTIONS = [
  {
    category: 'Precio',
    rows: [
      { label: 'Precio mensual',    trial: 'Gratis',         basic: '$12.000',        pro: '$24.000'        },
      { label: 'Precio anual',      trial: 'Gratis',         basic: '$9.600/mes',     pro: '$19.200/mes'    },
      { label: 'Comisiones',        trial: false,            basic: false,            pro: false            },
    ],
  },
  {
    category: 'Catálogo',
    rows: [
      { label: 'Productos',         trial: 'Hasta 10',       basic: 'Ilimitados',     pro: 'Ilimitados'     },
      { label: 'Formatos',          trial: '1',              basic: '1',              pro: 'Multi-formato'  },
    ],
  },
  {
    category: 'Presencia digital',
    rows: [
      { label: 'Subdominio Cloomy', trial: true,             basic: true,             pro: true             },
      { label: 'Dominio propio',    trial: false,            basic: true,             pro: true             },
      { label: 'QR por mesa/stand', trial: false,            basic: true,             pro: true             },
    ],
  },
  {
    category: 'Funciones',
    rows: [
      { label: 'Pedidos en vivo',       trial: false,        basic: true,             pro: true             },
      { label: 'Múltiples sucursales',  trial: false,        basic: false,            pro: true             },
      { label: 'API + webhooks',        trial: false,        basic: false,            pro: true             },
      { label: 'Analíticas',            trial: false,        basic: true,             pro: true             },
    ],
  },
  {
    category: 'Soporte',
    rows: [
      { label: 'Canal de soporte', trial: 'Email',           basic: 'Email',          pro: 'Prioritario'    },
      { label: 'Duración',         trial: '14 días',         basic: 'Mensual/anual',  pro: 'Mensual/anual'  },
    ],
  },
]

function Check() {
  return (
    <svg className="w-5 h-5 mx-auto" style={{ color: '#6C47FF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function Dash() {
  return <span className="block w-4 h-0.5 mx-auto rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
}

function Cell({ value, highlight }) {
  if (value === true)  return <Check />
  if (value === false) return <Dash />
  return (
    <span className="text-sm font-medium" style={{ color: highlight ? '#fff' : 'rgba(255,255,255,0.75)' }}>
      {value}
    </span>
  )
}

export default function ComparePlans({ onBack, onSelectPlan }) {
  const LOGIN_URL = 'https://cloomybuild-production.up.railway.app/login'

  const handleCTA = (plan) => {
    if (plan.id === 'trial') {
      window.open(LOGIN_URL, '_blank')
    } else {
      const fullPlan = {
        id: plan.id, name: plan.name, description: '',
        priceNum: plan.id === 'basic' ? { mensual: 12000, anual: 9600 } : { mensual: 24000, anual: 19200 },
        highlight: plan.highlight,
      }
      onSelectPlan(fullPlan, 'mensual')
    }
  }

  return (
    <>
      {/* ── Top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(10,10,20,0.85)',
        borderBottom: '1px solid rgba(108,71,255,0.15)',
      }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center">
            <Logo desktopClassName="h-7 w-auto" mobileClassName="h-8 w-auto" />
          </button>
          <button onClick={onBack}
            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
        </div>
      </header>

      {/* ── Page ── */}
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="text-brand-400 text-xs font-bold tracking-widest uppercase mb-3">Planes</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Comparar planes</h1>
            <p className="text-text-secondary text-lg max-w-xl">
              Elegí el plan que mejor se adapta a tu negocio. Sin comisiones, sin letra chica.
            </p>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden" style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>

            {/* Plan header row */}
            <div className="grid grid-cols-4 border-b border-white/8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="p-5 sm:p-6" />
              {PLANS_META.map(plan => (
                <div key={plan.id} className="p-5 sm:p-6 text-center relative" style={{
                  background: plan.highlight ? 'rgba(108,71,255,0.1)' : 'transparent',
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                }}>
                  {plan.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #6C47FF, transparent)' }} />
                  )}
                  <div className="text-sm font-bold text-text-secondary mb-1">{plan.name}</div>
                  <div className="text-2xl font-black text-white leading-none">{plan.price}</div>
                  <div className="text-xs text-text-secondary mt-1">{plan.period}</div>
                </div>
              ))}
            </div>

            {/* Feature sections */}
            {SECTIONS.map((section, si) => (
              <div key={section.category}>
                {/* Category label */}
                <div className="grid grid-cols-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
                  <div className="px-5 sm:px-6 py-3 col-span-4">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-text-tertiary">
                      {section.category}
                    </span>
                  </div>
                </div>

                {/* Feature rows */}
                {section.rows.map((row, ri) => (
                  <div key={row.label} className="grid grid-cols-4 border-b" style={{
                    borderColor: 'rgba(255,255,255,0.05)',
                    background: ri % 2 === 1 ? 'rgba(255,255,255,0.015)' : 'transparent',
                  }}>
                    <div className="px-5 sm:px-6 py-4 flex items-center">
                      <span className="text-sm text-text-secondary">{row.label}</span>
                    </div>
                    {PLANS_META.map(plan => (
                      <div key={plan.id} className="px-3 py-4 flex items-center justify-center" style={{
                        background: plan.highlight ? 'rgba(108,71,255,0.05)' : 'transparent',
                        borderLeft: '1px solid rgba(255,255,255,0.04)',
                      }}>
                        <Cell value={row[plan.id]} highlight={plan.highlight} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="p-5 sm:p-6 flex items-center">
                <span className="text-sm font-semibold text-white">Empezar</span>
              </div>
              {PLANS_META.map(plan => (
                <div key={plan.id} className="p-4 sm:p-5 flex items-center justify-center" style={{
                  background: plan.highlight ? 'rgba(108,71,255,0.08)' : 'transparent',
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <button
                    onClick={() => handleCTA(plan)}
                    className="w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-200"
                    style={plan.highlight ? {
                      background: '#6C47FF',
                      color: '#fff',
                      boxShadow: '0 0 18px rgba(108,71,255,0.45)',
                    } : {
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                    onMouseEnter={e => { if (plan.highlight) e.currentTarget.style.boxShadow = '0 0 28px rgba(108,71,255,0.65)' }}
                    onMouseLeave={e => { if (plan.highlight) e.currentTarget.style.boxShadow = '0 0 18px rgba(108,71,255,0.45)' }}
                  >
                    {plan.id === 'trial' ? 'Probar gratis' : `Elegir ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Fine print */}
          <p className="text-center text-xs text-text-tertiary mt-8">
            Todos los planes incluyen acceso completo a la plataforma durante su vigencia · Sin comisiones por venta · Cancelás cuando quieras
          </p>
        </div>
      </div>
    </>
  )
}
