import { renderHook, act } from '@testing-library/react';
import * as Y from 'yjs';
import { setRoom } from '@/components/realtime/registry';
import { useRealtimeTasks } from '../useRealtimeTasks';

// Helper to set ?rt=1 for enabling realtime in hook
const withRealtimeParam = () => {
  const url = 'http://localhost/project/test?rt=1';
  window.history.pushState({}, '', url);
};

describe('useRealtimeTasks', () => {
  beforeEach(() => {
    // Ensure clean localStorage between tests
    window.localStorage.clear();
    withRealtimeParam();
  });

  it('happy path: adds or updates a task and reflects in state', () => {
    const roomId = 'kanban-test';
    const doc = new Y.Doc();
    setRoom(roomId, {
      doc,
      provider: {} as import('y-websocket').WebsocketProvider,
    });

    const { result } = renderHook(() => useRealtimeTasks(roomId));

    const task = { id: 't1', title: 'First', status: 'todo' as const };

    act(() => {
      result.current.addOrUpdateTask(task);
    });

    expect(result.current.tasks.find(t => t.id === 't1')?.title).toBe('First');

    act(() => {
      result.current.moveTask('t1', 'in_progress');
    });

    expect(result.current.tasks.find(t => t.id === 't1')?.status).toBe(
      'in_progress'
    );
  });

  it('remote update: marks changed id as recently remote', () => {
    const roomId = 'kanban-remote';
    const doc = new Y.Doc();
    setRoom(roomId, {
      doc,
      provider: {} as import('y-websocket').WebsocketProvider,
    });

    const { result } = renderHook(() => useRealtimeTasks(roomId));

    const yarray = doc.getArray<{ id: string; title: string; status: unknown }>(
      'tasks'
    );

    act(() => {
      doc.transact(() => {
        yarray.insert(0, [{ id: 'x', title: 'Remote', status: 'todo' }]);
      }, 12345 /* remote origin different from clientID */);
    });

    expect(result.current.tasks.find(t => t.id === 'x')?.title).toBe('Remote');
    expect(result.current.isRecentlyRemote('x')).toBe(true);
  });
});
