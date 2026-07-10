/* =============================================================
   MODEL — datos y configuración del portfolio.
   Edita este archivo para cambiar proyectos, skills y perfil.
   ============================================================= */

export const githubUser = 'ianrio'

export const contactEmail = 'ian373@hotmail.com'

export const featured = [
  {
    title: 'Portfolio de Persona 5',
    tag: 'Live web',
    color: '#3dff6e',
    live: true,
    url: 'https://ejemplo.com',
    cta: 'Ver web →',
    img: '/assets/projects/placeholder1.png',
    desc: 'Proyecto en React para hacer un portfolio estilizado a lo Persona 5',
  },
  {
    title: 'Proyecto Destacado Dos',
    tag: 'Live App',
    color: '#00e6c4',
    url: 'https://github.com/tu-usuario/proyecto-dos',
    cta: 'Ver en GitHub →',
    img: '/assets/projects/placeholder2.png',
    desc: 'Descripción del segundo proyecto destacado.',
  },
  {
    title: 'Proyecto Destacado Tres',
    tag: 'Live App',
    color: '#f1e05a',
    url: 'https://github.com/tu-usuario/proyecto-tres',
    cta: 'Ver en GitHub →',
    img: '/assets/projects/placeholder3.png',
    desc: 'Descripción del tercer proyecto destacado.',
  },
  {
    title: 'Proyecto Destacado Cuatro',
    tag: 'Live App',
    color: '#3178c6',
    url: 'https://github.com/tu-usuario/proyecto-cuatro',
    cta: 'Ver en GitHub →',
    img: '/assets/projects/placeholder4.png',
    desc: 'Descripción del cuarto proyecto destacado.',
  },
]

// Repos que ya aparecen en "featured" y que se ocultarán del feed automático
// (para que no salgan dos veces).
export const featuredRepoNames = [
  // 'nombre-exacto-del-repo-en-github',
]

// Repos públicos que NO quieres mostrar en el grid de "Todos los repositorios":
// Los nombres deben coincidir EXACTAMENTE con el nombre del repo en GitHub.
export const excludedRepos = [
  // 'prueba-acciparte1',
  // 'prueba-acciparte2',
  // 'ejercicio-slice',
  // 'pruebago',
  // 'cursotest',
  // 'ob-curso-git',
  // 'floppyproject',
  // 'dice',
  // 'card',
  // 'cover-css',
]

// Se muestra si la API de GitHub no responde (rate-limit, offline, etc.)
export const fallbackRepos = [
  {
    name: 'Repositorio Persona 5 Portfolio',
    language: 'JS/React',
    stargazers_count: 0,
    html_url: 'https://github.com/eduperz05/lucid-lynx',
    description: 'Repositorio del portfolio',
  },
  {
    name: 'ejemplo-repo-dos',
    language: 'Python',
    stargazers_count: 0,
    html_url: 'https://github.com/tu-usuario/ejemplo-repo-dos',
    description: 'Otro repo de ejemplo para cuando el fetch falla.',
  },
]

// Sobrescribir la miniatura de un repo específico.
// Si no está aquí, se buscará automáticamente en /assets/projects/<NombreRepo>.png
export const projectImages = {
  // 'nombre-repo': '/assets/projects/imagen.png',
}

export const langColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  PHP: '#4F5D95',
  CSS: '#663399',
  HTML: '#e34c26',
  'Jupyter Notebook': '#DA5B0B',
  MATLAB: '#e16737',
  Java: '#b07219',
  C: '#555',
  'C++': '#f34b7d',
  Rust: '#dea584',
  Go: '#00ADD8',
}

export const skills = [
  {
    group: 'Frontend',
    items: [
      ['HTML', 100],
      ['CSS', 100],
      ['JavaScript', 70],            
      ['React', 40],
    ],
  },
  {
    group: 'Backend',
    items: [
      ['PHP', 75],
      ['SQL', 40],
    ],
  },
  {
    group: 'Herramientas & DevOps',
    items: [
      ['Git · GitHub', 70],
      ['Linux · Bash', 75],
      ['CI/CD', 60],
    ],
  },
  {
    group: 'Idiomas',
    items: [
      ['Español (nativo)', 100],
      ['Inglés (fluido)', 90],
    ],
  },
]
