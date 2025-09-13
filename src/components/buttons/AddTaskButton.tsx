import Image from 'next/image';
import type { TaskStatus } from '@/types';

type AddTaskButtonProps = {
  status: TaskStatus;
  onClick: () => void;
};

export default function AddTaskButton({ status, onClick }: AddTaskButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors"
      aria-label="Add task"
      title="Add task"
    >
      <Image
        src="/static/icons/Plus.svg"
        alt="Add New Task"
        width={20}
        height={20}
        className="h-5 w-5"
      />
    </button>
  );
}
