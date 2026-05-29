# EquiMind — Interactive Poster

**IS481P Major Project · Dept. of ISE · RVCE · 2025–26**

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Build for production

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/
    sections/     # Hero, Problem, Orchestrator, EnginesSection, Verdict, Impact, Architecture, Team
    ui/           # Cursor, EnginePopup, Section
  hooks/
    useParticleCanvas.ts   # persistent mouse-reactive particle field on fixed canvas
    useScrollProgress.ts   # scroll progress 0→1 ref
  data/
    content.ts    # all project data — engines, team, stats, tech stack
  App.tsx         # root — wires canvas, scroll nav, sections
  index.css       # global tokens
```

## Architecture

- **Persistent canvas** fixed behind all content — particle field lives here, reacts to mouse globally
- **Framer Motion useInView** drives per-section entrance animations — sections animate in/out as you scroll
- **Engine nodes in Hero** are clickable — each opens an animated popup with full engine details
- **EnginesSection** has a tab switcher — click E1–E5 to see the engine's visual + description
- **Verdict section** auto-cycles AAPL/MSFT/TSLA every 4s or click to switch manually
- **Scroll nav dots** (right edge) — hover to enlarge, click to jump to any section
- **Custom cursor** — gold dot + lagging ring, replaces system cursor

## Team

| Name | USN | Engines |
|------|-----|---------|
| Siddharth Agrawal | 1RV22IS065 | E2 · E3 |
| Annant Sharma | 1RV22IS010 | E4 |
| Divyansh Jain | 1RV22IS017 | E1 |
| Naman Taneja | 1RV22IS039 | E5 |

Guide: Prof. Sushmitha N · Asst. Professor · Dept. of ISE · RVCE
