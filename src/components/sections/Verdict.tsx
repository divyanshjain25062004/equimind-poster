import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const TICKERS = [
  { sym: 'AAPL', name: 'Apple Inc', iv: 187.42, mp: 195.12, wacc: 9.1, confidence: 0.81, risk: 'LOW', stance: 'FAIRLY VALUED', color: 'rgba(212,175,55,0.85)' },
  { sym: 'MSFT', name: 'Microsoft Corp', iv: 412.80, mp: 378.50, wacc: 8.4, confidence: 0.87, risk: 'LOW', stance: 'UNDERVALUED', color: 'rgba(120,200,140,0.85)' },
  { sym: 'TSLA', name: 'Tesla Inc', iv: 182.10, mp: 248.40, wacc: 11.2, confidence: 0.62, risk: 'HIGH', stance: 'OVERVALUED', color: 'rgba(220,80,80,0.85)' },
]

export default function Verdict() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' })
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => setIdx(i => (i + 1) % TICKERS.length), 4000)
    return () => clearInterval(t)
  }, [inView])

  const t = TICKERS[idx]
  const upside = (((t.iv - t.mp) / t.mp) * 100).toFixed(1)
  const isUp = t.iv > t.mp

  return (
    <div ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
        style={{ textAlign: 'center', marginBottom: 52 }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', marginBottom: 16 }}>Investment Verdict</div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 300, color: '#fff' }}>
          Decision <span style={{ color: 'rgba(212,175,55,0.85)' }}>Intelligence</span>
        </h2>
      </motion.div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
        {TICKERS.map((tk, i) => (
          <button key={tk.sym} onClick={() => setIdx(i)} style={{
            background: idx === i ? 'rgba(212,175,55,0.08)' : 'transparent',
            border: `0.5px solid ${idx === i ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 20, padding: '5px 14px', cursor: 'none',
            fontSize: 10, letterSpacing: '0.1em', color: idx === i ? 'rgba(212,175,55,0.8)' : 'rgba(255,255,255,0.25)',
            transition: 'all 0.2s',
          }}>{tk.sym}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: `0.5px solid ${t.color.replace('0.85', '0.25')}`,
            borderRadius: 24, padding: '40px 52px',
            maxWidth: 480, width: '100%', textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 6 }}>{t.name}</div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 44, fontWeight: 200, color: '#fff', letterSpacing: '0.1em', marginBottom: 4 }}>{t.sym}</div>

          <div style={{
            display: 'inline-block', fontSize: 13, letterSpacing: '0.18em',
            color: t.color, textTransform: 'uppercase',
            border: `0.5px solid ${t.color.replace('0.85', '0.3')}`,
            borderRadius: 20, padding: '6px 20px', marginBottom: 36,
          }}>{t.stance}</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            {[
              ['Intrinsic Value', `$${t.iv.toFixed(2)}`],
              ['Market Price', `$${t.mp.toFixed(2)}`],
              ['WACC', `${t.wacc}%`],
              ['Confidence', `${(t.confidence * 100).toFixed(0)}%`],
            ].map(([l, v]) => (
              <div key={String(l)} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 6 }}>{l}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 300, color: '#fff' }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
              Risk Rating · <span style={{ color: t.color }}>{t.risk}</span>
            </div>
            <div style={{ fontSize: 13, color: isUp ? 'rgba(120,200,140,0.8)' : 'rgba(220,80,80,0.8)', fontFamily: 'Space Grotesk, sans-serif' }}>
              {isUp ? '+' : ''}{upside}% {isUp ? '↑' : '↓'}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
