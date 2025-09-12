// components/common/AvatarGroup.tsx
// Expects files: /public/avatars/Avatar1.png ... Avatar7.png (or adjust basePath/ext)
import Image from 'next/image';

export default function AvatarGroup({
  count = 2,
  ids, // e.g. [3, 1, 7] to pick specific avatars
  basePath = '/static/images/Avatar',
  ext = 'png',
  className = '',
}: {
  count?: number;
  ids?: number[]; // numbers 1..7
  basePath?: string; // change if your path differs
  ext?: 'png' | 'jpg' | 'jpeg' | 'webp' | 'svg';
  className?: string;
}) {
  const picks = (
    ids && ids.length ? ids : Array.from({ length: count }, (_, i) => i + 1)
  )
    .slice(0, count)
    .map(n => `${basePath}${((n - 1) % 7) + 1}.${ext}`);

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {picks.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full ring-2 ring-white object-cover cursor-pointer"
        />
      ))}
    </div>
  );
}
