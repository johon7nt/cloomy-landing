export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      {/* Decorative purple circle */}
      <div
        className="absolute top-24 right-0 lg:right-8 w-48 h-48 lg:w-72 lg:h-72 rounded-full bg-brand-500 opacity-90 blur-[2px] pointer-events-none"
        aria-hidden
      />
      {/* Decorative cream diamond */}
      <div
        className="absolute bottom-32 right-16 lg:right-48 w-24 h-24 lg:w-36 lg:h-36 bg-[#F2EAD8] rotate-45 pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full py-20 lg:py-32">
        {/* Badge */}
        <div className="inline-flex items-center border border-white/20 rounded-full px-4 py-1.5 text-xs text-text-secondary tracking-wide mb-8">
          Plataforma SaaS · Sin comisiones por venta
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight text-white max-w-3xl mb-6">
          Tu negocio online,{' '}
          <span className="inline">
            <mark className="highlight-brand text-white not-italic">en minutos</mark>
            <span className="text-white">.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-text-secondary text-lg lg:text-xl max-w-xl leading-relaxed mb-10">
          Armá tu tienda, tu menú con QR o tu stand digital sin pagar comisión por cada venta.
          Vos cobrás, vos manejás todo.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#pricing" className="btn-primary text-base px-8 py-4">
            Probar 14 días gratis →
          </a>
          <a href="#how-it-works" className="btn-outline text-base px-8 py-4">
            Ver cómo funciona
          </a>
        </div>
      </div>
    </section>
  )
}
