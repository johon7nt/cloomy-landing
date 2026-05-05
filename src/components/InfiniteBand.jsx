const ITEMS = [
  'SIN COMISIONES',
  'MENÚ QR',
  'PEDIDOS EN VIVO',
  'MULTI-FORMATO',
  'SIN COMISIONES',
  'MENÚ QR',
  'PEDIDOS EN VIVO',
  'MULTI-FORMATO',
]

export default function InfiniteBand() {
  return (
    <div className="section-divider border-b border-brand-500/20 overflow-hidden py-3 bg-bg-page">
      <div className="animate-scroll flex whitespace-nowrap w-max">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-6 text-xs font-semibold tracking-widest text-text-tertiary uppercase">
            {item}
            <span className="text-brand-500 text-xs">★</span>
          </span>
        ))}
      </div>
    </div>
  )
}
