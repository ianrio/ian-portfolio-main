import Ransom from '../Ransom'
import { featured, featuredRepoNames, githubUser, langColors, projectImages } from '../../data/model'
import useGithubRepos from '../../hooks/useGithubRepos'

function hash(str) {
  let h = 9
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 387420489)
  return (h ^ (h >>> 9)) >>> 0
}

function splitTitle(title) {
  const first = title.split(' ')[0]
  return (
    <>
      <em>{first}</em>
      {title.slice(first.length)}
    </>
  )
}

function Thumb({ src }) {
  return (
    <div className="thumb">
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={(e) => e.currentTarget.closest('.thumb')?.remove()}
      />
    </div>
  )
}

function FeaturedCard({ item, index }) {
  const tilt = ((hash(item.title) % 5) - 2) * 0.8 + 'deg'
  const style = { '--tilt': tilt, '--d': `${index * 70}ms`, '--lc': item.color }
  return (
    <a className="card feat" href={item.url} target="_blank" rel="noopener" style={style}>
      <Thumb src={item.img} />
      <span className="lang" style={{ '--lc': item.color }}>{item.tag}</span>
      <h3>
        {item.live ? <span className="live-dot" /> : null}
        {splitTitle(item.title)}
      </h3>
      <p>{item.desc}</p>
      <div className="meta">
        <span>{item.live ? 'En Línea' : 'HIGHLIGHT'}</span>
        <span className="go">{item.cta}</span>
      </div>
    </a>
  )
}

function RepoCard({ repo, index }) {
  const tilt = ((hash(repo.name) % 5) - 2) * 0.8 + 'deg'
  const lc = langColors[repo.language] || '#e60012'
  const style = { '--tilt': tilt, '--d': `${index * 70}ms`, '--lc': lc }
  const pretty = repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const img = projectImages[repo.name] || `/assets/projects/${repo.name}.png`
  return (
    <a className="card" href={repo.html_url} target="_blank" rel="noopener" style={style}>
      <Thumb src={img} />
      <span className="lang">{repo.language || 'Repo'}</span>
      <h3>{splitTitle(pretty)}</h3>
      <p>{repo.description || 'Sin descripción, pero el código habla por sí mismo.'}</p>
      <div className="meta">
        <span>★ {repo.stargazers_count || 0}</span>
        <span className="go">Ver en GitHub →</span>
      </div>
    </a>
  )
}

export default function Projects({ active, onBack, load }) {
  const { repos, live, loaded } = useGithubRepos(githubUser, featuredRepoNames, load)

  let status = 'Contactando con GitHub…'
  if (loaded) {
    status = live
      ? `${repos.length} repositorios · en directo desde GitHub`
      : 'Mostrando trabajo destacado · la API de GitHub no responde ahora mismo'
  }

  return (
    <section
      className={`screen sub${active ? ' active' : ''}`}
      id="screen-projects"
      aria-label="Projects"
    >
      <div className="screen-head"><Ransom text="PROYECTOS" /></div>
      <button className="back-hint" onClick={onBack}>ESC · Volver</button>

      <div className="grid-label">
        <span className="bar" />Destacados
      </div>
      <div id="feat-grid" className="grid">
        {featured.map((f, i) => <FeaturedCard key={f.title} item={f} index={i} />)}
      </div>

      <div className="grid-label">
        <span className="bar" />Todos los repositorios
      </div>
      <div id="repo-status">{status}</div>
      <div id="repo-grid" className="grid">
        {repos.map((r, i) => <RepoCard key={r.name} repo={r} index={i} />)}
      </div>
    </section>
  )
}
