import { useTaskModal } from './useTaskModal';
import type { Task } from '@/types';

type UseTaskHandlersParams = {
  addTask: (task: Task) => void;
  roomActive: boolean;
  addOrUpdateTask: (task: Task) => void;
};

export function useTaskHandlers({
  addTask,
  roomActive,
  addOrUpdateTask,
}: UseTaskHandlersParams) {
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

  return {
    isModalOpen,
    selectedStatus,
    handleAddTask,
    handleCloseModal,
    handleTaskCreatedUnified,
  };
}
