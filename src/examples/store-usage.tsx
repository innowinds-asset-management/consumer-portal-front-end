'use client'
import React from 'react'
import { useAuth, useUI, useDashboard } from '@/stores'

// Example component showing how to use all stores
export function StoreUsageExample() {
  // Auth store usage
  const { 
    user, 
    isAuthenticated, 
    loading: authLoading, 
    error: authError,
    login, 
    logout 
  } = useAuth()

  // UI store usage
  const { 
    sidebarCollapsed, 
    theme, 
    notifications, 
    unreadCount,
    toggleSidebar, 
    setTheme, 
    toggleNotifications 
  } = useUI()

  // Dashboard store usage
  const { 
    stats, 
    loading: dashboardLoading, 
    fetchStats, 
    refreshDashboard 
  } = useDashboard()

  // Example login handler
  const handleLogin = async () => {
    try {
      await login({
        email: 'admin@example.com',
        password: 'password123'
      })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // Example logout handler
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Store Usage Examples</h2>
      
      {/* Auth Store Example */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">Auth Store</h3>
        <div className="space-y-2">
          <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p>Loading: {authLoading ? 'Yes' : 'No'}</p>
          {user && <p>User: {user.name}</p>}
          {authError && <p className="text-red-500">Error: {authError}</p>}
          <div className="space-x-2">
            <button 
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Login
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* UI Store Example */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">UI Store</h3>
        <div className="space-y-2">
          <p>Sidebar Collapsed: {sidebarCollapsed ? 'Yes' : 'No'}</p>
          <p>Theme: {theme}</p>
          <p>Unread Notifications: {unreadCount}</p>
          <div className="space-x-2">
            <button 
              onClick={toggleSidebar}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Toggle Sidebar
            </button>
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="px-4 py-2 bg-purple-500 text-white rounded"
            >
              Toggle Theme
            </button>
            <button 
              onClick={toggleNotifications}
              className="px-4 py-2 bg-orange-500 text-white rounded"
            >
              Toggle Notifications
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Store Example */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">Dashboard Store</h3>
        <div className="space-y-2">
          <p>Stats Count: {stats.length}</p>
          <p>Loading: {dashboardLoading.stats ? 'Yes' : 'No'}</p>
          <div className="space-x-2">
            <button 
              onClick={fetchStats}
              className="px-4 py-2 bg-indigo-500 text-white rounded"
            >
              Fetch Stats
            </button>
            <button 
              onClick={refreshDashboard}
              className="px-4 py-2 bg-teal-500 text-white rounded"
            >
              Refresh Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Example of using stores in a login form component
export function LoginFormExample() {
  const { login, loading, error, clearError } = useAuth()
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    
    try {
      await login(formData)
    } catch (error) {
      // Error is handled by the store
      console.error('Login failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

// Example of using stores in a dashboard component
export function DashboardExample() {
  const { stats, loading, fetchStats } = useDashboard()
  const { sidebarCollapsed, toggleSidebar } = useUI()
  const { user } = useAuth()

  React.useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button 
          onClick={toggleSidebar}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          {sidebarCollapsed ? 'Expand' : 'Collapse'} Sidebar
        </button>
      </div>
      
      {user && (
        <p className="mb-4">Welcome back, {user.name}!</p>
      )}
      
      {loading.stats ? (
        <div>Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 border rounded">
              <h3 className="font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-600">
                {stat.changeType === 'increase' ? '+' : '-'}{stat.change}% {stat.period}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 