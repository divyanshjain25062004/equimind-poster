import { useEffect, useRef } from 'react'

export function useScrollProgress() {
  const progress = useRef(0)
  const section = useRef(0)

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      progress.current = maxScroll > 0 ? scrollY / maxScroll : 0
      section.current = Math.floor(progress.current * 12)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return { progress, section }
}
