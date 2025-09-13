import { useReducer, useEffect, useCallback, useState, useMemo } from 'react';
import type { Task, TaskStatus } from '@/types';
import { getTasks, createColumns } from '@/lib/api/todos';
import {
  safeLocalStorageSet,
  safeLocalStorageGet,
  createApiError,
} from '@/utils/errorHelpers';

// State tip
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

// Action tipovi
export type TasksAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'MOVE_TASK'; payload: { taskId: string; newStatus: TaskStatus } }
  | { type: 'LOAD_FROM_STORAGE'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: string };

// Početni state
const initialState: TasksState = {
  tasks: [],
  columns: {
    todo: [],
    in_progress: [],
    completed: [],
  },
  loading: false,
  error: null,
};

// Reducer funkcija
function tasksReducer(state: TasksState, action: TasksAction): TasksState {
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

// Custom hook
export function useTasks() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Memoize columns calculation to prevent unnecessary recalculations
  const columns = useMemo(() => createColumns(state.tasks), [state.tasks]);

  // Load tasks from API - memoized to prevent unnecessary re-renders
  const loadTasks = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const tasks = await getTasks();
      dispatch({ type: 'SET_TASKS', payload: tasks });
      // Save to localStorage safely
      safeLocalStorageSet('kanban-tasks', JSON.stringify(tasks));
    } catch (error) {
      const apiError = createApiError(error);
      dispatch({
        type: 'SET_ERROR',
        payload: apiError.message,
      });
    }
  }, []);

  // Move task - memoized to prevent unnecessary re-renders
  const moveTask = useCallback((taskId: string, newStatus: TaskStatus) => {
    dispatch({ type: 'MOVE_TASK', payload: { taskId, newStatus } });
  }, []);

  // Add task - memoized to prevent unnecessary re-renders
  const addTask = useCallback((task: Task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  }, []);

  // Remove task - memoized to prevent unnecessary re-renders
  const removeTask = useCallback((taskId: string) => {
    dispatch({ type: 'REMOVE_TASK', payload: taskId });
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    setIsHydrated(true);

    const savedTasks = safeLocalStorageGet('kanban-tasks');
    if (savedTasks) {
      try {
        const tasks = JSON.parse(savedTasks);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: tasks });
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        loadTasks(); // Fallback to API
      }
    } else {
      loadTasks(); // First time load from API
    }
  }, [loadTasks]);

  // Save to localStorage when tasks change
  useEffect(() => {
    if (state.tasks.length > 0) {
      safeLocalStorageSet('kanban-tasks', JSON.stringify(state.tasks));
    }
  }, [state.tasks]);

  return {
    ...state,
    columns, // Use memoized columns instead of state.columns
    isHydrated,
    loadTasks,
    moveTask,
    addTask,
    removeTask,
  };
}
