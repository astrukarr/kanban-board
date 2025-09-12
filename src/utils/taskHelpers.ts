import type {
  TaskStatus,
  StatusStyleConfig,
  ColorConfig,
  CountsConfig,
} from '@/types';

/**
 * Get header styling configuration based on task status
 */
export function getHeaderStyle(status: TaskStatus): StatusStyleConfig {
  if (status === 'completed')
    return { dot: 'bg-emerald-500', chip: 'bg-emerald-100 text-emerald-600' };
  if (status === 'in_progress')
    return { dot: 'bg-amber-500', chip: 'bg-amber-100 text-amber-600' };
  return { dot: 'bg-indigo-600', chip: 'bg-indigo-100 text-indigo-600' };
}

/**
 * Calculate comment and check counts based on task ID
 */
export function calculateCounts(id: number): CountsConfig {
  const comments = ((id * 3) % 21) + 1;
  const checks = ((id * 5) % 56) + 1;
  return { comments, checks };
}

/**
 * Calculate progress percentage based on status and ID
 */
export function calculateProgress(status: TaskStatus, id: number): number {
  if (status === 'completed') return 100;
  if (status === 'in_progress') return 40 + (id % 40);
  return 5 + (id % 20);
}

/**
 * Get color configuration based on task status
 */
export function getColorConfig(status: TaskStatus): ColorConfig {
  if (status === 'completed')
    return {
      chipBg: 'bg-emerald-100',
      chipText: 'text-emerald-600',
      variant: 'success' as const,
    };
  if (status === 'in_progress')
    return {
      chipBg: 'bg-amber-100',
      chipText: 'text-amber-600',
      variant: 'warning' as const,
    };
  return {
    chipBg: 'bg-indigo-100',
    chipText: 'text-indigo-600',
    variant: 'brand' as const,
  };
}

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.round(value)));
}
