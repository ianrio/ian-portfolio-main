import { useCallback, useEffect, useRef, useState } from 'react'
import Background from './components/Background'
import Slash from './components/Slash'
import HeroArt from './components/HeroArt'
import Wipe from './components/Wipe'
import Cursor from './components/Cursor'
import { HudTop, HudBottom } from './components/Hud'
import Home from './components/screens/Home'
import Projects from './components/screens/Projects'
import Skills from './components/screens/Skills'
import About from './components/screens/About'
import Contact from './components/screens/Contact'
import useKeyboardNav from './hooks/useKeyboardNav'
import useParallax from './hooks/useParallax'
import useSelectSound from './hooks/useSelectSound'

const MENU_TARGETS = ['projects', 'skills', 'about', 'contact']

export default function App() {
  const [screen, setScreen] = useState('home')
  const [menuIndex, setMenuIndex] = useState(0)
  const [wipeId, setWipeId] = useState(0)
  const transitioning = useRef(false)
  const [reposLoad, setReposLoad] = useState(false)

  const playSelect = useSelectSound()
  useParallax()

  useEffect(() => {
    document.body.dataset.screen = screen
    document.body.classList.add('loaded')
  }, [screen])

  const goTo = useCallback(
    (next) => {
      if (transitioning.current || next === screen) return
      transitioning.current = true
      playSelect()
      setWipeId((id) => id + 1)

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setScreen(next)
        if (next === 'projects') setReposLoad(true)
        transitioning.current = false
        return
      }

      setTimeout(() => {
        setScreen(next)
        if (next === 'projects') setReposLoad(true)
      }, 340)
      setTimeout(() => {
        transitioning.current = false
      }, 720)
    },
    [screen, playSelect],
  )

  const selectMenu = useCallback(
    (nextIndex) => {
      if (nextIndex !== menuIndex) playSelect()
      setMenuIndex(nextIndex)
    },
    [menuIndex, playSelect],
  )

  const confirmMenu = useCallback(
    (idx) => {
      goTo(MENU_TARGETS[idx])
    },
    [goTo],
  )

  const back = useCallback(() => goTo('home'), [goTo])

  const clickName = useCallback(() => {
    if (screen !== 'home') goTo('home')
    else playSelect()
  }, [screen, goTo, playSelect])

  useKeyboardNav({
    screen,
    menuIndex,
    menuLength: MENU_TARGETS.length,
    onSelect: selectMenu,
    onConfirm: confirmMenu,
    onBack: back,
  })

  return (
    <>
      <Background />
      <Slash />
      <HeroArt />
      <Wipe runId={wipeId} />
      <Cursor />

      <div id="shell">
        <HudTop tag="Portfolio // Ian Rio Oliva" subtitle="Córdoba · Desarrollador Web" />

        <div id="stage">
          <Home
            active={screen === 'home'}
            menuIndex={menuIndex}
            onHover={selectMenu}
            onGo={goTo}
            onClickName={clickName}
          />
          <Projects
            active={screen === 'projects'}
            onBack={back}
            load={reposLoad}
          />
          <Skills active={screen === 'skills'} onBack={back} />
          <About active={screen === 'about'} onBack={back} />
          <Contact
            active={screen === 'contact'}
            onBack={back}
            onSuccessSound={playSelect}
          />
        </div>

        <HudBottom clockSuffix="LOCAL" />
      </div>
    </>
  )
}
