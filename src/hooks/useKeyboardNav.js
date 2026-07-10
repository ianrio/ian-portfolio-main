import { useEffect } from 'react'

/**
 * Bindings de teclado:
 *   Home: ArrowUp / ArrowDown selecciona en el menú, Enter confirma.
 *   Otras pantallas: Escape vuelve al home.
 */
export default function useKeyboardNav({
  screen,
  menuIndex,
  menuLength,
  onSelect,
  onConfirm,
  onBack,
}) {
  useEffect(() => {
    const handler = (e) => {
      if (screen === 'home') {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          onSelect((menuIndex + 1 + menuLength) % menuLength)
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          onSelect((menuIndex - 1 + menuLength) % menuLength)
        } else if (e.key === 'Enter') {
          e.preventDefault()
          onConfirm(menuIndex)
        }
      } else if (e.key === 'Escape') {
        onBack()
      }
    }
    addEventListener('keydown', handler)
    return () => removeEventListener('keydown', handler)
  }, [screen, menuIndex, menuLength, onSelect, onConfirm, onBack])
}
