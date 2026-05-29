// Angles: 5 nodes evenly at 72° each, starting top (-90°)
// -90, -18, 54, 126, 198 → perfect pentagon on a circle

export const ENGINES = [
  {
    id: 'E1',
    label: 'Data Ingestion',
    title: 'Engine 1 — Data Ingestion & Normalization',
    headline: 'What Does The Data Actually Say?',
    description: 'Fetches 5 years of Income Statement, Balance Sheet, Cash Flow, and live market pricing from Alpha Vantage and Finnhub. Every line item is mapped to a canonical schema — TTM and annual — with forward-fill imputation for missing periods. No downstream engine ever touches a raw API response.',
    outputs: ['Income Statement', 'Balance Sheet', 'Cash Flow', 'TTM Snapshot', 'Market Pricing', '5Y Historical Array'],
    owner: 'Divyansh Jain',
    color: 'rgba(100, 160, 255, 0.8)',
    angle: -90,
  },
  {
    id: 'E2',
    label: 'Valuation',
    title: 'Engine 2 — Valuation Engine',
    headline: 'What Is It Worth?',
    description: 'Builds a full DCF model with auto-derived WACC via CAPM (Rf + β × ERP), or accepts a manual override. Terminal value computed via Gordon Growth Model. A 5×5 sensitivity grid stress-tests intrinsic value across WACC ± 2% and terminal growth ± 2%. Reverse DCF back-solves what growth rate the current market price implies.',
    outputs: ['DCF Intrinsic Value', 'WACC (CAPM / Manual)', '5×5 Sensitivity Grid', 'P/E · EV/EBITDA · P/B', 'Reverse DCF Growth Rate', 'Valuation Stance'],
    owner: 'Siddharth Agrawal',
    color: 'rgba(212, 175, 55, 0.9)',
    angle: -18,
  },
  {
    id: 'E3',
    label: 'Risk Analytics',
    title: 'Engine 3 — Risk Analytics',
    headline: 'What Could Go Wrong?',
    description: 'Computes both market risk and fundamental financial distress in one unified output. Beta is derived via OLS regression against the S&P 500 over 3-year weekly returns, then Bloomberg-adjusted (0.67β + 0.33). Altman Z-Score uses sector-adjusted coefficients. A stock can be undervalued and still be in the distress zone — this engine surfaces that.',
    outputs: ['Beta (Bloomberg-adj)', 'VaR 95% · CVaR', 'Sharpe & Sortino Ratio', 'Max Drawdown', 'Altman Z-Score', 'Debt/EBITDA · Coverage Ratio'],
    owner: 'Siddharth Agrawal',
    color: 'rgba(220, 80, 80, 0.8)',
    angle: 54,
  },
  {
    id: 'E4',
    label: 'NLP Insights',
    title: 'Engine 4 — NLP Intelligence Layer',
    headline: 'What Is Management Really Saying?',
    description: 'Tokenizes up to 8 quarters of earnings call transcripts (via FMP API) and the MD&A section of SEC EDGAR 10-K filings. Sentiment is scored using the Loughran-McDonald financial lexicon — a domain-specific dictionary that outperforms generic sentiment models on financial text. Red flags are classified across 7 categories including debt pressure, aggressive revenue recognition, and going-concern language.',
    outputs: ['Sentiment Score 0–1', 'Guidance Tone', 'Red Flags (7 categories)', 'Risk Keyword Frequency', 'YoY Tone Shift', 'Theme Extraction'],
    owner: 'Annant Sharma',
    color: 'rgba(100, 210, 140, 0.8)',
    angle: 126,
  },
  {
    id: 'E5',
    label: 'Research Report',
    title: 'Engine 5 — Report Generation',
    headline: 'From Raw Numbers To A Verdict',
    description: 'Assembles all four engine outputs into an 8-section institutional-grade PDF research memo. Each section checks the upstream engine status before rendering — if E4 failed, the NLP section is gracefully omitted rather than crashing. A Groq LLM (llama-3.3-70b-versatile) powers a follow-up chat interface that answers finance questions contextualised against the completed analysis.',
    outputs: ['Business Overview', 'Financial Analysis', 'Valuation Summary', 'Risk Profile', 'NLP Insights', 'Investment Verdict', 'PDF Download', 'AI Follow-up Chat'],
    owner: 'Naman Taneja',
    color: 'rgba(180, 120, 255, 0.8)',
    angle: 198,
  },
]

export const TEAM = [
  { name: 'Siddharth Agrawal', usn: '1RV22IS065', engines: 'E2 · E3' },
  { name: 'Annant Sharma',     usn: '1RV22IS010', engines: 'E4' },
  { name: 'Divyansh Jain',     usn: '1RV22IS017', engines: 'E1' },
  { name: 'Naman Taneja',      usn: '1RV22IS039', engines: 'E5' },
]

export const IMPACT_STATS = [
  { value: '5',    label: 'Independent Engines' },
  { value: '60s',  label: 'End-to-End Analysis' },
  { value: '8',    label: 'Report Sections' },
  { value: '100%', label: 'Automated Pipeline' },
  { value: 'PDF',  label: 'Downloadable Memo' },
  { value: 'LLM',  label: 'AI Follow-up Chat' },
]

export const TECH_STACK = [
  'React', 'TypeScript', 'FastAPI', 'Python 3.11',
  'Supabase', 'Groq LLM', 'Alpha Vantage', 'Finnhub',
  'FMP API', 'SEC EDGAR', 'Vercel', 'Render',
]
