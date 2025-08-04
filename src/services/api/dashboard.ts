import { http, apiUtils } from '../http'
import { API_CONFIG } from '@/utils/constants'
import { 
  DashboardStats, 
  ChartData, 
  User, 
  Notification,
  ApiResponse,
  PaginatedResponse 
} from '@/types/admin'

// Dashboard API service
export const dashboardService = {
  // Get dashboard statistics
  async getStats(): Promise<DashboardStats[]> {
    const response = await http.get<ApiResponse<DashboardStats[]>>(
      API_CONFIG.endpoints.dashboard.stats
    )
    return apiUtils.handleApiResponse<DashboardStats[]>(response)
  },

  // Get recent users
  async getRecentUsers(limit: number = 10): Promise<User[]> {
    const endpoint = apiUtils.addQueryParams(
      API_CONFIG.endpoints.dashboard.users,
      { limit }
    )
    const response = await http.get<ApiResponse<User[]>>(endpoint)
    return apiUtils.handleApiResponse<User[]>(response)
  },

  // Get chart data
  async getCharts(period: string = 'month'): Promise<ChartData> {
    const endpoint = apiUtils.addQueryParams(
      API_CONFIG.endpoints.dashboard.charts,
      { period }
    )
    const response = await http.get<ApiResponse<ChartData>>(endpoint)
    return apiUtils.handleApiResponse<ChartData>(response)
  },

  // Get notifications
  async getNotifications(): Promise<Notification[]> {
    const response = await http.get<ApiResponse<Notification[]>>(
      API_CONFIG.endpoints.dashboard.notifications
    )
    return apiUtils.handleApiResponse<Notification[]>(response)
  },

  // Get paginated users
  async getUsers(params: {
    page?: number
    limit?: number
    search?: string
    status?: string
    role?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  } = {}): Promise<PaginatedResponse<User>> {
    const endpoint = apiUtils.addQueryParams(
      API_CONFIG.endpoints.users.list,
      params
    )
    const response = await http.get<PaginatedResponse<User>>(endpoint)
    return response
  },

  // Get user analytics
  async getUserAnalytics(period: string = 'month'): Promise<{
    totalUsers: number
    activeUsers: number
    newUsers: number
    userGrowth: number
    topUsers: User[]
  }> {
    const endpoint = apiUtils.addQueryParams(
      '/dashboard/user-analytics',
      { period }
    )
    const response = await http.get<ApiResponse<{
      totalUsers: number
      activeUsers: number
      newUsers: number
      userGrowth: number
      topUsers: User[]
    }>>(endpoint)
    return apiUtils.handleApiResponse(response)
  },

  // Get revenue analytics
  async getRevenueAnalytics(period: string = 'month'): Promise<{
    totalRevenue: number
    revenueGrowth: number
    monthlyRevenue: number[]
    topProducts: Array<{
      name: string
      revenue: number
      sales: number
    }>
  }> {
    const endpoint = apiUtils.addQueryParams(
      '/dashboard/revenue-analytics',
      { period }
    )
    const response = await http.get<ApiResponse<{
      totalRevenue: number
      revenueGrowth: number
      monthlyRevenue: number[]
      topProducts: Array<{
        name: string
        revenue: number
        sales: number
      }>
    }>>(endpoint)
    return apiUtils.handleApiResponse(response)
  },

  // Get sales analytics
  async getSalesAnalytics(period: string = 'month'): Promise<{
    totalSales: number
    salesGrowth: number
    conversionRate: number
    averageOrderValue: number
    salesByCategory: Array<{
      category: string
      sales: number
      percentage: number
    }>
  }> {
    const endpoint = apiUtils.addQueryParams(
      '/dashboard/sales-analytics',
      { period }
    )
    const response = await http.get<ApiResponse<{
      totalSales: number
      salesGrowth: number
      conversionRate: number
      averageOrderValue: number
      salesByCategory: Array<{
        category: string
        sales: number
        percentage: number
      }>
    }>>(endpoint)
    return apiUtils.handleApiResponse(response)
  },

  // Get activity feed
  async getActivityFeed(limit: number = 20): Promise<Array<{
    id: string
    type: 'user_login' | 'user_register' | 'order_created' | 'payment_received'
    message: string
    timestamp: string
    user?: User
    metadata?: Record<string, any>
  }>> {
    const endpoint = apiUtils.addQueryParams(
      '/dashboard/activity-feed',
      { limit }
    )
    const response = await http.get<ApiResponse<Array<{
      id: string
      type: 'user_login' | 'user_register' | 'order_created' | 'payment_received'
      message: string
      timestamp: string
      user?: User
      metadata?: Record<string, any>
    }>>>(endpoint)
    return apiUtils.handleApiResponse(response)
  },

  // Get system health
  async getSystemHealth(): Promise<{
    status: 'healthy' | 'warning' | 'error'
    uptime: number
    memoryUsage: number
    cpuUsage: number
    diskUsage: number
    activeConnections: number
    lastBackup: string
  }> {
    const response = await http.get<ApiResponse<{
      status: 'healthy' | 'warning' | 'error'
      uptime: number
      memoryUsage: number
      cpuUsage: number
      diskUsage: number
      activeConnections: number
      lastBackup: string
    }>>('/dashboard/system-health')
    return apiUtils.handleApiResponse(response)
  },

  // Export dashboard data
  async exportData(type: 'users' | 'revenue' | 'sales', format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    const endpoint = apiUtils.addQueryParams(
      '/dashboard/export',
      { type, format }
    )
    return http.get<Blob>(endpoint, {
      headers: {
        'Accept': format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    })
  },
} 