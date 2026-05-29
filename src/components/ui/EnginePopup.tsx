import { motion, AnimatePresence } from 'framer-motion'
import { ENGINES } from '../../data/content'

interface Props {
  engine: typeof ENGINES[0] | null
  onClose: () => void
}

// Each engine gets a unique stat block shown in the popup
const ENGINE_STATS: Record<string, { label: string; value: string }[]> = {
  E1: [
    { label: 'Data Sources', value: 'Alpha Vantage · Finnhub' },
    { label: 'History Depth', value: '5 Years + TTM' },
    { label: 'Normalisation', value: 'Forward-fill Imputation' },
    { label: 'Schema', value: 'Canonical Financial Dict' },
  ],
  E2: [
    { label: 'WACC Method', value: 'CAPM Auto-Derived' },
    { label: 'Terminal Value', value: 'Gordon Growth Model' },
    { label: 'Sensitivity Grid', value: '5 × 5 WACC vs g' },
    { label: 'Reverse DCF', value: 'Market-Implied Growth' },
  ],
  E3: [
    { label: 'Beta Method', value: 'OLS vs S&P 500 · 3yr' },
    { label: 'VaR Confidence', value: '95% Historical Sim' },
    { label: 'Distress Model', value: 'Altman Z-Score' },
    { label: 'Adjustment', value: 'Bloomberg Beta Adj.' },
  ],
  E4: [
    { label: 'Data Sources', value: 'FMP Transcripts · EDGAR' },
    { label: 'Lexicon', value: 'Loughran-McDonald' },
    { label: 'Coverage', value: '8 Quarters · MD&A' },
    { label: 'Red Flag Cats', value: '7 Risk Categories' },
  ],
  E5: [
    { label: 'Report Sections', value: '8 Structured Sections' },
    { label: 'Output Format', value: 'PDF + HTML' },
    { label: 'LLM Layer', value: 'Groq llama-3.3-70b' },
    { label: 'Chat Context', value: 'Full Analysis State' },
  ],
}

const ENGINE_NOTE: Record<string, string> = {
  E1: 'Runs in Stage 1 — all other engines wait for this output before executing.',
  E2: 'Runs in Stage 2 parallel with E3 and E4. Publishes context[\'valuation\'].',
  E3: 'Sector-adjusted Z-Score coefficients. Combines market risk + balance-sheet health into one verdict.',
  E4: 'Lexicon-based approach chosen over FinBERT for deterministic, reproducible results at v1.',
  E5: 'Checks each engine\'s status field before rendering — graceful degradation if any engine fails.',
}

function getAccentColor(color: string, alpha: string) {
  return color.replace('0.8', alpha).replace('0.9', alpha)
}

export default function EnginePopup({ engine, onClose }: Props) {
  return (
    <AnimatePresence>
      {engine && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(5,6,12,0.82)', backdropFilter: 'blur(10px)', zIndex: 1000, cursor: 'none' }}
          />
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1001,
              width: 'min(560px, 92vw)',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: 'rgba(10,12,20,0.98)',
              border: `0.5px solid ${getAccentColor(engine.color, '0.35')}`,
              borderRadius: 22,
              padding: '32px 36px 36px',
              cursor: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {/* close */}
            <button onClick={onClose} style={{
              position: 'sticky', top: 0, float: 'right',
              background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: '50%', width: 28, height: 28,
              color: 'rgba(255,255,255,0.45)', cursor: 'none', fontSize: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: -28, zIndex: 2,
            }}>×</button>

            {/* header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                border: `0.5px solid ${getAccentColor(engine.color, '0.5')}`,
                background: getAccentColor(engine.color, '0.1'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 600, color: engine.color,
                boxShadow: `0 0 20px ${getAccentColor(engine.color, '0.2')}`,
              }}>{engine.id}</div>
              <div>
                <div style={{ fontSize: 12, letterSpacing: '0.18em', color: engine.color, textTransform: 'uppercase', fontWeight: 500 }}>{engine.label}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>Owner · {engine.owner}</div>
              </div>
            </div>

            {/* headline */}
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 26, fontWeight: 300, color: '#fff', lineHeight: 1.25, marginBottom: 12 }}>
              {engine.headline}
            </h2>

            {/* description */}
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.9, marginBottom: 28 }}>
              {engine.description}
            </p>

            {/* stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              {ENGINE_STATS[engine.id]?.map(s => (
                <div key={s.label} style={{
                  background: getAccentColor(engine.color, '0.05'),
                  border: `0.5px solid ${getAccentColor(engine.color, '0.14')}`,
                  borderRadius: 12, padding: '12px 16px',
                }}>
                  <div style={{ fontSize: 8, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 5 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: engine.color, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400 }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* outputs */}
            <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 8, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 12 }}>Outputs</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {engine.outputs.map(o => (
                  <span key={o} style={{
                    fontSize: 10, padding: '5px 13px',
                    border: `0.5px solid ${getAccentColor(engine.color, '0.28')}`,
                    borderRadius: 20, color: engine.color,
                    background: getAccentColor(engine.color, '0.07'),
                    letterSpacing: '0.05em', fontFamily: 'Space Grotesk, sans-serif',
                  }}>{o}</span>
                ))}
              </div>
            </div>

            {/* architecture note */}
            <div style={{
              background: 'rgba(255,255,255,0.025)', borderRadius: 10,
              padding: '12px 16px', borderLeft: `2px solid ${getAccentColor(engine.color, '0.4')}`,
            }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, fontStyle: 'italic' }}>
                {ENGINE_NOTE[engine.id]}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
