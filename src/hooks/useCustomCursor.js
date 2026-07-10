import { useEffect, useRef } from 'react'

/**
 * Cursor animado con sprite strip de 30 frames (48px cada uno).
 * Añade la clase .link cuando el ratón está sobre un elemento interactivo.
 */
export default function useCustomCursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cur = ref.current
    if (!cur) return
    document.body.classList.add('cursor-on')

    let x = -100
    let y = -100
    let frame = 0
    let last = 0
    let visible = false
    let raf = 0

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!visible) {
        cur.style.display = 'block'
        visible = true
      }
      const t = e.target
      const overLink =
        t.closest &&
        t.closest('a,button,.card,.menu-item,.back-hint,.contact-chip,#big-name')
      cur.classList.toggle('link', !!overLink)
    }
    const onLeave = () => {
      cur.style.display = 'none'
      visible = false
    }

    addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    const tick = (ts) => {
      if (ts - last >= 50) {
        frame = (frame + 1) % 30
        last = ts
        cur.style.backgroundPosition = `${-frame * 48}px 0`
      }
      cur.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.body.classList.remove('cursor-on')
    }
  }, [])

  return ref
}
