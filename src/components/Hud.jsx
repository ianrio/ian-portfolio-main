import useClock from '../hooks/useClock'

export function HudTop({ tag = 'Portfolio // Tu Nombre', subtitle = 'Tu ciudad · Tu rol' }) {
  return (
    <div id="hud-top">
      <div className="hud-tag">{tag}</div>
      <div className="hud-tag alt">{subtitle}</div>
    </div>
  )
}

export function HudBottom({ clockSuffix = 'LOCAL' }) {
  const clock = useClock(clockSuffix)
  return (
    <div id="hud-bottom">
      <span>
        <span className="key">↑↓</span>Seleccionar
      </span>
      <span>
        <span className="key">Enter</span>Confirmar
      </span>
      <span>
        <span className="key">Esc</span>Volver
      </span>
      <span style={{ marginLeft: 'auto', opacity: 0.8 }} id="clock">
        {clock}
      </span>
    </div>
  )
}
