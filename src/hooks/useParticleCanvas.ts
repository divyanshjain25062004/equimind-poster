import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; ox: number; oy: number
  vx: number; vy: number
  r: number; a: number; gold: boolean; depth: number
}

export function useParticleCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  scrollProgress: React.RefObject<number>
) {
  const mouse = useRef({ x: -999, y: -999, down: false, rx: 0, ry: 0 })
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      initPts()
    }

    const initPts = () => {
      particles.current = Array.from({ length: 200 }, () => {
        const x = Math.random() * W, y = Math.random() * H
        return {
          x, y, ox: x, oy: y,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.6 + 0.3,
          a: Math.random() * 0.3 + 0.05,
          gold: Math.random() < 0.18,
          depth: Math.random() * 0.7 + 0.3,
        }
      })
    }

    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (mouse.current.down) {
        mouse.current.rx = e.movementX * 0.4
        mouse.current.ry = e.movementY * 0.4
      }
    }
    const onDown = () => { mouse.current.down = true }
    const onUp = () => { mouse.current.down = false; mouse.current.rx = 0; mouse.current.ry = 0 }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    let rafId: number
    const draw = () => {
      rafId = requestAnimationFrame(draw)
      ctx.fillStyle = 'rgba(7,8,13,0.22)'
      ctx.fillRect(0, 0, W, H)

      const pts = particles.current
      for (const p of pts) {
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const d = Math.sqrt(dx * dx + dy * dy)

        if (mouse.current.down) {
          // drag: pull particles toward cursor
          if (d < 200) {
            const f = ((200 - d) / 200) * 1.2 * p.depth
            p.vx -= (dx / d) * f
            p.vy -= (dy / d) * f
          }
          // also shift all particles slightly by mouse drag direction
          p.vx += mouse.current.rx * 0.015 * p.depth
          p.vy += mouse.current.ry * 0.015 * p.depth
        } else {
          // hover: repel gently
          if (d < 110) {
            const f = ((110 - d) / 110) * 0.45 * p.depth
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
          // gentle drift back toward origin
          p.vx += (p.ox - p.x) * 0.002
          p.vy += (p.oy - p.y) * 0.002
        }

        p.vx *= 0.96; p.vy *= 0.96
        p.x += p.vx; p.y += p.vy

        // wrap
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.gold ? `rgba(212,175,55,${p.a})` : `rgba(200,212,255,${p.a * 0.45})`
        ctx.fill()
      }

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 85) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(212,175,55,${(1 - d / 85) * 0.065})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }
    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [canvasRef, scrollProgress])
}
