/**
 * Devuelve la URL absoluta de un asset dentro de `public/`, teniendo en cuenta
 * el `base` configurado en vite.config.js.
 *
 *   En dev  (base "/")                      -> "/assets/menus/home.jpg"
 *   En prod (base "/ian-portfolio-main/")   -> "/ian-portfolio-main/assets/menus/home.jpg"
 *
 * Uso:
 *   asset('assets/menus/home.jpg')
 *   asset('/assets/cv/ian-cv.pdf')         // la barra inicial es opcional
 */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
