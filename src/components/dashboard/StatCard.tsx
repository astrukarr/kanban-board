import Image from 'next/image';
import { getStatColor } from '@/utils/colorHelpers';
import type { CMSStatCard } from '@/types/cms';

type StatCardProps = {
  stat: CMSStatCard;
};

export default function StatCard({ stat }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${getStatColor(stat.color)} rounded-xl flex items-center justify-center`}
        >
          <Image
            src={stat.icon.src}
            alt={stat.icon.alt}
            width={stat.icon.width}
            height={stat.icon.height}
            className="h-6 w-6"
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
