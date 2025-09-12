import type { ColumnConfig, TaskStatus } from '@/types';

export const COLUMN_CONFIG: ReadonlyArray<ColumnConfig> = [
  { status: 'todo', title: 'To Do' },
  { status: 'in_progress', title: 'In Progress' },
  { status: 'completed', title: 'Completed' },
] as const;

export const AVATAR_PATHS = {
  basePath: '/static/images/Avatar',
  ext: 'png' as const,
  maxCount: 7,
} as const;

export const TASK_CALCULATION_CONFIG = {
  comments: {
    multiplier: 3,
    modulo: 21,
    offset: 1,
  },
  checks: {
    multiplier: 5,
    modulo: 56,
    offset: 1,
  },
  progress: {
    completed: 100,
    inProgress: {
      base: 40,
      range: 40,
    },
    todo: {
      base: 5,
      range: 20,
    },
  },
} as const;

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  completed: 'Done',
} as const;
