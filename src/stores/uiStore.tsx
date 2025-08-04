'use client'
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Notification, ThemeMode, LayoutOrientation } from '@/types/admin'
import { STORAGE_KEYS } from '@/utils/constants'

// UI State interface
interface UIState {
  // Sidebar state
  sidebarCollapsed: boolean
  
  // Layout state
  layoutOrientation: LayoutOrientation
  
  // Theme state
  theme: ThemeMode
  
  // Notifications state
  notifications: Notification[]
  unreadCount: number
  showNotifications: boolean
  
  // Search state
  searchQuery: string
  showSearch: boolean
  
  // User menu state
  showUserMenu: boolean
  
  // Loading states
  loading: {
    sidebar: boolean
    notifications: boolean
    search: boolean
  }
  
  // Error states
  errors: {
    notifications: string | null
    search: string | null
  }
}

// Action types
type UIAction =
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR_COLLAPSED'; payload: boolean }
  | { type: 'SET_LAYOUT_ORIENTATION'; payload: LayoutOrientation }
  | { type: 'SET_THEME'; payload: ThemeMode }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'MARK_ALL_NOTIFICATIONS_READ' }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'TOGGLE_USER_MENU' }
  | { type: 'SET_LOADING'; payload: { key: keyof UIState['loading']; value: boolean } }
  | { type: 'SET_ERROR'; payload: { key: keyof UIState['errors']; value: string | null } }
  | { type: 'CLEAR_ERROR'; payload: keyof UIState['errors'] }

// Initial state
const initialState: UIState = {
  sidebarCollapsed: false,
  layoutOrientation: 'vertical',
  theme: 'light',
  notifications: [],
  unreadCount: 0,
  showNotifications: false,
  searchQuery: '',
  showSearch: false,
  showUserMenu: false,
  loading: {
    sidebar: false,
    notifications: false,
    search: false,
  },
  errors: {
    notifications: null,
    search: null,
  },
}

// Reducer function
function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      }
    
    case 'SET_SIDEBAR_COLLAPSED':
      return {
        ...state,
        sidebarCollapsed: action.payload,
      }
    
    case 'SET_LAYOUT_ORIENTATION':
      return {
        ...state,
        layoutOrientation: action.payload,
      }
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      }
    
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter(n => !n.read).length,
      }
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + (action.payload.read ? 0 : 1),
      }
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }
    
    case 'MARK_ALL_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true,
        })),
        unreadCount: 0,
      }
    
    case 'TOGGLE_NOTIFICATIONS':
      return {
        ...state,
        showNotifications: !state.showNotifications,
        showUserMenu: false, // Close user menu when opening notifications
      }
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      }
    
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        showSearch: !state.showSearch,
      }
    
    case 'TOGGLE_USER_MENU':
      return {
        ...state,
        showUserMenu: !state.showUserMenu,
        showNotifications: false, // Close notifications when opening user menu
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]: action.payload.value,
        },
      }
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload]: null,
        },
      }
    
    default:
      return state
  }
}

// Context interface
interface UIContextType extends UIState {
  // Sidebar actions
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  
  // Layout actions
  setLayoutOrientation: (orientation: LayoutOrientation) => void
  
  // Theme actions
  setTheme: (theme: ThemeMode) => void
  
  // Notification actions
  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  toggleNotifications: () => void
  
  // Search actions
  setSearchQuery: (query: string) => void
  toggleSearch: () => void
  
  // User menu actions
  toggleUserMenu: () => void
  
  // Loading actions
  setLoading: (key: keyof UIState['loading'], value: boolean) => void
  
  // Error actions
  setError: (key: keyof UIState['errors'], value: string | null) => void
  clearError: (key: keyof UIState['errors']) => void
}

// Create context
const UIContext = createContext<UIContextType | undefined>(undefined)

// Provider component
interface UIProviderProps {
  children: ReactNode
}

export function UIProvider({ children }: UIProviderProps) {
  const [state, dispatch] = useReducer(uiReducer, initialState)

  // Load UI preferences from localStorage on mount
  useEffect(() => {
    const sidebarCollapsed = localStorage.getItem(STORAGE_KEYS.sidebarCollapsed)
    const layoutOrientation = localStorage.getItem(STORAGE_KEYS.layoutOrientation)
    const theme = localStorage.getItem(STORAGE_KEYS.theme)

    if (sidebarCollapsed !== null) {
      dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: sidebarCollapsed === 'true' })
    }
    
    if (layoutOrientation) {
      dispatch({ type: 'SET_LAYOUT_ORIENTATION', payload: layoutOrientation as LayoutOrientation })
    }
    
    if (theme) {
      dispatch({ type: 'SET_THEME', payload: theme as ThemeMode })
    }
  }, [])

  // Save UI preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.sidebarCollapsed, state.sidebarCollapsed.toString())
  }, [state.sidebarCollapsed])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.layoutOrientation, state.layoutOrientation)
  }, [state.layoutOrientation])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, state.theme)
  }, [state.theme])

  // Action creators
  const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' })
  
  const setSidebarCollapsed = (collapsed: boolean) => 
    dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: collapsed })
  
  const setLayoutOrientation = (orientation: LayoutOrientation) => 
    dispatch({ type: 'SET_LAYOUT_ORIENTATION', payload: orientation })
  
  const setTheme = (theme: ThemeMode) => 
    dispatch({ type: 'SET_THEME', payload: theme })
  
  const setNotifications = (notifications: Notification[]) => 
    dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications })
  
  const addNotification = (notification: Notification) => 
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
  
  const markNotificationRead = (id: string) => 
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id })
  
  const markAllNotificationsRead = () => 
    dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' })
  
  const toggleNotifications = () => 
    dispatch({ type: 'TOGGLE_NOTIFICATIONS' })
  
  const setSearchQuery = (query: string) => 
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
  
  const toggleSearch = () => 
    dispatch({ type: 'TOGGLE_SEARCH' })
  
  const toggleUserMenu = () => 
    dispatch({ type: 'TOGGLE_USER_MENU' })
  
  const setLoading = (key: keyof UIState['loading'], value: boolean) => 
    dispatch({ type: 'SET_LOADING', payload: { key, value } })
  
  const setError = (key: keyof UIState['errors'], value: string | null) => 
    dispatch({ type: 'SET_ERROR', payload: { key, value } })
  
  const clearError = (key: keyof UIState['errors']) => 
    dispatch({ type: 'CLEAR_ERROR', payload: key })

  const value: UIContextType = {
    ...state,
    toggleSidebar,
    setSidebarCollapsed,
    setLayoutOrientation,
    setTheme,
    setNotifications,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    toggleNotifications,
    setSearchQuery,
    toggleSearch,
    toggleUserMenu,
    setLoading,
    setError,
    clearError,
  }

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

// Custom hook to use UI context
export function useUI() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
} 