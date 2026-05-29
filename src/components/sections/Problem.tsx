import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FRAGMENTS = [
  { label: 'SEC 10-K Filing', x: '8%', y: '18%', delay: 0 },
  { label: 'Earnings Transcript', x: '70%', y: '12%', delay: 0.1 },
  { label: 'Balance Sheet', x: '15%', y: '68%', delay: 0.2 },
  { label: 'Market Pricing', x: '72%', y: '62%', delay: 0.15 },
  { label: 'VaR Model', x: '42%', y: '8%', delay: 0.25 },
  { label: 'DCF Spreadsheet', x: '5%', y: '42%', delay: 0.05 },
  { label: 'Analyst Notes', x: '78%', y: '38%', delay: 0.3 },
  { label: 'News Sentiment', x: '38%', y: '78%', delay: 0.2 },
]

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' })

  return (
    <div ref={ref} style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {FRAGMENTS.map((f) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.6, delay: f.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', left: f.x, top: f.y,
              background: 'rgba(255,255,255,0.03)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: 10, padding: '8px 14px',
              fontSize: 10, letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {f.label}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 5, maxWidth: 560 }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', marginBottom: 20 }}>The Problem</div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 300, color: '#fff', lineHeight: 1.25, marginBottom: 20 }}>
          Financial Intelligence<br />Is <span style={{ color: 'rgba(212,175,55,0.85)' }}>Fragmented</span>
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.9, letterSpacing: '0.02em' }}>
          Analysts manually combine valuation models, risk frameworks, filing disclosures, and market data — each in a separate tool, each with its own format, none traceable to a single verdict.
        </p>

        <div style={{ display: 'flex', gap: 32, marginTop: 36, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Disconnected Tools', 'Manual Workload', 'No Traceability'].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', borderBottom: '0.5px solid rgba(212,175,55,0.2)', paddingBottom: 6 }}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
