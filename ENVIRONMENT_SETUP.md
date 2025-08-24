# Environment Setup

This document explains how to configure environment variables for the AssetNix Consumer Portal application.

## Environment Variables

The application uses environment variables to configure API endpoints and other settings. You can set these up in several ways:

### Option 1: Create a `.env.local` file (Recommended)

Create a `.env.local` file in the root directory with the following content:

#### For Development (Local)
```bash
# API Configuration - Development
# Main API URL (for authentication, dashboard, users, etc.)
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Asset API URL (for asset management, asset types, etc.)
NEXT_PUBLIC_ASSET_API_URL=http://localhost:3003/api/v1

# Health Check URLs - Development
NEXT_PUBLIC_HEALTH_URL=http://localhost:3001/health
NEXT_PUBLIC_ASSET_HEALTH_URL=http://localhost:3003/health

# Environment
NODE_ENV=development

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=AssetNix Consumer Portal
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: Add other environment variables as needed
# NEXT_PUBLIC_FEATURE_FLAGS={"darkMode":true,"notifications":true}
# NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

#### For Production (Server)
```bash
# API Configuration - Production
# Main API URL (Consumer Portal Backend)
NEXT_PUBLIC_API_URL=https://api.assetnix.com/api/v1

# Asset API URL (Molecule Asset Service)
NEXT_PUBLIC_ASSET_API_URL=https://api.assetnix.com/molecule/api/v1

# Health Check URLs - Production
NEXT_PUBLIC_HEALTH_URL=https://api.assetnix.com/health
NEXT_PUBLIC_ASSET_HEALTH_URL=https://api.assetnix.com/molecule/health

# Environment
NODE_ENV=production

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=AssetNix Consumer Portal
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: Add other environment variables as needed
# NEXT_PUBLIC_FEATURE_FLAGS={"darkMode":true,"notifications":true}
# NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Option 2: Set environment variables in your shell

#### Development
```bash
export NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
export NEXT_PUBLIC_ASSET_API_URL=http://localhost:3003/api/v1
export NEXT_PUBLIC_HEALTH_URL=http://localhost:3001/health
export NEXT_PUBLIC_ASSET_HEALTH_URL=http://localhost:3003/health
export NODE_ENV=development
```

#### Production
```bash
export NEXT_PUBLIC_API_URL=https://api.assetnix.com/api/v1
export NEXT_PUBLIC_ASSET_API_URL=https://api.assetnix.com/molecule/api/v1
export NEXT_PUBLIC_HEALTH_URL=https://api.assetnix.com/health
export NEXT_PUBLIC_ASSET_HEALTH_URL=https://api.assetnix.com/molecule/health
export NODE_ENV=production
```

### Option 3: Use system environment variables

Set the environment variables in your system or deployment platform.

## Environment Variables Reference

| Variable | Description | Default Value | Required |
|----------|-------------|---------------|----------|
| `NEXT_PUBLIC_API_URL` | Main API URL for authentication, dashboard, users, etc. | `https://api.assetnix.com/api/v1` | No |
| `NEXT_PUBLIC_ASSET_API_URL` | Asset API URL for asset management, asset types, etc. | `https://api.assetnix.com/molecule/api/v1` | No |
| `NEXT_PUBLIC_HEALTH_URL` | Health check URL for main API | `https://api.assetnix.com/health` | No |
| `NEXT_PUBLIC_ASSET_HEALTH_URL` | Health check URL for asset API | `https://api.assetnix.com/molecule/health` | No |
| `NODE_ENV` | Environment (development, production, test) | `development` | No |
| `NEXT_PUBLIC_APP_NAME` | Application name | `AssetNix Consumer Portal` | No |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` | No |
| `NEXT_PUBLIC_FEATURE_FLAGS` | JSON string of feature flags | Default object | No |
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics tracking ID | Empty string | No |

## API Configuration

The application uses two different API endpoints:

1. **Consumer Portal Backend** (`NEXT_PUBLIC_API_URL`): Used for authentication, dashboard data, user management, departments, etc.
   - Development: `http://localhost:3001/api/v1`
   - Production: `https://api.assetnix.com/api/v1`

2. **Molecule Asset Service** (`NEXT_PUBLIC_ASSET_API_URL`): Used for asset management, inventory, suppliers, service requests, etc.
   - Development: `http://localhost:3003/api/v1`
   - Production: `https://api.assetnix.com/molecule/api/v1`

## Health Check Endpoints

The application includes health check endpoints for monitoring service status:

1. **Consumer Portal Backend Health**: `https://api.assetnix.com/health`
2. **Molecule Asset Service Health**: `https://api.assetnix.com/molecule/health`

## Feature Flags

You can configure feature flags using the `NEXT_PUBLIC_FEATURE_FLAGS` environment variable. It should be a JSON string:

```json
{
  "darkMode": true,
  "notifications": true,
  "search": true,
  "export": true,
  "import": true,
  "analytics": true,
  "multiLanguage": false,
  "realTimeUpdates": false,
  "advancedCharts": true,
  "userManagement": true
}
```

## Development vs Production

### Development Configuration
- Use localhost URLs for local development
- Run backend services locally
- Enable development features

### Production Configuration
- Use production API URLs
- Deployed on production server
- Optimized for performance

### Current Production Endpoints

**Consumer Portal Backend:**
- Health: `https://api.assetnix.com/health`
- API Base: `https://api.assetnix.com/api/v1/`

**Molecule Asset Service:**
- Health: `https://api.assetnix.com/molecule/health`
- API Base: `https://api.assetnix.com/molecule/api/v1/`

## Usage in Code

The environment variables are accessed through the configuration file at `src/config/environment.ts`:

```typescript
import { getApiUrl, getHealthUrl } from '@/config/environment'

// Get API URL for different services
const mainApiUrl = getApiUrl('main')        // Consumer Portal Backend
const assetApiUrl = getApiUrl('asset')      // Molecule Asset Service
const warrantyApiUrl = getApiUrl('warranty') // Warranty Service

// Get Health URLs
const mainHealthUrl = getHealthUrl('main')  // Consumer Portal Health
const assetHealthUrl = getHealthUrl('asset') // Asset Service Health
```

## Troubleshooting

1. **CORS Issues**: Ensure your backend services are configured to allow requests from your frontend domain
2. **SSL Certificate**: Production endpoints use HTTPS, ensure certificates are valid
3. **Network Access**: Verify network connectivity to production endpoints
4. **Environment Variables**: Check that environment variables are properly set and accessible 