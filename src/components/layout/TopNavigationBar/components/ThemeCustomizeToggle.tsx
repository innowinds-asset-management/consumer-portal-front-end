'use client'
import { useLayoutContext } from '@/context/useLayoutContext'
import { Settings } from 'lucide-react'
import { lazy, useState } from 'react'

const ThemeCustomizer = lazy(() => import('@/components/ThemeCustomizer'))

const ThemeCustomizerToggle = () => {
  const {
    themeCustomizer: { open, toggle },
  } = useLayoutContext()
  const [hasOpenedOnce, setHasOpenedOnce] = useState(open)

  const toggleThemeCustomizerOffcanvas = () => {
    if (!hasOpenedOnce) setHasOpenedOnce(true)
    toggle()
  }

  return (
    <>
      <div className="topbar-item d-none d-sm-flex">
        <button
          onClick={toggleThemeCustomizerOffcanvas}
          className="topbar-link"
          data-bs-toggle="offcanvas"
          data-bs-target="#theme-settings-offcanvas"
          type="button">
          <Settings className="fs-22" />
        </button>
      </div>
      {hasOpenedOnce && <ThemeCustomizer open={open} toggle={toggleThemeCustomizerOffcanvas} />}
    </>
  )
}

export default ThemeCustomizerToggle
