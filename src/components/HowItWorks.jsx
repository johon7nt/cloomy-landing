const STEPS = [
  {
    number: '01',
    title: 'Te registrás',
    desc: 'Creás tu cuenta y elegís el formato: tienda, gastronomía o feria.',
  },
  {
    number: '02',
    title: 'Configurás',
    desc: 'Nombre, logo, colores, tipografía. Subís tus productos o tu menú.',
  },
  {
    number: '03',
    title: 'Compartís el link',
    desc: 'cloomy.com/s/tu-negocio. O imprimís el QR y lo pegás en el stand o las mesas.',
  },
  {
    number: '04',
    title: 'Cobrás',
    desc: 'Tus clientes compran. Vos ves los pedidos en tu panel y los gestionás.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-divider py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-12">
          Cómo arrancás.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="card-base group"
            >
              <span className="block text-5xl lg:text-6xl font-black text-brand-500 mb-4 group-hover:scale-105 transition-transform duration-300">
                {step.number}
              </span>
              <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
