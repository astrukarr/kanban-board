import React from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import TaskCard from '../TaskCard/Card';
import type { Task } from '@/types';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

type Props = {
  sensors: ReturnType<typeof import('@dnd-kit/core').useSensors>;
  activeTask: Task | null;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  children: React.ReactNode;
};

export function DndLayer({
  sensors,
  activeTask,
  onDragStart,
  onDragEnd,
  children,
}: Props) {
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
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
  );
}
