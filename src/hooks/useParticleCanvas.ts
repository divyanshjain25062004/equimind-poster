import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; a: number
  gold: boolean; depth: number
}

export function useParticleCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  scrollProgress: React.RefObject<number>
) {
  const mouse = useRef({ x: -999, y: -999 })
  const particles = useRef<Particle[]>([])
  const raf = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const N = 180
    const init = () => {
      particles.current = Array.from({ length: N }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random() * 0.3 + 0.05,
        gold: Math.random() < 0.2,
        depth: Math.random() * 0.7 + 0.3,
      }))
    }
    init()

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      raf.current = requestAnimationFrame(draw)
      const sp = scrollProgress.current ?? 0

      ctx.fillStyle = `rgba(7,8,13,${0.2 + sp * 0.05})`
      ctx.fillRect(0, 0, W, H)

      const pts = particles.current
      for (const p of pts) {
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 120) {
          const f = ((120 - d) / 120) * 0.5 * p.depth
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
        p.vx *= 0.97; p.vy *= 0.97
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.gold
          ? `rgba(212,175,55,${p.a})`
          : `rgba(200,210,255,${p.a * 0.45})`
        ctx.fill()
      }

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 80) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(212,175,55,${(1 - d / 80) * 0.06})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }
    draw()

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [canvasRef, scrollProgress])
}
