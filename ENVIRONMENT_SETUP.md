# Environment Setup

This document explains how to configure environment variables for the Consumer Portal application.

## Environment Variables

The application uses environment variables to configure API endpoints and other settings. You can set these up in several ways:

### Option 1: Create a `.env.local` file (Recommended)

Create a `.env.local` file in the root directory with the following content:

```bash
# API Configuration
# Main API URL (for authentication, dashboard, users, etc.)
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Asset API URL (for asset management, asset types, etc.)
NEXT_PUBLIC_ASSET_API_URL=http://localhost:3003/api/v1

# Environment
NODE_ENV=development

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=Consumer Portal
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: Add other environment variables as needed
# NEXT_PUBLIC_FEATURE_FLAGS={"darkMode":true,"notifications":true}
# NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Option 2: Set environment variables in your shell

```bash
export NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
export NEXT_PUBLIC_ASSET_API_URL=http://localhost:3003/api/v1
export NODE_ENV=development
```

### Option 3: Use system environment variables

Set the environment variables in your system or deployment platform.

## Environment Variables Reference

| Variable | Description | Default Value | Required |
|----------|-------------|---------------|----------|
| `NEXT_PUBLIC_API_URL` | Main API URL for authentication, dashboard, users, etc. | `http://localhost:3001/api/v1` | No |
| `NEXT_PUBLIC_ASSET_API_URL` | Asset API URL for asset management, asset types, etc. | `http://localhost:3003/api/v1` | No |
| `NODE_ENV` | Environment (development, production, test) | `development` | No |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Consumer Portal` | No |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` | No |
| `NEXT_PUBLIC_FEATURE_FLAGS` | JSON string of feature flags | Default object | No |
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics tracking ID | Empty string | No |

## API Configuration

The application uses two different API endpoints:

1. **Main API** (`NEXT_PUBLIC_API_URL`): Used for authentication, dashboard data, user management, etc.
2. **Asset API** (`NEXT_PUBLIC_ASSET_API_URL`): Used specifically for asset management features like asset types.

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

- **Development**: Use localhost URLs for local development
- **Production**: Use your production API URLs

### Example Production Configuration

```bash
NEXT_PUBLIC_API_URL=https://api.yourcompany.com/api/v1
NEXT_PUBLIC_ASSET_API_URL=https://asset-api.yourcompany.com/api/v1
NODE_ENV=production
```

## Usage in Code

The environment variables are accessed through the configuration file at `src/config/environment.ts`:

```typescript
import { API_URL, ASSET_API_URL, IS_DEVELOPMENT } from '@/config/environment'

// Use the URLs
console.log('Main API:', API_URL)
console.log('Asset API:', ASSET_API_URL)
console.log('Is Development:', IS_DEVELOPMENT)
```

## Security Notes

- Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Sensitive data should be handled server-side
- Never commit `.env.local` files to version control
- Use `.env.example` to document required variables 