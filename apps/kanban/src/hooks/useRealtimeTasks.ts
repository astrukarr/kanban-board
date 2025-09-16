'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { safeLocalStorageSet } from '@/utils/errorHelpers';
import * as Y from 'yjs';
import { getDoc } from '@/components/realtime/registry';
import type { Task, TaskStatus } from '@/types';

type RealtimeTask = Task;

export function useRealtimeTasks(roomId: string) {
  // Check if realtime is actually enabled via URL param
  const isRealtimeEnabled =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('rt') === '1';

  // Lazily wait for RealtimeRoom to register the doc
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const storageKey = `rt:tasks:${roomId}`;

  const loadPersisted = useCallback((): RealtimeTask[] => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as RealtimeTask[];
      if (Array.isArray(parsed)) return parsed;
      return [];
    } catch {
      return [];
    }
  }, [storageKey]);

  const persist = useCallback(
    (arr: RealtimeTask[]) => {
      if (typeof window === 'undefined') return;
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(arr));
        // Mirror to shared fallback key so non-RT UI (or fallback) vidi zadnje stanje
        safeLocalStorageSet('kanban-tasks', JSON.stringify(arr));
      } catch {
        // ignore
      }
    },
    [storageKey]
  );

  useEffect(() => {
    let isMounted = true;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tryGet = () => {
      const d = getDoc(roomId);
      if (d) {
        setDoc(d);
        return;
      }
      if (isMounted) {
        timer = setTimeout(tryGet, 100);
      }
    };
    tryGet();
    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [roomId]);

  const [tasks, setTasks] = useState<RealtimeTask[]>([]);
  const [lastRemoteIds, setLastRemoteIds] = useState<Set<string>>(new Set());
  const prevMapRef = useRef<Map<string, RealtimeTask>>(new Map());

  useEffect(() => {
    if (!doc) return;
    const yarray = doc.getArray<RealtimeTask>('tasks');

    const updateFromDoc = (origin?: unknown) => {
      const isRemote = origin !== doc.clientID && origin !== undefined;
      const arr = yarray.toArray();

      if (isRemote) {
        const currMap = new Map(arr.map(t => [t.id, t] as const));
        const changedIds: string[] = [];
        currMap.forEach((curr, id) => {
          const prev = prevMapRef.current.get(id);
          if (!prev) {
            changedIds.push(id);
          } else if (prev.status !== curr.status || prev.title !== curr.title) {
            changedIds.push(id);
          }
        });
        if (changedIds.length > 0) {
          const next = new Set(lastRemoteIds);
          changedIds.forEach(id => next.add(id));
          setLastRemoteIds(next);
          setTimeout(() => {
            setLastRemoteIds(prev => {
              const copy = new Set(prev);
              changedIds.forEach(id => copy.delete(id));
              return copy;
            });
          }, 1500);
        }
        prevMapRef.current = currMap;
      } else {
        prevMapRef.current = new Map(arr.map(t => [t.id, t] as const));
      }
      setTasks(arr);
      persist(arr); // Persist changes to local storage
    };

    updateFromDoc(); // Initial load

    // observe changes
    const observer = (
      _event: Y.YArrayEvent<RealtimeTask>,
      transaction: Y.Transaction
    ) => {
      updateFromDoc(transaction.origin);
    };
    yarray.observe(
      observer as unknown as (
        arg0: Y.YArrayEvent<RealtimeTask>,
        arg1: Y.Transaction
      ) => void
    );

    return () =>
      yarray.unobserve(
        observer as unknown as (
          arg0: Y.YArrayEvent<RealtimeTask>,
          arg1: Y.Transaction
        ) => void
      );
  }, [doc, lastRemoteIds, loadPersisted, persist]);

  const addOrUpdateTask = (task: Task) => {
    if (!doc) return;
    const yarray = doc.getArray<RealtimeTask>('tasks');
    const arr = yarray.toArray();
    const map = new Map(arr.map(t => [t.id, t] as const));
    map.set(task.id, task);
    const nextArr = Array.from(map.values());
    doc.transact(() => {
      yarray.delete(0, yarray.length);
      yarray.insert(0, nextArr);
    }, doc.clientID);
  };

  const moveTask = (taskId: string, status: TaskStatus) => {
    if (!doc) return;
    const yarray = doc.getArray<RealtimeTask>('tasks');
    const arr = yarray.toArray();
    const idx = arr.findIndex(t => t.id === taskId);
    if (idx < 0) return;
    const next = { ...arr[idx], status } as RealtimeTask;
    const nextArr = arr.slice();
    nextArr[idx] = next;
    doc.transact(() => {
      yarray.delete(0, yarray.length);
      yarray.insert(0, nextArr);
    }, doc.clientID);
  };

  const isRecentlyRemote = (taskId: string) => lastRemoteIds.has(taskId);

  // Return empty state if realtime is not enabled
  if (!isRealtimeEnabled) {
    return {
      tasks: [],
      addOrUpdateTask: () => {},
      moveTask: () => {},
      isRecentlyRemote: () => false,
    };
  }

  return { tasks, addOrUpdateTask, moveTask, isRecentlyRemote };
}
