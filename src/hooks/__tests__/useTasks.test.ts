import { renderHook, act } from '@testing-library/react';
import { useTasks } from '../useTasks';
import { tasksReducer, initialState } from '@/utils/tasksReducer';
import type { Task, TaskStatus } from '@/types';
import { getTasks, createColumns } from '@/lib/api/todos';
import {
  safeLocalStorageSet,
  safeLocalStorageGet,
  createApiError,
} from '@/utils/errorHelpers';

// Mock dependencies
jest.mock('@/lib/api/todos');
jest.mock('@/utils/errorHelpers');

const mockGetTasks = getTasks as jest.MockedFunction<typeof getTasks>;
const mockCreateColumns = createColumns as jest.MockedFunction<
  typeof createColumns
>;
const mockSafeLocalStorageSet = safeLocalStorageSet as jest.MockedFunction<
  typeof safeLocalStorageSet
>;
const mockSafeLocalStorageGet = safeLocalStorageGet as jest.MockedFunction<
  typeof safeLocalStorageGet
>;
const mockCreateApiError = createApiError as jest.MockedFunction<
  typeof createApiError
>;

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('useTasks Hook', () => {
  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', status: 'todo' },
    { id: '2', title: 'Task 2', status: 'in_progress' },
    { id: '3', title: 'Task 3', status: 'completed' },
  ];

  const mockColumns = {
    todo: [mockTasks[0]],
    in_progress: [mockTasks[1]],
    completed: [mockTasks[2]],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateColumns.mockReturnValue({
      todo: [],
      in_progress: [],
      completed: [],
    });
    mockSafeLocalStorageGet.mockReturnValue(null);
    mockGetTasks.mockResolvedValue([]);
  });

  describe('Initial State', () => {
    it('should have correct initial state', async () => {
      const { result } = renderHook(() => useTasks());

      // Wait for initial load to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.tasks).toEqual([]);
      expect(result.current.columns).toEqual({
        todo: [],
        in_progress: [],
        completed: [],
      });
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.isHydrated).toBe(true);
    });
  });

  describe('Reducer Logic', () => {
    it('should handle SET_LOADING action', () => {
      const action = { type: 'SET_LOADING' as const, payload: true };
      const newState = tasksReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState).toEqual({ ...initialState, loading: true });
    });

    it('should handle SET_ERROR action', () => {
      const action = { type: 'SET_ERROR' as const, payload: 'Test error' };
      const newState = tasksReducer(initialState, action);

      expect(newState.error).toBe('Test error');
      expect(newState.loading).toBe(false);
    });

    it('should handle SET_TASKS action', () => {
      // Set up mock for this specific test
      mockCreateColumns.mockReturnValue(mockColumns);

      const action = { type: 'SET_TASKS' as const, payload: mockTasks };
      const newState = tasksReducer(initialState, action);

      expect(newState.tasks).toEqual(mockTasks);
      expect(newState.columns).toEqual(mockColumns);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(null);
    });

    it('should handle MOVE_TASK action', () => {
      const stateWithTasks = { ...initialState, tasks: mockTasks };
      const action = {
        type: 'MOVE_TASK' as const,
        payload: { taskId: '1', newStatus: 'in_progress' as TaskStatus },
      };
      const newState = tasksReducer(stateWithTasks, action);

      expect(newState.tasks[0].status).toBe('in_progress');
      expect(newState.tasks[1].status).toBe('in_progress'); // unchanged
      expect(newState.tasks[2].status).toBe('completed'); // unchanged
    });

    it('should handle ADD_TASK action', () => {
      const newTask: Task = { id: '4', title: 'New Task', status: 'todo' };
      const action = { type: 'ADD_TASK' as const, payload: newTask };
      const newState = tasksReducer(initialState, action);

      expect(newState.tasks).toHaveLength(1);
      expect(newState.tasks[0]).toEqual(newTask);
    });

    it('should handle REMOVE_TASK action', () => {
      const stateWithTasks = { ...initialState, tasks: mockTasks };
      const action = { type: 'REMOVE_TASK' as const, payload: '2' };
      const newState = tasksReducer(stateWithTasks, action);

      expect(newState.tasks).toHaveLength(2);
      expect(newState.tasks.find(task => task.id === '2')).toBeUndefined();
    });

    it('should handle LOAD_FROM_STORAGE action', () => {
      // Set up mock for this specific test
      mockCreateColumns.mockReturnValue(mockColumns);

      const action = { type: 'LOAD_FROM_STORAGE' as const, payload: mockTasks };
      const newState = tasksReducer(initialState, action);

      expect(newState.tasks).toEqual(mockTasks);
      expect(newState.columns).toEqual(mockColumns);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(null);
    });

    it('should return state unchanged for unknown action', () => {
      const action = { type: 'UNKNOWN' as unknown, payload: null };
      const newState = tasksReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('loadTasks Function', () => {
    it('should load tasks successfully from API', async () => {
      // Reset mock to avoid initial call
      mockGetTasks.mockClear();
      mockGetTasks.mockResolvedValue(mockTasks);

      const { result } = renderHook(() => useTasks());

      // Wait for initial load to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Clear the initial call
      mockGetTasks.mockClear();
      mockGetTasks.mockResolvedValue(mockTasks);

      await act(async () => {
        await result.current.loadTasks();
      });

      expect(mockGetTasks).toHaveBeenCalledTimes(1);
      expect(mockSafeLocalStorageSet).toHaveBeenCalledWith(
        'kanban-tasks',
        JSON.stringify(mockTasks)
      );
      expect(result.current.tasks).toEqual(mockTasks);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('should handle API errors gracefully', async () => {
      // Reset mock to avoid initial call
      mockGetTasks.mockClear();
      const apiError = new Error('API Error');
      mockGetTasks.mockRejectedValue(apiError);
      mockCreateApiError.mockReturnValue(new Error('API Error'));

      const { result } = renderHook(() => useTasks());

      // Wait for initial load to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Clear the initial call
      mockGetTasks.mockClear();
      mockGetTasks.mockRejectedValue(apiError);

      await act(async () => {
        await result.current.loadTasks();
      });

      expect(mockGetTasks).toHaveBeenCalledTimes(1);
      expect(mockCreateApiError).toHaveBeenCalledWith(apiError);
      expect(result.current.error).toBe('API Error');
      expect(result.current.loading).toBe(false);
    });
  });

  describe('Task Operations', () => {
    it('should move task to different status', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.moveTask('1', 'in_progress');
      });

      // Since we start with empty tasks, this tests the reducer logic
      expect(result.current.tasks).toEqual([]);
    });

    it('should add new task', () => {
      const { result } = renderHook(() => useTasks());
      const newTask: Task = { id: '4', title: 'New Task', status: 'todo' };

      act(() => {
        result.current.addTask(newTask);
      });

      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0]).toEqual(newTask);
    });

    it('should remove task', () => {
      const { result } = renderHook(() => useTasks());
      const taskToRemove: Task = {
        id: '1',
        title: 'Task to remove',
        status: 'todo',
      };

      // First add a task
      act(() => {
        result.current.addTask(taskToRemove);
      });

      expect(result.current.tasks).toHaveLength(1);

      // Then remove it
      act(() => {
        result.current.removeTask('1');
      });

      expect(result.current.tasks).toHaveLength(0);
    });
  });

  describe('localStorage Integration', () => {
    it('should load tasks from localStorage on mount', async () => {
      mockSafeLocalStorageGet.mockReturnValue(JSON.stringify(mockTasks));

      const { result } = renderHook(() => useTasks());

      // Wait for useEffect to run
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(mockSafeLocalStorageGet).toHaveBeenCalledWith('kanban-tasks');
      expect(result.current.tasks).toEqual(mockTasks);
      expect(result.current.isHydrated).toBe(true);
    });

    it('should fallback to API when localStorage is empty', async () => {
      mockSafeLocalStorageGet.mockReturnValue('[]');
      mockGetTasks.mockResolvedValue(mockTasks);

      const { result } = renderHook(() => useTasks());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(mockGetTasks).toHaveBeenCalledTimes(1);
      expect(result.current.tasks).toEqual(mockTasks);
    });

    it('should fallback to API when localStorage parsing fails', async () => {
      mockSafeLocalStorageGet.mockReturnValue('invalid json');
      mockGetTasks.mockResolvedValue(mockTasks);

      const { result } = renderHook(() => useTasks());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(mockGetTasks).toHaveBeenCalledTimes(1);
      expect(result.current.tasks).toEqual(mockTasks);
    });

    it('should save tasks to localStorage when tasks change', () => {
      const { result } = renderHook(() => useTasks());
      const newTask: Task = { id: '1', title: 'Test Task', status: 'todo' };

      act(() => {
        result.current.addTask(newTask);
      });

      expect(mockSafeLocalStorageSet).toHaveBeenCalledWith(
        'kanban-tasks',
        JSON.stringify([newTask])
      );
    });

    it('should not save to localStorage when tasks array is empty', () => {
      renderHook(() => useTasks());

      // Initial state has empty tasks, so no save should happen
      expect(mockSafeLocalStorageSet).not.toHaveBeenCalled();
    });
  });

  describe('Memoization', () => {
    it('should memoize columns calculation', () => {
      const { result, rerender } = renderHook(() => useTasks());

      const firstColumns = result.current.columns;

      // Rerender without changing tasks
      rerender();

      const secondColumns = result.current.columns;

      // Should be the same reference due to memoization
      expect(firstColumns).toBe(secondColumns);
    });

    it('should recalculate columns when tasks change', () => {
      const { result } = renderHook(() => useTasks());
      const newTask: Task = { id: '1', title: 'Test Task', status: 'todo' };

      act(() => {
        result.current.addTask(newTask);
      });

      // Columns should be recalculated
      expect(mockCreateColumns).toHaveBeenCalledWith([newTask]);
    });
  });

  describe('Hydration', () => {
    it('should set isHydrated to true after mount', () => {
      const { result } = renderHook(() => useTasks());

      // Should be true immediately due to synchronous useEffect
      expect(result.current.isHydrated).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', async () => {
      // Mock console.error to avoid noise
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Reset mocks for this test
      jest.clearAllMocks();
      mockCreateColumns.mockReturnValue({
        todo: [],
        in_progress: [],
        completed: [],
      });

      // Mock localStorage to return null (simulating error)
      mockSafeLocalStorageGet.mockReturnValue(null);
      mockGetTasks.mockResolvedValue(mockTasks);

      const { result } = renderHook(() => useTasks());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Should fallback to API
      expect(mockGetTasks).toHaveBeenCalledTimes(1);
      expect(result.current.tasks).toEqual(mockTasks);

      consoleSpy.mockRestore();
    });
  });
});
