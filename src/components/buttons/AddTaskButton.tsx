import Image from 'next/image';

export default function AddTaskButton() {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 cursor-pointer"
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
