import { useRef } from 'react'
import Cursor from './components/ui/Cursor'
import Hero from './components/sections/Hero'
import Problem from './components/sections/Problem'
import Orchestrator from './components/sections/Orchestrator'
import EnginesSection from './components/sections/EnginesSection'
import Verdict from './components/sections/Verdict'
import Impact from './components/sections/Impact'
import Architecture from './components/sections/Architecture'
import Team from './components/sections/Team'
import { useParticleCanvas } from './hooks/useParticleCanvas'
import { useScrollProgress } from './hooks/useScrollProgress'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { progress } = useScrollProgress()
  useParticleCanvas(canvasRef, progress)

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Cursor />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 0,
          pointerEvents: 'none', width: '100%', height: '100%',
        }}
      />
      <ScrollNav />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div data-section="0"><Hero /></div>
        <div data-section="1"><Problem /></div>
        <div data-section="2"><Orchestrator /></div>
        <div data-section="3"><EnginesSection /></div>
        <div data-section="4"><Verdict /></div>
        <div data-section="5"><Impact /></div>
        <div data-section="6"><Architecture /></div>
        <div data-section="7"><Team /></div>
      </div>
    </div>
  )
}

const SECTION_LABELS = ['Hero', 'Problem', 'Pipeline', 'Engines', 'Verdict', 'Impact', 'Architecture', 'Team']

function ScrollNav() {
  const scrollToSection = (i: number) => {
    const el = document.querySelector(`[data-section="${i}"]`)
    el?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div style={{
      position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 12, zIndex: 100,
    }}>
      {SECTION_LABELS.map((s, i) => (
        <div key={s} title={s} onClick={() => scrollToSection(i)}
          style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(212,175,55,0.35)', cursor: 'none', transition: 'all 0.25s' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(212,175,55,0.9)'; el.style.transform = 'scale(2)' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(212,175,55,0.35)'; el.style.transform = 'scale(1)' }}
        />
      ))}
    </div>
  )
}
