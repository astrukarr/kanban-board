'use client';

import { useDraggable } from '@dnd-kit/core';
import { TaskCardProps } from '@/types';
import { STATUS_LABELS } from '@/constants';
import { calculateCounts, calculateProgress, getColorConfig } from '@/utils';
import ProgressBar from './ProgressBar';
import AvatarGroup from './AvatarGroup';
import Image from 'next/image';

export default function TaskCard({ id, title, status }: TaskCardProps) {
  const { comments, checks } = calculateCounts(id);
  const progress = calculateProgress(status, id);
  const colorConfig = getColorConfig(status);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: {
        id,
        title,
        status,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-3xl border border-slate-200 bg-white p-3 shadow-md cursor-pointer transition-opacity ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div
        className={`inline-flex items-center justify-center gap-1 rounded-full px-2 py-1 ${colorConfig.chipBg}`}
      >
        <span className={`text-xs font-semibold ${colorConfig.chipText}`}>
          {STATUS_LABELS[status]}
        </span>
      </div>

      <div className="mt-3 text-base font-bold leading-6 text-slate-800">
        {title}
      </div>

      <div className="mt-3">
        <ProgressBar percent={progress} variant={colorConfig.variant} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <AvatarGroup count={3} />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-slate-800">
            <Image
              src="/static/icons/Comments.svg"
              alt="Comments"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="text-sm font-semibold">{comments}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-800">
            <Image
              src="/static/icons/Checkmark.svg"
              alt="Checks"
              width={20}
              height={20}
              className="h-5 w-5"
            />

            <span className="text-sm font-semibold">{checks}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
