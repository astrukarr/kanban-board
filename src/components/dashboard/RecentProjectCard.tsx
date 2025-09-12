import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStatusColor, getProjectColor } from '@/utils/colorHelpers';
import type { CMSRecentProject } from '@/types/cms';

type RecentProjectCardProps = {
  project: CMSRecentProject;
};

function RecentProjectCard({ project }: RecentProjectCardProps) {
  // Memoize color calculations to avoid recalculation on every render
  const statusColor = useMemo(
    () => getStatusColor(project.status),
    [project.status]
  );
  const projectColor = useMemo(
    () => getProjectColor(project.color),
    [project.color]
  );

  return (
    <Link href={`/project/${project.id}`} className="group block">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        {/* Project Icon */}
        <div
          className={`w-12 h-12 ${projectColor} rounded-xl flex items-center justify-center mb-3`}
        >
          <Image
            src="/static/icons/ProjectLogo.svg"
            alt={project.name}
            width={24}
            height={24}
            className="h-6 w-6"
            loading="lazy"
          />
        </div>

        {/* Project Info */}
        <div className="mb-3">
          <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
            {project.name}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>

        {/* Project Stats */}
        <div className="text-sm text-slate-600">
          <p className="mb-1">{project.tasksCount} tasks</p>
          <p className="text-xs">{project.lastActivity}</p>
        </div>
      </div>
    </Link>
  );
}

export default React.memo(RecentProjectCard);
