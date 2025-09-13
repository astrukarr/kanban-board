import Link from 'next/link';
import RecentProjectCard from './RecentProjectCard';
import type { RecentProject, Button } from '@/types/cms';

type RecentProjectsProps = {
  title: string;
  viewAllButton: Button;
  projects: RecentProject[];
};

export default function RecentProjects({
  title,
  viewAllButton,
  projects,
}: RecentProjectsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        <Link
          href={viewAllButton.href}
          className="text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          {viewAllButton.text}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map(project => (
          <RecentProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
