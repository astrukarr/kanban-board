import React, { useMemo } from 'react';
import Image from 'next/image';
import { getStatColor } from '@/utils/colorHelpers';
import type { StatCard as StatCardType } from '@/types/cms';

type StatCardProps = {
  stat: StatCardType;
};

function StatCard({ stat }: StatCardProps) {
  // Memoize color calculation to avoid recalculation on every render
  const statColor = useMemo(() => getStatColor(stat.color), [stat.color]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${statColor} rounded-xl flex items-center justify-center`}
        >
          <Image
            src={stat.icon}
            alt={stat.title}
            width={24}
            height={24}
            className="h-6 w-6"
            loading="lazy"
          />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
        <p className="text-slate-600 font-medium">{stat.title}</p>
      </div>
    </div>
  );
}

export default React.memo(StatCard);
