import { createTask, createTaskAPI } from '../taskCreation';
import type { TaskStatus } from '@/types';

// Mock fetch for API tests
global.fetch = jest.fn();

describe('taskCreation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create task with required fields', () => {
      const formData = {
        title: 'Test Task',
        status: 'todo' as TaskStatus,
      };

      const result = createTask(formData);

      expect(result).toHaveProperty('id');
      expect(result.title).toBe('Test Task');
      expect(result.status).toBe('todo');
      expect(result.description).toBe('');
      expect(typeof result.id).toBe('string');
      expect(result.id).toMatch(/^temp-\d+$/);
    });

    it('should create task with description', () => {
      const formData = {
        title: 'Test Task',
        status: 'in_progress' as TaskStatus,
        description: 'Test description',
      };

      const result = createTask(formData);

      expect(result.title).toBe('Test Task');
      expect(result.status).toBe('in_progress');
      expect(result.description).toBe('Test description');
    });

    it('should generate unique IDs for different tasks', async () => {
      const formData1 = {
        title: 'Task 1',
        status: 'todo' as TaskStatus,
      };
      const formData2 = {
        title: 'Task 2',
        status: 'todo' as TaskStatus,
      };

      const task1 = createTask(formData1);
      // Add small delay to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 1));
      const task2 = createTask(formData2);

      expect(task1.id).not.toBe(task2.id);
    });

    it('should handle different status values', () => {
      const statuses: TaskStatus[] = ['todo', 'in_progress', 'completed'];

      statuses.forEach(status => {
        const formData = {
          title: `Test ${status}`,
          status,
        };
        const result = createTask(formData);
        expect(result.status).toBe(status);
      });
    });
  });

  describe('createTaskAPI', () => {
    it('should make POST request to JSONPlaceholder', async () => {
      const mockResponse = {
        id: 201,
        title: 'Test Task',
        completed: false,
        userId: 1,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const formData = {
        title: 'Test Task',
        status: 'todo' as TaskStatus,
      };

      const result = await createTaskAPI(formData);

      expect(fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Test Task',
            completed: false,
            userId: 1,
          }),
        }
      );
      expect(result).toEqual({ id: '201' });
    });

    it('should set completed: true for completed status', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ id: 201 }),
      });

      const formData = {
        title: 'Completed Task',
        status: 'completed' as TaskStatus,
      };

      await createTaskAPI(formData);

      expect(fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos',
        expect.objectContaining({
          body: JSON.stringify({
            title: 'Completed Task',
            completed: true,
            userId: 1,
          }),
        })
      );
    });

    it('should set completed: false for non-completed status', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ id: 202 }),
      });

      const formData = {
        title: 'Todo Task',
        status: 'todo' as TaskStatus,
      };

      await createTaskAPI(formData);

      expect(fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos',
        expect.objectContaining({
          body: JSON.stringify({
            title: 'Todo Task',
            completed: false,
            userId: 1,
          }),
        })
      );
    });

    it('should handle API errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const formData = {
        title: 'Test Task',
        status: 'todo' as TaskStatus,
      };

      await expect(createTaskAPI(formData)).rejects.toThrow('Network error');
    });
  });
});
