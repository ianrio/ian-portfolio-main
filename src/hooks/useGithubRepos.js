import { useEffect, useState } from 'react'
import { fallbackRepos } from '../data/model'

/**
 * Trae los repos públicos de un usuario de GitHub, filtrando forks y los que
 * ya se muestran como "featured". Si la API no responde, devuelve fallbackRepos.
 *
 * @param {string} username
 * @param {string[]} skipNames - nombres de repos a excluir del feed
 * @param {boolean} enabled - si es false, no se dispara el fetch todavía
 */
export default function useGithubRepos(username, skipNames = [], enabled = true) {
  const [repos, setRepos] = useState([])
  const [live, setLive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!enabled || loaded) return
    let cancelled = false
    const skip = new Set(skipNames)

    async function run() {
      setLoading(true)
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        )
        if (!res.ok) throw new Error(res.status)
        const data = await res.json()
        const filtered = data.filter((r) => !r.fork && !skip.has(r.name))
        if (!cancelled) {
          setRepos(filtered)
          setLive(true)
        }
      } catch {
        if (!cancelled) {
          setRepos(fallbackRepos.filter((r) => !skip.has(r.name)))
          setLive(false)
        }
      } finally {
        if (!cancelled) {
          setLoaded(true)
          setLoading(false)
        }
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [enabled, loaded, username, skipNames])

  return { repos, live, loaded, loading }
}
