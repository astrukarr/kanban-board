import type { ApiError, ErrorState } from '@/types/errors';
import { ERROR_MESSAGES, ERROR_TYPES } from '@/types/errors';

export function createApiError(error: unknown): Error {
  if (error instanceof Error) {
    // Network errors
    if (
      error.message.toLowerCase().includes('network') ||
      error.message.toLowerCase().includes('fetch') ||
      error.message.toLowerCase().includes('connection')
    ) {
      return new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    // Validation errors
    if (
      error.message.toLowerCase().includes('validation') ||
      error.message.toLowerCase().includes('invalid')
    ) {
      return new Error(ERROR_MESSAGES.VALIDATION_ERROR);
    }

    // Server errors (5xx)
    if (
      error.message.includes('500') ||
      error.message.toLowerCase().includes('server')
    ) {
      return new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    // Generic error
    return new Error(error.message || ERROR_MESSAGES.UNKNOWN_ERROR);
  }

  // Non-Error objects
  return new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
}

export function createErrorState(
  error: ApiError,
  type: ErrorState['type'] = 'error'
): ErrorState {
  return {
    message: error.message,
    type,
    details: error.details ? JSON.stringify(error.details) : undefined,
    timestamp: Date.now(),
  };
}

export function isNetworkError(error: ApiError): boolean {
  return error.type === ERROR_TYPES.NETWORK;
}

export function isValidationError(error: ApiError): boolean {
  return error.type === ERROR_TYPES.VALIDATION;
}

export function isServerError(error: ApiError): boolean {
  return error.type === ERROR_TYPES.SERVER;
}

// Safe localStorage operations
export function safeLocalStorageSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
}

export function safeLocalStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return null;
  }
}

export function safeLocalStorageRemove(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
    return false;
  }
}
