import React from 'react';

type LoadingVariant = 'spinner' | 'skeleton' | 'text' | 'dots' | 'error';

type LoadingSize = 'sm' | 'md' | 'lg';

type LoadingProps = {
  variant?: LoadingVariant;
  size?: LoadingSize;
  message?: string;
  className?: string;
};

export default function Loading({
  variant = 'text',
  size = 'md',
  message = 'Loading...',
  className = '',
}: LoadingProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
  };

  const containerClasses = {
    sm: 'h-16',
    md: 'h-64',
    lg: 'h-96',
  };

  const baseClasses = `flex items-center justify-center ${containerClasses[size]} ${className}`;

  switch (variant) {
    case 'spinner':
      return (
        <div className={baseClasses}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      );

    case 'skeleton':
      return (
        <div className={baseClasses}>
          <div className="bg-slate-200 rounded-2xl p-8 animate-pulse h-32 w-full max-w-md"></div>
        </div>
      );

    case 'dots':
      return (
        <div className={baseClasses}>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
        </div>
      );

    case 'error':
      return (
        <div className={baseClasses}>
          <div className={`text-red-600 ${sizeClasses[size]}`}>{message}</div>
        </div>
      );

    case 'text':
    default:
      return (
        <div className={baseClasses}>
          <div className={`text-slate-600 ${sizeClasses[size]}`}>{message}</div>
        </div>
      );
  }
}
