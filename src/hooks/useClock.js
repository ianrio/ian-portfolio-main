import { useEffect, useState } from 'react'

export default function useClock(suffix = 'LOCAL') {
  const [time, setTime] = useState(() => formatTime(suffix))

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(suffix)), 1000)
    return () => clearInterval(id)
  }, [suffix])

  return time
}

function formatTime(suffix) {
  const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return `${t} · ${suffix}`
}
