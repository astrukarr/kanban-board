import RecentProjectCard from './RecentProjectCard';
import type { RecentProject } from '@/types/data';

type RecentProjectsProps = {
  title: string;
  projects: RecentProject[];
};

export default function RecentProjects({
  title,
  projects,
}: RecentProjectsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map(project => (
          <RecentProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
