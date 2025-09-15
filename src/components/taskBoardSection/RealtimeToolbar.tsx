import React from 'react';

type Props = {
  roomActive: boolean;
  rtCount: number;
};

export function RealtimeToolbar({ roomActive, rtCount }: Props) {
  if (!roomActive) return null;
  return (
    <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
      <span>Realtime connected · tasks: {rtCount}</span>
    </div>
  );
}
