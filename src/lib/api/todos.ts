import type { TaskStatus, Task } from '@/types';

// Fetch funkcija za dohvaćanje podataka s jsonplaceholder
async function fetchTodos() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=12'
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

function modToStatus(id: number): TaskStatus {
  const m = id % 3;
  if (m === 0) return 'todo'; // Brand/indigo  (To Do)
  if (m === 1) return 'in_progress'; // Warning/amber (In Progress)
  return 'completed'; // Success/green (Completed)
}

// Async funkcija za dohvaćanje i mapiranje podataka
export async function getTasks(): Promise<Task[]> {
  const data = await fetchTodos();
  return data.map((t: any) => ({
    id: t.id,
    title: t.title,
    status: modToStatus(t.id),
  }));
}

// Funkcija za kreiranje columns objekta
export function createColumns(tasks: Task[]) {
  return {
    todo: tasks.filter(t => t.status === 'todo'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    completed: tasks.filter(t => t.status === 'completed'),
  };
}

// Export za kompatibilnost s postojećim kodom (trenutno prazan)
export const tasks: Task[] = [];
export const columns = {
  todo: [],
  in_progress: [],
  completed: [],
};
