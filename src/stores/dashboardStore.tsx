'use client'
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { DashboardStats, ChartData, User, Notification } from '@/types/admin'
import { dashboardService } from '@/services/api/dashboard'

// Dashboard State interface
interface DashboardState {
  // Statistics
  stats: DashboardStats[]
  
  // Charts
  charts: {
    revenue: ChartData | null
    sales: ChartData | null
    users: ChartData | null
  }
  
  // Recent data
  recentUsers: User[]
  
  // Notifications
  notifications: Notification[]
  
  // Analytics
  analytics: {
    userAnalytics: {
      totalUsers: number
      activeUsers: number
      newUsers: number
      userGrowth: number
      topUsers: User[]
    } | null
    revenueAnalytics: {
      totalRevenue: number
      revenueGrowth: number
      monthlyRevenue: number[]
      topProducts: Array<{
        name: string
        revenue: number
        sales: number
      }>
    } | null
    salesAnalytics: {
      totalSales: number
      salesGrowth: number
      conversionRate: number
      averageOrderValue: number
      salesByCategory: Array<{
        category: string
        sales: number
        percentage: number
      }>
    } | null
  }
  
  // Activity feed
  activityFeed: Array<{
    id: string
    type: 'user_login' | 'user_register' | 'order_created' | 'payment_received'
    message: string
    timestamp: string
    user?: User
    metadata?: Record<string, any>
  }>
  
  // System health
  systemHealth: {
    status: 'healthy' | 'warning' | 'error'
    uptime: number
    memoryUsage: number
    cpuUsage: number
    diskUsage: number
    activeConnections: number
    lastBackup: string
  } | null
  
  // Loading states
  loading: {
    stats: boolean
    charts: boolean
    users: boolean
    notifications: boolean
    analytics: boolean
    activityFeed: boolean
    systemHealth: boolean
  }
  
  // Error states
  errors: {
    stats: string | null
    charts: string | null
    users: string | null
    notifications: string | null
    analytics: string | null
    activityFeed: string | null
    systemHealth: string | null
  }
  
  // Filters and settings
  filters: {
    period: string
    dateRange: {
      start: string
      end: string
    } | null
  }
}

// Action types
type DashboardAction =
  | { type: 'SET_STATS'; payload: DashboardStats[] }
  | { type: 'SET_CHART'; payload: { type: keyof DashboardState['charts']; data: ChartData } }
  | { type: 'SET_RECENT_USERS'; payload: User[] }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'SET_USER_ANALYTICS'; payload: DashboardState['analytics']['userAnalytics'] }
  | { type: 'SET_REVENUE_ANALYTICS'; payload: DashboardState['analytics']['revenueAnalytics'] }
  | { type: 'SET_SALES_ANALYTICS'; payload: DashboardState['analytics']['salesAnalytics'] }
  | { type: 'SET_ACTIVITY_FEED'; payload: DashboardState['activityFeed'] }
  | { type: 'SET_SYSTEM_HEALTH'; payload: DashboardState['systemHealth'] }
  | { type: 'SET_LOADING'; payload: { key: keyof DashboardState['loading']; value: boolean } }
  | { type: 'SET_ERROR'; payload: { key: keyof DashboardState['errors']; value: string | null } }
  | { type: 'CLEAR_ERROR'; payload: keyof DashboardState['errors'] }
  | { type: 'SET_FILTERS'; payload: Partial<DashboardState['filters']> }
  | { type: 'RESET_DASHBOARD' }

// Initial state
const initialState: DashboardState = {
  stats: [],
  charts: {
    revenue: null,
    sales: null,
    users: null,
  },
  recentUsers: [],
  notifications: [],
  analytics: {
    userAnalytics: null,
    revenueAnalytics: null,
    salesAnalytics: null,
  },
  activityFeed: [],
  systemHealth: null,
  loading: {
    stats: false,
    charts: false,
    users: false,
    notifications: false,
    analytics: false,
    activityFeed: false,
    systemHealth: false,
  },
  errors: {
    stats: null,
    charts: null,
    users: null,
    notifications: null,
    analytics: null,
    activityFeed: null,
    systemHealth: null,
  },
  filters: {
    period: 'month',
    dateRange: null,
  },
}

// Reducer function
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_STATS':
      return {
        ...state,
        stats: action.payload,
      }
    
    case 'SET_CHART':
      return {
        ...state,
        charts: {
          ...state.charts,
          [action.payload.type]: action.payload.data,
        },
      }
    
    case 'SET_RECENT_USERS':
      return {
        ...state,
        recentUsers: action.payload,
      }
    
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      }
    
    case 'SET_USER_ANALYTICS':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          userAnalytics: action.payload,
        },
      }
    
    case 'SET_REVENUE_ANALYTICS':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          revenueAnalytics: action.payload,
        },
      }
    
    case 'SET_SALES_ANALYTICS':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          salesAnalytics: action.payload,
        },
      }
    
    case 'SET_ACTIVITY_FEED':
      return {
        ...state,
        activityFeed: action.payload,
      }
    
    case 'SET_SYSTEM_HEALTH':
      return {
        ...state,
        systemHealth: action.payload,
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
    
    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      }
    
    case 'RESET_DASHBOARD':
      return initialState
    
    default:
      return state
  }
}

// Context interface
interface DashboardContextType extends DashboardState {
  // Data fetching actions
  fetchStats: () => Promise<void>
  fetchCharts: (period?: string) => Promise<void>
  fetchRecentUsers: (limit?: number) => Promise<void>
  fetchNotifications: () => Promise<void>
  fetchUserAnalytics: (period?: string) => Promise<void>
  fetchRevenueAnalytics: (period?: string) => Promise<void>
  fetchSalesAnalytics: (period?: string) => Promise<void>
  fetchActivityFeed: (limit?: number) => Promise<void>
  fetchSystemHealth: () => Promise<void>
  
  // Utility actions
  refreshDashboard: () => Promise<void>
  setFilters: (filters: Partial<DashboardState['filters']>) => void
  clearError: (key: keyof DashboardState['errors']) => void
  resetDashboard: () => void
}

// Create context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

// Provider component
interface DashboardProviderProps {
  children: ReactNode
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  // Action creators
  const setLoading = (key: keyof DashboardState['loading'], value: boolean) => 
    dispatch({ type: 'SET_LOADING', payload: { key, value } })
  
  const setError = (key: keyof DashboardState['errors'], value: string | null) => 
    dispatch({ type: 'SET_ERROR', payload: { key, value } })

  // Fetch statistics
  const fetchStats = async () => {
    try {
      setLoading('stats', true)
      setError('stats', null)
      
      const stats = await dashboardService.getStats()
      dispatch({ type: 'SET_STATS', payload: stats })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch stats'
      setError('stats', errorMessage)
    } finally {
      setLoading('stats', false)
    }
  }

  // Fetch charts
  const fetchCharts = async (period: string = state.filters.period) => {
    try {
      setLoading('charts', true)
      setError('charts', null)
      
      const chartData = await dashboardService.getCharts(period)
      dispatch({ type: 'SET_CHART', payload: { type: 'revenue', data: chartData } })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch charts'
      setError('charts', errorMessage)
    } finally {
      setLoading('charts', false)
    }
  }

  // Fetch recent users
  const fetchRecentUsers = async (limit: number = 10) => {
    try {
      setLoading('users', true)
      setError('users', null)
      
      const users = await dashboardService.getRecentUsers(limit)
      dispatch({ type: 'SET_RECENT_USERS', payload: users })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users'
      setError('users', errorMessage)
    } finally {
      setLoading('users', false)
    }
  }

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading('notifications', true)
      setError('notifications', null)
      
      const notifications = await dashboardService.getNotifications()
      dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch notifications'
      setError('notifications', errorMessage)
    } finally {
      setLoading('notifications', false)
    }
  }

  // Fetch user analytics
  const fetchUserAnalytics = async (period: string = state.filters.period) => {
    try {
      setLoading('analytics', true)
      setError('analytics', null)
      
      const analytics = await dashboardService.getUserAnalytics(period)
      dispatch({ type: 'SET_USER_ANALYTICS', payload: analytics })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user analytics'
      setError('analytics', errorMessage)
    } finally {
      setLoading('analytics', false)
    }
  }

  // Fetch revenue analytics
  const fetchRevenueAnalytics = async (period: string = state.filters.period) => {
    try {
      setLoading('analytics', true)
      setError('analytics', null)
      
      const analytics = await dashboardService.getRevenueAnalytics(period)
      dispatch({ type: 'SET_REVENUE_ANALYTICS', payload: analytics })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch revenue analytics'
      setError('analytics', errorMessage)
    } finally {
      setLoading('analytics', false)
    }
  }

  // Fetch sales analytics
  const fetchSalesAnalytics = async (period: string = state.filters.period) => {
    try {
      setLoading('analytics', true)
      setError('analytics', null)
      
      const analytics = await dashboardService.getSalesAnalytics(period)
      dispatch({ type: 'SET_SALES_ANALYTICS', payload: analytics })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch sales analytics'
      setError('analytics', errorMessage)
    } finally {
      setLoading('analytics', false)
    }
  }

  // Fetch activity feed
  const fetchActivityFeed = async (limit: number = 20) => {
    try {
      setLoading('activityFeed', true)
      setError('activityFeed', null)
      
      const feed = await dashboardService.getActivityFeed(limit)
      dispatch({ type: 'SET_ACTIVITY_FEED', payload: feed })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch activity feed'
      setError('activityFeed', errorMessage)
    } finally {
      setLoading('activityFeed', false)
    }
  }

  // Fetch system health
  const fetchSystemHealth = async () => {
    try {
      setLoading('systemHealth', true)
      setError('systemHealth', null)
      
      const health = await dashboardService.getSystemHealth()
      dispatch({ type: 'SET_SYSTEM_HEALTH', payload: health })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch system health'
      setError('systemHealth', errorMessage)
    } finally {
      setLoading('systemHealth', false)
    }
  }

  // Refresh all dashboard data
  const refreshDashboard = async () => {
    await Promise.all([
      fetchStats(),
      fetchCharts(),
      fetchRecentUsers(),
      fetchNotifications(),
      fetchUserAnalytics(),
      fetchRevenueAnalytics(),
      fetchSalesAnalytics(),
      fetchActivityFeed(),
      fetchSystemHealth(),
    ])
  }

  // Set filters
  const setFilters = (filters: Partial<DashboardState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters })
  }

  // Clear error
  const clearError = (key: keyof DashboardState['errors']) => {
    dispatch({ type: 'CLEAR_ERROR', payload: key })
  }

  // Reset dashboard
  const resetDashboard = () => {
    dispatch({ type: 'RESET_DASHBOARD' })
  }

  // Load initial data on mount
  useEffect(() => {
    refreshDashboard()
  }, [])

  const value: DashboardContextType = {
    ...state,
    fetchStats,
    fetchCharts,
    fetchRecentUsers,
    fetchNotifications,
    fetchUserAnalytics,
    fetchRevenueAnalytics,
    fetchSalesAnalytics,
    fetchActivityFeed,
    fetchSystemHealth,
    refreshDashboard,
    setFilters,
    clearError,
    resetDashboard,
  }

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

// Custom hook to use dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
} 