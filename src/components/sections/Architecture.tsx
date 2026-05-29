import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const NODES = [
  { label: 'Ticker Input', x: 280, y: 30, w: 110, type: 'input' },
  { label: 'Central Orchestrator', x: 280, y: 100, w: 160, type: 'core' },
  { label: 'Shared Data Bus', x: 280, y: 168, w: 160, type: 'bus' },
  { label: 'E1 Data', x: 60, y: 248, w: 90, type: 'engine', color: 'rgba(100,160,255,' },
  { label: 'E2 Valuation', x: 168, y: 248, w: 100, type: 'engine', color: 'rgba(212,175,55,' },
  { label: 'E3 Risk', x: 280, y: 248, w: 80, type: 'engine', color: 'rgba(220,80,80,' },
  { label: 'E4 NLP', x: 374, y: 248, w: 80, type: 'engine', color: 'rgba(120,200,140,' },
  { label: 'E5 Report', x: 460, y: 248, w: 90, type: 'engine', color: 'rgba(180,120,255,' },
  { label: 'PDF Research Memo', x: 280, y: 340, w: 160, type: 'output' },
]

const COLORS: Record<string, string> = {
  input: 'rgba(255,255,255,0.06)',
  core: 'rgba(212,175,55,0.1)',
  bus: 'rgba(212,175,55,0.05)',
  output: 'rgba(212,175,55,0.12)',
}
const STROKES: Record<string, string> = {
  input: 'rgba(255,255,255,0.12)',
  core: 'rgba(212,175,55,0.4)',
  bus: 'rgba(212,175,55,0.2)',
  output: 'rgba(212,175,55,0.35)',
}

export default function Architecture() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' })

  return (
    <div ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', marginBottom: 16 }}>Architecture</div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 300, color: '#fff' }}>
          Central Orchestrator &amp; <span style={{ color: 'rgba(212,175,55,0.85)' }}>Shared Data Bus</span>
        </h2>
      </motion.div>

      <motion.svg
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewBox="0 0 560 390" style={{ maxWidth: 560, width: '100%' }}
      >
        {/* vertical flow lines */}
        <line x1={280} y1={50} x2={280} y2={92} stroke="rgba(212,175,55,0.2)" strokeWidth={0.5} strokeDasharray="3 6" />
        <line x1={280} y1={118} x2={280} y2={160} stroke="rgba(212,175,55,0.2)" strokeWidth={0.5} strokeDasharray="3 6" />
        <line x1={280} y1={185} x2={280} y2={330} stroke="rgba(212,175,55,0.08)" strokeWidth={0.5} />

        {/* bus to engines */}
        {[60, 168, 280, 374, 460].map(x => (
          <line key={x} x1={280} y1={240} x2={x} y2={240}
            stroke="rgba(212,175,55,0.08)" strokeWidth={0.5} />
        ))}
        {[60, 168, 280, 374, 460].map(x => (
          <line key={x + 'v'} x1={x} y1={240} x2={x} y2={240}
            stroke="rgba(212,175,55,0.08)" strokeWidth={0.5} />
        ))}

        {/* engine to output */}
        {[60, 168, 374, 460].map(x => (
          <line key={x + 'o'} x1={x} y1={268} x2={280} y2={332}
            stroke="rgba(212,175,55,0.06)" strokeWidth={0.5} strokeDasharray="2 6" />
        ))}
        <line x1={280} y1={268} x2={280} y2={332} stroke="rgba(212,175,55,0.12)" strokeWidth={0.5} strokeDasharray="2 6" />

        {/* nodes */}
        {NODES.map(n => {
          const fill = n.type === 'engine' ? n.color! + '0.08)' : COLORS[n.type]
          const stroke = n.type === 'engine' ? n.color! + '0.35)' : STROKES[n.type]
          const textColor = n.type === 'engine' ? n.color! + '0.75)' : n.type === 'core' || n.type === 'output' ? 'rgba(212,175,55,0.8)' : 'rgba(255,255,255,0.4)'
          return (
            <g key={n.label}>
              <rect x={n.x - n.w / 2} y={n.y} width={n.w} height={26} rx={6}
                fill={fill} stroke={stroke} strokeWidth={0.5} />
              <text x={n.x} y={n.y + 17} textAnchor="middle"
                fill={textColor} fontSize={9} letterSpacing="0.08em"
                fontFamily="Inter, sans-serif">{n.label}</text>
            </g>
          )
        })}
      </motion.svg>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ display: 'flex', gap: 36, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {['Loose Coupling', 'Graceful Degradation', 'Parallel Execution', 'Full Traceability'].map(l => (
          <div key={l} style={{ fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
            ◆ {l}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
