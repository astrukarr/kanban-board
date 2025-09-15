'use client';

import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useRealtimeSetup } from '@/hooks/useRealtimeSetup';
import { useRealtimeSeeding } from '@/hooks/useRealtimeSeeding';
import { useTaskHandlers } from '@/hooks/useTaskHandlers';
import { useBoardDerivations } from './useBoardDerivations';
import { BoardLoadingStates } from './BoardLoadingStates';
import { BoardContent } from './BoardContent';

export default function BoardWrapper() {
  // Realtime setup
  const { roomActive, rtTasks, addOrUpdateTask, moveTaskRT } =
    useRealtimeSetup();

  // Local tasks
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

  // Yjs seeding
  const { isSeeded } = useRealtimeSeeding({
    roomActive,
    rtTasks,
    tasks,
    isHydrated,
    addOrUpdateTask,
  });

  // Use drag and drop hook (Yjs as source of truth when room is active)
  const tasksForDnd = roomActive ? rtTasks : tasks;
  const moveForDnd = roomActive ? moveTaskRT : moveTask;
  const { activeTask, sensors, handleDragStart, handleDragEnd } =
    useDragAndDrop({
      tasks: tasksForDnd,
      moveTask: (id, status) => {
        moveForDnd(id, status);
      },
    });

  // Task handlers
  const {
    isModalOpen,
    selectedStatus,
    handleAddTask,
    handleCloseModal,
    handleTaskCreatedUnified,
  } = useTaskHandlers({
    addTask,
    roomActive,
    addOrUpdateTask,
  });

  // Board derivations
  const { derivedColumns } = useBoardDerivations({
    roomActive,
    rtTasks,
    isSeeded,
    tasks,
    columns,
  });

  // Loading states
  if (!isHydrated || loading || error) {
    return (
      <BoardLoadingStates
        isHydrated={isHydrated}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <BoardContent
      roomActive={roomActive}
      rtCount={rtTasks.length}
      sensors={sensors}
      activeTask={activeTask}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      columns={derivedColumns}
      onAddTask={handleAddTask}
      isModalOpen={isModalOpen}
      onCloseModal={handleCloseModal}
      onTaskCreated={handleTaskCreatedUnified}
      defaultStatus={selectedStatus}
    />
  );
}
