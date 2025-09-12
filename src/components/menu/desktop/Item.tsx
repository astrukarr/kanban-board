import { SidebarItemProps } from '@/types';
import Image from 'next/image';

export default function Item({ src, alt }: SidebarItemProps) {
  return (
    <button
      type="button"
      aria-label={alt}
      className="grid h-12 w-12 place-items-center rounded-full hover:bg-slate-50 transition"
    >
      <Image
        src={src}
        alt={alt}
        width={24}
        height={24}
        className="h-6 w-6 cursor-pointer"
      />
    </button>
  );
}
