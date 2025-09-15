'use client';

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useTaskModal } from '@/hooks/useTaskModal';
import Loading from '@/components/ui/Loading';
import { useParams } from 'next/navigation';
import { useRealtimeTasks } from '@/hooks/useRealtimeTasks';
import { useBoardDerivations } from './useBoardDerivations';
import { RealtimeToolbar } from './RealtimeToolbar';
import { ColumnsGrid } from './ColumnsGrid';
import { DndLayer } from './DndLayer';

// Lazy load heavy modal component
const NewTaskModal = lazy(() =>
  import('@/components/modals/NewTaskModal').then(module => ({
    default: module.NewTaskModal,
  }))
);

export default function BoardWrapper() {
  // Realtime: uvijek pozovi hook bezuvjetno da ne mijenjamo redoslijed hookova
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
  const {
    tasks,
    columns,
    loading,
    error,
    moveTask,
    addTask,
    // removeTask, // TODO: Implement task removal functionality
    isHydrated,
  } = useTasks();

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

  // Use drag and drop hook (Yjs kao izvor istine kada je soba aktivna)
  const tasksForDnd = roomActive ? rtTasks : tasks;
  const moveForDnd = roomActive ? moveTaskRT : moveTask;
  const { activeTask, sensors, handleDragStart, handleDragEnd } =
    useDragAndDrop({
      tasks: tasksForDnd,
      moveTask: (id, status) => {
        moveForDnd(id, status);
      },
    });

  // Use task modal hook
  const {
    isModalOpen,
    selectedStatus,
    handleAddTask,
    handleTaskCreated,
    handleCloseModal,
  } = useTaskModal({ addTask });

  // When RT is active, create tasks directly in Yjs; otherwise use local handler
  const handleTaskCreatedUnified = (task: {
    id: string;
    title: string;
    status: 'todo' | 'in_progress' | 'completed';
  }) => {
    if (roomActive) {
      addOrUpdateTask(task);
    } else {
      handleTaskCreated(task);
    }
  };

  const { derivedColumns } = useBoardDerivations({
    roomActive,
    rtTasks,
    isSeeded,
    tasks,
    columns,
  });

  if (!isHydrated) {
    return (
      <div className="w-full p-4 sm:p-6 md:p-8 min-h-[600px]">
        <Loading message="Loading tasks..." />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6 md:p-8 min-h-[600px]">
        <Loading message="Loading tasks..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 sm:p-6 md:p-8 min-h-[600px]">
        <Loading variant="error" message={`Error: ${error}`} />
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      <RealtimeToolbar roomActive={roomActive} rtCount={rtTasks.length} />
      <DndLayer
        sensors={sensors}
        activeTask={activeTask}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <ColumnsGrid columns={derivedColumns} onAddTask={handleAddTask} />
      </DndLayer>

      <Suspense fallback={<Loading message="Loading modal..." />}>
        <NewTaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onTaskCreated={handleTaskCreatedUnified}
          defaultStatus={selectedStatus}
        />
      </Suspense>
    </div>
  );
}
