import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En dev el base es '/' (más cómodo).
// En build el base es '/ian-portfolio-main/' porque GitHub Pages sirve el sitio
// bajo esa subruta (https://ianrio.github.io/ian-portfolio-main/).
// Si renombras el repo, cambia también este valor.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/ian-portfolio-main/' : '/',
  server: {
    port: 5173,
    open: true,
  },
}))
