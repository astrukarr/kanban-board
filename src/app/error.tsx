'use client';

import React, { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally report error to monitoring here
    // console.error('App error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-md w-full bg-white shadow rounded-lg p-6 text-center">
            <h1 className="text-xl font-semibold text-slate-800">
              Something went wrong
            </h1>
            <p className="mt-2 text-slate-600">
              {error?.message || 'Unexpected error occurred.'}
            </p>
            <button
              onClick={() => reset()}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
