import Image from 'next/image';

export default function BackButton() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/static/icons/ArrowRight.svg"
        alt="Back"
        width={20}
        height={20}
        className="h-5 w-5 rotate-180"
      />
      <span className="text-sm font-bold text-indigo-600">Back To Project</span>
    </div>
  );
}
