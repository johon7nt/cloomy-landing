import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InfiniteBand from './components/InfiniteBand'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import AllFeatures from './components/AllFeatures'
import Demo from './components/Demo'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import Checkout from './components/Checkout'
import ComparePlans from './components/ComparePlans'

const SESSION_KEY = 'cloomy_checkout'

function saveCheckoutSession(plan, billing) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ plan, billing }))
}

function clearCheckoutSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

function loadCheckoutSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  // Restore checkout state from sessionStorage on refresh
  const saved = loadCheckoutSession()
  const [checkoutPlan, setCheckoutPlan] = useState(saved?.plan ?? null)
  const [checkoutBilling, setCheckoutBilling] = useState(saved?.billing ?? 'mensual')
  const [showCompare, setShowCompare] = useState(false)

  // Skip splash when returning from a refresh mid-checkout
  useEffect(() => {
    if (saved?.plan) setSplashDone(true)
  }, [])

  useEffect(() => {
    const onPopState = (e) => {
      if (e.state?.checkout) {
        const plan    = JSON.parse(e.state.plan)
        const billing = e.state.billing
        setCheckoutPlan(plan)
        setCheckoutBilling(billing)
        saveCheckoutSession(plan, billing)
        window.scrollTo({ top: 0, behavior: 'instant' })
      } else {
        setCheckoutPlan(null)
        clearCheckoutSession()
        const y = e.state?.scrollY ?? 0
        requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }))
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const handleSelectPlan = (plan, billing) => {
    window.history.replaceState({ scrollY: window.scrollY }, '')
    setCheckoutPlan(plan)
    setCheckoutBilling(billing)
    saveCheckoutSession(plan, billing)
    window.history.pushState({ checkout: true, plan: JSON.stringify(plan), billing }, '')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleBack = () => {
    clearCheckoutSession()
    window.history.back()
  }

  const handleComparePlans = () => {
    setShowCompare(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleCompareBack = () => {
    setShowCompare(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (showCompare && !checkoutPlan) {
    return (
      <>
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
          <div className="absolute inset-0">
            <div style={{ position:'absolute', top:'-10%', left:'-5%', width:'65vw', height:'65vw', borderRadius:'50%', background:'radial-gradient(circle at 38% 38%, #7C5CFF 0%, #6C47FF 25%, #4B2ECC 55%, transparent 72%)', filter:'blur(80px)', opacity:0.45 }} />
            <div style={{ position:'absolute', top:'18%', right:'-12%', width:'52vw', height:'52vw', borderRadius:'50%', background:'radial-gradient(circle at 50% 45%, #8B6FFF 0%, #5A38F5 30%, #3D25CC 60%, transparent 75%)', filter:'blur(90px)', opacity:0.35 }} />
            <div style={{ position:'absolute', bottom:'-15%', left:'22%', width:'58vw', height:'58vw', borderRadius:'50%', background:'radial-gradient(circle at 50% 50%, #5A38F5 0%, #4B2ECC 35%, #2D1C99 65%, transparent 75%)', filter:'blur(100px)', opacity:0.38 }} />
          </div>
          <div style={{ position:'absolute', inset:0, backdropFilter:'blur(72px)', WebkitBackdropFilter:'blur(72px)' }} />
          <div style={{ position:'absolute', inset:0, background:'rgba(10,10,20,0.62)' }} />
        </div>
        <div className="relative z-10">
          <ComparePlans
            onBack={handleCompareBack}
            onSelectPlan={(plan, billing) => {
              setShowCompare(false)
              handleSelectPlan(plan, billing)
            }}
          />
        </div>
      </>
    )
  }

  if (checkoutPlan) {
    return (
      <>
        {/* Same atmospheric background */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
          <div className="absolute inset-0">
            <div style={{ position:'absolute', top:'-10%', left:'-5%', width:'65vw', height:'65vw', borderRadius:'50%', background:'radial-gradient(circle at 38% 38%, #7C5CFF 0%, #6C47FF 25%, #4B2ECC 55%, transparent 72%)', filter:'blur(80px)', opacity:0.45 }} />
            <div style={{ position:'absolute', top:'18%', right:'-12%', width:'52vw', height:'52vw', borderRadius:'50%', background:'radial-gradient(circle at 50% 45%, #8B6FFF 0%, #5A38F5 30%, #3D25CC 60%, transparent 75%)', filter:'blur(90px)', opacity:0.35 }} />
            <div style={{ position:'absolute', bottom:'-15%', left:'22%', width:'58vw', height:'58vw', borderRadius:'50%', background:'radial-gradient(circle at 50% 50%, #5A38F5 0%, #4B2ECC 35%, #2D1C99 65%, transparent 75%)', filter:'blur(100px)', opacity:0.38 }} />
          </div>
          <div style={{ position:'absolute', inset:0, backdropFilter:'blur(72px)', WebkitBackdropFilter:'blur(72px)' }} />
          <div style={{ position:'absolute', inset:0, background:'rgba(10,10,20,0.62)' }} />
        </div>
        <div className="relative z-10">
          <Checkout plan={checkoutPlan} billing={checkoutBilling} onBack={handleBack} />
        </div>
      </>
    )
  }

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      {/* ── Atmospheric background ── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>

        {/* Layer 1 — luminous orbs */}
        <div className="absolute inset-0">
          {/* Orb 1 — large, top-left, primary brand */}
          <div style={{
            position: 'absolute', top: '-10%', left: '-5%',
            width: '65vw', height: '65vw', borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 38%, #7C5CFF 0%, #6C47FF 25%, #4B2ECC 55%, transparent 72%)',
            filter: 'blur(80px)', opacity: 0.45,
          }} />
          {/* Orb 2 — mid-right */}
          <div style={{
            position: 'absolute', top: '18%', right: '-12%',
            width: '52vw', height: '52vw', borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 45%, #8B6FFF 0%, #5A38F5 30%, #3D25CC 60%, transparent 75%)',
            filter: 'blur(90px)', opacity: 0.35,
          }} />
          {/* Orb 3 — bottom-center, deep */}
          <div style={{
            position: 'absolute', bottom: '-15%', left: '22%',
            width: '58vw', height: '58vw', borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 50%, #5A38F5 0%, #4B2ECC 35%, #2D1C99 65%, transparent 75%)',
            filter: 'blur(100px)', opacity: 0.38,
          }} />
          {/* Orb 4 — lower-left, cool violet accent */}
          <div style={{
            position: 'absolute', bottom: '10%', left: '-6%',
            width: '36vw', height: '36vw', borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 50%, #9D7FFF 0%, #6C47FF 45%, transparent 72%)',
            filter: 'blur(70px)', opacity: 0.25,
          }} />
        </div>

        {/* Layer 2 — liquid glass blur that diffuses the orbs */}
        <div style={{
          position: 'absolute', inset: 0,
          backdropFilter: 'blur(72px)',
          WebkitBackdropFilter: 'blur(72px)',
        }} />

        {/* Layer 3 — dark veil to dim the colors */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10, 10, 20, 0.62)',
        }} />

        {/* Layer 3 — thin grid, center-top only */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 45% at 50% 8%, rgba(0,0,0,1) 0%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 65% 45% at 50% 8%, rgba(0,0,0,1) 0%, transparent 100%)',
        }} />

      </div>

      <Navbar visible={splashDone} onComparePlans={handleComparePlans} />

      <div
        className="min-h-screen relative z-10"
        style={{
          opacity: splashDone ? 1 : 0,
          transition: splashDone ? 'opacity 0.4s ease-out' : 'none',
        }}
      >
        <main>
          <Hero />
          <InfiniteBand />
          <Features />
          <HowItWorks />
          <AllFeatures />
          <Demo />
          {/* <Testimonials /> */}
          <Pricing onSelectPlan={handleSelectPlan} onComparePlans={handleComparePlans} />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
