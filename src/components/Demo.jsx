import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'

const INPUT_CLASS = "w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-white placeholder-text-tertiary text-sm focus:outline-none focus:border-brand-500/60 transition-colors"

const STEPS = [
  { id: 1, label: 'Cuenta' },
  { id: 2, label: 'Negocio' },
  { id: 3, label: 'Estilo' },
  { id: 4, label: 'Listo' },
]

const FORMATS = [
  { value: 'gastro',  label: 'Gastronomía' },
  { value: 'tienda',  label: 'Tienda online' },
  { value: 'feria',   label: 'Feria / stand' },
  { value: 'evento',  label: 'Evento' },
]

const FORMAT_CONTENT = {
  gastro: {
    section: 'MENÚ',
    banner: 'Pedí desde la mesa',
    items: [
      { name: 'Café cortado',  price: '$1.800' },
      { name: 'Tostado mixto', price: '$4.200' },
      { name: 'Medialuna',     price: '$900'   },
    ],
  },
  tienda: {
    section: 'PRODUCTOS',
    banner: 'Envíos a todo el país',
    items: [
      { name: 'Camiseta negra M', price: '$18.500' },
      { name: 'Jean slim azul',   price: '$34.900' },
      { name: 'Gorra bordada',    price: '$12.000' },
    ],
  },
  feria: {
    section: 'CATÁLOGO',
    banner: 'Escaneá y pedí',
    items: [
      { name: 'Taza cerámica',     price: '$9.500'  },
      { name: 'Bowl artesanal',    price: '$14.000' },
      { name: 'Plato decorativo',  price: '$11.200' },
    ],
  },
  evento: {
    section: 'ENTRADAS',
    banner: 'Comprá tu entrada',
    items: [
      { name: 'General',   price: '$8.000'  },
      { name: 'VIP',       price: '$22.000' },
      { name: 'Mesa x4',   price: '$60.000' },
    ],
  },
}

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(1)
  const [businessName, setBusinessName] = useState('')
  const [format, setFormat] = useState('gastro')
  const [itemsVisible, setItemsVisible] = useState(true)
  const [accentColor, setAccentColor] = useState('#6C47FF')
  const displayName = businessName || 'Tu negocio'
  const [headingRef, headingInView] = useInView(0.2)
  const [leftRef, leftInView] = useInView(0.1)
  const [rightRef, rightInView] = useInView(0.1)

  const content = FORMAT_CONTENT[format]

  const handleFormatChange = (val) => {
    setItemsVisible(false)
    setTimeout(() => {
      setFormat(val)
      setItemsVisible(true)
    }, 200)
  }

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((s) => s + 1)
  }

  return (
    <section id="demo" className="section-divider py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className={`reveal ${headingInView ? 'in-view' : ''}`}>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-3">
            Probá el alta acá.
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Así de fácil arma su tienda un merchant en Cloomy.
          </p>
        </div>

        {/* Container with glow border */}
        <div
          className="border rounded-2xl overflow-hidden"
          style={{
            borderColor: 'rgba(108,71,255,0.6)',
            boxShadow: '0 0 60px rgba(108,71,255,0.2), inset 0 0 60px rgba(108,71,255,0.03)',
          }}
        >
          <div className="grid lg:grid-cols-2 min-h-[500px]">
            {/* Left: wizard */}
            <div
              ref={leftRef}
              className={`bg-bg-card p-8 lg:p-10 flex flex-col reveal-left ${leftInView ? 'in-view' : ''}`}
              style={{ transitionDelay: '0.1s' }}
            >
              {/* Step indicators */}
              <div className="flex items-center gap-1 mb-8 flex-wrap">
                {STEPS.map((step, i) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-200 ${
                        step.id === currentStep
                          ? 'bg-brand-500 text-white'
                          : step.id < currentStep
                          ? 'bg-brand-500/30 text-brand-500'
                          : 'border border-white/20 text-text-tertiary'
                      }`}
                    >
                      {step.id}
                    </button>
                    <span
                      className={`ml-1.5 text-sm mr-3 ${
                        step.id === currentStep ? 'text-white font-semibold' : 'text-text-tertiary'
                      }`}
                    >
                      {step.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span className="text-text-tertiary mr-2">——</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Step content */}
              <div className="flex-1">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">Email</label>
                      <input type="email" placeholder="tu@negocio.com" className={INPUT_CLASS} />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">Contraseña</label>
                      <input type="password" placeholder="mínimo 8 caracteres" className={INPUT_CLASS} />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">Nombre del negocio</label>
                      <input
                        type="text"
                        placeholder="ej. Café Bardo"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-1.5">Formato</label>
                      <select
                        className={INPUT_CLASS}
                        value={format}
                        onChange={(e) => handleFormatChange(e.target.value)}
                      >
                        {FORMATS.map((f) => (
                          <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <p className="text-text-secondary text-sm">Personalizá los colores de tu negocio.</p>
                    <div className="flex gap-3 flex-wrap">
                      {['#6C47FF', '#FF453A', '#FFB340', '#00C853', '#0A84FF', '#FF6B6B'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setAccentColor(color)}
                          className="w-10 h-10 rounded-xl transition-all duration-200 hover:scale-110"
                          style={{
                            backgroundColor: color,
                            border: accentColor === color
                              ? '3px solid white'
                              : '2px solid rgba(255,255,255,0.2)',
                            transform: accentColor === color ? 'scale(1.15)' : undefined,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">¡Ya estás listo!</h3>
                    <p className="text-text-secondary text-sm">Tu negocio en <span className="text-brand-500">cloomy.com/s/tu-negocio</span></p>
                  </div>
                )}
              </div>

              <div className={`flex mt-6 ${currentStep === 4 ? 'justify-center' : 'justify-end'}`}>
                {currentStep === 4 ? (
                  <a href="#pricing" className="btn-primary">Empezar gratis →</a>
                ) : (
                  <button onClick={handleNext} className="btn-primary">Siguiente →</button>
                )}
              </div>
            </div>

            {/* Right: live preview */}
            <div
              ref={rightRef}
              className={`bg-bg-elevated border-t lg:border-t-0 lg:border-l border-brand-500/20 p-8 lg:p-10 flex flex-col items-center justify-center reveal-right ${rightInView ? 'in-view' : ''}`}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="flex items-center gap-2 mb-6 self-start">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-text-secondary uppercase">
                  Preview en vivo
                </span>
              </div>

              {/* Phone mockup */}
              <div
                className="relative w-[220px] h-[420px] rounded-[36px] border-2 border-white/10 overflow-hidden flex flex-col shadow-2xl"
                style={{ background: '#1A1A2E' }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-2 text-white text-[10px]">
                  <span>9:41</span>
                  <span>●●●</span>
                </div>

                {/* App header */}
                <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: accentColor }}>
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold leading-none">{displayName}</div>
                    <div className="text-text-tertiary text-[9px] mt-0.5">cloomy.com/s/...</div>
                  </div>
                </div>

                {/* Banner */}
                <div className="mx-3 mt-2 rounded-xl h-14 flex items-center justify-center" style={{ backgroundColor: `${accentColor}66` }}>
                  <span className="text-white text-[10px] font-semibold">{content.banner}</span>
                </div>

                {/* Items */}
                <div className="px-3 mt-3">
                  <span className="text-text-tertiary text-[9px] font-bold tracking-widest uppercase">
                    {content.section}
                  </span>
                  <div className="mt-2 space-y-1.5">
                    {content.items.map((item, i) => (
                      <div
                        key={`${format}-${item.name}`}
                        className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2"
                        style={{
                          opacity: itemsVisible ? 1 : 0,
                          transform: itemsVisible ? 'translateY(0)' : 'translateY(6px)',
                          transition: `opacity 0.25s ease ${i * 60}ms, transform 0.25s ease ${i * 60}ms`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: `${accentColor}4d` }} />
                          <div>
                            <div className="text-white text-[10px] font-medium">{item.name}</div>
                            <div className="text-text-tertiary text-[9px]">{item.price}</div>
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs" style={{ backgroundColor: accentColor }}>
                          +
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
