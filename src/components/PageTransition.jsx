import { useState, useEffect } from 'react'
import Logo from './Logo'

export default function PageTransition() {
  const [phase, setPhase] = useState('in')  // 'in' | 'out'
  const [gone,  setGone]  = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setPhase('out'), 380)
    return () => clearTimeout(t)
  }, [])

  if (gone) return null

  return (
    <div
      aria-hidden
      onTransitionEnd={() => { if (phase === 'out') setGone(true) }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
        background: 'linear-gradient(160deg, #0D0B1E 0%, #0A0A14 100%)',
        borderBottom: phase === 'in' ? '1px solid rgba(108,71,255,0.25)' : 'none',
        transform: phase === 'out' ? 'translateY(-105%)' : 'translateY(0)',
        transition: phase === 'out' ? 'transform 0.52s cubic-bezier(0.4,0,0.2,1)' : 'none',
      }}
    >
      {/* Logo */}
      <div style={{
        opacity: phase === 'in' ? 1 : 0,
        transform: phase === 'in' ? 'scale(1)' : 'scale(0.92)',
        transition: 'opacity 0.22s ease, transform 0.22s ease',
      }}>
        <Logo desktopClassName="h-10 w-auto" mobileClassName="h-10 w-auto" />
      </div>

      {/* Loading bar */}
      <div style={{ width: 120, height: 2, borderRadius: 99, background: 'rgba(108,71,255,0.2)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          borderRadius: 99,
          background: 'linear-gradient(90deg, #6C47FF, #9D7FFF)',
          boxShadow: '0 0 8px rgba(108,71,255,0.8)',
          width: phase === 'in' ? '100%' : '100%',
          animation: 'ptBar 0.38s ease-out forwards',
        }} />
      </div>

      <style>{`
        @keyframes ptBar {
          from { width: 0%; opacity: 0.6; }
          to   { width: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  )
}
