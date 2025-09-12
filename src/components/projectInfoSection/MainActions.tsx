import type { MainAction } from '../../types';
import Image from 'next/image';

type MainActionsProps = { items: MainAction[]; className?: string };

export default function MainActions({ items, className }: MainActionsProps) {
  return (
    <div
      className={['flex items-center gap-5', className]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map(a => (
        <button
          key={a.id}
          type="button"
          aria-label={a.label}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:opacity-90 cursor-pointer"
        >
          <Image
            src={a.icon}
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span>{a.label}</span>
        </button>
      ))}
    </div>
  );
}
