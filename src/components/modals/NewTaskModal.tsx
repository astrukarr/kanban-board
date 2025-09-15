import React, { useState } from 'react';
import type { Task, TaskStatus } from '@/types';
import { NewTaskForm } from './NewTaskForm';
import { Toast } from '@/components/ui/Toast';
import { createTask, createTaskAPI } from '@/utils/taskCreation';
import { createApiError } from '@/utils/errorHelpers';

type NewTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
  defaultStatus?: TaskStatus;
};

export const NewTaskModal = ({
  isOpen,
  onClose,
  onTaskCreated,
  defaultStatus = 'todo',
}: NewTaskModalProps) => {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleSubmit = async (data: {
    title: string;
    status: TaskStatus;
    description?: string;
  }) => {
    // Create task object
    const newTask = createTask(data);

    // Add to state immediately (optimistic update)
    onTaskCreated(newTask);

    try {
      // Send to API
      await createTaskAPI(data);

      // Show success message
      setToast({ message: 'Task created successfully!', type: 'success' });
    } catch (error) {
      // Show error message with proper error handling
      const apiError = createApiError(error);
      setToast({ message: apiError.message, type: 'error' });
    }

    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Create New Task</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <NewTaskForm
            defaultStatus={defaultStatus}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};
