import { useEffect, useRef } from 'react'
import Ransom from '../Ransom'
import { skills } from '../../data/model'

export default function Skills({ active, onBack }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const fills = bodyRef.current?.querySelectorAll('.fill') ?? []
    fills.forEach((f) => { f.style.width = '0' })
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        fills.forEach((f, i) =>
          setTimeout(() => {
            f.style.width = `${f.dataset.v}%`
          }, i * 60),
        )
      }),
    )
  }, [active])

  return (
    <section
      className={`screen sub${active ? ' active' : ''}`}
      id="screen-skills"
      aria-label="Skills"
    >
      <div className="screen-head"><Ransom text="Habilidades" /></div>
      <button className="back-hint" onClick={onBack}>ESC · Volver</button>

      <div id="skills-body" ref={bodyRef}>
        {skills.map((g) => (
          <div className="skill-group" key={g.group}>
            <h3>{g.group}</h3>
            {g.items.map(([name, value]) => (
              <div className="skill-row" key={name}>
                <span className="name">{name}</span>
                <div className="skill-bar">
                  <div className="fill" data-v={value} />
                </div>
                <span className="lv">{value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
