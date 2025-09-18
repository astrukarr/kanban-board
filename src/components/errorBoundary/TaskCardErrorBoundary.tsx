'use client';

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

type TaskCardErrorBoundaryProps = {
  children: React.ReactNode;
  taskId?: string;
};

/**
 * Error boundary specifically for TaskCard components
 * Provides a compact fallback UI that doesn't break the board layout
 */
export function TaskCardErrorBoundary({
  children,
  taskId,
}: TaskCardErrorBoundaryProps) {
  const fallback = (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-3 shadow-md min-h-[140px] w-full">
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-4 w-4 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-xs font-medium text-red-800">Task Error</p>
          {taskId && <p className="text-xs text-red-600">ID: {taskId}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <ErrorBoundary
      fallback={fallback}
      onError={(error, errorInfo) => {
        console.error(`TaskCard Error (${taskId}):`, error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
