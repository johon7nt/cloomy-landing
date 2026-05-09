import { useState } from 'react'
import CTA from './CTA'
import Footer from './Footer'

const PLAN_ORDER = { trial: 0, basic: 1, pro: 2 }

const PLAN_BADGE = {
  trial: { label: 'Trial', bg: 'rgba(34,197,94,0.12)',   bgActive: 'rgba(34,197,94,0.28)',   border: 'rgba(34,197,94,0.3)',   borderActive: 'rgba(34,197,94,0.7)',   color: 'rgb(74,222,128)',  glow: '0 0 16px rgba(34,197,94,0.5)'  },
  basic: { label: 'Basic', bg: 'rgba(59,130,246,0.12)',   bgActive: 'rgba(59,130,246,0.28)',   border: 'rgba(59,130,246,0.3)',  borderActive: 'rgba(59,130,246,0.7)',  color: 'rgb(96,165,250)',  glow: '0 0 16px rgba(59,130,246,0.5)' },
  pro:   { label: 'Pro',   bg: 'rgba(108,71,255,0.18)',   bgActive: 'rgba(108,71,255,0.35)',   border: 'rgba(108,71,255,0.45)', borderActive: 'rgba(108,71,255,0.85)', color: '#c4b5fd',          glow: '0 0 16px rgba(108,71,255,0.6)' },
}

// A feature is "included" when its required plan rank ≤ selected plan rank
function isIncluded(featurePlan, activePlan) {
  return activePlan === null || PLAN_ORDER[featurePlan] <= PLAN_ORDER[activePlan]
}

function PlanBadge({ plan }) {
  const cfg = PLAN_BADGE[plan]
  return (
    <span className="inline-flex items-center text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
      {cfg.label}
    </span>
  )
}

const CATEGORIES = [
  {
    id: 'catalogo',
    title: 'Catálogo',
    description: 'Gestioná tus productos, variantes y stock desde un solo lugar.',
    iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    features: [
      { title: 'Hasta 10 productos',       desc: 'Cargá hasta 10 productos activos en tu catálogo.',                           plan: 'trial' },
      { title: 'Productos ilimitados',      desc: 'Sin límite de productos. Cargá todo tu inventario.',                          plan: 'basic' },
      { title: 'Variantes y opciones',      desc: 'Talle, color, sabor. Configurás las opciones que necesite tu producto.',      plan: 'basic' },
      { title: 'Imágenes múltiples',        desc: 'Subí varias fotos por producto para mostrarlo desde todos los ángulos.',      plan: 'basic' },
      { title: 'Categorías y colecciones',  desc: 'Organizá tu catálogo en secciones para que tus clientes encuentren todo.',   plan: 'basic' },
      { title: 'Multi-formato',             desc: 'Tienda, menú gastronómico o stand. Cambiás de formato cuando quieras.',       plan: 'pro'   },
    ],
  },
  {
    id: 'presencia',
    title: 'Presencia digital',
    description: 'Tu negocio en línea con tu identidad, en cualquier formato.',
    iconPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    features: [
      { title: 'Subdominio Cloomy',         desc: 'Tu negocio en cloomy.com/s/tu-negocio desde el primer día.',                 plan: 'trial' },
      { title: 'Personalización de marca',  desc: 'Logo, colores y tipografía. Tu identidad, no la nuestra.',                   plan: 'trial' },
      { title: 'Dominio propio',            desc: 'Conectá tu dominio y mostrá tu tienda en tu URL exclusiva.',                  plan: 'basic' },
      { title: 'QR por mesa o stand',       desc: 'Imprimí el QR de cada mesa o stand para que tus clientes accedan al menú.',  plan: 'basic' },
      { title: 'Página de negocio',         desc: 'Descripción, horarios, ubicación y redes sociales en un solo lugar.',        plan: 'basic' },
      { title: 'Múltiples sucursales',      desc: 'Cada sucursal con su catálogo, sus pedidos y su panel.',                     plan: 'pro'   },
    ],
  },
  {
    id: 'pedidos',
    title: 'Pedidos y ventas',
    description: 'Recibí y gestioná pedidos en tiempo real, sin fricciones.',
    iconPath: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    features: [
      { title: 'Pedidos en vivo',           desc: 'Recibís una notificación al instante cuando entra un pedido. Sin refrescar.', plan: 'basic' },
      { title: 'Panel de gestión',          desc: 'Aceptá, rechazá o marcá pedidos como listos desde un panel simple.',         plan: 'basic' },
      { title: 'Historial de órdenes',      desc: 'Consultá todo el historial de pedidos, clientes y montos.',                  plan: 'basic' },
      { title: 'Sin comisiones',            desc: 'Pagás un plan fijo. Cada venta es tuya, completa, sin descuentos ocultos.',  plan: 'trial' },
      { title: 'División de cuenta',        desc: 'Tus clientes dividen la cuenta desde su celu, sin que vos intervengas.',     plan: 'basic' },
      { title: 'Llamada al mozo',           desc: 'El cliente llama al mozo desde la app. Sin levantar la mano.',               plan: 'basic' },
    ],
  },
  {
    id: 'analiticas',
    title: 'Analíticas',
    description: 'Entendé tu negocio con datos claros y accionables.',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    features: [
      { title: 'Dashboard de ventas',       desc: 'Totales, promedios y tendencias en tiempo real.',                             plan: 'basic' },
      { title: 'Productos más vendidos',    desc: 'Sabés qué funciona y qué podés mejorar en tu catálogo.',                     plan: 'basic' },
      { title: 'Tráfico y escaneos',        desc: 'Cuántas personas escanearon tu QR y qué navegaron.',                         plan: 'basic' },
      { title: 'Reportes por sucursal',     desc: 'Comparás el rendimiento de cada sucursal en un vistazo.',                    plan: 'pro'   },
    ],
  },
  {
    id: 'integraciones',
    title: 'Integraciones y API',
    description: 'Conectá Cloomy con tus herramientas y automatizaciones.',
    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    features: [
      { title: 'API REST',                  desc: 'Acceso completo a productos, pedidos y clientes vía API con autenticación.', plan: 'pro'   },
      { title: 'Webhooks',                  desc: 'Recibís eventos en tu sistema al instante: pedido nuevo, cancelado, listo.', plan: 'pro'   },
      { title: 'Export de datos',           desc: 'Exportás productos y pedidos a CSV o JSON cuando querés.',                   plan: 'basic' },
      { title: 'Integraciones futuras',     desc: 'Mercado Pago, WhatsApp Business y más conectores en camino.',               plan: 'pro'   },
    ],
  },
  {
    id: 'soporte',
    title: 'Soporte',
    description: 'Tenés ayuda cuando la necesitás, sin esperar.',
    iconPath: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
    features: [
      { title: 'Soporte por email',         desc: 'Respondemos todas las consultas dentro de las 48 h hábiles.',               plan: 'trial' },
      { title: 'Centro de ayuda',           desc: 'Documentación, guías y tutoriales siempre disponibles.',                    plan: 'trial' },
      { title: 'Soporte prioritario',       desc: 'Respuesta en menos de 4 h y canal directo con el equipo.',                  plan: 'pro'   },
      { title: 'Onboarding asistido',       desc: 'Te ayudamos a configurar tu negocio desde cero si es necesario.',           plan: 'pro'   },
    ],
  },
]

function FeatureCard({ feature, activePlan }) {
  const included = isIncluded(feature.plan, activePlan)
  const cfg = PLAN_BADGE[feature.plan]

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 h-full"
      style={{
        background: included && activePlan ? cfg.bgActive : 'rgba(255,255,255,0.04)',
        border: `1px solid ${included && activePlan ? cfg.borderActive : 'rgba(255,255,255,0.08)'}`,
        boxShadow: included && activePlan ? cfg.glow : 'none',
        opacity: !included ? 0.3 : 1,
        transition: 'border-color 0.25s, background 0.25s, opacity 0.25s, box-shadow 0.25s',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold text-white leading-snug">{feature.title}</h4>
        <PlanBadge plan={feature.plan} />
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
        {feature.desc}
      </p>
    </div>
  )
}

function CategorySection({ cat, activePlan }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(108,71,255,0.18)', border: '1px solid rgba(108,71,255,0.35)' }}>
          <svg className="w-4 h-4" style={{ color: '#a78bfa' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d={cat.iconPath} />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-black text-white">{cat.title}</h2>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{cat.description}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cat.features.map(f => (
          <FeatureCard key={f.title} feature={f} activePlan={activePlan} />
        ))}
      </div>
    </div>
  )
}

export default function AllFunctionsPage() {
  const [activePlan, setActivePlan] = useState(null)

  const togglePlan = (key) => setActivePlan(p => p === key ? null : key)

  return (
    <>
      <div className="min-h-screen pt-24 pb-0 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#a78bfa' }}>
              Funcionalidades
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Todas las funciones
            </h1>
            <p className="text-base sm:text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Todo lo que necesitás para digitalizar tu negocio. Sin comisiones, sin letra chica.
            </p>

            {/* Interactive plan filter */}
            <div className="mt-6">
              <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {activePlan
                  ? `Mostrando funciones incluidas en ${PLAN_BADGE[activePlan].label}`
                  : 'Tocá un plan para filtrar sus funciones:'}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {Object.entries(PLAN_BADGE).map(([key, cfg]) => {
                  const active = activePlan === key
                  return (
                    <button
                      key={key}
                      onClick={() => togglePlan(key)}
                      className="inline-flex items-center text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full transition-all duration-200"
                      style={{
                        background: active ? cfg.bgActive : cfg.bg,
                        border: `1px solid ${active ? cfg.borderActive : cfg.border}`,
                        color: cfg.color,
                        boxShadow: active ? cfg.glow : 'none',
                        transform: active ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      {cfg.label}
                      {active && (
                        <svg className="w-3 h-3 ml-1.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-14 mb-20">
            {CATEGORIES.map(cat => (
              <CategorySection key={cat.id} cat={cat} activePlan={activePlan} />
            ))}
          </div>

        </div>
      </div>

      <CTA />
      <Footer />
    </>
  )
}
