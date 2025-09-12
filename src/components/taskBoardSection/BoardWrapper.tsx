import { columns } from '@/lib/api/todos';
import { COLUMN_CONFIG } from '@/constants';
import TaskColumn from './TaskColumn';

export default function BoardWrapper() {
  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
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
