import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ENGINES } from '../../data/content'
import EnginePopup from '../ui/EnginePopup'

const VERDICTS = ['Fairly Valued', 'Undervalued'] as const

export default function Hero() {
  const [price, setPrice] = useState(189.42)
  const [verdict, setVerdict] = useState(0)
  const [activeEngine, setActiveEngine] = useState<typeof ENGINES[0] | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const tilt = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(p => parseFloat((p + (Math.random() - 0.48) * 0.9).toFixed(2)))
      if (Math.random() < 0.3) setVerdict(v => (v + 1) % VERDICTS.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const card = cardRef.current
      if (!card) return
      const r = card.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      tilt.current.tx = ((e.clientX - cx) / r.width) * 14
      tilt.current.ty = ((e.clientY - cy) / r.height) * 14
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      tilt.current.x += (tilt.current.tx - tilt.current.x) * 0.07
      tilt.current.y += (tilt.current.ty - tilt.current.y) * 0.07
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(700px) rotateY(${tilt.current.x}deg) rotateX(${-tilt.current.y}deg)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const RADIUS = 155

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 20px' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
        <div style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.35em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', marginBottom: 20 }}>
          IS481P · Major Project · Dept. of ISE · RVCE · 2025–26
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(52px, 8vw, 88px)', fontWeight: 200, letterSpacing: '0.16em', textAlign: 'center', lineHeight: 1, marginBottom: 16, color: '#fff' }}
      >
        EQUI<span style={{ color: 'rgba(212,175,55,0.88)', fontWeight: 500 }}>MIND</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', textAlign: 'center', maxWidth: 380, lineHeight: 2.2, marginBottom: 52 }}
      >
        Automated Equity Research &amp; Valuation Intelligence Platform
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', width: RADIUS * 2 + 80, height: RADIUS * 2 + 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* orbit ring */}
        <div style={{
          position: 'absolute', width: RADIUS * 2, height: RADIUS * 2,
          borderRadius: '50%', border: '0.5px solid rgba(212,175,55,0.08)',
          pointerEvents: 'none',
        }} />

        {/* engine nodes */}
        {ENGINES.map((eng, i) => {
          const rad = (eng.angle * Math.PI) / 180
          const x = Math.cos(rad) * RADIUS
          const y = Math.sin(rad) * RADIUS
          return (
            <motion.div
              key={eng.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 + i * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
              onClick={() => setActiveEngine(eng)}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                cursor: 'none',
                zIndex: 10,
              }}
              whileHover={{ scale: 1.18 }}
            >
              {/* connector line */}
              <svg style={{ position: 'absolute', top: '50%', left: '50%', overflow: 'visible', pointerEvents: 'none' }}>
                <line
                  x1={0} y1={0} x2={-x} y2={-y}
                  stroke={eng.color.replace('0.8', '0.12').replace('0.9', '0.12')}
                  strokeWidth={0.5}
                  strokeDasharray="3 7"
                />
              </svg>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                border: `0.5px solid ${eng.color.replace('0.8', '0.5').replace('0.9', '0.5')}`,
                background: eng.color.replace('0.8', '0.1').replace('0.9', '0.1'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 500, color: eng.color,
                letterSpacing: '0.04em',
                boxShadow: `0 0 16px ${eng.color.replace('0.8', '0.15').replace('0.9', '0.15')}`,
              }}>{eng.id}</div>
              <div style={{ fontSize: 8, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', textAlign: 'center', maxWidth: 60, lineHeight: 1.5 }}>
                {eng.label}
              </div>
            </motion.div>
          )
        })}

        {/* center ticker card */}
        <div ref={cardRef} style={{ willChange: 'transform', zIndex: 5 }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '0.5px solid rgba(212,175,55,0.28)',
            borderRadius: 18, padding: '24px 44px', textAlign: 'center',
            backdropFilter: 'blur(16px)',
          }}>
            <div style={{ fontSize: 34, fontWeight: 200, color: '#fff', letterSpacing: '0.12em', fontFamily: 'Space Grotesk, sans-serif' }}>AAPL</div>
            <div style={{ fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginTop: 5 }}>Apple Inc · NASDAQ</div>
            <div style={{ fontSize: 15, color: 'rgba(212,175,55,0.82)', marginTop: 10, fontWeight: 300, letterSpacing: '0.05em', fontFamily: 'Space Grotesk, sans-serif' }}>
              ${price.toFixed(2)}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
              {VERDICTS[verdict]}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ marginTop: 52, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <span style={{ width: 20, height: 0.5, background: 'rgba(212,175,55,0.3)', display: 'inline-block' }} />
        Scroll to explore
        <span style={{ width: 20, height: 0.5, background: 'rgba(212,175,55,0.3)', display: 'inline-block' }} />
      </motion.div>

      <EnginePopup engine={activeEngine} onClose={() => setActiveEngine(null)} />
    </div>
  )
}
