import Ransom from '../Ransom'

const MENU_TARGETS = ['projects', 'skills', 'about', 'contact']
const MENU_LABELS = ['PROYECTOS', 'HABILIDADES', 'CONÓCEME', 'CONTACTO']

export default function Home({ active, menuIndex, onHover, onGo, onClickName }) {
  return (
    <section
      className={`screen${active ? ' active' : ''}`}
      id="screen-home"
      aria-label="Main menu"
    >
      <div id="intro-eyebrow">Desarrollador Full Stack</div>
      <h1 id="big-name" onClick={onClickName}>
        <Ransom text="IAn" />
        <Ransom text="Rio" />
      </h1>
      <p id="tagline">
      Soy un desarrollador web full-stack con 3 años de experiencia, especializado en tecnologías como JavaScript, SASS, PHP, Laravel y JQuery.
      <br></br>
          <br></br>
      Recomendación: Dejar este {' '}
          <a href="https://youtu.be/pbwljew1UbE?list=RDpbwljew1UbE" target="_blank" rel="noopener">
            video
          </a> de fondo mientras navegas por mi portfolio  
      </p>
      <nav id="menu" aria-label="Sections">
        {MENU_TARGETS.map((target, i) => (
          <button
            key={target}
            className={`menu-item${i === menuIndex ? ' sel' : ''}`}
            onMouseEnter={() => onHover(i)}
            onClick={() => onGo(target)}
          >
            <Ransom text={MENU_LABELS[i]} />
            <span className="cursor-mark">◀</span>
          </button>
        ))}
      </nav>
    </section>
  )
}
