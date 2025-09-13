'use client';

import { SidebarItemProps } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Item({ id, src, alt }: SidebarItemProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate based on item ID
    switch (id) {
      case 'home':
        router.push('/');
        break;
      case 'analytics':
        router.push('/dashboard');
        break;
      case 'settings':
        router.push('/settings');
        break;
      default:
        // For other items, you can add more routes later
        break;
    }
  };

  return (
    <button
      type="button"
      aria-label={alt}
      onClick={handleClick}
      className="grid h-12 w-12 place-items-center rounded-full hover:bg-slate-50 transition cursor-pointer"
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
