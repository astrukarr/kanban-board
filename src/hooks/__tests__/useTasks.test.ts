import { createColumns } from '../../lib/api/todos';
import type { Task } from '../../types';

describe('useTasks - Simplified Logic', () => {
  describe('createColumns function', () => {
    it('should group tasks by status correctly', () => {
      const tasks: Task[] = [
        { id: '1', title: 'Task 1', status: 'todo' },
        { id: '2', title: 'Task 2', status: 'in_progress' },
        { id: '3', title: 'Task 3', status: 'completed' },
        { id: '4', title: 'Task 4', status: 'todo' },
        { id: '5', title: 'Task 5', status: 'in_progress' },
      ];

      const result = createColumns(tasks);

      expect(result.todo).toHaveLength(2);
      expect(result.in_progress).toHaveLength(2);
      expect(result.completed).toHaveLength(1);

      expect(result.todo).toEqual([
        { id: '1', title: 'Task 1', status: 'todo' },
        { id: '4', title: 'Task 4', status: 'todo' },
      ]);

      expect(result.in_progress).toEqual([
        { id: '2', title: 'Task 2', status: 'in_progress' },
        { id: '5', title: 'Task 5', status: 'in_progress' },
      ]);

      expect(result.completed).toEqual([
        { id: '3', title: 'Task 3', status: 'completed' },
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
        { id: '1', title: 'Task 1', status: 'todo' },
        { id: '2', title: 'Task 2', status: 'todo' },
        { id: '3', title: 'Task 3', status: 'todo' },
      ];

      const result = createColumns(tasks);

      expect(result.todo).toHaveLength(3);
      expect(result.in_progress).toEqual([]);
      expect(result.completed).toEqual([]);
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

  describe('Task status logic', () => {
    it('should correctly identify task statuses', () => {
      const todoTask: Task = { id: '1', title: 'Todo Task', status: 'todo' };
      const inProgressTask: Task = {
        id: '2',
        title: 'In Progress Task',
        status: 'in_progress',
      };
      const completedTask: Task = {
        id: '3',
        title: 'Completed Task',
        status: 'completed',
      };

      expect(todoTask.status).toBe('todo');
      expect(inProgressTask.status).toBe('in_progress');
      expect(completedTask.status).toBe('completed');
    });

    it('should handle tasks with string IDs', () => {
      const taskWithStringId: Task = {
        id: 'temp-123',
        title: 'Task with string ID',
        status: 'todo',
      };

      expect(typeof taskWithStringId.id).toBe('string');
      expect(taskWithStringId.id).toBe('temp-123');
      expect(taskWithStringId.status).toBe('todo');
    });

    it('should handle tasks with numeric IDs', () => {
      const taskWithNumericId: Task = {
        id: 123,
        title: 'Task with numeric ID',
        status: 'in_progress',
      };

      expect(typeof taskWithNumericId.id).toBe('number');
      expect(taskWithNumericId.id).toBe(123);
      expect(taskWithNumericId.status).toBe('in_progress');
    });
  });

  describe('Task operations logic', () => {
    it('should add task to correct status group', () => {
      const tasks: Task[] = [];
      const newTask: Task = { id: '1', title: 'New Task', status: 'todo' };

      const updatedTasks = [...tasks, newTask];
      const result = createColumns(updatedTasks);

      expect(result.todo).toHaveLength(1);
      expect(result.todo[0]).toEqual(newTask);
    });

    it('should move task between status groups', () => {
      const tasks: Task[] = [
        { id: '1', title: 'Task 1', status: 'todo' },
        { id: '2', title: 'Task 2', status: 'in_progress' },
      ];

      // Move task 1 from todo to in_progress
      const updatedTasks = tasks.map(task =>
        task.id === '1' ? { ...task, status: 'in_progress' as const } : task
      );

      const result = createColumns(updatedTasks);

      expect(result.todo).toHaveLength(0);
      expect(result.in_progress).toHaveLength(2);
      expect(result.in_progress[0].id).toBe('1');
      expect(result.in_progress[1].id).toBe('2');
    });

    it('should remove task from all groups', () => {
      const tasks: Task[] = [
        { id: '1', title: 'Task 1', status: 'todo' },
        { id: '2', title: 'Task 2', status: 'in_progress' },
        { id: '3', title: 'Task 3', status: 'completed' },
      ];

      // Remove task 2
      const updatedTasks = tasks.filter(task => task.id !== '2');
      const result = createColumns(updatedTasks);

      expect(result.todo).toHaveLength(1);
      expect(result.in_progress).toHaveLength(0);
      expect(result.completed).toHaveLength(1);
      expect(result.todo[0].id).toBe('1');
      expect(result.completed[0].id).toBe('3');
    });
  });
});
