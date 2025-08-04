'use client'
import { useLayoutContext } from '@/context/useLayoutContext'
import { Moon, Sun } from 'lucide-react'

const ThemeModeToggle = () => {
  const { theme, changeTheme } = useLayoutContext()
  const isDark = theme === 'dark'
  return (
    <div className="topbar-item d-none d-sm-flex">
      <button onClick={() => changeTheme(isDark ? 'light' : 'dark')} className="topbar-link" id="light-dark-mode" type="button">
        {isDark ? <Sun className="dark-mode-icon fs-22" /> : <Moon className="light-mode-icon fs-22" />}
      </button>
    </div>
  )
}

export default ThemeModeToggle
