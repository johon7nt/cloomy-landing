import { useState, useEffect } from 'react'
import Logo from './Logo'

const PERIOD_OPTIONS = [
  { value: 'mensual', label: '1 mes',    months: 1,  discount: 0    },
  { value: 'anual',   label: '12 meses', months: 12, discount: 0.20 },
]

function formatARS(n) {
  return `AR$ ${n.toLocaleString('es-AR')}`
}

function formatCardNumber(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(val) {
  const digits = val.replace(/\D/g, '').slice(0, 4)
  return digits.length >= 3 ? `${digits.slice(0,2)}/${digits.slice(2)}` : digits
}

function StoreIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
    </svg>
  )
}

function VisaLogo() {
  return (
    <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-black italic tracking-tight"
      style={{ background: '#1A1F71', color: '#fff', letterSpacing: '-0.02em' }}>
      VISA
    </span>
  )
}

function MastercardLogo() {
  return (
    <span className="inline-flex items-center gap-0">
      <span className="w-5 h-5 rounded-full block" style={{ background: '#EB001B', marginRight: '-8px' }} />
      <span className="w-5 h-5 rounded-full block" style={{ background: '#F79E1B', opacity: 0.9 }} />
    </span>
  )
}

function MercadoPagoLogo() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-black"
      style={{ background: 'rgba(0,158,227,0.15)', border: '1px solid rgba(0,158,227,0.35)', color: '#009EE3' }}>
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-6.44 6.44a.75.75 0 01-1.06 0l-3.22-3.22a.75.75 0 011.06-1.06l2.69 2.69 5.91-5.91a.75.75 0 011.06 1.06z"/>
      </svg>
      Mercado Pago
    </span>
  )
}

const INPUT_STYLE = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#fff',
  outline: 'none',
}

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
}

function OrderSummary({ plan, period, unitPrice, total, showCoupon, setShowCoupon, coupon, setCoupon }) {
  return (
    <div className="rounded-2xl p-6" style={CARD_STYLE}>
      <h2 className="text-lg font-black text-white mb-5">Resumen del pedido</h2>

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

      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-white">Total</span>
        <span className="font-black text-white text-xl">{formatARS(total)}</span>
      </div>

      <div className="mb-5">
        <button onClick={() => setShowCoupon(v => !v)}
          className="text-sm text-brand-400 hover:text-brand-300 transition-colors mb-2">
          {showCoupon ? 'Cerrar cupón ✕' : '¿Tenés un cupón de descuento?'}
        </button>
        {showCoupon && (
          <div className="flex gap-2">
            <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)}
              placeholder="Código de cupón"
              className="flex-1 rounded-xl px-4 py-2.5 text-sm placeholder-white/30"
              style={INPUT_STYLE} />
            <button className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'rgba(108,71,255,0.25)', border: '1px solid rgba(108,71,255,0.4)' }}>
              Aplicar
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2.5 pt-4 border-t border-white/10">
        {[
          { d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: '14 días de garantía de devolución' },
          { d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', text: 'Pago 100% seguro' },
          { d: 'M5 13l4 4L19 7', text: 'Sin comisiones por venta' },
        ].map(({ d, text }) => (
          <div key={text} className="flex items-center gap-2 text-sm text-text-secondary">
            <svg className="w-4 h-4 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={d} />
            </svg>
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}

const SESSION_KEY = 'cloomy_checkout'

function getPersistedStep() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw).step ?? 1) : 1
  } catch { return 1 }
}

function persistStep(step) {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    const data = raw ? JSON.parse(raw) : {}
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...data, step }))
  } catch {}
}

export default function Checkout({ plan, billing: initialBilling, onBack }) {
  const [step, setStep] = useState(getPersistedStep)
  const [billing, setBilling] = useState(
    PERIOD_OPTIONS.find(p => p.value === initialBilling) ? initialBilling : 'mensual'
  )
  const [showCoupon, setShowCoupon] = useState(false)
  const [coupon, setCoupon] = useState('')

  // Payment step state
  const [paymentMethod, setPaymentMethod] = useState(null) // 'card' | 'mercadopago'
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })

  const period    = PERIOD_OPTIONS.find(p => p.value === billing)
  const unitPrice = Math.round(plan.priceNum.mensual * (1 - period.discount))
  const total     = unitPrice * period.months
  const savings   = period.discount > 0
    ? Math.round(plan.priceNum.mensual * period.months - total)
    : 0

  const payUrl = 'https://cloomybuild-production.up.railway.app/login'

  useEffect(() => { persistStep(step) }, [step])

  const goToStep = (n) => {
    setStep(n)
    persistStep(n)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleHeaderBack = () => {
    if (step === 2) goToStep(1)
    else onBack()
  }

  return (
    <>
      {/* ── Top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(10,10,20,0.85)',
        borderBottom: '1px solid rgba(108,71,255,0.15)',
      }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center">
            <Logo desktopClassName="h-7 w-auto" mobileClassName="h-8 w-auto" />
          </button>
          <button onClick={handleHeaderBack}
            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {step === 2 ? 'Volver al carrito' : 'Volver a los planes'}
          </button>
        </div>
      </header>

      {/* ── Page ── */}
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-6">
            {['Carrito', 'Pago'].map((label, i) => {
              const n = i + 1
              const active = step === n
              const done   = step > n
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300"
                      style={{
                        background: done ? '#6C47FF' : active ? 'rgba(108,71,255,0.3)' : 'rgba(255,255,255,0.08)',
                        border: active || done ? '1px solid rgba(108,71,255,0.7)' : '1px solid rgba(255,255,255,0.15)',
                        color: active || done ? '#fff' : 'rgba(255,255,255,0.4)',
                      }}>
                      {done ? (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : n}
                    </div>
                    <span className="text-sm font-medium transition-colors duration-300"
                      style={{ color: active ? '#fff' : done ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)' }}>
                      {label}
                    </span>
                  </div>
                  {i < 1 && (
                    <div className="w-8 h-px mx-1" style={{ background: step > 1 ? 'rgba(108,71,255,0.6)' : 'rgba(255,255,255,0.15)' }} />
                  )}
                </div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ── Left panel (switches by step) ── */}
            {step === 1 ? (
              /* STEP 1: Cart */
              <div className="rounded-2xl overflow-hidden" style={CARD_STYLE}>
                <div className="flex items-center gap-4 p-6 border-b border-white/10">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(108,71,255,0.2)', border: '1px solid rgba(108,71,255,0.4)' }}>
                    <StoreIcon />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Plan {plan.name}</div>
                    <div className="text-sm text-text-secondary">{plan.description}</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <label className="block text-sm text-text-secondary mb-3">Período</label>
                    <div className="flex gap-3">
                      {PERIOD_OPTIONS.map(opt => {
                        const active = billing === opt.value
                        return (
                          <button key={opt.value} onClick={() => setBilling(opt.value)}
                            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200"
                            style={{
                              background: active ? 'rgba(108,71,255,0.2)' : 'rgba(255,255,255,0.04)',
                              border:     active ? '1px solid rgba(108,71,255,0.6)' : '1px solid rgba(255,255,255,0.12)',
                              color:      active ? '#fff' : 'rgba(255,255,255,0.5)',
                              boxShadow:  active ? '0 0 16px rgba(108,71,255,0.25)' : 'none',
                            }}>
                            {opt.label}
                            {opt.discount > 0 && (
                              <span className="ml-2 text-xs"
                                style={{ color: active ? 'rgba(255,255,255,0.75)' : 'rgba(108,71,255,0.85)' }}>
                                −{opt.discount * 100}%
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

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

                  {billing === 'mensual' ? (
                    <div className="mt-5 rounded-xl p-4 flex items-center gap-3"
                      style={{ background: 'rgba(108,71,255,0.12)', border: '1px solid rgba(108,71,255,0.3)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(108,71,255,0.3)' }}>
                        <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <p className="text-sm text-white/80 flex-1">
                        Cambiá a <strong className="text-white">12 meses</strong> y ahorrá{' '}
                        <strong className="text-brand-400">{formatARS(Math.round(plan.priceNum.mensual * 12 * 0.20))}</strong> al año.{' '}
                        <button onClick={() => setBilling('anual')}
                          className="text-brand-400 underline hover:text-brand-300 transition-colors">
                          Aprovechar
                        </button>
                      </p>
                    </div>
                  ) : (
                    <div className="mt-5 rounded-xl p-4 flex items-center gap-3"
                      style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}>
                      <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-green-300/90">
                        Estás ahorrando <strong>{formatARS(savings)}</strong> comparado al plan mensual.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => goToStep(2)}
                    className="btn-primary w-full justify-center text-base py-4 rounded-xl mt-8"
                    style={{ boxShadow: '0 0 24px rgba(108,71,255,0.5), 0 0 48px rgba(108,71,255,0.2)' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 36px rgba(108,71,255,0.7), 0 0 72px rgba(108,71,255,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(108,71,255,0.5), 0 0 48px rgba(108,71,255,0.2)' }}
                  >
                    Continuar al pago →
                  </button>
                </div>
              </div>
            ) : (
              /* STEP 2: Payment */
              <div className="rounded-2xl overflow-hidden" style={CARD_STYLE}>
                <div className="flex items-center gap-3 p-6 border-b border-white/10">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: 'rgba(108,71,255,0.3)', border: '1px solid rgba(108,71,255,0.6)', color: '#fff' }}>
                    2
                  </div>
                  <h2 className="font-bold text-white text-lg">Método de pago</h2>
                </div>

                <div className="p-6 space-y-3">

                  {/* Card option */}
                  <div className="rounded-xl overflow-hidden" style={{
                    border: paymentMethod === 'card'
                      ? '1px solid rgba(108,71,255,0.6)'
                      : '1px solid rgba(255,255,255,0.12)',
                    background: paymentMethod === 'card' ? 'rgba(108,71,255,0.08)' : 'rgba(255,255,255,0.03)',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}>
                    <button
                      onClick={() => setPaymentMethod(paymentMethod === 'card' ? null : 'card')}
                      className="w-full flex items-center justify-between px-5 py-4"
                    >
                      <span className="font-medium text-white text-sm">Tarjeta de crédito / débito</span>
                      <div className="flex items-center gap-2">
                        <VisaLogo />
                        <MastercardLogo />
                        <svg className="w-4 h-4 text-text-secondary ml-1 transition-transform duration-200"
                          style={{ transform: paymentMethod === 'card' ? 'rotate(180deg)' : 'none' }}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {paymentMethod === 'card' && (
                      <div className="px-5 pb-5 space-y-3">
                        <div>
                          <label className="block text-xs text-text-secondary mb-1.5">Número de tarjeta</label>
                          <input
                            type="text" inputMode="numeric" placeholder="1234 5678 9012 3456"
                            value={card.number}
                            onChange={e => setCard(p => ({ ...p, number: formatCardNumber(e.target.value) }))}
                            className="w-full rounded-xl px-4 py-3 text-sm placeholder-white/25 tracking-widest"
                            style={INPUT_STYLE}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-text-secondary mb-1.5">Vencimiento</label>
                            <input
                              type="text" inputMode="numeric" placeholder="MM/AA"
                              value={card.expiry}
                              onChange={e => setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                              className="w-full rounded-xl px-4 py-3 text-sm placeholder-white/25"
                              style={INPUT_STYLE}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-text-secondary mb-1.5">CVV</label>
                            <input
                              type="text" inputMode="numeric" placeholder="•••"
                              maxLength={4}
                              value={card.cvv}
                              onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g,'').slice(0,4) }))}
                              className="w-full rounded-xl px-4 py-3 text-sm placeholder-white/25"
                              style={INPUT_STYLE}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-text-secondary mb-1.5">Nombre en la tarjeta</label>
                          <input
                            type="text" placeholder="Como figura en la tarjeta"
                            value={card.name}
                            onChange={e => setCard(p => ({ ...p, name: e.target.value }))}
                            className="w-full rounded-xl px-4 py-3 text-sm placeholder-white/25"
                            style={INPUT_STYLE}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mercado Pago option */}
                  <div className="rounded-xl overflow-hidden" style={{
                    border: paymentMethod === 'mercadopago'
                      ? '1px solid rgba(0,158,227,0.5)'
                      : '1px solid rgba(255,255,255,0.12)',
                    background: paymentMethod === 'mercadopago' ? 'rgba(0,158,227,0.06)' : 'rgba(255,255,255,0.03)',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}>
                    <button
                      onClick={() => setPaymentMethod(paymentMethod === 'mercadopago' ? null : 'mercadopago')}
                      className="w-full flex items-center justify-between px-5 py-4"
                    >
                      <span className="font-medium text-white text-sm">Mercado Pago</span>
                      <div className="flex items-center gap-2">
                        <MercadoPagoLogo />
                        <svg className="w-4 h-4 text-text-secondary ml-1 transition-transform duration-200"
                          style={{ transform: paymentMethod === 'mercadopago' ? 'rotate(180deg)' : 'none' }}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {paymentMethod === 'mercadopago' && (
                      <div className="px-5 pb-5">
                        <div className="rounded-xl p-4 flex items-start gap-3"
                          style={{ background: 'rgba(0,158,227,0.08)', border: '1px solid rgba(0,158,227,0.2)' }}>
                          <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#009EE3' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm" style={{ color: 'rgba(0,200,255,0.85)' }}>
                            Al continuar, serás redirigido a Mercado Pago para completar tu pago de forma segura.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pay button */}
                  <div className="pt-2">
                    <a
                      href={paymentMethod ? payUrl : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => { if (!paymentMethod) e.preventDefault() }}
                      className="btn-primary w-full justify-center text-base py-4 rounded-xl transition-all duration-200"
                      style={{
                        opacity: paymentMethod ? 1 : 0.4,
                        cursor: paymentMethod ? 'pointer' : 'not-allowed',
                        boxShadow: paymentMethod ? '0 0 24px rgba(108,71,255,0.5), 0 0 48px rgba(108,71,255,0.2)' : 'none',
                      }}
                      onMouseEnter={e => { if (paymentMethod) e.currentTarget.style.boxShadow = '0 0 36px rgba(108,71,255,0.7), 0 0 72px rgba(108,71,255,0.3)' }}
                      onMouseLeave={e => { if (paymentMethod) e.currentTarget.style.boxShadow = '0 0 24px rgba(108,71,255,0.5), 0 0 48px rgba(108,71,255,0.2)' }}
                    >
                      {paymentMethod === 'mercadopago' ? 'Ir a Mercado Pago →' : 'Pagar ahora →'}
                    </a>
                    {!paymentMethod && (
                      <p className="text-center text-xs text-text-secondary mt-2">Seleccioná un método de pago para continuar</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Right: Summary (always visible) ── */}
            <OrderSummary
              plan={plan} period={period} unitPrice={unitPrice} total={total}
              showCoupon={showCoupon} setShowCoupon={setShowCoupon}
              coupon={coupon} setCoupon={setCoupon}
            />
          </div>
        </div>
      </div>
    </>
  )
}
