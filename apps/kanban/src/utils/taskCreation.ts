import type { Task, TaskStatus } from '@/types';

/**
 * Generate a temporary ID for optimistic updates
 */
export const generateTempId = (): string => {
  return `temp-${Date.now()}`;
};

/**
 * Create a new task object with the provided data
 */
export const createTask = (data: {
  title: string;
  status: TaskStatus;
  description?: string;
}): Task => {
  return {
    id: generateTempId(),
    title: data.title,
    status: data.status,
    description: data.description || '',
  };
};

/**
 * Send task creation request to API
 */
export const createTaskAPI = async (data: {
  title: string;
  status: TaskStatus;
}): Promise<{ id: string }> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: data.title,
      completed: data.status === 'completed',
      userId: 1,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  const result = await response.json();
  return { id: result.id.toString() }; // Convert number to string
};
