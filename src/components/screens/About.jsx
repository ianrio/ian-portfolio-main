import { useState } from 'react'
import Ransom from '../Ransom'
import { asset } from '../../utils/asset'

export default function About({ active, onBack }) {
  const [photoOk, setPhotoOk] = useState(true)

  return (
    <section
      className={`screen sub align-right${active ? ' active' : ''}`}
      id="screen-about"
      aria-label="About"
    >
      <div className="screen-head"><Ransom text="CONÓCEME" /></div>
      <button className="back-hint" onClick={onBack}>ESC · Volver</button>

      <div className="paper">
        {photoOk && (
          <figure className="about-photo">
            <img
              src={asset('assets/me.jpg')}
              alt="Ian Río Oliva"
              onError={() => setPhotoOk(false)}
            />
            <figcaption>Ian · Córdoba</figcaption>
          </figure>
        )}
        <p className="quote">
          <em>"Invertir en ti mismo es invertir en el futuro"</em>. 
                  <br />
          Cómo{' '}
          <strong>desarrollador</strong> mi objetivo es cada día crecer más en el sector
          así cómo a nivel personal.
        </p>
        <p>
            Me he dedicado a formarme en distintas tecnologías hasta especializarme en el
            desarrollo web con <span className="stamp">WordPress</span>, utilizando
            herramientas como Sage, Laravel Blade, Carbon Fields, PHP, JavaScript y SCSS.
            Durante estos últimos años he trabajado desarrollando proyectos a medida.
        <br />
                <br />
            Puedes encontrar varios de mis trabajos en el portfolio, cómo por <a href="https://entusfogones.es/" target="_blank" rel="noopener">
            entusfogones.es
          </a>{' '}

          o indagar en mi perfil de{' '}
          <a href="https://github.com/ianrio" target="_blank" rel="noopener">
            GitHub
          </a>
          .
        </p>
        <br />
        <p>
          Fuera de la programación, soy una persona que le gusta mucho viajar, tanto dentro de España cómo 
          al extranjero, así cómo ir al gimnasio de manera asidua, considero que la voluntad de uno mismo para mejorarse es <span className="stamp">muy importante</span>
 
        </p>
      </div>

      <a
        className="cv-btn"
        href={asset('assets/cv/ian-cv.pdf')}
        download="ian-cv.pdf"
      >
        <span>⬇ Descargar mi CV (PDF)</span>
      </a>
    </section>
  )
}
