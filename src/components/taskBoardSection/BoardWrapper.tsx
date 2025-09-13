'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import React, { useState, useCallback, Suspense, lazy } from 'react';
import { COLUMN_CONFIG } from '@/constants';
import { useTasks } from '@/hooks/useTasks';
import TaskColumn from './TaskColumn';
import TaskCard from '../TaskCard/Card';
import Loading from '@/components/ui/Loading';
import type { TaskStatus, Task } from '@/types';

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
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('todo');

  // Memoize drag handlers to prevent unnecessary re-renders
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveTask(active.data.current as Task);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      const taskId = active.id as string;
      const newStatus = over.id as TaskStatus;

      // Check if task is already in that column
      const currentTask = tasks.find(t => t.id === taskId);
      if (currentTask && currentTask.status !== newStatus) {
        moveTask(taskId, newStatus);
      }

      setActiveTask(null);
    },
    [tasks, moveTask]
  );

  const handleAddTask = useCallback((status: TaskStatus) => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  }, []);

  const handleTaskCreated = useCallback(
    (task: Task) => {
      addTask(task);
    },
    [addTask]
  );

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
      {/* Add Task Button */}
      <div className="mb-6">
        <button
          onClick={() => handleAddTask('todo')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          + Add New Task
        </button>
      </div>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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

      {/* Modal */}
      <Suspense fallback={<Loading message="Loading modal..." />}>
        <NewTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskCreated={handleTaskCreated}
          defaultStatus={selectedStatus}
        />
      </Suspense>
    </div>
  );
}
