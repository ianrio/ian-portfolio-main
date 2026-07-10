# Ian Portfolio

Portfolio personal estilo Persona 5, construido con **React + Vite**.

## Estructura

```
ian-portfolio-main/
├── index.html              Entry HTML (carga fuentes de Google y monta React)
├── vite.config.js          Configuración de Vite
├── public/
│   └── assets/             Estáticos: menús, cursores, sfx, CV, foto
├── src/
│   ├── main.jsx            Punto de entrada
│   ├── App.jsx             Estado de pantalla + navegación
│   ├── styles.css          Estilos globales
│   ├── data/
│   │   └── model.js        DATOS: featured, fallback repos, skills, colores
│   ├── hooks/
│   │   ├── useClock.js         Reloj HUD
│   │   ├── useCustomCursor.js  Cursor animado sprite-strip
│   │   ├── useGithubRepos.js   Fetch a GitHub con fallback local
│   │   ├── useKeyboardNav.js   Teclado ↑ ↓ Enter Esc
│   │   ├── useParallax.js      Parallax de fondo con el ratón
│   │   └── useSelectSound.js   Audio del menú
│   └── components/
│       ├── Background.jsx      Capas de fondo + arte por pantalla
│       ├── Cursor.jsx          Cursor animado
│       ├── HeroArt.jsx         Retrato / arte del home
│       ├── Hud.jsx             HUD superior e inferior
│       ├── Ransom.jsx          Letras estilo "nota de secuestro"
│       ├── Slash.jsx           Diagonal negra del home
│       ├── Wipe.jsx            Transición diagonal entre pantallas
│       └── screens/
│           ├── Home.jsx
│           ├── Projects.jsx
│           ├── Skills.jsx
│           ├── About.jsx
│           └── Contact.jsx
```
## Detalles

Basado en el proyecto original de Meraj Rahman
(`persona5-style-portfolio-main`), traducida a componentes React y hooks junto a cambios adicionales en estructura, contenidos y diseños.

Todos los derechos a Atlus

## Requisitos

- Node.js 18 o superior
- npm

## Cómo arrancar

```bash
npm install
npm run dev
```

Vite abrirá el navegador automáticamente en http://localhost:5173

## Cómo compilar para producción

```bash
npm run build
npm run preview
```

Los archivos estáticos quedan en `dist/`. Se pueden subir a GitHub Pages,
Vercel, Netlify o cualquier hosting estático.

## Dónde editar el contenido

- **Textos del home / about / contact:** `src/components/screens/*.jsx`
- **Proyectos destacados y skills:** `src/data/model.js`
- **Usuario de GitHub para el feed automático:** `src/data/model.js` → `githubUser`
- **Email del formulario:** `src/data/model.js` → `contactEmail`
- **Colores del tema:** variables CSS al principio de `src/styles.css`
- **Imágenes de menús / cursores / CV:** `public/assets/`

## Controles

- ↑ / ↓ : mover selección en el menú
- Enter : entrar en la sección seleccionada
- Esc : volver al home
- Click en el nombre grande : volver al home
