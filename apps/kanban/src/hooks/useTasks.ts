import { useReducer, useEffect, useCallback, useState, useMemo } from 'react';
import type { Task, TaskStatus } from '@/types';
import { getTasks, createColumns } from '@/lib/api/todos';
import {
  safeLocalStorageSet,
  safeLocalStorageGet,
  createApiError,
} from '@/utils/errorHelpers';
import { tasksReducer, initialState } from '@/utils/tasksReducer';
import type { TasksState } from '@/types/tasks';

// Custom hook for tasks management
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

    if (savedTasks && savedTasks !== '[]') {
      try {
        const tasks = JSON.parse(savedTasks);
        if (tasks.length > 0) {
          dispatch({ type: 'LOAD_FROM_STORAGE', payload: tasks });
        } else {
          loadTasks(); // Fallback to API
        }
      } catch (error) {
        console.error('Error parsing localStorage tasks:', error);
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
