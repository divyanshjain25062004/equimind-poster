import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TEAM, TECH_STACK } from '../../data/content'

export default function Team() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' })

  return (
    <div ref={ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
        style={{ textAlign: 'center', marginBottom: 52 }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', marginBottom: 16 }}>The Team</div>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 300, color: '#fff' }}>
          Built at <span style={{ color: 'rgba(212,175,55,0.85)' }}>RVCE</span>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 580, width: '100%', marginBottom: 48 }}>
        {TEAM.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '24px 28px',
            }}
          >
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, fontWeight: 400, color: '#fff', marginBottom: 6 }}>{m.name}</div>
            <div style={{ fontSize: 9, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 4 }}>{m.usn}</div>
            <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase' }}>{m.engines}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 40 }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', marginBottom: 8 }}>
          Guide · Prof. Sushmitha N · Dept. of ISE · RVCE
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: 32, maxWidth: 580, width: '100%' }}
      >
        <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', textAlign: 'center', marginBottom: 20 }}>Tech Stack</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {TECH_STACK.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 + i * 0.04, duration: 0.4 }}
              style={{
                fontSize: 9, padding: '4px 12px', letterSpacing: '0.1em',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: 20, color: 'rgba(255,255,255,0.25)',
                textTransform: 'uppercase',
              }}
            >{t}</motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ marginTop: 52, textAlign: 'center' }}
      >
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 200, color: 'rgba(255,255,255,0.08)', letterSpacing: '0.2em' }}>
          EQUI<span style={{ color: 'rgba(212,175,55,0.15)', fontWeight: 500 }}>MIND</span>
        </div>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.1)', textTransform: 'uppercase', marginTop: 8 }}>
          IS481P · 2025–26 · RV College of Engineering
        </div>
      </motion.div>
    </div>
  )
}
