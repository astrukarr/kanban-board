'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { useState, useCallback } from 'react';
import { COLUMN_CONFIG } from '@/constants';
import { useTasks } from '@/hooks/useTasks';
import TaskColumn from './TaskColumn';
import TaskCard from '../TaskCard/Card';
import { NewTaskModal } from '@/components/modals/NewTaskModal';
import type { TaskStatus, Task } from '@/types';

export default function BoardWrapper() {
  const { tasks, columns, loading, error, moveTask, addTask, removeTask } =
    useTasks();
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

      const taskId = active.id as number;
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

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-slate-600">Loading tasks...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
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
              items={columns[status]}
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
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
        defaultStatus={selectedStatus}
      />
    </div>
  );
}
