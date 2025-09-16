import type { TasksState, TasksAction } from '@/types/tasks';
import { createColumns } from '@/lib/api/todos';

// Initial state for tasks
export const initialState: TasksState = {
  tasks: [],
  columns: {
    todo: [],
    in_progress: [],
    completed: [],
  },
  loading: false,
  error: null,
};

// Reducer function for tasks state management
export function tasksReducer(
  state: TasksState,
  action: TasksAction
): TasksState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        columns: createColumns(action.payload),
        loading: false,
        error: null,
      };

    case 'MOVE_TASK': {
      const { taskId, newStatus } = action.payload;
      const updatedTasks = state.tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      return {
        ...state,
        tasks: updatedTasks,
        // Don't recalculate columns here - let useMemo handle it
      };
    }

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        tasks: action.payload,
        columns: createColumns(action.payload),
        loading: false,
        error: null,
      };

    case 'ADD_TASK':
      const newTasks = [...state.tasks, action.payload];
      return {
        ...state,
        tasks: newTasks,
        // Don't recalculate columns here - let useMemo handle it
      };

    case 'REMOVE_TASK':
      const filteredTasks = state.tasks.filter(
        task => task.id !== action.payload
      );
      return {
        ...state,
        tasks: filteredTasks,
        // Don't recalculate columns here - let useMemo handle it
      };

    default:
      return state;
  }
}
