import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ENGINES } from '../../data/content'
import EnginePopup from '../ui/EnginePopup'
import { useState } from 'react'

export default function Orchestrator() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' })
  const [active, setActive] = useState<typeof ENGINES[0] | null>(null)

  const cx = 280, cy = 200, R = 130

  return (
    <div ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9 }}
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', marginBottom: 16 }}>Architecture</div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 300, color: '#fff', lineHeight: 1.25 }}>
          One Platform.<br /><span style={{ color: 'rgba(212,175,55,0.85)' }}>Five Intelligence Engines.</span>
        </h2>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', marginTop: 16, letterSpacing: '0.06em' }}>
          Click any engine to explore
        </p>
      </motion.div>

      <motion.svg
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        width="560" height="400" viewBox="0 0 560 400"
        style={{ maxWidth: '100%', overflow: 'visible' }}
      >
        {/* orbit */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(212,175,55,0.07)" strokeWidth={0.5} />

        {/* connectors */}
        {ENGINES.map(eng => {
          const rad = (eng.angle * Math.PI) / 180
          const ex = cx + Math.cos(rad) * R
          const ey = cy + Math.sin(rad) * R
          return (
            <line key={eng.id} x1={cx} y1={cy} x2={ex} y2={ey}
              stroke={eng.color.replace('0.8', '0.15').replace('0.9', '0.15')}
              strokeWidth={0.5} strokeDasharray="4 8" />
          )
        })}

        {/* central orchestrator */}
        <circle cx={cx} cy={cy} r={34} fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.3)" strokeWidth={0.5} />
        <circle cx={cx} cy={cy} r={24} fill="rgba(212,175,55,0.08)" stroke="rgba(212,175,55,0.2)" strokeWidth={0.5} />
        <text x={cx} y={cy - 5} textAnchor="middle" fill="rgba(212,175,55,0.8)" fontSize={9} letterSpacing="0.1em" fontFamily="Space Grotesk, sans-serif">CENTRAL</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill="rgba(212,175,55,0.6)" fontSize={8} letterSpacing="0.08em" fontFamily="Space Grotesk, sans-serif">ORCHESTRATOR</text>

        {/* engine nodes */}
        {ENGINES.map(eng => {
          const rad = (eng.angle * Math.PI) / 180
          const ex = cx + Math.cos(rad) * R
          const ey = cy + Math.sin(rad) * R
          const lx = cx + Math.cos(rad) * (R + 54)
          const ly = cy + Math.sin(rad) * (R + 54)
          return (
            <g key={eng.id} onClick={() => setActive(eng)} style={{ cursor: 'none' }}>
              <circle cx={ex} cy={ey} r={22} fill={eng.color.replace('0.8', '0.1').replace('0.9', '0.1')}
                stroke={eng.color.replace('0.8', '0.4').replace('0.9', '0.4')} strokeWidth={0.5} />
              <circle cx={ex} cy={ey} r={30} fill="none" stroke={eng.color.replace('0.8', '0.06').replace('0.9', '0.06')} strokeWidth={0.5} />
              <text x={ex} y={ey - 4} textAnchor="middle" fill={eng.color} fontSize={10} fontWeight={500} fontFamily="Space Grotesk, sans-serif">{eng.id}</text>
              <text x={ex} y={ey + 7} textAnchor="middle" fill={eng.color.replace('0.8', '0.6').replace('0.9', '0.6')} fontSize={7} letterSpacing="0.06em" fontFamily="Inter, sans-serif">
                {eng.label.split(' ')[0].toUpperCase()}
              </text>
              <text x={lx} y={ly + 4} textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8} letterSpacing="0.08em" fontFamily="Inter, sans-serif">
                {eng.label}
              </text>
            </g>
          )
        })}
      </motion.svg>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ display: 'flex', gap: 40, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {['Stage 1 — Data', 'Stage 2 — Analysis (Parallel)', 'Stage 3 — Report'].map((s, i) => (
          <div key={s} style={{ fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
            <span style={{ color: 'rgba(212,175,55,0.5)' }}>{'0' + (i + 1)}</span> {s}
          </div>
        ))}
      </motion.div>

      <EnginePopup engine={active} onClose={() => setActive(null)} />
    </div>
  )
}
