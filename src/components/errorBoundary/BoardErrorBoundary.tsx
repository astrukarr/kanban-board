'use client';

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

type BoardErrorBoundaryProps = {
  children: React.ReactNode;
};

/**
 * Error boundary for the entire board
 * Provides a fallback UI that allows users to continue using the app
 */
export function BoardErrorBoundary({ children }: BoardErrorBoundaryProps) {
  const fallback = (
    <div className="min-h-[400px] flex items-center justify-center bg-slate-50 p-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-8 w-8 text-red-600"
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
        <h2 className="mb-2 text-xl font-semibold text-slate-800">
          Board Error
        </h2>
        <p className="mb-4 text-slate-600">
          Something went wrong with the task board. You can try refreshing the
          page or contact support if the problem persists.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          >
            Refresh Page
          </button>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ErrorBoundary
      fallback={fallback}
      onError={(error, errorInfo) => {
        console.error('Board Error:', error, errorInfo);
        // Optional: Report to error monitoring service
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
