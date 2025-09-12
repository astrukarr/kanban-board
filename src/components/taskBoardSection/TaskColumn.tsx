import { Task, TaskStatus } from '@/lib/api/todos';
import TaskCard from '../TaskCard/Card';
import AddTaskButton from '../buttons/AddTaskButton';

type Props = {
  title: string;
  status: TaskStatus;
  items: Task[];
};

function headerStyle(status: TaskStatus) {
  if (status === 'completed')
    return { dot: 'bg-emerald-500', chip: 'bg-emerald-100 text-emerald-600' };
  if (status === 'in_progress')
    return { dot: 'bg-amber-500', chip: 'bg-amber-100 text-amber-600' };
  return { dot: 'bg-indigo-600', chip: 'bg-indigo-100 text-indigo-600' };
}

export default function TaskColumn({ title, status, items }: Props) {
  const h = headerStyle(status);

  return (
    <section className="box-border flex flex-col rounded-[32px] border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex max-w-[328px] items-center gap-2">
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${h.dot}`} />
          <h2 className="text-xl font-extrabold leading-7 tracking-[-0.01em] text-slate-800">
            {title}{' '}
            <span className="text-gray-400 font-semibold">
              ({items.length})
            </span>
          </h2>
        </div>
        <AddTaskButton />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {items.map(t => (
          <TaskCard key={t.id} id={t.id} title={t.title} status={t.status} />
        ))}
      </div>
    </section>
  );
}
