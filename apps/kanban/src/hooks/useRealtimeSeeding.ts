import { useEffect, useRef, useState } from 'react';
import type { Task } from '@/types';

type UseRealtimeSeedingParams = {
  roomActive: boolean;
  rtTasks: ReadonlyArray<Task>;
  tasks: ReadonlyArray<Task>;
  isHydrated: boolean;
  addOrUpdateTask: (task: Task) => void;
};

export function useRealtimeSeeding({
  roomActive,
  rtTasks,
  tasks,
  isHydrated,
  addOrUpdateTask,
}: UseRealtimeSeedingParams) {
  // Seed Yjs once if room is active and doc is empty
  // best‑effort seed in effect (runs once)
  const didSeedRef = useRef(false);
  const [isSeeded, setIsSeeded] = useState(false);

  useEffect(() => {
    if (!roomActive || didSeedRef.current) return;
    if (!isHydrated) return;
    if (rtTasks.length > 0) {
      setIsSeeded(true);
      didSeedRef.current = true;
      return;
    }
    if (tasks.length === 0) return;

    const seen = new Set<string>();
    tasks.forEach(t => {
      if (!seen.has(t.id)) {
        seen.add(t.id);
        addOrUpdateTask(t);
      }
    });
    didSeedRef.current = true;
    setIsSeeded(true);
  }, [roomActive, isHydrated, rtTasks.length, tasks, addOrUpdateTask]);

  return { isSeeded };
}
