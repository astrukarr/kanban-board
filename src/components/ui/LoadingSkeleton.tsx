import React from 'react';

type LoadingSkeletonProps = {
  variant:
    | 'statCard'
    | 'projectCard'
    | 'recentProject'
    | 'emptyState'
    | 'board';
};

export default function LoadingSkeleton({ variant }: LoadingSkeletonProps) {
  // Minimalni skeletoni za smanjenje bundle sizea
  switch (variant) {
    case 'statCard':
      return (
        <div className="bg-slate-200 rounded-2xl p-6 animate-pulse h-32"></div>
      );

    case 'projectCard':
      return (
        <div className="bg-slate-200 rounded-2xl p-6 animate-pulse h-48"></div>
      );

    case 'recentProject':
      return (
        <div className="bg-slate-200 rounded-xl p-4 animate-pulse h-24"></div>
      );

    case 'emptyState':
      return (
        <div className="bg-slate-200 rounded-2xl p-16 animate-pulse h-64"></div>
      );

    case 'board':
      return (
        <div className="bg-slate-200 rounded-2xl p-8 animate-pulse h-64"></div>
      );

    default:
      return <div className="bg-slate-200 rounded animate-pulse h-16"></div>;
  }
}
