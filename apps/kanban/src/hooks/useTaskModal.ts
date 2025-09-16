import { useState, useCallback } from 'react';
import type { TaskStatus, Task } from '@/types';

interface UseTaskModalProps {
  addTask: (task: Task) => void;
}

export const useTaskModal = ({ addTask }: UseTaskModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('todo');

  const handleAddTask = useCallback((status: TaskStatus) => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  }, []);

  const handleTaskCreated = useCallback(
    (task: Task) => {
      addTask(task);
      setIsModalOpen(false);
    },
    [addTask]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    selectedStatus,
    handleAddTask,
    handleTaskCreated,
    handleCloseModal,
  };
};
