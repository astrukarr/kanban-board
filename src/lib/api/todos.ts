import type { TaskStatus, Task } from '@/types';

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

// Fetch function with authentication
async function fetchTodos() {
  try {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=12',
      { headers }
    );

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired - redirect to login
        localStorage.removeItem('token');
        window.location.href =
          '/login?message=Session expired. Please sign in again.';
        throw new Error('Unauthorized');
      }
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
  return data.map((t: { id: number; title: string }) => ({
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
