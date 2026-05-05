import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import {
  SaberProgramar,
  ComisionNo,
  UsarMiDominio,
  CambiarDeFormato,
  ComoPagan,
  Cancelar,
  IconoFAQ,
} from './FAQIllustrations'

const ILLUSTRATIONS = [SaberProgramar, ComisionNo, UsarMiDominio, CambiarDeFormato, ComoPagan, Cancelar]

const FAQS = [
  {
    q: '¿Necesito saber programar para usar Cloomy?',
    a: 'No, para nada. Lo armás desde cero en una tarde: elegís el formato, subís tus productos o tu menú, configurás colores y listo. Sin código, sin técnicos.',
  },
  {
    q: '¿Cloomy cobra comisión por cada venta?',
    a: 'No. Pagás un plan fijo mensual y lo que vendés es tuyo, completo. Sin sorpresas al final del mes.',
  },
  {
    q: '¿Puedo usar mi propio dominio?',
    a: 'Sí, desde el plan Basic podés conectar tu dominio propio. En el plan Trial tenés un subdominio cloomy.com/s/tu-negocio.',
  },
  {
    q: '¿Qué pasa si quiero cambiar de formato?',
    a: 'Podés cambiar cuando quieras. Si tenés el plan Pro podés tener múltiples formatos activos al mismo tiempo — tienda, gastronomía y stand, todo junto.',
  },
  {
    q: '¿Cómo pagan mis clientes?',
    a: 'Tus clientes pagan con los métodos que vos configurés. Cloomy se integra con los procesadores de pago más usados en Argentina.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí, sin letra chica. Cancelás cuando quieras desde tu panel. No hay contratos ni permanencia mínima.',
  },
]

function FAQItem({ item, index, isOpen, onToggle }) {
  const [ref, inView] = useInView(0.15)

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div
        className="rounded-2xl border border-white/10 mb-3 transition-all duration-300"
        style={{
          background: isOpen ? 'rgba(108,71,255,0.06)' : 'rgba(255,255,255,0.02)',
          boxShadow: isOpen
            ? '0 8px 32px rgba(108,71,255,0.15), 0 2px 8px rgba(0,0,0,0.3)'
            : '0 1px 3px rgba(0,0,0,0.2)',
          transform: isOpen ? 'translateY(-2px)' : 'translateY(0)',
        }}
        onMouseEnter={e => {
          if (!isOpen) {
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.35)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }
        }}
        onMouseLeave={e => {
          if (!isOpen) {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }
        }}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="text-white font-semibold text-base leading-snug">
            {item.q}
          </span>
          <span
            className="shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-text-secondary transition-colors duration-200"
            style={{
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease, border-color 0.2s',
              borderColor: isOpen ? 'rgba(108,71,255,0.6)' : undefined,
              color: isOpen ? '#6C47FF' : undefined,
            }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </button>

        <div
          style={{
            maxHeight: isOpen ? '300px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <p className="text-text-secondary text-sm leading-relaxed px-6 pb-5 pr-14">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [headingRef, headingInView] = useInView(0.2)

  const handleToggle = (i) => setOpenIndex(prev => prev === i ? null : i)

  return (
    <section id="faq" className="section-divider py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className={`reveal ${headingInView ? 'in-view' : ''} mb-12`}>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-3">
            Preguntas frecuentes.
          </h2>
          <p className="text-text-secondary text-lg">
            Si no está acá, escribinos.
          </p>
        </div>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
          {/* Left — accordion */}
          <div>
            {FAQS.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>

          {/* Right — illustration panel (desktop only) */}
          <div className="hidden lg:block self-start sticky top-32">
          <div className="flex items-center justify-center">
            <div
              className="relative w-full max-w-xs aspect-square rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              }}
            >
              {/* Default icon */}
              <div
                style={{
                  position: 'absolute', inset: '12px',
                  opacity: openIndex === null ? 1 : 0,
                  transform: openIndex === null ? 'translateY(0)' : 'translateY(-12px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  pointerEvents: 'none',
                }}
              >
                <IconoFAQ className="w-full h-full" />
              </div>

              {/* Per-question illustrations */}
              {ILLUSTRATIONS.map((Illus, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute', inset: '12px',
                    opacity: openIndex === i ? 1 : 0,
                    transform: openIndex === i ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <Illus className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>
          </div>{/* end sticky wrapper */}
        </div>
      </div>
    </section>
  )
}
