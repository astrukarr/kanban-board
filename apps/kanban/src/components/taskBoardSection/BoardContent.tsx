import React, { Suspense, lazy } from 'react';
import Loading from '@/components/ui/Loading';
import { RealtimeToolbar } from './RealtimeToolbar';
import { ColumnsGrid } from './ColumnsGrid';
import { DndLayer } from './DndLayer';
import type { Columns } from './useBoardDerivations';

// Lazy load heavy modal component
const NewTaskModal = lazy(() =>
  import('@/components/modals/NewTaskModal').then(module => ({
    default: module.NewTaskModal,
  }))
);

type BoardContentProps = {
  roomActive: boolean;
  rtCount: number;
  sensors: any;
  activeTask: any;
  onDragStart: (event: any) => void;
  onDragEnd: (event: any) => void;
  columns: Columns;
  onAddTask: (status: 'todo' | 'in_progress' | 'completed') => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
  onTaskCreated: (task: {
    id: string;
    title: string;
    status: 'todo' | 'in_progress' | 'completed';
  }) => void;
  defaultStatus: 'todo' | 'in_progress' | 'completed';
};

export function BoardContent({
  roomActive,
  rtCount,
  sensors,
  activeTask,
  onDragStart,
  onDragEnd,
  columns,
  onAddTask,
  isModalOpen,
  onCloseModal,
  onTaskCreated,
  defaultStatus,
}: BoardContentProps) {
  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      <RealtimeToolbar roomActive={roomActive} rtCount={rtCount} />
      <DndLayer
        sensors={sensors}
        activeTask={activeTask}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <ColumnsGrid columns={columns} onAddTask={onAddTask} />
      </DndLayer>

      <Suspense fallback={<Loading message="Loading modal..." />}>
        <NewTaskModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          onTaskCreated={onTaskCreated}
          defaultStatus={defaultStatus}
        />
      </Suspense>
    </div>
  );
}
