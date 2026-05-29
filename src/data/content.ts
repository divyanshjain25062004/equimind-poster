export const ENGINES = [
  {
    id: 'E1',
    label: 'Data Ingestion',
    title: 'Engine 1 — Data Ingestion & Normalization',
    headline: 'What Does The Data Actually Say?',
    description: 'Fetches Income Statement, Balance Sheet, Cash Flow, and market pricing data via Alpha Vantage and Finnhub. Normalizes everything into a canonical TTM + 5-year historical schema with forward-fill imputation.',
    outputs: ['Income Statement', 'Balance Sheet', 'Cash Flow Statement', 'Market Pricing Data'],
    owner: 'Divyansh Jain',
    color: 'rgba(100, 160, 255, 0.8)',
    angle: 210,
  },
  {
    id: 'E2',
    label: 'Valuation',
    title: 'Engine 2 — Valuation Engine',
    headline: 'What Is It Worth?',
    description: 'Computes DCF intrinsic value with auto-derived WACC via CAPM. Terminal value via Gordon Growth Model. 5×5 sensitivity grid across WACC and terminal growth. Reverse DCF back-solves the market-implied growth rate.',
    outputs: ['DCF Intrinsic Value', 'WACC (auto/manual)', '5×5 Sensitivity Grid', 'P/E · EV/EBITDA · P/B', 'Reverse DCF'],
    owner: 'Siddharth Agrawal',
    color: 'rgba(212, 175, 55, 0.9)',
    angle: 270,
  },
  {
    id: 'E3',
    label: 'Risk Analytics',
    title: 'Engine 3 — Risk Analytics',
    headline: 'What Could Go Wrong?',
    description: 'Computes market risk and fundamental financial distress metrics. Beta via OLS regression against S&P 500 (Bloomberg-adjusted). Historical VaR at 95% confidence. Altman Z-Score with sector-adjusted coefficients.',
    outputs: ['Beta (Bloomberg-adjusted)', 'VaR 95% · CVaR', 'Sharpe & Sortino Ratio', 'Altman Z-Score', 'Debt/EBITDA · Interest Coverage'],
    owner: 'Siddharth Agrawal',
    color: 'rgba(220, 80, 80, 0.8)',
    angle: 330,
  },
  {
    id: 'E4',
    label: 'NLP Insights',
    title: 'Engine 4 — NLP Intelligence',
    headline: 'What Is Management Really Saying?',
    description: 'Tokenizes earnings call transcripts (FMP API, 8 quarters) and SEC EDGAR 10-K MD&A sections. Lexicon-based sentiment scoring using domain-specific positive, risk, and hedging word frequencies.',
    outputs: ['Sentiment Score (0–1)', 'Red Flag Detection (7 categories)', 'Guidance Tone Extraction', 'Risk Keyword Frequency', 'Theme Identification'],
    owner: 'Annant Sharma',
    color: 'rgba(120, 200, 140, 0.8)',
    angle: 30,
  },
  {
    id: 'E5',
    label: 'Research Report',
    title: 'Engine 5 — Report Generation',
    headline: 'From Analysis To Judgment',
    description: 'Assembles all engine outputs into an 8-section institutional-grade PDF research memo. Groq LLM (llama-3.3-70b) powers a follow-up chat interface for contextual Q&A against the completed analysis.',
    outputs: ['Business Overview', 'Financial Analysis', 'Valuation Summary', 'Risk Profile', 'NLP Insights', 'Investment Verdict', 'PDF Download', 'AI Follow-up Chat'],
    owner: 'Naman Taneja',
    color: 'rgba(180, 120, 255, 0.8)',
    angle: 90,
  },
]

export const TEAM = [
  { name: 'Siddharth Agrawal', usn: '1RV22IS065', engines: 'E2 · E3' },
  { name: 'Annant Sharma',     usn: '1RV22IS010', engines: 'E4' },
  { name: 'Divyansh Jain',     usn: '1RV22IS017', engines: 'E1' },
  { name: 'Naman Taneja',      usn: '1RV22IS039', engines: 'E5' },
]

export const IMPACT_STATS = [
  { value: '5', label: 'Independent Engines' },
  { value: '60s', label: 'End-to-End Analysis' },
  { value: '8', label: 'Report Sections' },
  { value: '100%', label: 'Automated Pipeline' },
  { value: 'PDF', label: 'Downloadable Memo' },
  { value: 'AI', label: 'Follow-up Chat' },
]

export const TECH_STACK = [
  'React', 'TypeScript', 'FastAPI', 'Python 3.11',
  'Supabase', 'Groq LLM', 'Alpha Vantage', 'Finnhub',
  'FMP API', 'SEC EDGAR', 'Vercel', 'Render',
]
