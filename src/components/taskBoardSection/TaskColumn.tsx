'use client';

import React, { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TaskColumnProps } from '@/types';
import { getHeaderStyle } from '@/utils';
import TaskCard from '../TaskCard/Card';
import AddTaskButton from '../buttons/AddTaskButton';

function TaskColumn({ title, status, items, onAddTask }: TaskColumnProps) {
  // Memoize header style calculation to prevent unnecessary recalculations
  const headerStyle = useMemo(() => getHeaderStyle(status), [status]);

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <section
      ref={setNodeRef}
      className={`box-border flex flex-col rounded-[32px] border border-slate-200 bg-slate-50 p-4 transition-colors ${
        isOver ? 'bg-slate-100 border-slate-300' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex max-w-[328px] items-center gap-2">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${headerStyle.dot}`}
          />
          <h2 className="text-xl font-extrabold leading-7 tracking-[-0.01em] text-slate-800">
            {title}{' '}
            <span className="text-gray-400 font-semibold">
              ({items.length})
            </span>
          </h2>
        </div>
        <AddTaskButton status={status} onClick={() => onAddTask(status)} />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {items.map(task => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
          />
        ))}
      </div>
    </section>
  );
}

// Memoize component to prevent unnecessary re-renders when props haven't changed
export default React.memo(TaskColumn);
