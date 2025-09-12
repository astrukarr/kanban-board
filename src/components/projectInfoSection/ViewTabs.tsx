'use client';
import Image from 'next/image';
import type { ViewTabId, ViewTab } from '../../types';

type ViewTabsProps = {
  items: ViewTab[];
  activeId: ViewTabId;
  onChange?: (id: ViewTabId) => void;
  className?: string;
};

export default function ViewTabs({
  items,
  activeId,
  onChange,
  className,
}: ViewTabsProps) {
  return (
    <div
      className={[
        'inline-flex items-center rounded-full bg-slate-100 p-1',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map(tab => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            aria-pressed={isActive}
            onClick={onChange ? () => onChange(tab.id) : undefined}
            className={[
              'inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold cursor-pointer',
              isActive
                ? 'bg-white text-slate-800 shadow-[0_4px_8px_-2px_rgba(23,23,23,0.10),0_2px_4px_-2px_rgba(23,23,23,0.06)]'
                : 'text-slate-600',
            ].join(' ')}
          >
            <Image
              src={tab.icon}
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
