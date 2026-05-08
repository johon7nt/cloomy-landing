import { useState } from 'react'
import Logo from './Logo'

const PERIOD_OPTIONS = [
  { value: 'mensual', label: '1 mes',    months: 1,  discount: 0    },
  { value: 'anual',   label: '12 meses', months: 12, discount: 0.20 },
]

function formatARS(n) {
  return `AR$ ${n.toLocaleString('es-AR')}`
}

function StoreIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
    </svg>
  )
}

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
}

export default function Checkout({ plan, billing: initialBilling, onBack }) {
  const [billing, setBilling] = useState(
    PERIOD_OPTIONS.find(p => p.value === initialBilling) ? initialBilling : 'mensual'
  )
  const [showCoupon, setShowCoupon] = useState(false)
  const [coupon, setCoupon] = useState('')

  const period   = PERIOD_OPTIONS.find(p => p.value === billing)
  const unitPrice = Math.round(plan.priceNum.mensual * (1 - period.discount))
  const total     = unitPrice * period.months
  const savings   = period.discount > 0
    ? Math.round(plan.priceNum.mensual * period.months - total)
    : 0

  const continueUrl = 'https://cloomybuild-production.up.railway.app/login'

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: 'rgba(10,10,20,0.85)',
          borderBottom: '1px solid rgba(108,71,255,0.15)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo desktopClassName="h-7 w-auto" mobileClassName="h-8 w-auto" />
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver a los planes
          </button>
        </div>
      </header>

      {/* ── Page content ── */}
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-8">Tu carrito</h1>

          <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ── Left: Cart ── */}
            <div className="rounded-2xl overflow-hidden" style={CARD_STYLE}>
              {/* Plan header */}
              <div className="flex items-center gap-4 p-6 border-b border-white/10">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(108,71,255,0.2)', border: '1px solid rgba(108,71,255,0.4)' }}
                >
                  <StoreIcon />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Plan {plan.name}</div>
                  <div className="text-sm text-text-secondary">{plan.description}</div>
                </div>
              </div>

              <div className="p-6">
                {/* Period buttons */}
                <div className="mb-6">
                  <label className="block text-sm text-text-secondary mb-3">Período</label>
                  <div className="flex gap-3">
                    {PERIOD_OPTIONS.map(opt => {
                      const active = billing === opt.value
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setBilling(opt.value)}
                          className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200"
                          style={{
                            background: active ? 'rgba(108,71,255,0.2)' : 'rgba(255,255,255,0.04)',
                            border:     active ? '1px solid rgba(108,71,255,0.6)' : '1px solid rgba(255,255,255,0.12)',
                            color:      active ? '#fff' : 'rgba(255,255,255,0.5)',
                            boxShadow:  active ? '0 0 16px rgba(108,71,255,0.25)' : 'none',
                          }}
                        >
                          {opt.label}
                          {opt.discount > 0 && (
                            <span
                              className="ml-2 text-xs"
                              style={{ color: active ? 'rgba(255,255,255,0.75)' : 'rgba(108,71,255,0.85)' }}
                            >
                              −{opt.discount * 100}%
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{formatARS(unitPrice)}</span>
                    <span className="text-text-secondary text-sm">/mes</span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">
                    {billing === 'mensual'
                      ? `Se renueva a ${formatARS(unitPrice)} por mes. Cancelás cuando quieras.`
                      : `Se factura ${formatARS(total)} por año. Cancelás cuando quieras.`}
                  </p>
                </div>

                {/* Upgrade / savings banner */}
                {billing === 'mensual' ? (
                  <div
                    className="mt-5 rounded-xl p-4 flex items-center gap-3"
                    style={{ background: 'rgba(108,71,255,0.12)', border: '1px solid rgba(108,71,255,0.3)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(108,71,255,0.3)' }}
                    >
                      <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <p className="text-sm text-white/80 flex-1">
                      Cambiá a <strong className="text-white">12 meses</strong> y ahorrá{' '}
                      <strong className="text-brand-400">
                        {formatARS(Math.round(plan.priceNum.mensual * 12 * 0.20))}
                      </strong>{' '}
                      al año.{' '}
                      <button
                        onClick={() => setBilling('anual')}
                        className="text-brand-400 underline hover:text-brand-300 transition-colors"
                      >
                        Aprovechar
                      </button>
                    </p>
                  </div>
                ) : (
                  <div
                    className="mt-5 rounded-xl p-4 flex items-center gap-3"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}
                  >
                    <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-green-300/90">
                      Estás ahorrando <strong>{formatARS(savings)}</strong> comparado al plan mensual.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Summary ── */}
            <div className="rounded-2xl p-6" style={CARD_STYLE}>
              <h2 className="text-lg font-black text-white mb-5">Resumen del pedido</h2>

              {/* Line items */}
              <div className="space-y-3 pb-4 mb-4 border-b border-white/10">
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Plan {plan.name}</span>
                  <span className="text-white text-sm font-medium">{formatARS(unitPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Por {period.label}</span>
                  <span className="text-white text-sm">{formatARS(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Impuestos</span>
                  <span className="text-white text-sm">AR$ 0</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-white">Total</span>
                <span className="font-black text-white text-xl">{formatARS(total)}</span>
              </div>

              {/* Coupon */}
              <div className="mb-5">
                {!showCoupon ? (
                  <button
                    onClick={() => setShowCoupon(true)}
                    className="text-sm text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    ¿Tenés un cupón de descuento?
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={e => setCoupon(e.target.value)}
                      placeholder="Código de cupón"
                      className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:ring-1"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        focusRingColor: 'rgba(108,71,255,0.6)',
                      }}
                    />
                    <button
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                      style={{ background: 'rgba(108,71,255,0.25)', border: '1px solid rgba(108,71,255,0.4)' }}
                    >
                      Aplicar
                    </button>
                  </div>
                )}
              </div>

              {/* CTA */}
              <a
                href={continueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-base py-4 rounded-xl"
                style={{ boxShadow: '0 0 24px rgba(108,71,255,0.5), 0 0 48px rgba(108,71,255,0.2)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 36px rgba(108,71,255,0.7), 0 0 72px rgba(108,71,255,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(108,71,255,0.5), 0 0 48px rgba(108,71,255,0.2)' }}
              >
                Continuar →
              </a>

              {/* Trust badges */}
              <div className="mt-5 space-y-2.5">
                {[
                  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: '14 días de garantía de devolución' },
                  { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', text: 'Pago seguro' },
                  { icon: 'M5 13l4 4L19 7', text: 'Sin comisiones por venta' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                    {text}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
