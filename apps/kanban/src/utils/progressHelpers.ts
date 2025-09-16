import type { ProgressVariant } from '@/types';

export const PROGRESS_VARIANTS = {
  brand: {
    chipBg: 'bg-indigo-100',
    chipText: 'text-indigo-600',
    bar: 'bg-indigo-600',
  },
  warning: {
    chipBg: 'bg-amber-100',
    chipText: 'text-amber-600',
    bar: 'bg-amber-500',
  },
  success: {
    chipBg: 'bg-emerald-100',
    chipText: 'text-emerald-600',
    bar: 'bg-emerald-500',
  },
} as const;

/**
 * Get progress bar styling configuration
 */
export function getProgressVariant(variant: ProgressVariant) {
  return PROGRESS_VARIANTS[variant];
}
