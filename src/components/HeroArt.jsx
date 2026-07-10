import { useState } from 'react'
import { asset } from '../utils/asset'

/**
 * Arte suelto (personaje / retrato) que aparece en el home.
 * Si el archivo no existe, se elimina el nodo silenciosamente.
 */
export default function HeroArt() {
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return (
    <img
      id="hero-art"
      src={asset('assets/hero.png')}
      alt=""
      onError={() => setOk(false)}
    />
  )
}
