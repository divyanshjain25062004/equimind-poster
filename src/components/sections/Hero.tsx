import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ENGINES } from '../../data/content'
import EnginePopup from '../ui/EnginePopup'

const VERDICTS = ['Fairly Valued', 'Undervalued', 'Marginally Overvalued'] as const
const RADIUS = 168
const NODE_SIZE = 38
// 5 nodes evenly at 72° apart, starting from top (-90°)
const ANGLES = [0, 1, 2, 3, 4].map(i => -90 + i * 72)

export default function Hero() {
  const [price, setPrice] = useState(189.42)
  const [verdict, setVerdict] = useState(0)
  const [activeEngine, setActiveEngine] = useState<typeof ENGINES[0] | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const tilt = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const drag = useRef({ active: false, vx: 0, vy: 0, angle: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(p => parseFloat((p + (Math.random() - 0.48) * 0.9).toFixed(2)))
      if (Math.random() < 0.25) setVerdict(v => (v + 1) % VERDICTS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // Card tilt on mouse move
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const card = cardRef.current
      if (!card) return
      const r = card.getBoundingClientRect()
      tilt.current.tx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 12
      tilt.current.ty = ((e.clientY - (r.top + r.height / 2)) / r.height) * 12
    }
    window.addEventListener('mousemove', onMove)
    const animate = () => {
      tilt.current.x += (tilt.current.tx - tilt.current.x) * 0.06
      tilt.current.y += (tilt.current.ty - tilt.current.y) * 0.06
      if (cardRef.current)
        cardRef.current.style.transform = `perspective(700px) rotateY(${tilt.current.x}deg) rotateX(${-tilt.current.y}deg)`
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current) }
  }, [])

  // Orbit slow rotation + drag
  useEffect(() => {
    let angle = 0
    let last = performance.now()
    let rafId: number

    const onDown = (e: MouseEvent) => {
      if (!orbitRef.current) return
      drag.current.active = true
      drag.current.vx = e.clientX
      drag.current.vy = e.clientY
      drag.current.angle = angle
    }
    const onMove = (e: MouseEvent) => {
      if (!drag.current.active) return
      const dx = e.clientX - drag.current.vx
      angle = drag.current.angle + dx * 0.3
    }
    const onUp = () => { drag.current.active = false }

    window.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)

    const loop = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      if (!drag.current.active) angle += dt * 8 // degrees/sec slow rotation
      if (orbitRef.current) orbitRef.current.style.transform = `rotate(${angle}deg)`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const orbitSize = RADIUS * 2 + NODE_SIZE * 2 + 20

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 20px', userSelect: 'none' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
        <div style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.35em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', marginBottom: 20 }}>
          IS481P · Major Project · Dept. of ISE · RVCE · 2025–26
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(52px, 8vw, 88px)', fontWeight: 200, letterSpacing: '0.16em', textAlign: 'center', lineHeight: 1, marginBottom: 14, color: '#fff' }}
      >
        EQUI<span style={{ color: 'rgba(212,175,55,0.88)', fontWeight: 500 }}>MIND</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
        style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', textAlign: 'center', maxWidth: 380, lineHeight: 2.2, marginBottom: 44 }}
      >
        Automated Equity Research &amp; Valuation Intelligence Platform
      </motion.p>

      {/* Orbit system */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', width: orbitSize, height: orbitSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* orbit ring — rotates */}
        <div
          ref={orbitRef}
          style={{
            position: 'absolute',
            width: RADIUS * 2, height: RADIUS * 2,
            borderRadius: '50%',
            top: '50%', left: '50%',
            marginTop: -RADIUS, marginLeft: -RADIUS,
            cursor: 'grab',
          }}
        >
          {/* ring border */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '0.5px solid rgba(212,175,55,0.1)',
            pointerEvents: 'none',
          }} />

          {/* engine nodes — evenly spaced on circle */}
          {ENGINES.map((eng, i) => {
            const angleDeg = ANGLES[i]
            const rad = (angleDeg * Math.PI) / 180
            const x = Math.cos(rad) * RADIUS + RADIUS - NODE_SIZE / 2
            const y = Math.sin(rad) * RADIUS + RADIUS - NODE_SIZE / 2
            return (
              <motion.div
                key={eng.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.1, type: 'spring', stiffness: 280, damping: 22 }}
                onClick={(e) => { e.stopPropagation(); setActiveEngine(eng) }}
                whileHover={{ scale: 1.22 }}
                style={{
                  position: 'absolute',
                  left: x, top: y,
                  width: NODE_SIZE, height: NODE_SIZE,
                  cursor: 'none', zIndex: 10,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
              >
                {/* counter-rotate label so text stays upright as orbit spins */}
                <div style={{
                  width: NODE_SIZE, height: NODE_SIZE, borderRadius: '50%',
                  border: `0.5px solid ${eng.color.replace('0.8', '0.55').replace('0.9', '0.55')}`,
                  background: eng.color.replace('0.8', '0.12').replace('0.9', '0.12'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 500, color: eng.color,
                  boxShadow: `0 0 18px ${eng.color.replace('0.8', '0.18').replace('0.9', '0.18')}`,
                  pointerEvents: 'all',
                }}>{eng.id}</div>
                {/* label outside orbit, always readable — positioned radially outward */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: `translate(-50%, -50%) translate(${Math.cos(rad) * (NODE_SIZE * 1.5)}px, ${Math.sin(rad) * (NODE_SIZE * 1.5)}px)`,
                  fontSize: 7, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)',
                  textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}>{eng.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* center card — does NOT rotate */}
        <div ref={cardRef} style={{ willChange: 'transform', zIndex: 5, position: 'absolute' }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '0.5px solid rgba(212,175,55,0.28)',
            borderRadius: 18, padding: '26px 48px', textAlign: 'center',
            backdropFilter: 'blur(20px)',
          }}>
            <div style={{ fontSize: 36, fontWeight: 200, color: '#fff', letterSpacing: '0.12em', fontFamily: 'Space Grotesk, sans-serif' }}>AAPL</div>
            <div style={{ fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginTop: 5 }}>Apple Inc · NASDAQ</div>
            <div style={{ fontSize: 16, color: 'rgba(212,175,55,0.82)', marginTop: 11, fontWeight: 300, letterSpacing: '0.05em', fontFamily: 'Space Grotesk, sans-serif' }}>
              ${price.toFixed(2)}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
              {VERDICTS[verdict]}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
        style={{ marginTop: 40, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.1)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <span style={{ width: 20, height: 0.5, background: 'rgba(212,175,55,0.3)', display: 'inline-block' }} />
        Drag orbit · Scroll to explore
        <span style={{ width: 20, height: 0.5, background: 'rgba(212,175,55,0.3)', display: 'inline-block' }} />
      </motion.div>

      <EnginePopup engine={activeEngine} onClose={() => setActiveEngine(null)} />
    </div>
  )
}
