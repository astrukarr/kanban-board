'use client';

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

type ModalErrorBoundaryProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

/**
 * Error boundary for modal components
 * Provides a fallback UI that allows users to close the modal
 */
export function ModalErrorBoundary({
  children,
  onClose,
}: ModalErrorBoundaryProps) {
  const fallback = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-6 text-center mx-4">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
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
        <h3 className="mb-2 text-lg font-semibold text-slate-800">
          Modal Error
        </h3>
        <p className="mb-4 text-sm text-slate-600">
          Something went wrong with this modal. You can close it and try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ErrorBoundary
      fallback={fallback}
      onError={(error, errorInfo) => {
        console.error('Modal Error:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
