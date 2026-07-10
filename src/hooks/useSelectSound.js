import { useCallback, useEffect, useRef, useState } from 'react'
import { asset } from '../utils/asset'

export default function useSelectSound(path = 'assets/sfx/select.mp3', volume = 0.45) {
  const audioRef = useRef(null)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    const a = new Audio(asset(path))
    a.preload = 'auto'
    a.volume = volume
    audioRef.current = a

    const unlock = () => setUnlocked(true)
    addEventListener('pointerdown', unlock, { once: true, capture: true })
    addEventListener('keydown', unlock, { once: true, capture: true })

    return () => {
      removeEventListener('pointerdown', unlock, { capture: true })
      removeEventListener('keydown', unlock, { capture: true })
    }
  }, [path, volume])

  const play = useCallback(() => {
    if (!unlocked) return
    const a = audioRef.current
    if (!a) return
    try {
      a.currentTime = 0
      const p = a.play()
      if (p && p.catch) p.catch(() => {})
    } catch {
      /* no-op */
    }
  }, [unlocked])

  return play
}
