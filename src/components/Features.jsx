import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'

const TABS = [
  {
    id: 'gastro',
    label: 'Gastronomía',
    title: 'Menú con QR, pedidos en tiempo real.',
    description:
      'El cliente escanea el QR de la mesa, ve el menú actualizado, pide y divide la cuenta desde el celu. Vos lo ves al toque en cocina.',
    tags: ['QR POR MESA', 'PEDIDOS LIVE', 'DIVIDIR LA CUENTA', 'LLAMAR AL MOZO'],
    notification: {
label: 'NUEVO PEDIDO · MESA 7',
      items: ['1× Tostado mixto', '2× Café cortado', '1× Medialuna'],
      cta: 'Aceptar',
    },
  },
  {
    id: 'ferias',
    label: 'Ferias y artesanos',
    title: 'Tu stand digital desde un QR.',
    description:
      'Imprimís el código QR, lo pegás en tu stand y tus clientes navegan tu catálogo completo, hacen pedidos y pagan en el momento.',
    tags: ['CATÁLOGO DIGITAL', 'PEDIDOS EN MESA', 'COBRO INTEGRADO', 'SIN COMISIONES'],
    notification: {
label: 'NUEVA VENTA · STAND 3',
      items: ['1× Taza cerámica', '2× Bowl pequeño', '1× Plato decorativo'],
      cta: 'Confirmar',
    },
  },
  {
    id: 'tienda',
    label: 'Tienda online',
    title: 'Tu tienda, tu dominio, tus reglas.',
    description:
      'Creás tu tienda con tu marca, subís tus productos, configurás envíos y precios. Sin que nadie se quede con parte de cada venta.',
    tags: ['DOMINIO PROPIO', 'PRODUCTOS ILIMITADOS', 'ENVÍOS', 'ANALÍTICAS'],
    notification: {
label: 'NUEVA ORDEN · WEB',
      items: ['1× Camiseta negra M', '1× Gorra bordada', '1× Tote bag'],
      cta: 'Procesar',
    },
  },
  {
    id: 'eventos',
    label: 'Eventos',
    title: 'Vendé entradas y gestioná tu evento.',
    description:
      'Armá la página de tu evento, vendé entradas con capacidad limitada, y gestioná los asistentes desde un panel en tiempo real.',
    tags: ['VENTA DE ENTRADAS', 'CAPACIDAD', 'CHECK-IN QR', 'ESTADÍSTICAS'],
    notification: {
label: 'NUEVA ENTRADA · EVENTO',
      items: ['2× VIP', '1× General', 'Mesa 12'],
      cta: 'Confirmar',
    },
  },
]

export default function Features() {
  const [active, setActive] = useState('gastro')
  const [visible, setVisible] = useState(true)
  const tab = TABS.find((t) => t.id === active)
  const [headingRef, headingInView] = useInView(0.2)
  const [tabsRef, tabsInView] = useInView(0.1)
  const [cardRef, cardInView] = useInView(0.1)

  const handleTabChange = (id) => {
    if (id === active) return
    setVisible(false)
    setTimeout(() => {
      setActive(id)
      setVisible(true)
    }, 180)
  }

  return (
    <section id="features" className="section-divider py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div ref={headingRef} className={`mb-10 reveal ${headingInView ? 'in-view' : ''}`}>
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
            ¿Qué ofrecemos?
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-3">
            No sos sólo una tienda online.
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Cloomy es una plataforma que te permite crear tu presencia digital en minutos: tienda online, menú con QR para tu local, catálogo para ferias o página de eventos.{' '}
            <mark className="highlight-brand text-white not-italic">Sin comisiones por venta</mark>
            , sin letra chica, sin técnicos.
          </p>
        </div>

        {/* Tab switcher */}
        <div
          ref={tabsRef}
          className={`flex flex-wrap gap-2 mb-8 reveal ${tabsInView ? 'in-view' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTabChange(t.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                active === t.id
                  ? 'bg-brand-500 text-white'
                  : 'border border-white/20 text-text-secondary hover:border-white/40 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content card */}
        <div
          ref={cardRef}
          className={`border border-brand-500/40 rounded-2xl bg-bg-card overflow-hidden reveal ${cardInView ? 'in-view' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: text */}
            <div className="p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 leading-snug">
                {tab.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                {tab.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {tab.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/20 text-text-secondary text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: mockup notification */}
            <div className="relative flex items-center justify-center p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-brand-500/20">
              {/* QR code placeholder */}
              <div className="absolute top-8 right-8 w-20 h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <svg className="w-12 h-12 text-text-tertiary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h7v7H3V3zm1 1v5h5V4H4zm1 1h3v3H5V5zm8-2h7v7h-7V3zm1 1v5h5V4h-5zm1 1h3v3h-3V5zM3 13h7v7H3v-7zm1 1v5h5v-5H4zm1 1h3v3H5v-3zm8 0h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm-2-2h2v2h-2v-2z"/>
                </svg>
              </div>

              {/* Notification card */}
              <div
                className="bg-bg-elevated border border-white/10 rounded-2xl p-5 w-full max-w-[260px] shadow-brand-glow"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.97)',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] font-bold tracking-widest text-text-secondary uppercase">
                    {tab.notification.label}
                  </span>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {tab.notification.items.map((item) => (
                    <li key={item} className="text-sm text-white/80">
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-2 text-sm font-semibold transition-colors">
                  {tab.notification.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
