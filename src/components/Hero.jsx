import { useEffect, useRef, useState } from 'react'
import HeroIllustration from './HeroIllustration'

const FULL_TEXT = 'Tu negocio online, en minutos.'
const HIGHLIGHT_START = 19
const HIGHLIGHT_END = 29
const HIGHLIGHT_TEXT = FULL_TEXT.slice(HIGHLIGHT_START, HIGHLIGHT_END) // 'en minutos'

const FONTS = [
  { family: 'inherit' },
  { family: "'Playfair Display', serif" },
  { family: "'Space Mono', monospace" },
  { family: "'Dancing Script', cursive" },
]

export default function Hero() {
  const [displayed, setDisplayed] = useState(0)
  const [done, setDone] = useState(false)
  const [illVisible, setIllVisible] = useState(false)

  // Font cycling
  const [fontIndex, setFontIndex] = useState(0)
  const [hlChars, setHlChars] = useState(HIGHLIGHT_TEXT.length)
  const [hlPhase, setHlPhase] = useState('idle') // 'idle' | 'deleting' | 'retyping'

  const intervalRef = useRef(null)
  const hlIntervalRef = useRef(null)

  // Main typewriter
  useEffect(() => {
    const t0 = setTimeout(() => setIllVisible(true), 600)
    const isMobile = window.innerWidth < 1024
    const delay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayed((prev) => {
          const next = prev + 1
          if (next >= FULL_TEXT.length) {
            clearInterval(intervalRef.current)
            setDone(true)
          }
          return next
        })
      }, isMobile ? 130 : 85)
    }, 400)
    return () => {
      clearTimeout(t0)
      clearTimeout(delay)
      clearInterval(intervalRef.current)
    }
  }, [])

  // Font cycling after typewriter finishes
  useEffect(() => {
    if (!done) return

    const runCycle = () => {
      setHlPhase('deleting')
      let chars = HIGHLIGHT_TEXT.length
      hlIntervalRef.current = setInterval(() => {
        chars--
        setHlChars(chars)
        if (chars === 0) {
          clearInterval(hlIntervalRef.current)
          setFontIndex((i) => (i + 1) % FONTS.length)
          setTimeout(() => {
            setHlPhase('retyping')
            let c = 0
            hlIntervalRef.current = setInterval(() => {
              c++
              setHlChars(c)
              if (c >= HIGHLIGHT_TEXT.length) {
                clearInterval(hlIntervalRef.current)
                setHlPhase('idle')
                setTimeout(runCycle, 2200)
              }
            }, 50)
          }, 180)
        }
      }, 38)
    }

    const t = setTimeout(runCycle, 2200)
    return () => {
      clearTimeout(t)
      clearInterval(hlIntervalRef.current)
    }
  }, [done])

  const showCursor = !done || hlPhase !== 'idle'

  const plain1 = done
    ? FULL_TEXT.slice(0, HIGHLIGHT_START)
    : FULL_TEXT.slice(0, Math.min(displayed, HIGHLIGHT_START))

  const highlightedText = done
    ? HIGHLIGHT_TEXT.slice(0, hlChars)
    : displayed > HIGHLIGHT_START
    ? FULL_TEXT.slice(HIGHLIGHT_START, Math.min(displayed, HIGHLIGHT_END))
    : ''

  const plain2 = done
    ? (hlChars === HIGHLIGHT_TEXT.length ? FULL_TEXT.slice(HIGHLIGHT_END) : '')
    : displayed > HIGHLIGHT_END
    ? FULL_TEXT.slice(HIGHLIGHT_END, displayed)
    : ''

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 w-full py-20 lg:py-28">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <div>
            <div
              className="inline-flex items-center border border-white/20 rounded-full px-4 py-1.5 text-xs text-text-secondary tracking-wide mb-10 reveal in-view"
              style={{ transitionDelay: '0.1s' }}
            >
              Plataforma Intuitiva · Sin comisiones por venta
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-black leading-[1.22] tracking-tight text-white mb-8 min-h-[4em]">
              <span className="relative z-10">{plain1}</span>
              {highlightedText && (
                <mark
                  className="highlight-brand text-white not-italic"
                  style={{ fontFamily: FONTS[fontIndex].family }}
                >
                  {highlightedText}
                </mark>
              )}
              {plain2}
              {showCursor && <span className="cursor-blink" aria-hidden />}
            </h1>

            <p
              className={`text-text-secondary text-lg lg:text-xl leading-relaxed mb-10 transition-all duration-700 ${
                done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Armá tu tienda, tu menú con QR o tu stand digital sin pagar comisión por cada venta.
              Vos cobrás, vos manejás todo.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
                done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: done ? '150ms' : '0ms' }}
            >
              <a href="#pricing" className="btn-primary text-base px-8 py-4">
                Probar 14 días gratis →
              </a>
              <a href="#how-it-works" className="btn-outline text-base px-8 py-4">
                Ver cómo funciona
              </a>
            </div>
          </div>

          {/* Right — illustration */}
          <div
            className="hidden lg:flex items-center justify-center"
            style={{
              opacity: illVisible ? 1 : 0,
              transform: illVisible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'opacity 800ms ease, transform 800ms ease',
            }}
          >
            <HeroIllustration className="w-full max-w-[580px] h-auto drop-shadow-[0_0_60px_rgba(108,71,255,0.18)]" />
          </div>

        </div>
      </div>
    </section>
  )
}
