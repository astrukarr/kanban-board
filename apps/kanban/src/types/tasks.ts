import type { Task, TaskStatus } from './index';

// State interface for tasks management
export interface TasksState {
  tasks: Task[];
  columns: {
    todo: Task[];
    in_progress: Task[];
    completed: Task[];
  };
  loading: boolean;
  error: string | null;
}

// Action types for tasks reducer
export type TasksAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'MOVE_TASK'; payload: { taskId: string; newStatus: TaskStatus } }
  | { type: 'LOAD_FROM_STORAGE'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: string };
