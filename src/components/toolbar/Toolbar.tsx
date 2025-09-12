import type { BreadcrumbsProps } from '../../types';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import InviteButton from '../buttons/InviteButton';
import Image from 'next/image';
import SearchButton from '../buttons/SearchButton';

type ToolbarProps = {
  breadcrumbs: BreadcrumbsProps['items'];
};

const AVATARS: string[] = [
  '/static/images/Avatar1.png',
  '/static/images/Avatar2.png',
  '/static/images/Avatar3.png',
  '/static/images/Avatar4.png',
  '/static/images/Avatar5.png',
  '/static/images/Avatar6.png',
  '/static/images/Avatar7.png',
];

export default function Toolbar({ breadcrumbs }: ToolbarProps) {
  return (
    <div className="box-border w-full bg-slate-50">
      <div className="flex h-20 w-full items-center justify-between px-8 py-5">
        <div className="flex-1">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="flex items-center gap-2">
          <SearchButton />

          <div className="flex items-center -space-x-3 pl-1">
            {AVATARS.map((src, i) => (
              <Image
                key={`av-${i}`}
                src={src}
                alt={`Member ${i + 1}`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-white object-cover cursor-pointer"
                draggable={false}
                style={{ zIndex: i + 1 }}
              />
            ))}
          </div>

          <InviteButton />
        </div>
      </div>
    </div>
  );
}
