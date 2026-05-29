import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', move)
    raf.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: 5, height: 5,
        borderRadius: '50%', background: 'rgba(212,175,55,0.95)',
        pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, width: 28, height: 28,
        borderRadius: '50%', border: '0.5px solid rgba(212,175,55,0.4)',
        pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
      }} />
    </>
  )
}
