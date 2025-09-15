import { useMemo } from 'react';
import type { Task } from '@/types';

export type Columns = Record<'todo' | 'in_progress' | 'completed', Task[]>;

type Params = {
  roomActive: boolean;
  rtTasks: ReadonlyArray<Task>;
  isSeeded: boolean;
  tasks: ReadonlyArray<Task>;
  columns: Columns;
};

export function useBoardDerivations({
  roomActive,
  rtTasks,
  isSeeded,
  tasks,
  columns,
}: Params) {
  const derivedColumns = useMemo<Columns>(() => {
    if (!roomActive) return columns;
    const source = rtTasks.length > 0 || isSeeded ? rtTasks : tasks;
    return {
      todo: source.filter(t => t.status === 'todo'),
      in_progress: source.filter(t => t.status === 'in_progress'),
      completed: source.filter(t => t.status === 'completed'),
    };
  }, [roomActive, rtTasks, isSeeded, tasks, columns]);

  return { derivedColumns };
}
