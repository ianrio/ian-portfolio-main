/**
 * Transición diagonal entre pantallas. Cada vez que `runId` cambia, el
 * componente se remonta (key = runId) y la animación se ejecuta desde cero.
 */
export default function Wipe({ runId }) {
  return (
    <div key={runId} id="wipe" className={runId > 0 ? 'go' : ''} aria-hidden="true">
      <div className="pane p3" />
      <div className="pane p2" />
      <div className="pane p1" />
      <div className="flash" />
    </div>
  )
}
