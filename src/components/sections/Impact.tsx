import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { IMPACT_STATS } from '../../data/content'

export default function Impact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' })

  return (
    <div ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', marginBottom: 16 }}>Impact</div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 300, color: '#fff' }}>
          Research At <span style={{ color: 'rgba(212,175,55,0.85)' }}>Institutional Scale</span>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 680, width: '100%' }}>
        {IMPACT_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '0.5px solid rgba(212,175,55,0.1)',
              borderRadius: 16, padding: '28px 20px', textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 36, fontWeight: 200, color: 'rgba(212,175,55,0.85)', letterSpacing: '0.04em', marginBottom: 10 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
