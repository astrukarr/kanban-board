import { TaskStatus } from '@/lib/api/todos';
import ProgressBar from './ProgressBar';
import AvatarGroup from './AvatarGroup';
import Image from 'next/image';

type Props = {
  id: number;
  title: string;
  status: TaskStatus;
};

function counts(id: number) {
  const comments = ((id * 3) % 21) + 1;
  const checks = ((id * 5) % 56) + 1;
  return { comments, checks };
}

function progressFor(status: TaskStatus, id: number) {
  if (status === 'completed') return 100;
  if (status === 'in_progress') return 40 + (id % 40);
  return 5 + (id % 20);
}

function colorsFor(status: TaskStatus) {
  if (status === 'completed')
    return {
      chipBg: 'bg-emerald-100',
      chipText: 'text-emerald-600',
      variant: 'success' as const,
    };
  if (status === 'in_progress')
    return {
      chipBg: 'bg-amber-100',
      chipText: 'text-amber-600',
      variant: 'warning' as const,
    };
  return {
    chipBg: 'bg-indigo-100',
    chipText: 'text-indigo-600',
    variant: 'brand' as const,
  };
}

export default function TaskCard({ id, title, status }: Props) {
  const { comments, checks } = counts(id);
  const progress = progressFor(status, id);
  const c = colorsFor(status);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-md cursor-pointer">
      <div
        className={`inline-flex items-center justify-center gap-1 rounded-full px-2 py-1 ${c.chipBg}`}
      >
        <span className={`text-xs font-semibold ${c.chipText}`}>
          {status === 'todo'
            ? 'To Do'
            : status === 'in_progress'
              ? 'In Progress'
              : 'Done'}
        </span>
      </div>

      <div className="mt-3 text-base font-bold leading-6 text-slate-800">
        {title}
      </div>

      <div className="mt-3">
        <ProgressBar percent={progress} variant={c.variant} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <AvatarGroup count={3} />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-slate-800">
            <Image
              src="/static/icons/Comments.svg"
              alt="Comments"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="text-sm font-semibold">{comments}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-800">
            <Image
              src="/static/icons/Checkmark.svg"
              alt="Checks"
              width={20}
              height={20}
              className="h-5 w-5"
            />

            <span className="text-sm font-semibold">{checks}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
