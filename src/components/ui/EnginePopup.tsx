import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { ENGINES } from '../../data/content'

interface Props {
  engine: typeof ENGINES[0] | null
  onClose: () => void
}

const ENGINE_CONTENT: Record<string, {
  wit: string
  body: string
  stats: { label: string; value: string }[]
  note: string
  tagline: string
}> = {
  E1: {
    tagline: 'The one who actually does the homework.',
    wit: 'While you were Googling the ticker, we already pulled 5 years of financials.',
    body: 'Every number that flows through this platform starts here. Raw API responses from Alpha Vantage and Finnhub get normalized into a clean canonical schema — TTM snapshots, 5-year historical arrays, forward-fill imputation for the gaps companies pretend don\'t exist. No downstream engine ever touches a raw API response. Garbage in, garbage out? Not on our watch.',
    stats: [
      { label: 'Sources', value: 'Alpha Vantage · Finnhub' },
      { label: 'History', value: '5 Years + TTM Snapshot' },
      { label: 'Statements', value: 'Income · Balance · Cash Flow' },
      { label: 'Missing Data?', value: 'Forward-fill. Handled.' },
    ],
    note: 'Runs alone in Stage 1. Every other engine waits. No shortcuts.',
  },
  E2: {
    tagline: 'We put a price on it. Literally.',
    wit: 'DCF: because someone has to tell you what a company is actually worth, not just what Twitter thinks.',
    body: 'Full Discounted Cash Flow model — auto-derives WACC via CAPM (Rf + β × ERP) or accepts a manual override if you think you know better. Terminal value via Gordon Growth Model. A 5×5 sensitivity grid stress-tests intrinsic value across WACC ± 2% and terminal growth ± 2%. Reverse DCF back-solves what growth rate is already baked into the current price. Spoiler: it\'s usually optimistic.',
    stats: [
      { label: 'WACC Method', value: 'CAPM Auto or Manual Override' },
      { label: 'Sensitivity Grid', value: '5×5 · 25 Scenarios' },
      { label: 'Terminal Value', value: 'Gordon Growth Model' },
      { label: 'Reverse DCF', value: 'Back-solves Market Expectations' },
    ],
    note: 'Runs parallel with E3 and E4 in Stage 2. Published to context[\'valuation\'].',
  },
  E3: {
    tagline: 'What keeps the CFO up at night.',
    wit: 'Beta is just volatility with a fancy name. We compute it the right way.',
    body: 'Market risk meets balance-sheet reality in one unified output. Beta via OLS regression against S&P 500 over 3-year weekly returns, then Bloomberg-adjusted (0.67β + 0.33) so it doesn\'t overclaim momentum. Altman Z-Score with sector-adjusted coefficients, because a tech startup and a steel mill face very different flavours of distress. The core insight: a stock can be undervalued AND in the distress zone simultaneously. We surface both.',
    stats: [
      { label: 'Beta Method', value: 'OLS + Bloomberg Adjustment' },
      { label: 'Downside Risk', value: 'VaR 95% · CVaR · Max Drawdown' },
      { label: 'Distress Model', value: 'Altman Z-Score (sector-adj.)' },
      { label: 'Also Computed', value: 'Sharpe · Sortino · Debt/EBITDA' },
    ],
    note: 'Market risk and fundamental health in one verdict — not just a table.',
  },
  E4: {
    tagline: 'Reading between the lines. Literally.',
    wit: '"We remain cautiously optimistic" = we have no idea what\'s happening. Our lexicon knows.',
    body: 'Earnings calls are theatre. Management knows exactly what to say and how to say it. This engine reads through it anyway. Tokenizes up to 8 quarters of transcripts (FMP API) and the MD&A section of SEC 10-K filings. Sentiment scored via the Loughran-McDonald financial lexicon — built specifically for finance, because "liability" sounds negative everywhere except a balance sheet. Detects red flags across 7 categories: debt pressure, aggressive revenue recognition, governance hedging, going-concern language, and more.',
    stats: [
      { label: 'Lexicon', value: 'Loughran-McDonald (Finance-Specific)' },
      { label: 'Coverage', value: '8 Quarters · Full MD&A' },
      { label: 'Red Flag Categories', value: '7 Detected' },
      { label: 'Sentiment Scale', value: '0.0 = Bearish → 1.0 = Bullish' },
    ],
    note: 'Chose lexicon over FinBERT: deterministic, fast, auditable. FinBERT is scheduled for v2.',
  },
  E5: {
    tagline: 'The one that actually talks to humans.',
    wit: 'It takes four engines of pure math to write one page of English. Totally worth it.',
    body: 'Every number from E1–E4 flows here and gets translated into something a human can actually act on. Eight structured sections assembled in order: Business Overview → Financial Analysis → Cash Flow → Balance Sheet → Red Flags → Valuation → Key Insights → Investment Verdict. Checks each upstream engine\'s status before rendering — if E4 failed, the NLP section is gracefully omitted rather than crashing the whole thing. A Groq LLM chat layer lets you ask "why" instead of just staring at the numbers.',
    stats: [
      { label: 'Report Sections', value: '8 · PDF + HTML Output' },
      { label: 'Failure Handling', value: 'Graceful Degradation Per Engine' },
      { label: 'LLM Chat', value: 'Groq llama-3.3-70b-versatile' },
      { label: 'Total Pipeline', value: '~60 seconds, start to verdict' },
    ],
    note: 'Last to run. Sees everything. Explains it like you\'re actually paying attention.',
  },
}

function ca(color: string, a: string) {
  return color.replace(/[\d.]+\)$/, `${a})`)
}

function PopupContent({ engine, onClose }: { engine: typeof ENGINES[0]; onClose: () => void }) {
  const c = ENGINE_CONTENT[engine.id]
  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(4,5,10,0.9)',
          backdropFilter: 'blur(14px)',
          zIndex: 9000,
          cursor: 'none',
        }}
      />
      <motion.div
        key="popup"
        initial={{ opacity: 0, scale: 0.88, y: 36 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9001,
          width: 'min(580px, 90vw)',
          maxHeight: '80vh',
          overflowY: 'auto',
          background: 'rgba(9,11,20,0.99)',
          border: `0.5px solid ${ca(engine.color, '0.4')}`,
          borderRadius: 24,
          padding: '36px 40px 40px',
          cursor: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <button onClick={onClose} style={{
          position: 'sticky', top: 0, float: 'right', marginBottom: -30,
          background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.12)',
          borderRadius: '50%', width: 30, height: 30,
          color: 'rgba(255,255,255,0.5)', cursor: 'none',
          fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
        }}>×</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
            border: `0.5px solid ${ca(engine.color, '0.55')}`,
            background: ca(engine.color, '0.12'),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600, color: engine.color,
            boxShadow: `0 0 24px ${ca(engine.color, '0.25')}`,
            fontFamily: 'Space Grotesk, sans-serif',
          }}>{engine.id}</div>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.18em', color: engine.color, textTransform: 'uppercase', fontWeight: 500 }}>{engine.label}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>Owner · {engine.owner}</div>
          </div>
        </div>

        <div style={{ fontSize: 10, letterSpacing: '0.12em', color: ca(engine.color, '0.6'), textTransform: 'uppercase', marginBottom: 10, fontStyle: 'italic' }}>
          {c.tagline}
        </div>

        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 26, fontWeight: 300, color: '#fff', lineHeight: 1.25, marginBottom: 12 }}>
          {engine.headline}
        </h2>

        <div style={{
          fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 20,
          fontStyle: 'italic', borderLeft: `2px solid ${ca(engine.color, '0.4')}`, paddingLeft: 14,
        }}>{c.wit}</div>

        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.92, marginBottom: 28 }}>{c.body}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {c.stats.map(s => (
            <div key={s.label} style={{
              background: ca(engine.color, '0.05'),
              border: `0.5px solid ${ca(engine.color, '0.16')}`,
              borderRadius: 12, padding: '12px 16px',
            }}>
              <div style={{ fontSize: 8, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: engine.color, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1.4 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 8, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', marginBottom: 12 }}>Outputs</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {engine.outputs.map(o => (
              <span key={o} style={{
                fontSize: 10, padding: '5px 13px',
                border: `0.5px solid ${ca(engine.color, '0.28')}`,
                borderRadius: 20, color: engine.color,
                background: ca(engine.color, '0.07'),
                letterSpacing: '0.05em', fontFamily: 'Space Grotesk, sans-serif',
              }}>{o}</span>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.025)', borderRadius: 10, padding: '13px 16px', borderLeft: `2px solid ${ca(engine.color, '0.35')}` }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', lineHeight: 1.75 }}>{c.note}</div>
        </div>
      </motion.div>
    </>
  )
}

export default function EnginePopup({ engine, onClose }: Props) {
  return createPortal(
    <AnimatePresence>
      {engine && <PopupContent engine={engine} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  )
}
