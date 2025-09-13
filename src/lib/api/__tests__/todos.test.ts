import { getTasks, createColumns } from '../todos';
import type { Task, TaskStatus } from '@/types';

// Mock fetch globally
global.fetch = jest.fn();

describe('todos API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should fetch and map tasks correctly', async () => {
      const mockApiResponse = [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
        { id: 3, title: 'Task 3' },
        { id: 4, title: 'Task 4' },
        { id: 5, title: 'Task 5' },
        { id: 6, title: 'Task 6' },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockApiResponse),
      });

      const result = await getTasks();

      expect(fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos?_limit=12'
      );
      expect(result).toHaveLength(6);
      expect(result[0]).toEqual({
        id: 1,
        title: 'Task 1',
        status: 'in_progress', // 1 % 3 = 1 -> in_progress
      });
    });

    it('should map status correctly based on ID modulo 3', async () => {
      const mockApiResponse = [
        { id: 3, title: 'Task 3' }, // 3 % 3 = 0 -> todo
        { id: 1, title: 'Task 1' }, // 1 % 3 = 1 -> in_progress
        { id: 2, title: 'Task 2' }, // 2 % 3 = 2 -> completed
        { id: 6, title: 'Task 6' }, // 6 % 3 = 0 -> todo
        { id: 4, title: 'Task 4' }, // 4 % 3 = 1 -> in_progress
        { id: 5, title: 'Task 5' }, // 5 % 3 = 2 -> completed
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockApiResponse),
      });

      const result = await getTasks();

      expect(result[0].status).toBe('todo'); // ID 3
      expect(result[1].status).toBe('in_progress'); // ID 1
      expect(result[2].status).toBe('completed'); // ID 2
      expect(result[3].status).toBe('todo'); // ID 6
      expect(result[4].status).toBe('in_progress'); // ID 4
      expect(result[5].status).toBe('completed'); // ID 5
    });

    it('should handle API errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(getTasks()).rejects.toThrow('Network error');
    });

    it('should handle HTTP error responses', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getTasks()).rejects.toThrow('HTTP error! status: 500');
    });

    it('should handle empty API response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce([]),
      });

      const result = await getTasks();

      expect(result).toEqual([]);
    });

    it('should preserve task properties', async () => {
      const mockApiResponse = [
        { id: 123, title: 'Complex Task Title', completed: false },
        { id: 456, title: 'Another Task', completed: true },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockApiResponse),
      });

      const result = await getTasks();

      expect(result[0]).toEqual({
        id: 123,
        title: 'Complex Task Title',
        status: 'todo', // 123 % 3 = 0 -> todo
      });
      expect(result[1]).toEqual({
        id: 456,
        title: 'Another Task',
        status: 'todo', // 456 % 3 = 0 -> todo
      });
    });
  });

  describe('createColumns', () => {
    it('should group tasks by status correctly', () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', status: 'todo' },
        { id: 2, title: 'Task 2', status: 'in_progress' },
        { id: 3, title: 'Task 3', status: 'completed' },
        { id: 4, title: 'Task 4', status: 'todo' },
        { id: 5, title: 'Task 5', status: 'in_progress' },
      ];

      const result = createColumns(tasks);

      expect(result.todo).toHaveLength(2);
      expect(result.in_progress).toHaveLength(2);
      expect(result.completed).toHaveLength(1);

      expect(result.todo).toEqual([
        { id: 1, title: 'Task 1', status: 'todo' },
        { id: 4, title: 'Task 4', status: 'todo' },
      ]);

      expect(result.in_progress).toEqual([
        { id: 2, title: 'Task 2', status: 'in_progress' },
        { id: 5, title: 'Task 5', status: 'in_progress' },
      ]);

      expect(result.completed).toEqual([
        { id: 3, title: 'Task 3', status: 'completed' },
      ]);
    });

    it('should handle empty tasks array', () => {
      const result = createColumns([]);

      expect(result.todo).toEqual([]);
      expect(result.in_progress).toEqual([]);
      expect(result.completed).toEqual([]);
    });

    it('should handle tasks with only one status', () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', status: 'todo' },
        { id: 2, title: 'Task 2', status: 'todo' },
        { id: 3, title: 'Task 3', status: 'todo' },
      ];

      const result = createColumns(tasks);

      expect(result.todo).toHaveLength(3);
      expect(result.in_progress).toEqual([]);
      expect(result.completed).toEqual([]);
    });

    it('should handle tasks with mixed statuses', () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', status: 'todo' },
        { id: 2, title: 'Task 2', status: 'in_progress' },
        { id: 3, title: 'Task 3', status: 'completed' },
        { id: 4, title: 'Task 4', status: 'todo' },
        { id: 5, title: 'Task 5', status: 'completed' },
        { id: 6, title: 'Task 6', status: 'in_progress' },
      ];

      const result = createColumns(tasks);

      expect(result.todo).toHaveLength(2);
      expect(result.in_progress).toHaveLength(2);
      expect(result.completed).toHaveLength(2);
    });

    it('should preserve task order within each column', () => {
      const tasks: Task[] = [
        { id: 1, title: 'First Todo', status: 'todo' },
        { id: 2, title: 'Second Todo', status: 'todo' },
        { id: 3, title: 'Third Todo', status: 'todo' },
      ];

      const result = createColumns(tasks);

      expect(result.todo[0].id).toBe(1);
      expect(result.todo[1].id).toBe(2);
      expect(result.todo[2].id).toBe(3);
    });
  });
});
