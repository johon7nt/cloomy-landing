const TESTIMONIALS = [
  {
    quote:
      'Pasamos de tomar pedidos por WhatsApp a tener todo en una pantalla. Mis mozos me agradecen.',
    name: 'Lucía F.',
    business: 'Café Bardo, Palermo',
  },
  {
    quote:
      'Tenía miedo de que fuera complicado. Lo armé en una tarde, mientras atendía la feria.',
    name: 'Mateo R.',
    business: 'Cerámica Quieta, Mar del Plata',
  },
  {
    quote:
      'Antes pagaba 8% de comisión en otra plataforma. Acá pago un plan fijo y vendo más.',
    name: 'Sofía B.',
    business: 'Tienda Norte, Córdoba',
  },
]

function QuoteIcon({ className = '' }) {
  return (
    <svg
      className={`w-7 h-7 ${className}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-divider py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-12">
          Lo que dicen los que ya están adentro.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="card-base p-8 flex flex-col"
            >
              <QuoteIcon className="text-brand-500 mb-5" />
              <p className="text-white text-base leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>
              <div>
                <div className="text-white font-semibold text-sm">— {t.name}</div>
                <div className="text-text-tertiary text-xs mt-0.5">{t.business}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
