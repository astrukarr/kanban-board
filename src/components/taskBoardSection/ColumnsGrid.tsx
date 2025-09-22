import React from 'react';
import { COLUMN_CONFIG } from '@/constants';
import TaskColumn from './TaskColumn';
import type { Task, TaskStatus } from '@/types';

export type Columns = Record<'todo' | 'in_progress' | 'completed', Task[]>;

type Props = {
  columns: Columns;
  onAddTask: (status: TaskStatus) => void;
};

export function ColumnsGrid({ columns, onAddTask }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md2:grid-cols-3">
      {COLUMN_CONFIG.map(({ status, title }) => (
        <TaskColumn
          key={status}
          title={title}
          status={status}
          items={columns[status as keyof Columns]}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
}
