// Environment configuration
export const ENV_CONFIG = {
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com',
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  MAX_RETRIES: parseInt(process.env.NEXT_PUBLIC_MAX_RETRIES || '3'),
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const;

// Task configuration
export const TASK_CONFIG = {
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  DEFAULT_STATUS: 'todo' as const,
  STATUS_COUNT: 3, // Used for modulo operation
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
} as const;
