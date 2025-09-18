import Image from 'next/image';

export default function BackButton() {
  return (
    <button
      type="button"
      aria-label="Back to project"
      className="flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <Image
        src="/static/icons/ArrowRight.svg"
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 rotate-180"
        aria-hidden="true"
      />
      <span className="text-sm font-bold text-indigo-600">Back To Project</span>
    </button>
  );
}
