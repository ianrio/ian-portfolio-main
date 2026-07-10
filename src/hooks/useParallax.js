import { useEffect } from 'react'

/**
 * Aplica parallax suave al fondo (rayas, halftone y arte de menú) siguiendo
 * el ratón. Se desactiva con prefers-reduced-motion.
 */
export default function useParallax() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const stripes = document.getElementById('bg-stripes')
    const halftone = document.getElementById('bg-halftone')
    if (!stripes || !halftone) return

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf = 0

    const onMove = (e) => {
      tx = e.clientX / innerWidth - 0.5
      ty = e.clientY / innerHeight - 0.5
    }
    addEventListener('mousemove', onMove, { passive: true })

    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      stripes.style.transform = `translate(${cx * 22}px, ${cy * 14}px)`
      halftone.style.transform = `translate(${cx * -34}px, ${cy * -22}px)`
      document.querySelectorAll('.menu-art').forEach((a) => {
        a.style.transform = `translate(${cx * 14}px, ${cy * 9}px) scale(1.04)`
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('mousemove', onMove)
    }
  }, [])
}
