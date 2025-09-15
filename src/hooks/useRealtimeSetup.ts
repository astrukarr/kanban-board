import { useParams } from 'next/navigation';
import { useRealtimeTasks } from './useRealtimeTasks';

export function useRealtimeSetup() {
  const params = useParams<{ slug?: string }>();
  const roomKey = params?.slug ? `kanban-${params.slug}` : '__no_room__';

  // Check if realtime is actually enabled via URL param
  const isRealtimeEnabled =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('rt') === '1';
  const roomActive = roomKey !== '__no_room__' && isRealtimeEnabled;

  const {
    tasks: rtTasks,
    addOrUpdateTask,
    moveTask: moveTaskRT,
  } = useRealtimeTasks(roomKey);

  return {
    roomKey,
    isRealtimeEnabled,
    roomActive,
    rtTasks,
    addOrUpdateTask,
    moveTaskRT,
  };
}
