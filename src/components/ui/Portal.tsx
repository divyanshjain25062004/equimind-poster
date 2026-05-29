import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({ children }: { children: React.ReactNode }) {
  const el = useRef(document.createElement('div'))

  useEffect(() => {
    const root = document.getElementById('portal-root') || document.body
    root.appendChild(el.current)
    return () => { root.removeChild(el.current) }
  }, [])

  return createPortal(children, el.current)
}
