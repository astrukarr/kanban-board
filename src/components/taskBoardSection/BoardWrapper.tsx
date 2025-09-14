'use client';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import React, { Suspense, lazy } from 'react';
import { COLUMN_CONFIG } from '@/constants';
import { useTasks } from '@/hooks/useTasks';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useTaskModal } from '@/hooks/useTaskModal';
import TaskColumn from './TaskColumn';
import TaskCard from '../TaskCard/Card';
import Loading from '@/components/ui/Loading';

// Lazy load heavy modal component
const NewTaskModal = lazy(() =>
  import('@/components/modals/NewTaskModal').then(module => ({
    default: module.NewTaskModal,
  }))
);

export default function BoardWrapper() {
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

  // Use drag and drop hook
  const { activeTask, sensors, handleDragStart, handleDragEnd } =
    useDragAndDrop({
      tasks,
      moveTask,
    });

  // Use task modal hook
  const {
    isModalOpen,
    selectedStatus,
    handleAddTask,
    handleTaskCreated,
    handleCloseModal,
  } = useTaskModal({ addTask });

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
      {/* <div className="mb-6">
        <button
          onClick={() => handleAddTask('todo')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          + Add New Task
        </button>
      </div> */}

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {COLUMN_CONFIG.map(({ status, title }) => (
            <TaskColumn
              key={status}
              title={title}
              status={status}
              items={columns[status as keyof typeof columns]}
              onAddTask={handleAddTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              id={activeTask.id}
              title={activeTask.title}
              status={activeTask.status}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <Suspense fallback={<Loading message="Loading modal..." />}>
        <NewTaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onTaskCreated={handleTaskCreated}
          defaultStatus={selectedStatus}
        />
      </Suspense>
    </div>
  );
}
