import { useInView } from '../hooks/useInView'

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

function StepCard({ step, index }) {
  const [ref, inView] = useInView(0.2)
  return (
    <div
      ref={ref}
      className={`card-base group reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      <span className="block text-5xl lg:text-6xl font-black text-brand-500 mb-4 group-hover:scale-105 transition-transform duration-300">
        {step.number}
      </span>
      <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
    </div>
  )
}

export default function HowItWorks() {
  const [titleRef, titleInView] = useInView(0.2)

  return (
    <section id="how-it-works" className="section-divider py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          ref={titleRef}
          className={`text-4xl lg:text-5xl font-black text-white mb-12 reveal ${titleInView ? 'in-view' : ''}`}
        >
          Cómo arrancás.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
