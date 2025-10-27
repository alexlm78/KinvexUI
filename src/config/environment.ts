// Environment configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  },

  // Authentication Configuration
  auth: {
    tokenKey: 'authToken',
    refreshTokenKey: 'refreshToken',
    userKey: 'currentUser',
    tokenExpirationBuffer: 5 * 60 * 1000, // 5 minutes in milliseconds
  },

  // Application Configuration
  app: {
    name: 'Kinvex Inventory System',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_NODE_ENV || 'development',
  },

  // Pagination defaults
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },

  // File upload configuration
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  },

  // Feature flags
  features: {
    enableDarkMode: true,
    enableExport: true,
    enableNotifications: true,
    enableAuditLog: true,
  },

  // UI Configuration
  ui: {
    debounceDelay: 300, // milliseconds
    toastDuration: 5000, // milliseconds
    animationDuration: 200, // milliseconds
  },
};

// Validation function to ensure required environment variables are set
export const validateEnvironment = (): void => {
  const requiredVars = [
    'VITE_API_BASE_URL',
  ];

  const missingVars = requiredVars.filter(varName => !import.meta.env[varName as keyof ImportMetaEnv]);

  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars);
    // In development, we can continue with defaults
    // In production, you might want to throw an error
    if (config.app.environment === 'production') {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }
};

export default config;
