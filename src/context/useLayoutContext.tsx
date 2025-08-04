'use client'
import useLocalStorage from '@/hooks/useLocalStorage'
import useQueryParams from '@/hooks/useQueryParams'
import type {
  LayoutModeType,
  LayoutOffcanvasStatesType,
  LayoutOrientationType,
  LayoutState,
  LayoutType,
  MenuType,
  OffcanvasControlType,
  ThemeType,
  TopBarThemeType,
} from '@/types/context'
import { toggleDocumentAttribute } from '@/utils/layout'
import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react'
import { ChildrenType } from '../types/component-props'

const ThemeContext = createContext<LayoutType | undefined>(undefined)

const useLayoutContext = () => {
  const context = use(ThemeContext)
  if (!context) {
    throw new Error('useLayoutContext can only be used within LayoutProvider')
  }
  return context
}

// const getPreferredTheme = (): ThemeType => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const LayoutProvider = ({ children }: ChildrenType) => {
  const queryParams = useQueryParams()

  const override = !!(
    queryParams.layout_theme ||
    queryParams.topbar_theme ||
    queryParams.menu_theme ||
    queryParams.menu_size ||
    queryParams.layout_mode
  )

  const INIT_STATE: LayoutState = {
    theme: queryParams['layout_theme'] ? (queryParams['layout_theme'] as ThemeType) : 'light',
    layoutOrientation: queryParams['layout_type'] ? (queryParams['layout_type'] as LayoutOrientationType) : 'vertical',
    topbarTheme: queryParams['topbar_theme'] ? (queryParams['topbar_theme'] as TopBarThemeType) : 'brand',
    menu: {
      theme: queryParams['menu_theme'] ? (queryParams['menu_theme'] as MenuType['theme']) : 'light',
      size: queryParams['menu_size'] ? (queryParams['menu_size'] as MenuType['size']) : 'default',
    },
    layoutMode: queryParams['layout_mode'] ? (queryParams['layout_mode'] as LayoutModeType) : 'fluid',
  }

  const [settings, setSettings] = useLocalStorage<LayoutState>('__ABSTACK_NEXT_CONFIG__', INIT_STATE, override)
  const [offcanvasStates, setOffcanvasStates] = useState<LayoutOffcanvasStatesType>({
    showThemeCustomizer: false,
    showHorizontalMenu: false,
    // showActivityStream: false,
    showBackdrop: false,
  })

  // update settings
  const updateSettings = (_newSettings: Partial<LayoutState>) => setSettings({ ...settings, ..._newSettings })

  // update theme mode
  const changeTheme = (newTheme: ThemeType) => {
    updateSettings({ theme: newTheme })
  }

  // change topbar theme
  const changeTopbarTheme = (newTheme: TopBarThemeType) => {
    updateSettings({ topbarTheme: newTheme })
  }

  const changeLayoutMode = (newMode: LayoutModeType) => {
    updateSettings({ layoutMode: newMode })
  }

  const changeLayoutOrientation = (newOrientation: LayoutOrientationType) => {
    updateSettings({ layoutOrientation: newOrientation })
  }

  // change menu theme
  const changeMenuTheme = (newTheme: MenuType['theme']) => {
    updateSettings({ menu: { ...settings.menu, theme: newTheme } })
  }

  // change menu theme
  const changeMenuSize = (newSize: MenuType['size']) => {
    updateSettings({ menu: { ...settings.menu, size: newSize } })
  }

  // toggle theme customizer offcanvas
  const toggleThemeCustomizer: OffcanvasControlType['toggle'] = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showThemeCustomizer: !offcanvasStates.showThemeCustomizer,
    })
  }

  const toggleHorizontalMenu: OffcanvasControlType['toggle'] = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showHorizontalMenu: !offcanvasStates.showHorizontalMenu,
    })
  }

  const themeCustomizer: LayoutType['themeCustomizer'] = {
    open: offcanvasStates.showThemeCustomizer,
    toggle: toggleThemeCustomizer,
  }

  const horizontalMenu: LayoutType['horizontalMenu'] = {
    open: offcanvasStates.showHorizontalMenu,
    toggle: toggleHorizontalMenu,
  }

  // toggle backdrop
  const toggleBackdrop = useCallback(() => {
    const htmlTag = document.getElementsByTagName('html')[0]
    if (offcanvasStates.showBackdrop) htmlTag.classList.remove('sidebar-enable')
    else htmlTag.classList.add('sidebar-enable')
    setOffcanvasStates({
      ...offcanvasStates,
      showBackdrop: !offcanvasStates.showBackdrop,
    })
  }, [offcanvasStates.showBackdrop])

  useEffect(() => {
    toggleDocumentAttribute('data-bs-theme', settings.theme)
    toggleDocumentAttribute('data-topbar-color', settings.topbarTheme)
    toggleDocumentAttribute('data-menu-color', settings.menu.theme)
    toggleDocumentAttribute('data-sidenav-size', settings.menu.size)
    toggleDocumentAttribute('data-layout-mode', settings.layoutMode)
    return () => {
      toggleDocumentAttribute('data-bs-theme', settings.theme, true)
      toggleDocumentAttribute('data-topbar-color', settings.topbarTheme, true)
      toggleDocumentAttribute('data-sidenav-size', settings.menu.theme, true)
      toggleDocumentAttribute('data-layout-mode', settings.layoutMode, true)
    }
  }, [settings])

  const resetSettings = () => updateSettings(INIT_STATE)

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({
          ...settings,
          horizontalMenu,
          themeMode: settings.theme,
          changeTheme,
          changeLayoutMode,
          changeTopbarTheme,

          changeLayoutOrientation,

          changeMenu: {
            theme: changeMenuTheme,
            size: changeMenuSize,
          },
          themeCustomizer,
          toggleBackdrop,
          resetSettings,
        }),
        [settings, offcanvasStates],
      )}>
      {children}
      {offcanvasStates.showBackdrop && <div className="offcanvas-backdrop fade show" onClick={toggleBackdrop} />}
    </ThemeContext.Provider>
  )
}

export { LayoutProvider, useLayoutContext }
