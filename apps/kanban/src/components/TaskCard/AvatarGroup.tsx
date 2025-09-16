import { AvatarGroupProps } from '@/types';
import { AVATAR_PATHS } from '@/constants';
import Image from 'next/image';

export default function AvatarGroup({
  count = 2,
  ids,
  basePath = AVATAR_PATHS.basePath,
  ext = AVATAR_PATHS.ext,
  className = '',
}: AvatarGroupProps) {
  const picks = (
    ids && ids.length ? ids : Array.from({ length: count }, (_, i) => i + 1)
  )
    .slice(0, count)
    .map(n => `${basePath}${((n - 1) % AVATAR_PATHS.maxCount) + 1}.${ext}`);

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
