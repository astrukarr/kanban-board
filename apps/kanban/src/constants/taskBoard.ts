import type {
  ColumnConfig,
  TaskStatus,
  MainAction,
  ViewTab,
  MobileStatusTab,
} from '@/types';

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

// Project Info Section Constants
export const MAIN_ACTIONS: ReadonlyArray<MainAction> = [
  { id: 'grid-mini', icon: '/static/icons/GridView.svg', label: 'Grid View' },
  { id: 'filters-mini', icon: '/static/icons/Filters.svg', label: 'Filter' },
  { id: 'sort-mini', icon: '/static/icons/Sorting.svg', label: 'Sort' },
] as const;

export const VIEW_TABS: ReadonlyArray<ViewTab> = [
  { id: 'grid', icon: '/static/icons/GridView.svg', label: 'Grid View' },
  { id: 'list', icon: '/static/icons/ListView.svg', label: 'List View' },
  { id: 'column', icon: '/static/icons/ColumnView.svg', label: 'Column View' },
  { id: 'row', icon: '/static/icons/RowView.svg', label: 'Row View' },
] as const;

// Mobile Status Tabs
export const MOBILE_STATUS_TABS: ReadonlyArray<MobileStatusTab> = [
  { id: 'by-status', label: 'By Status', active: false },
  { id: 'by-total-tasks', label: 'By Total Tasks', active: true, badge: 12 },
  { id: 'tasks-due', label: 'Tasks Due', active: false },
  { id: 'priority', label: 'Priority', active: false },
  { id: 'assignee', label: 'Assignee', active: false },
] as const;
