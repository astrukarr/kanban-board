'use client';

import React, { useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { TaskCardProps } from '@/types';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { STATUS_LABELS } from '@/constants';
import { calculateCounts, calculateProgress, getColorConfig } from '@/utils';
import { TaskCardErrorBoundary } from '@/components/errorBoundary';
import ProgressBar from './ProgressBar';
import AvatarGroup from './AvatarGroup';
import Image from 'next/image';

type EnhancedTaskCardProps = TaskCardProps & { remote?: boolean };

function TaskCard({ id, title, status, remote }: EnhancedTaskCardProps) {
  const reduceMotion = useReducedMotion();
  // Memoize expensive calculations to prevent unnecessary recalculations
  const { comments, checks } = useMemo(() => calculateCounts(id), [id]);
  const safeComments = Number.isFinite(comments) ? comments : 0;
  const safeChecks = Number.isFinite(checks) ? checks : 0;
  const progressRaw = useMemo(
    () => calculateProgress(status, id),
    [status, id]
  );
  const progress = Number.isFinite(progressRaw) ? progressRaw : 0;
  const colorConfig = useMemo(() => getColorConfig(status), [status]);

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
      data-task-id={id}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-3xl border border-slate-200 bg-white p-3 shadow-md cursor-pointer transition-opacity min-h-[140px] w-full ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <AnimatePresence>
        {remote && (
          <motion.div
            initial={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="mb-2 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-200"
          >
            Updated remotely
          </motion.div>
        )}
      </AnimatePresence>
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
          <div
            className="flex items-center gap-1 text-slate-800"
            aria-label={`Comments: ${safeComments}`}
          >
            <Image
              src="/static/icons/Comments.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
              loading="lazy"
              priority={false}
              aria-hidden="true"
            />
            <span className="text-sm font-semibold">{safeComments}</span>
          </div>
          <div
            className="flex items-center gap-1 text-slate-800"
            aria-label={`Checks: ${safeChecks}`}
          >
            <Image
              src="/static/icons/Checkmark.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
              loading="lazy"
              priority={false}
              aria-hidden="true"
            />

            <span className="text-sm font-semibold">{safeChecks}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders when props haven't changed
const MemoizedTaskCard = React.memo(TaskCard);

// Export with error boundary
export default function TaskCardWithErrorBoundary(
  props: EnhancedTaskCardProps
) {
  return (
    <TaskCardErrorBoundary taskId={props.id}>
      <MemoizedTaskCard {...props} />
    </TaskCardErrorBoundary>
  );
}
