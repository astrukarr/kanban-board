import Image from 'next/image';
import type { TaskStatus } from '@/types';

type AddTaskButtonProps = {
  status: TaskStatus;
  onClick: () => void;
};

export default function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      aria-label="Add task"
      title="Add task"
    >
      <Image
        src="/static/icons/Plus.svg"
        alt=""
        width={20}
        height={20}
        className="h-5 w-5"
        aria-hidden="true"
      />
    </button>
  );
}
