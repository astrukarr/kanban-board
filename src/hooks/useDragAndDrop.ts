import { useState, useCallback } from 'react';
import {
  DragEndEvent,
  DragStartEvent,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Task, TaskStatus } from '@/types';

interface UseDragAndDropProps {
  tasks: Task[];
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
}

export const useDragAndDrop = ({ tasks, moveTask }: UseDragAndDropProps) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Configure sensors for better touch support
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8, // Require 8px movement before drag starts
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100, // 100ms delay before drag starts
      tolerance: 3, // 3px tolerance for touch movement
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

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

  return {
    activeTask,
    sensors,
    handleDragStart,
    handleDragEnd,
  };
};
