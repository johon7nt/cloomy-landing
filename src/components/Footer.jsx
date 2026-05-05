import Logo from './Logo'

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

export default function Footer() {
  return (
    <footer
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(10, 10, 20, 0.82)',
        borderTop: '1px solid rgba(108, 71, 255, 0.15)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        {/* Logo */}
        <div className="mb-12">
          <Logo desktopClassName="h-10 w-auto" mobileClassName="h-14 w-auto" staticEye />
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-text-tertiary mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-secondary hover:text-white transition-colors duration-200"
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
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-text-tertiary">
          <span>© 2026 Cloomy · Hecho en Buenos Aires · v0.1 — beta</span>
          <span>Construido con ♥ en Argentina</span>
        </div>
      </div>
    </footer>
  )
}
