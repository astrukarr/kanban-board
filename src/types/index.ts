export type SidebarItemProps = {
  id: string;
  src: string;
  alt: string;
};

export type Crumb = {
  id: string;
  label?: string;
  iconSrc?: string;
  alt?: string;
};

export type BreadcrumbsProps = {
  items: Crumb[];
};

export type MainAction = { id: string; icon: string; label: string };

export type ViewTabId = 'grid' | 'list' | 'column' | 'row';

export type ViewTab = { id: ViewTabId; icon: string; label: string };

// Mobile Status Tab types
export type MobileStatusTab = {
  id: string;
  label: string;
  active: boolean;
  badge?: number;
};

// Task-related types
export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  description?: string;
};

// Task Board types
export type TaskColumnProps = {
  title: string;
  status: TaskStatus;
  items: Task[];
  onAddTask: (status: TaskStatus) => void;
};

export type TaskCardProps = {
  id: string;
  title: string;
  status: TaskStatus;
};

// Progress Bar types
export type ProgressVariant = 'brand' | 'warning' | 'success';

export type ProgressBarProps = {
  percent: number;
  variant?: ProgressVariant;
};

// Avatar Group types
export type AvatarGroupProps = {
  count?: number;
  ids?: number[];
  basePath?: string;
  ext?: 'png' | 'jpg' | 'jpeg' | 'webp' | 'svg';
  className?: string;
};

// Style configuration types
export type StatusStyleConfig = {
  dot: string;
  chip: string;
};

export type ColorConfig = {
  chipBg: string;
  chipText: string;
  variant: ProgressVariant;
};

export type CountsConfig = {
  comments: number;
  checks: number;
};

// Column configuration type
export type ColumnConfig = {
  status: TaskStatus;
  title: string;
};

// Re-export error types
export type { ApiError, ErrorState } from './errors';
export { ERROR_MESSAGES, ERROR_TYPES } from './errors';

// Re-export task types
export type { TasksState, TasksAction } from './tasks';
