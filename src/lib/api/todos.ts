// Map JSON -> Task { id, title, status } using id % 3

export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type Task = { id: number; title: string; status: TaskStatus };

// enable in tsconfig: "resolveJsonModule": true, "esModuleInterop": true
import DATA from '../../data/todos.json';

function modToStatus(id: number): TaskStatus {
  const m = id % 3;
  if (m === 0) return 'todo'; // Brand/indigo  (To Do)
  if (m === 1) return 'in_progress'; // Warning/amber (In Progress)
  return 'completed'; // Success/green (Completed)
}

export const tasks: Task[] = (DATA as any[]).map(t => ({
  id: t.id,
  title: t.title,
  status: modToStatus(t.id),
}));

export const columns = {
  todo: tasks.filter(t => t.status === 'todo'),
  in_progress: tasks.filter(t => t.status === 'in_progress'),
  completed: tasks.filter(t => t.status === 'completed'),
};
