// Admin Panel Core Types
export type UserRole = 'admin' | 'manager' | 'user' | 'guest'
export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended'
export type NotificationType = 'info' | 'success' | 'warning' | 'error'
export type LayoutOrientation = 'vertical' | 'horizontal'
export type ThemeMode = 'light' | 'dark' | 'auto'

// User Management
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: ThemeMode
  language: string
  timezone: string
  notifications: NotificationSettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  frequency: 'immediate' | 'daily' | 'weekly'
}

// Authentication
export interface LoginCredentials {
  userId: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken: string
  expiresAt: string
}

export interface RefreshResponse {
  token: string
  refreshToken: string
  expiresAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

// Dashboard
export interface DashboardStats {
  id: string
  title: string
  value: number
  change: number
  changeType: 'increase' | 'decrease'
  period: string
  icon: string
  color: string
  trend: number[]
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
  options?: ChartOptions
}

export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
}

export interface ChartOptions {
  responsive?: boolean
  maintainAspectRatio?: boolean
  plugins?: any
}

// Navigation
export interface MenuItem {
  id: string
  title: string
  icon: string
  href: string
  badge?: number | string
  children?: MenuItem[]
  permissions?: UserRole[]
}

export interface NavigationState {
  isCollapsed: boolean
  activeItem: string
  menuItems: MenuItem[]
}

// Notifications
export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  createdAt: string
  actionUrl?: string
  userId: string
}

// API Responses
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  timestamp: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  message: string
  code: string
  statusCode: number
  details?: Record<string, any>
}

// Forms
export interface LoginFormData {
  userId: string 
  password: string
  rememberMe?: boolean
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface UserFormData {
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

// Layout Context
export interface LayoutContextType {
  layoutOrientation: LayoutOrientation
  toggleLayoutOrientation: () => void
  toggleBackdrop: () => void
  isBackdropVisible: boolean
}

// Component Props
export interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export interface HeaderProps {
  user?: User
  notifications?: Notification[]
  onLogout?: () => void
}

export interface StatCardProps {
  stat: DashboardStats
  className?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  pagination?: boolean
  search?: boolean
}

export interface TableColumn<T> {
  key: keyof T
  title: string
  render?: (value: any, record: T) => React.ReactNode
  sortable?: boolean
  width?: number
} 