import { useEffect, useState } from 'react'

const menus = ['home', 'projects', 'skills', 'about', 'contact']

/**
 * Fondo con todas las capas: rayas rojas, halftone, viñeta, estrellas rotando y el arte por pantalla.
 */
export default function Background() {
  const [loadedArts, setLoadedArts] = useState({})

  useEffect(() => {
    Object.entries(loadedArts).forEach(([name, ok]) => {
      document.body.classList.toggle(`has-art-${name}`, !!ok)
    })
    return () => {
      Object.keys(loadedArts).forEach((name) => {
        document.body.classList.remove(`has-art-${name}`)
      })
    }
  }, [loadedArts])

  return (
    <div id="bg" aria-hidden="true">
      <div className="bg-layer" id="bg-stripes" />
      <svg
        className="bg-star"
        style={{ left: '6%', top: '8%', width: '26vmax', height: '26vmax' }}
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,0 60,35 98,35 68,57 78,94 50,72 22,94 32,57 2,35 40,35"
          fill="#000"
        />
      </svg>
      <svg
        className="bg-star s2"
        style={{ right: '4%', bottom: '6%', width: '34vmax', height: '34vmax' }}
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,0 60,35 98,35 68,57 78,94 50,72 22,94 32,57 2,35 40,35"
          fill="#fff"
        />
      </svg>

      {menus.map((name) => (
        <img
          key={name}
          className="menu-art"
          id={`art-${name}`}
          src={`/assets/menus/${name}.jpg`}
          alt=""
          onLoad={() => setLoadedArts((p) => ({ ...p, [name]: true }))}
          onError={(e) => {
            e.currentTarget.remove()
            setLoadedArts((p) => ({ ...p, [name]: false }))
          }}
        />
      ))}

      <div className="bg-layer" id="bg-halftone" />
      <div className="bg-layer" id="bg-vignette" />
    </div>
  )
}
