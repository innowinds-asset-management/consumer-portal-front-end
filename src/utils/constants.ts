// Application Configuration
export const APP_CONFIG = {
  name: 'Admin Dashboard',
  version: '1.0.0',
  description: 'Professional admin dashboard with clean architecture',
  author: 'Your Company',
  supportEmail: 'support@yourcompany.com',
} as const

// API Configuration
export const API_CONFIG = {  
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  baseAssetURL: process.env.NEXT_PUBLIC_ASSET_API_URL || 'http://localhost:3003/api/v1',
  timeout: 10000,
  retries: 3,
  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      profile: '/auth/profile',
      register: '/auth/register',
    },
    dashboard: {
      stats: '/dashboard/stats',
      users: '/dashboard/users',
      charts: '/dashboard/charts',
      notifications: '/dashboard/notifications',
    },
    users: {
      list: '/users',
      create: '/users',
      update: (id: string) => `/users/${id}`,
      delete: (id: string) => `/users/${id}`,
      profile: (id: string) => `/users/${id}/profile`,
    },
    notifications: {
      list: '/notifications',
      markAsRead: (id: string) => `/notifications/${id}/read`,
      markAllAsRead: '/notifications/read-all',
    },
    assets: {
      types: '/asset-type',
      subTypes: '/asset-sub-type',
      list: '/assets',
      create: '/assets',
      update: (id: string) => `/assets/${id}`,
      delete: (id: string) => `/assets/${id}`,
    },
  },
} as const

// Route Configuration
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  users: '/users',
  settings: '/settings',
  profile: '/profile',
  help: '/help',
  logout: '/logout',
} as const

// Feature Flags
export const FEATURES = {
  darkMode: true,
  notifications: true,
  search: true,
  export: true,
  import: true,
  analytics: true,
  multiLanguage: false,
  realTimeUpdates: false,
  advancedCharts: true,
  userManagement: true,
} as const

// Validation Rules
export const VALIDATION_RULES = {
  password: {
    minLength: 6,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  username: {
    minLength: 3,
    maxLength: 20,
    allowedChars: /^[a-zA-Z0-9_-]+$/,
  },
  email: {
    maxLength: 254,
  },
  name: {
    minLength: 2,
    maxLength: 50,
  },
} as const

// UI Constants
export const UI_CONSTANTS = {
  sidebarWidth: 260,
  sidebarCollapsedWidth: 70,
  headerHeight: 70,
  footerHeight: 60,
  borderRadius: 8,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transitionDuration: '0.3s',
  zIndex: {
    sidebar: 1000,
    header: 999,
    modal: 1001,
    tooltip: 1002,
    notification: 1003,
  },
} as const

// Chart Colors
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#6b7280',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#06b6d4',
  light: '#f3f4f6',
  dark: '#1f2937',
} as const

// Notification Types
export const NOTIFICATION_TYPES = {
  info: { icon: 'mdi mdi-information', color: CHART_COLORS.info },
  success: { icon: 'mdi mdi-check-circle', color: CHART_COLORS.success },
  warning: { icon: 'mdi mdi-alert', color: CHART_COLORS.warning },
  error: { icon: 'mdi mdi-close-circle', color: CHART_COLORS.danger },
} as const

// Pagination
export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50, 100],
  maxPageSize: 100,
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  authToken: 'auth-token',
  refreshToken: 'refresh_token',
  consumerId: 'consumer_id',
  userPreferences: 'user_preferences',
  theme: 'theme',
  language: 'language',
  sidebarCollapsed: 'sidebar_collapsed',
  layoutOrientation: 'layout_orientation',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  networkError: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to access this resource.',
  forbidden: 'Access forbidden.',
  notFound: 'Resource not found.',
  rateLimited: 'Too many requests. Please wait a moment and try again.',
  serverError: 'Server error. Please try again later.',
  validationError: 'Please check your input and try again.',
  unknownError: 'An unknown error occurred.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  loginSuccess: 'Login successful!',
  logoutSuccess: 'Logout successful!',
  saveSuccess: 'Changes saved successfully!',
  deleteSuccess: 'Item deleted successfully!',
  createSuccess: 'Item created successfully!',
  updateSuccess: 'Item updated successfully!',
} as const

// Date Formats
export const DATE_FORMATS = {
  display: 'MMM dd, yyyy',
  input: 'yyyy-MM-dd',
  time: 'HH:mm:ss',
  datetime: 'MMM dd, yyyy HH:mm',
  relative: 'relative',
} as const

// Currency
export const CURRENCY = {
  symbol: '$',
  code: 'USD',
  position: 'before' as const,
  decimals: 2,
} as const 