import { renderHook, act } from '@testing-library/react';
import { useTaskModal } from '../useTaskModal';
import type { Task, TaskStatus } from '@/types';

describe('useTaskModal Hook', () => {
  const mockAddTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() =>
        useTaskModal({ addTask: mockAddTask })
      );

      expect(result.current.isModalOpen).toBe(false);
      expect(result.current.selectedStatus).toBe('todo');
    });
  });

  describe('handleAddTask', () => {
    it('should set selectedStatus and open modal', () => {
      const { result } = renderHook(() =>
        useTaskModal({ addTask: mockAddTask })
      );

      act(() => {
        result.current.handleAddTask('in_progress');
      });

      expect(result.current.selectedStatus).toBe('in_progress');
      expect(result.current.isModalOpen).toBe(true);
    });

    it('should work with different statuses', () => {
      const { result } = renderHook(() =>
        useTaskModal({ addTask: mockAddTask })
      );

      const statuses: TaskStatus[] = ['todo', 'in_progress', 'completed'];

      statuses.forEach(status => {
        act(() => {
          result.current.handleAddTask(status);
        });

        expect(result.current.selectedStatus).toBe(status);
        expect(result.current.isModalOpen).toBe(true);

        // Close modal for next test
        act(() => {
          result.current.handleCloseModal();
        });
      });
    });
  });

  describe('handleTaskCreated', () => {
    it('should call addTask and close modal', () => {
      const { result } = renderHook(() =>
        useTaskModal({ addTask: mockAddTask })
      );

      const mockTask: Task = {
        id: '1',
        title: 'Test Task',
        status: 'todo',
        description: 'Test description',
      };

      // First open modal
      act(() => {
        result.current.handleAddTask('todo');
      });

      expect(result.current.isModalOpen).toBe(true);

      // Then create task
      act(() => {
        result.current.handleTaskCreated(mockTask);
      });

      expect(mockAddTask).toHaveBeenCalledWith(mockTask);
      expect(result.current.isModalOpen).toBe(false);
    });

    it('should maintain selectedStatus after task creation', () => {
      const { result } = renderHook(() =>
        useTaskModal({ addTask: mockAddTask })
      );

      // Set specific status
      act(() => {
        result.current.handleAddTask('in_progress');
      });

      const mockTask: Task = {
        id: '1',
        title: 'Test Task',
        status: 'in_progress',
      };

      act(() => {
        result.current.handleTaskCreated(mockTask);
      });

      // selectedStatus should remain the same
      expect(result.current.selectedStatus).toBe('in_progress');
    });
  });

  describe('handleCloseModal', () => {
    it('should close modal without affecting selectedStatus', () => {
      const { result } = renderHook(() =>
        useTaskModal({ addTask: mockAddTask })
      );

      // Open modal with specific status
      act(() => {
        result.current.handleAddTask('completed');
      });

      expect(result.current.isModalOpen).toBe(true);
      expect(result.current.selectedStatus).toBe('completed');

      // Close modal
      act(() => {
        result.current.handleCloseModal();
      });

      expect(result.current.isModalOpen).toBe(false);
      expect(result.current.selectedStatus).toBe('completed'); // Should remain unchanged
    });

    it('should work when modal is already closed', () => {
      const { result } = renderHook(() =>
        useTaskModal({ addTask: mockAddTask })
      );

      // Modal should be closed initially
      expect(result.current.isModalOpen).toBe(false);

      // Close modal again (should not cause issues)
      act(() => {
        result.current.handleCloseModal();
      });

      expect(result.current.isModalOpen).toBe(false);
    });
  });

  describe('Integration Flow', () => {
    it('should handle complete modal workflow', () => {
      const { result } = renderHook(() =>
        useTaskModal({ addTask: mockAddTask })
      );

      const mockTask: Task = {
        id: '1',
        title: 'Integration Test Task',
        status: 'in_progress',
        description: 'Testing complete workflow',
      };

      // 1. Open modal with specific status
      act(() => {
        result.current.handleAddTask('in_progress');
      });

      expect(result.current.isModalOpen).toBe(true);
      expect(result.current.selectedStatus).toBe('in_progress');

      // 2. Create task
      act(() => {
        result.current.handleTaskCreated(mockTask);
      });

      expect(mockAddTask).toHaveBeenCalledWith(mockTask);
      expect(result.current.isModalOpen).toBe(false);

      // 3. Verify we can open modal again
      act(() => {
        result.current.handleAddTask('completed');
      });

      expect(result.current.isModalOpen).toBe(true);
      expect(result.current.selectedStatus).toBe('completed');
    });

    it('should handle multiple rapid state changes', () => {
      const { result } = renderHook(() =>
        useTaskModal({ addTask: mockAddTask })
      );

      // Rapid state changes
      act(() => {
        result.current.handleAddTask('todo');
        result.current.handleAddTask('in_progress');
        result.current.handleAddTask('completed');
      });

      expect(result.current.selectedStatus).toBe('completed');
      expect(result.current.isModalOpen).toBe(true);

      // Close and reopen
      act(() => {
        result.current.handleCloseModal();
        result.current.handleAddTask('todo');
      });

      expect(result.current.selectedStatus).toBe('todo');
      expect(result.current.isModalOpen).toBe(true);
    });
  });

  describe('Callback Dependencies', () => {
    it('should update when addTask function changes', () => {
      const firstAddTask = jest.fn();
      const secondAddTask = jest.fn();

      const { result, rerender } = renderHook(
        ({ addTask }) => useTaskModal({ addTask }),
        {
          initialProps: { addTask: firstAddTask },
        }
      );

      const mockTask: Task = {
        id: '1',
        title: 'Test Task',
        status: 'todo',
      };

      // Open modal and create task with first function
      act(() => {
        result.current.handleAddTask('todo');
        result.current.handleTaskCreated(mockTask);
      });

      expect(firstAddTask).toHaveBeenCalledWith(mockTask);

      // Change addTask function
      rerender({ addTask: secondAddTask });

      // Create another task with second function
      act(() => {
        result.current.handleAddTask('in_progress');
        result.current.handleTaskCreated(mockTask);
      });

      expect(secondAddTask).toHaveBeenCalledWith(mockTask);
      expect(firstAddTask).toHaveBeenCalledTimes(1); // Should not be called again
    });
  });
});
