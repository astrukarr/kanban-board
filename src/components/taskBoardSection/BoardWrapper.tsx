import { columns } from '@/lib/api/todos';
import TaskColumn from './TaskColumn';

type Status = keyof typeof columns;

const COLUMN_CONFIG: ReadonlyArray<{ status: Status; title: string }> = [
  { status: 'todo', title: 'To Do' },
  { status: 'in_progress', title: 'In Progress' },
  { status: 'completed', title: 'Completed' },
] as const;

export default function BoardWrapper() {
  return (
    <div className="w-full  p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COLUMN_CONFIG.map(({ status, title }) => (
          <TaskColumn
            key={status}
            title={title}
            status={status}
            items={columns[status]}
          />
        ))}
      </div>
    </div>
  );
}
