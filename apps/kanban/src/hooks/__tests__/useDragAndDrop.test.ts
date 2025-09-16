import { renderHook, act } from '@testing-library/react';
import { useDragAndDrop } from '../useDragAndDrop';
import type { Task, TaskStatus } from '@/types';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';

describe('useDragAndDrop Hook', () => {
  const mockMoveTask = jest.fn();
  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', status: 'todo' },
    { id: '2', title: 'Task 2', status: 'in_progress' },
    { id: '3', title: 'Task 3', status: 'completed' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() =>
        useDragAndDrop({ tasks: mockTasks, moveTask: mockMoveTask })
      );

      expect(result.current.activeTask).toBe(null);
      expect(result.current.sensors).toBeDefined();
      expect(result.current.handleDragStart).toBeDefined();
      expect(result.current.handleDragEnd).toBeDefined();
    });
  });

  describe('handleDragStart', () => {
    it('should set activeTask when drag starts', () => {
      const { result } = renderHook(() =>
        useDragAndDrop({ tasks: mockTasks, moveTask: mockMoveTask })
      );

      const mockDragStartEvent: DragStartEvent = {
        active: {
          id: '1',
          data: {
            current: mockTasks[0],
          },
        },
        collisions: null,
        delta: { x: 0, y: 0 },
        activatorEvent: new Event('mousedown'),
      };

      act(() => {
        result.current.handleDragStart(mockDragStartEvent);
      });

      expect(result.current.activeTask).toEqual(mockTasks[0]);
    });

    it('should handle drag start with different tasks', () => {
      const { result } = renderHook(() =>
        useDragAndDrop({ tasks: mockTasks, moveTask: mockMoveTask })
      );

      // Test with second task
      const mockDragStartEvent: DragStartEvent = {
        active: {
          id: '2',
          data: {
            current: mockTasks[1],
          },
        },
        collisions: null,
        delta: { x: 0, y: 0 },
        activatorEvent: new Event('mousedown'),
      };

      act(() => {
        result.current.handleDragStart(mockDragStartEvent);
      });

      expect(result.current.activeTask).toEqual(mockTasks[1]);
    });
  });

  describe('handleDragEnd', () => {
    it('should call moveTask when task is dropped on different column', () => {
      const { result } = renderHook(() =>
        useDragAndDrop({ tasks: mockTasks, moveTask: mockMoveTask })
      );

      const mockDragEndEvent: DragEndEvent = {
        active: {
          id: '1',
          data: {
            current: mockTasks[0],
          },
        },
        over: {
          id: 'in_progress',
          data: {
            current: null,
          },
        },
        collisions: null,
        delta: { x: 0, y: 0 },
        activatorEvent: new Event('mouseup'),
      };

      act(() => {
        result.current.handleDragEnd(mockDragEndEvent);
      });

      expect(mockMoveTask).toHaveBeenCalledWith('1', 'in_progress');
      expect(result.current.activeTask).toBe(null);
    });

    it('should not call moveTask when task is dropped on same column', () => {
      const { result } = renderHook(() =>
        useDragAndDrop({ tasks: mockTasks, moveTask: mockMoveTask })
      );

      const mockDragEndEvent: DragEndEvent = {
        active: {
          id: '1',
          data: {
            current: mockTasks[0], // Task is already in 'todo' status
          },
        },
        over: {
          id: 'todo', // Dropped on same column
          data: {
            current: null,
          },
        },
        collisions: null,
        delta: { x: 0, y: 0 },
        activatorEvent: new Event('mouseup'),
      };

      act(() => {
        result.current.handleDragEnd(mockDragEndEvent);
      });

      expect(mockMoveTask).not.toHaveBeenCalled();
      expect(result.current.activeTask).toBe(null);
    });

    it('should not call moveTask when dropped outside valid drop zone', () => {
      const { result } = renderHook(() =>
        useDragAndDrop({ tasks: mockTasks, moveTask: mockMoveTask })
      );

      const mockDragEndEvent: DragEndEvent = {
        active: {
          id: '1',
          data: {
            current: mockTasks[0],
          },
        },
        over: null, // Dropped outside
        collisions: null,
        delta: { x: 0, y: 0 },
        activatorEvent: new Event('mouseup'),
      };

      act(() => {
        result.current.handleDragEnd(mockDragEndEvent);
      });

      expect(mockMoveTask).not.toHaveBeenCalled();
      expect(result.current.activeTask).toBe(null);
    });

    it('should handle all status transitions', () => {
      const { result } = renderHook(() =>
        useDragAndDrop({ tasks: mockTasks, moveTask: mockMoveTask })
      );

      const statuses: TaskStatus[] = ['todo', 'in_progress', 'completed'];

      statuses.forEach((fromStatus, fromIndex) => {
        statuses.forEach((toStatus, toIndex) => {
          if (fromIndex !== toIndex) {
            const taskInFromStatus = mockTasks.find(
              t => t.status === fromStatus
            );
            if (taskInFromStatus) {
              const mockDragEndEvent: DragEndEvent = {
                active: {
                  id: taskInFromStatus.id,
                  data: {
                    current: taskInFromStatus,
                  },
                },
                over: {
                  id: toStatus,
                  data: {
                    current: null,
                  },
                },
                collisions: null,
                delta: { x: 0, y: 0 },
                activatorEvent: new Event('mouseup'),
              };

              act(() => {
                result.current.handleDragEnd(mockDragEndEvent);
              });

              expect(mockMoveTask).toHaveBeenCalledWith(
                taskInFromStatus.id,
                toStatus
              );
            }
          }
        });
      });
    });
  });

  describe('Sensors Configuration', () => {
    it('should provide configured sensors', () => {
      const { result } = renderHook(() =>
        useDragAndDrop({ tasks: mockTasks, moveTask: mockMoveTask })
      );

      expect(result.current.sensors).toBeDefined();
      expect(Array.isArray(result.current.sensors)).toBe(true);
      expect(result.current.sensors.length).toBeGreaterThan(0);
    });
  });

  describe('Callback Dependencies', () => {
    it('should update when tasks array changes', () => {
      const initialTasks: Task[] = [
        { id: '1', title: 'Task 1', status: 'todo' },
      ];

      const { result, rerender } = renderHook(
        ({ tasks }) => useDragAndDrop({ tasks, moveTask: mockMoveTask }),
        {
          initialProps: { tasks: initialTasks },
        }
      );

      const updatedTasks: Task[] = [
        { id: '1', title: 'Task 1', status: 'todo' },
        { id: '2', title: 'Task 2', status: 'in_progress' },
      ];

      rerender({ tasks: updatedTasks });

      // Test drag end with updated tasks
      const mockDragEndEvent: DragEndEvent = {
        active: {
          id: '1',
          data: {
            current: updatedTasks[0],
          },
        },
        over: {
          id: 'in_progress',
          data: {
            current: null,
          },
        },
        collisions: null,
        delta: { x: 0, y: 0 },
        activatorEvent: new Event('mouseup'),
      };

      act(() => {
        result.current.handleDragEnd(mockDragEndEvent);
      });

      expect(mockMoveTask).toHaveBeenCalledWith('1', 'in_progress');
    });

    it('should update when moveTask function changes', () => {
      const firstMoveTask = jest.fn();
      const secondMoveTask = jest.fn();

      const { result, rerender } = renderHook(
        ({ moveTask }) => useDragAndDrop({ tasks: mockTasks, moveTask }),
        {
          initialProps: { moveTask: firstMoveTask },
        }
      );

      const mockDragEndEvent: DragEndEvent = {
        active: {
          id: '1',
          data: {
            current: mockTasks[0],
          },
        },
        over: {
          id: 'in_progress',
          data: {
            current: null,
          },
        },
        collisions: null,
        delta: { x: 0, y: 0 },
        activatorEvent: new Event('mouseup'),
      };

      // First call with first function
      act(() => {
        result.current.handleDragEnd(mockDragEndEvent);
      });

      expect(firstMoveTask).toHaveBeenCalledWith('1', 'in_progress');

      // Change moveTask function
      rerender({ moveTask: secondMoveTask });

      // Second call with second function
      act(() => {
        result.current.handleDragEnd(mockDragEndEvent);
      });

      expect(secondMoveTask).toHaveBeenCalledWith('1', 'in_progress');
      expect(firstMoveTask).toHaveBeenCalledTimes(1); // Should not be called again
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty tasks array', () => {
      const { result } = renderHook(() =>
        useDragAndDrop({ tasks: [], moveTask: mockMoveTask })
      );

      const mockDragEndEvent: DragEndEvent = {
        active: {
          id: 'nonexistent',
          data: {
            current: null,
          },
        },
        over: {
          id: 'todo',
          data: {
            current: null,
          },
        },
        collisions: null,
        delta: { x: 0, y: 0 },
        activatorEvent: new Event('mouseup'),
      };

      act(() => {
        result.current.handleDragEnd(mockDragEndEvent);
      });

      expect(mockMoveTask).not.toHaveBeenCalled();
      expect(result.current.activeTask).toBe(null);
    });

    it('should handle task not found in tasks array', () => {
      const { result } = renderHook(() =>
        useDragAndDrop({ tasks: mockTasks, moveTask: mockMoveTask })
      );

      const mockDragEndEvent: DragEndEvent = {
        active: {
          id: 'nonexistent',
          data: {
            current: { id: 'nonexistent', title: 'Not Found', status: 'todo' },
          },
        },
        over: {
          id: 'in_progress',
          data: {
            current: null,
          },
        },
        collisions: null,
        delta: { x: 0, y: 0 },
        activatorEvent: new Event('mouseup'),
      };

      act(() => {
        result.current.handleDragEnd(mockDragEndEvent);
      });

      expect(mockMoveTask).not.toHaveBeenCalled();
      expect(result.current.activeTask).toBe(null);
    });
  });
});
