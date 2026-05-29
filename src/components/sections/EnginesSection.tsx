import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ENGINES } from '../../data/content'
import EnginePopup from '../ui/EnginePopup'

const VISUALS: Record<string, React.ReactNode> = {
  E1: (
    <svg width="240" height="120" viewBox="0 0 240 120">
      {['Income Statement', 'Balance Sheet', 'Cash Flow', 'Market Data'].map((label, i) => (
        <g key={label}>
          <rect x={10} y={10 + i * 26} width={140} height={18} rx={4}
            fill="rgba(100,160,255,0.06)" stroke="rgba(100,160,255,0.2)" strokeWidth={0.5} />
          <text x={18} y={23 + i * 26} fill="rgba(255,255,255,0.35)" fontSize={9} fontFamily="Inter,sans-serif">{label}</text>
          <line x1={154} y1={19 + i * 26} x2={185} y2={19 + i * 26}
            stroke="rgba(100,160,255,0.25)" strokeWidth={0.5} strokeDasharray="3 5" />
          <rect x={188} y={10 + i * 26} width={42} height={18} rx={4}
            fill="rgba(100,160,255,0.12)" stroke="rgba(100,160,255,0.3)" strokeWidth={0.5} />
          <text x={192} y={23 + i * 26} fill="rgba(100,160,255,0.8)" fontSize={8} fontFamily="Inter,sans-serif">TTM</text>
        </g>
      ))}
    </svg>
  ),
  E2: (
    <svg width="240" height="120" viewBox="0 0 240 120">
      {[['WACC', '9.1%'], ['Intrinsic Value', '$187.42'], ['Market Price', '$195.12'], ['Upside', '-3.9%']].map(([l, v], i) => (
        <g key={l}>
          <text x={10} y={22 + i * 26} fill="rgba(255,255,255,0.3)" fontSize={9} fontFamily="Inter,sans-serif">{l}</text>
          <text x={230} y={22 + i * 26} textAnchor="end" fill="rgba(212,175,55,0.8)" fontSize={10} fontFamily="Space Grotesk,sans-serif" fontWeight={300}>{v}</text>
          <line x1={10} y1={28 + i * 26} x2={230} y2={28 + i * 26} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
        </g>
      ))}
      <text x={10} y={116} fill="rgba(212,175,55,0.35)" fontSize={8} letterSpacing="0.12em" fontFamily="Inter,sans-serif">5×5 SENSITIVITY GRID · REVERSE DCF</text>
    </svg>
  ),
  E3: (
    <svg width="240" height="120" viewBox="0 0 240 120">
      {[['Beta', '1.24', 60], ['Sharpe', '0.87', 43], ['VaR 95%', '-2.1%', 70], ['Z-Score', '4.2', 84], ['Risk', 'LOW', 90]].map(([l, v, pct], i) => (
        <g key={String(l)}>
          <text x={10} y={18 + i * 22} fill="rgba(255,255,255,0.28)" fontSize={8} fontFamily="Inter,sans-serif">{l}</text>
          <rect x={70} y={8 + i * 22} width={120} height={8} rx={2} fill="rgba(255,255,255,0.04)" />
          <rect x={70} y={8 + i * 22} width={Number(pct) * 1.2} height={8} rx={2} fill="rgba(220,80,80,0.25)" />
          <text x={200} y={17 + i * 22} fill="rgba(220,80,80,0.75)" fontSize={9} fontFamily="Space Grotesk,sans-serif">{v}</text>
        </g>
      ))}
    </svg>
  ),
  E4: (
    <svg width="240" height="120" viewBox="0 0 240 120">
      <text x={10} y={16} fill="rgba(255,255,255,0.18)" fontSize={8} fontFamily="Inter,sans-serif" letterSpacing="0.1em">MD&amp;A EXCERPT</text>
      {[
        { word: 'revenue', x: 10, y: 35, highlight: false },
        { word: 'growth', x: 62, y: 35, highlight: true },
        { word: 'exceeded', x: 110, y: 35, highlight: true },
        { word: 'guidance', x: 180, y: 35, highlight: false },
        { word: 'uncertainty', x: 10, y: 55, highlight: false, risk: true },
        { word: 'market', x: 90, y: 55, highlight: false },
        { word: 'headwinds', x: 138, y: 55, highlight: false, risk: true },
        { word: 'remain', x: 10, y: 75, highlight: false },
        { word: 'strong', x: 58, y: 75, highlight: true },
        { word: 'momentum', x: 106, y: 75, highlight: true },
      ].map(w => (
        <g key={w.word + w.x}>
          {(w.highlight || w.risk) && (
            <rect x={w.x - 2} y={w.y - 11} width={w.word.length * 6.2 + 4} height={14} rx={3}
              fill={w.highlight ? 'rgba(120,200,140,0.15)' : 'rgba(220,80,80,0.12)'} />
          )}
          <text x={w.x} y={w.y} fill={w.highlight ? 'rgba(120,200,140,0.8)' : w.risk ? 'rgba(220,80,80,0.6)' : 'rgba(255,255,255,0.25)'}
            fontSize={9} fontFamily="Inter,sans-serif">{w.word}</text>
        </g>
      ))}
      <text x={10} y={100} fill="rgba(120,200,140,0.4)" fontSize={8} letterSpacing="0.1em" fontFamily="Inter,sans-serif">SENTIMENT 0.71 · BULLISH</text>
      <text x={10} y={114} fill="rgba(220,80,80,0.4)" fontSize={8} letterSpacing="0.1em" fontFamily="Inter,sans-serif">RED FLAGS: 0 DETECTED</text>
    </svg>
  ),
  E5: (
    <svg width="240" height="120" viewBox="0 0 240 120">
      {['Business Overview', 'Financial Analysis', 'Valuation', 'Risk Profile', 'NLP Insights', 'Investment Verdict'].map((s, i) => (
        <g key={s}>
          <rect x={10} y={6 + i * 18} width={i === 5 ? 220 : 80 + i * 22} height={12} rx={3}
            fill={i === 5 ? 'rgba(212,175,55,0.15)' : 'rgba(180,120,255,0.08)'}
            stroke={i === 5 ? 'rgba(212,175,55,0.3)' : 'rgba(180,120,255,0.2)'} strokeWidth={0.5} />
          <text x={16} y={16 + i * 18} fill={i === 5 ? 'rgba(212,175,55,0.8)' : 'rgba(180,120,255,0.6)'}
            fontSize={8} fontFamily="Inter,sans-serif" letterSpacing="0.05em">{s}</text>
        </g>
      ))}
    </svg>
  ),
}

export default function EnginesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' })
  const [selected, setSelected] = useState(0)
  const [popup, setPopup] = useState<typeof ENGINES[0] | null>(null)

  const eng = ENGINES[selected]

  return (
    <div ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 44 }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', marginBottom: 16 }}>Deep Dive</div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 300, color: '#fff' }}>
          The <span style={{ color: 'rgba(212,175,55,0.85)' }}>Intelligence Pipeline</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {ENGINES.map((e, i) => (
          <button key={e.id} onClick={() => setSelected(i)} style={{
            background: selected === i ? e.color.replace('0.8', '0.1').replace('0.9', '0.1') : 'transparent',
            border: `0.5px solid ${selected === i ? e.color.replace('0.8', '0.5').replace('0.9', '0.5') : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 24, padding: '7px 18px', cursor: 'none',
            fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: selected === i ? e.color : 'rgba(255,255,255,0.3)',
            transition: 'all 0.25s ease',
          }}>
            {e.id} · {e.label}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 32, maxWidth: 720, width: '100%',
            background: 'rgba(255,255,255,0.02)',
            border: `0.5px solid ${eng.color.replace('0.8', '0.18').replace('0.9', '0.18')}`,
            borderRadius: 20, padding: '36px 40px',
          }}
        >
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', color: eng.color, textTransform: 'uppercase', marginBottom: 12 }}>{eng.id} · {eng.label}</div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 300, color: '#fff', lineHeight: 1.3, marginBottom: 14 }}>{eng.headline}</h3>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', lineHeight: 1.85, marginBottom: 20 }}>{eng.description}</p>
            <button onClick={() => setPopup(eng)} style={{
              background: 'none', border: `0.5px solid ${eng.color.replace('0.8', '0.3').replace('0.9', '0.3')}`,
              borderRadius: 20, padding: '6px 16px', cursor: 'none',
              fontSize: 9, letterSpacing: '0.14em', color: eng.color, textTransform: 'uppercase',
            }}>
              Full Details →
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '0.5px solid rgba(255,255,255,0.05)', paddingLeft: 32 }}>
            {VISUALS[eng.id]}
          </div>
        </motion.div>
      </AnimatePresence>

      <EnginePopup engine={popup} onClose={() => setPopup(null)} />
    </div>
  )
}
