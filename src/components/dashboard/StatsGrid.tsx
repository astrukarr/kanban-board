import StatCard from './StatCard';
import type { CMSStatCard } from '@/types/cms';

type StatsGridProps = {
  stats: CMSStatCard[];
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {stats.map(stat => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
