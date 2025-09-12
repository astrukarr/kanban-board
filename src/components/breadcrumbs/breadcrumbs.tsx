import type { BreadcrumbsProps } from '../../types';
import Image from 'next/image';

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      {items.map((item, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === items.length - 1;

        return (
          <div key={item.id} className="flex items-center gap-2 cursor-pointer">
            {!isFirst && (
              <Image
                src="/static/icons/ArrowRight.svg"
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                className="h-5 w-5 shrink-0"
              />
            )}

            {item.iconSrc ? (
              <span
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-slate-100"
                aria-label={item.alt || item.label || 'Breadcrumb'}
                {...(isLast ? { 'aria-current': 'page' } : {})}
              >
                <Image
                  src={item.iconSrc}
                  alt={item.alt || ''}
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-2 font-bold text-sm tracking-tight ${
                  isLast ? 'text-indigo-600' : 'text-slate-600'
                }`}
                {...(isLast ? { 'aria-current': 'page' } : {})}
              >
                {isLast && (
                  <Image
                    src="/static/icons/Sphere.svg"
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                )}
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
