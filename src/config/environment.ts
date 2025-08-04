// Environment Configuration
// This file manages environment variables and provides fallbacks

export const ENV_CONFIG = {
  // API URLs
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  ASSET_API_URL: process.env.NEXT_PUBLIC_ASSET_API_URL || 'http://localhost:3003/api/v1',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  
  // App Configuration
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Consumer Portal',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  
  // Feature Flags (optional)
  FEATURE_FLAGS: process.env.NEXT_PUBLIC_FEATURE_FLAGS 
    ? JSON.parse(process.env.NEXT_PUBLIC_FEATURE_FLAGS)
    : {
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
      },
  
  // Analytics (optional)
  ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
} as const

// Helper function to get API URL based on service type
export const getApiUrl = (service: 'main' | 'asset' = 'main'): string => {
  switch (service) {
    case 'asset':
      return ENV_CONFIG.ASSET_API_URL
    case 'main':
    default:
      return ENV_CONFIG.API_URL
  }
}

// Helper function to check if feature is enabled
export const isFeatureEnabled = (feature: keyof typeof ENV_CONFIG.FEATURE_FLAGS): boolean => {
  return ENV_CONFIG.FEATURE_FLAGS[feature] || false
}

// Export individual values for convenience
export const {
  API_URL,
  ASSET_API_URL,
  NODE_ENV,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  APP_NAME,
  APP_VERSION,
  FEATURE_FLAGS,
  ANALYTICS_ID,
} = ENV_CONFIG 