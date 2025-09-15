import type { TaskStatus, Task } from '@/types';
import { ENV_CONFIG, TASK_CONFIG } from '@/constants';
import { createApiError, safeLocalStorageGet } from '@/utils/errorHelpers';
import { logout } from '@/utils/auth';

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return safeLocalStorageGet('token');
  }
  return null;
}

// Fetch function with authentication
type RemoteTodo = { id: number; title: string };
async function fetchTodos(): Promise<RemoteTodo[]> {
  try {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${ENV_CONFIG.API_BASE_URL}/todos?_limit=12`, {
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid - logout user
        logout();
        throw new Error('Unauthorized');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Guard JSON parsing in case of empty or invalid body
    const text = await response.text();
    if (!text) return [] as RemoteTodo[];
    try {
      const raw = JSON.parse(text) as unknown[];
      const isRemoteTodo = (v: unknown): v is RemoteTodo => {
        if (!v || typeof v !== 'object') return false;
        const r = v as Record<string, unknown>;
        return typeof r.id === 'number' && typeof r.title === 'string';
      };
      return raw.filter(isRemoteTodo);
    } catch {
      throw new Error('Invalid JSON response');
    }
  } catch (error) {
    throw createApiError(error);
  }
}

function modToStatus(id: number): TaskStatus {
  const m = id % TASK_CONFIG.STATUS_COUNT;
  if (m === 0) return 'todo'; // Brand/indigo  (To Do)
  if (m === 1) return 'in_progress'; // Warning/amber (In Progress)
  return 'completed'; // Success/green (Completed)
}

// Async funkcija za dohvaćanje i mapiranje podataka
export async function getTasks(): Promise<Task[]> {
  const data = await fetchTodos();
  return data.map(t => ({
    id: t.id.toString(), // Convert number to string
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
