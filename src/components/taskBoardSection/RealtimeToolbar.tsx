import React from 'react';

type Props = {
  roomActive: boolean;
  rtCount: number;
  onMock?: () => void;
};

export function RealtimeToolbar({ roomActive, rtCount, onMock }: Props) {
  if (!roomActive) return null;
  return (
    <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
      <span>Realtime connected · tasks: {rtCount}</span>
      {onMock ? (
        <button
          onClick={onMock}
          className="px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded hover:bg-indigo-100 transition-colors cursor-pointer"
        >
          + Mock task (test)
        </button>
      ) : null}
    </div>
  );
}
