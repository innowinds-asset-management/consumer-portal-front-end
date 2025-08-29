import { API_URL } from '@/config/environment'
import httpClient from '@/services/http'
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
    try {
      const response = await httpClient.get<ApiResponse<DashboardStats[]>>('/dashboard/stats')
      return response.data.data
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  },

  // Get recent users
  async getRecentUsers(limit: number = 10): Promise<User[]> {
    try {
      const response = await httpClient.get<ApiResponse<User[]>>(`/dashboard/users?limit=${limit}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching recent users:', error)
      throw error
    }
  },

  // Get chart data
  async getCharts(period: string = 'month'): Promise<ChartData> {
    try {
      const response = await httpClient.get<ApiResponse<ChartData>>(`/dashboard/charts?period=${period}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching chart data:', error)
      throw error
    }
  },

  // Get notifications
  async getNotifications(): Promise<Notification[]> {
    try {
      const response = await httpClient.get<ApiResponse<Notification[]>>('/dashboard/notifications')
      return response.data.data
    } catch (error) {
      console.error('Error fetching notifications:', error)
      throw error
    }
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
    try {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.limit) queryParams.append('limit', params.limit.toString())
      if (params.search) queryParams.append('search', params.search)
      if (params.status) queryParams.append('status', params.status)
      if (params.role) queryParams.append('role', params.role)
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
      
      const endpoint = `/users?${queryParams.toString()}`
      const response = await httpClient.get<PaginatedResponse<User>>(endpoint)
      return response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  // Get user analytics
  async getUserAnalytics(period: string = 'month'): Promise<{
    totalUsers: number
    activeUsers: number
    newUsers: number
    userGrowth: number
    topUsers: User[]
  }> {
    try {
      const response = await httpClient.get<ApiResponse<{
        totalUsers: number
        activeUsers: number
        newUsers: number
        userGrowth: number
        topUsers: User[]
      }>>(`/dashboard/user-analytics?period=${period}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching user analytics:', error)
      throw error
    }
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
    try {
      const response = await httpClient.get<ApiResponse<{
        totalRevenue: number
        revenueGrowth: number
        monthlyRevenue: number[]
        topProducts: Array<{
          name: string
          revenue: number
          sales: number
        }>
      }>>(`/dashboard/revenue-analytics?period=${period}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching revenue analytics:', error)
      throw error
    }
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
    try {
      const response = await httpClient.get<ApiResponse<{
        totalSales: number
        salesGrowth: number
        conversionRate: number
        averageOrderValue: number
        salesByCategory: Array<{
          category: string
          sales: number
          percentage: number
        }>
      }>>(`/dashboard/sales-analytics?period=${period}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching sales analytics:', error)
      throw error
    }
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
    try {
      const response = await httpClient.get<ApiResponse<Array<{
        id: string
        type: 'user_login' | 'user_register' | 'order_created' | 'payment_received'
        message: string
        timestamp: string
        user?: User
        metadata?: Record<string, any>
      }>>>(`/dashboard/activity-feed?limit=${limit}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching activity feed:', error)
      throw error
    }
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
    try {
      const response = await httpClient.get<ApiResponse<{
        status: 'healthy' | 'warning' | 'error'
        uptime: number
        memoryUsage: number
        cpuUsage: number
        diskUsage: number
        activeConnections: number
        lastBackup: string
      }>>('/dashboard/system-health')
      return response.data.data
    } catch (error) {
      console.error('Error fetching system health:', error)
      throw error
    }
  },

  // Export dashboard data
  async exportData(type: 'users' | 'revenue' | 'sales', format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    try {
      const response = await httpClient.get<Blob>(`/dashboard/export?type=${type}&format=${format}`, {
        headers: {
          'Accept': format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error exporting data:', error)
      throw error
    }
  },
} 