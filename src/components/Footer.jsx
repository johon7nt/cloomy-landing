const COLUMNS = [
  {
    heading: 'Producto',
    links: ['Funciones', 'Precios', 'Para gastronomía', 'Para ferias'],
  },
  {
    heading: 'La empresa',
    links: ['Sobre nosotros', 'Blog', 'Trabajá con nosotros'],
  },
  {
    heading: 'Legales',
    links: ['Términos', 'Privacidad'],
  },
  {
    heading: 'Contacto',
    links: ['hola@cloomy.com', '@cloomyapp'],
  },
]

function CloomyWordmark() {
  return (
    <span className="text-5xl lg:text-6xl font-black text-bg-page tracking-tight">
      Cloomy
      <span className="inline-block w-3 h-3 lg:w-4 lg:h-4 bg-brand-500 ml-0.5 mb-1 align-baseline" />
    </span>
  )
}

export default function Footer() {
  return (
    <footer>
      {/* Main footer — cream background */}
      <div className="bg-bg-footer">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          {/* Wordmark */}
          <div className="mb-12">
            <CloomyWordmark />
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-black/10">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h4 className="text-[11px] font-bold tracking-widest uppercase text-bg-page/50 mb-4">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-bg-page/60 hover:text-bg-page transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-8 text-xs text-bg-page/40">
            © 2026 Cloomy · Hecho en Buenos Aires · v0.1 — beta
          </div>
        </div>
      </div>

      {/* Dark bottom bar */}
      <div className="bg-bg-page py-4 px-6 text-center">
        <span className="text-text-tertiary text-xs">
          Construido con ♥ en Argentina
        </span>
      </div>
    </footer>
  )
}
