import { useMemo } from 'react'

/** Hash pseudo-aleatorio determinista: mismas letras -> misma variación cada visita. */
function hash(str) {
  let h = 9
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 387420489)
  return (h ^ (h >>> 9)) >>> 0
}

/**
 * Letras estilo nota de secuestro (Persona 5). Cada carácter recibe una rotación,
 * escala y desplazamiento vertical pseudo-aleatorios (pero estables) y de vez en
 * cuando una variante (recuadro negro, recuadro blanco o color rojo).
 */
export default function Ransom({ text }) {
  const chars = useMemo(() => {
    return [...text].map((c, i) => {
      const h = hash(text + i)
      const rot = (h % 17) - 8
      const scale = 0.86 + ((h >> 3) % 30) / 100
      const dy = ((h >> 5) % 9) - 4
      const transform = `rotate(${rot}deg) scale(${scale}) translateY(${dy}px)`
      const variantId = (h >> 7) % 10
      let variant = ''
      if (variantId === 0) variant = 'box'
      else if (variantId === 1) variant = 'boxw'
      else if (variantId === 2) variant = 'red'
      return { c, transform, variant, key: `${text}-${i}` }
    })
  }, [text])

  return (
    <span className="ransom">
      {chars.map(({ c, transform, variant, key }) => (
        <span
          key={key}
          className={`ch display${variant ? ` ${variant}` : ''}`}
          style={{ '--t': transform, transform }}
        >
          {c}
        </span>
      ))}
    </span>
  )
}
