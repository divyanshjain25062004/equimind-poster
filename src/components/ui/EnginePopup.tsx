import { motion, AnimatePresence } from 'framer-motion'
import { ENGINES } from '../../data/content'

interface Props {
  engine: typeof ENGINES[0] | null
  onClose: () => void
}

export default function EnginePopup({ engine, onClose }: Props) {
  return (
    <AnimatePresence>
      {engine && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(7,8,13,0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              cursor: 'none',
            }}
          />
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1001,
              width: 'min(520px, 90vw)',
              background: 'rgba(12,14,22,0.97)',
              border: `0.5px solid ${engine.color.replace('0.8', '0.4').replace('0.9', '0.4')}`,
              borderRadius: 20,
              padding: '36px 40px',
              cursor: 'none',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 18, right: 18,
                background: 'none', border: '0.5px solid rgba(255,255,255,0.1)',
                borderRadius: '50%', width: 28, height: 28,
                color: 'rgba(255,255,255,0.4)', cursor: 'none',
                fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginBottom: 20,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                border: `0.5px solid ${engine.color}`,
                background: engine.color.replace('0.8', '0.08').replace('0.9', '0.08'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 500,
                color: engine.color,
                letterSpacing: '0.05em',
              }}>{engine.id}</div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.18em', color: engine.color, textTransform: 'uppercase' }}>
                  {engine.label}
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
                  Owner · {engine.owner}
                </div>
              </div>
            </div>

            <h2 style={{
              fontSize: 22, fontWeight: 300, color: '#fff',
              lineHeight: 1.3, marginBottom: 14, fontFamily: 'Space Grotesk, sans-serif',
            }}>{engine.headline}</h2>

            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.85,
              marginBottom: 24,
            }}>{engine.description}</p>

            <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)', paddingTop: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 12 }}>
                Outputs
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {engine.outputs.map(o => (
                  <span key={o} style={{
                    fontSize: 11, padding: '4px 12px',
                    border: `0.5px solid ${engine.color.replace('0.8', '0.25').replace('0.9', '0.25')}`,
                    borderRadius: 20,
                    color: engine.color,
                    background: engine.color.replace('0.8', '0.06').replace('0.9', '0.06'),
                    letterSpacing: '0.06em',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}>{o}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
