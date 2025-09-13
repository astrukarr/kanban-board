// Error types for consistent error handling
export interface ApiError {
  message: string;
  type: 'network' | 'validation' | 'server' | 'unknown';
  code?: string;
  details?: Record<string, unknown>;
}

export interface ErrorState {
  message: string;
  type: 'error' | 'warning' | 'info';
  details?: string;
  timestamp: number;
}

export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    'Network connection failed. Please check your internet connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
  TASK_CREATION_FAILED: 'Failed to create task. Please try again.',
  TASK_UPDATE_FAILED: 'Failed to update task. Please try again.',
  TASK_DELETE_FAILED: 'Failed to delete task. Please try again.',
  OFFLINE_ERROR: 'You are offline. Changes will be saved when you reconnect.',
  STORAGE_ERROR: 'Failed to save data locally. Please try again.',
} as const;

export const ERROR_TYPES = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  SERVER: 'server',
  UNKNOWN: 'unknown',
} as const;
