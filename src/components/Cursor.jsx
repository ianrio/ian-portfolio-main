import useCustomCursor from '../hooks/useCustomCursor'

export default function Cursor() {
  const ref = useCustomCursor()
  return <div id="cursor" ref={ref} aria-hidden="true" />
}
