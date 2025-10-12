/**
 * Domain Configuration for JSON Master Tools
 *
 * This file manages domain settings for different environments.
 * Configuration can be set via environment variables or fallback to defaults.
 *
 * Environment variables are declared in src/vite-env.d.ts
 */

// Get environment from Vite env vars or fallback to development
const getEnvironment = (): 'development' | 'production' => {
  const env = import.meta.env.VITE_ENVIRONMENT
  return (env === 'production') ? 'production' : 'development'
}

// Get domain from environment variables or use defaults
const getDomainConfig = () => {
  const environment = getEnvironment()

  return {
    development: {
      baseUrl: import.meta.env.VITE_DEV_DOMAIN || 'http://localhost:5173',
      name: import.meta.env.VITE_DEV_NAME || 'Local Development',
      description: 'Development environment with hot reload'
    },
    production: {
      baseUrl: import.meta.env.VITE_PROD_DOMAIN || 'https://your-domain.com',
      name: import.meta.env.VITE_PROD_NAME || 'Production',
      description: 'Live production environment'
    }
  }
}

// Export configuration
export const ENVIRONMENT = getEnvironment()
export const DOMAIN_CONFIG = getDomainConfig()
export const CURRENT_DOMAIN = DOMAIN_CONFIG[ENVIRONMENT]

// Helper functions for URL generation
export const getBaseUrl = (): string => CURRENT_DOMAIN.baseUrl

export const getToolUrl = (toolPath: string): string => `${CURRENT_DOMAIN.baseUrl}${toolPath}`

export const getFullAppUrl = (): string => CURRENT_DOMAIN.baseUrl

export const getChromeExtensionUrl = (): string => `${CURRENT_DOMAIN.baseUrl}/chrome-extension`

export const getAboutUrl = (): string => `${CURRENT_DOMAIN.baseUrl}/about`

// Environment helpers
export const isDevelopment = (): boolean => ENVIRONMENT === 'development'

export const isProduction = (): boolean => ENVIRONMENT === 'production'

// Type guard functions
export const isEnvironment = (env: 'development' | 'production'): boolean => ENVIRONMENT === env

// Domain info for display
export const getDomainInfo = () => ({
  environment: ENVIRONMENT,
  ...DOMAIN_CONFIG[ENVIRONMENT]
})
