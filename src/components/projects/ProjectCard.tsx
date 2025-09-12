import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStatusColor, getProjectColor } from '@/utils/colorHelpers';
import type { CMSProject } from '@/types/cms';

type ProjectCardProps = {
  project: CMSProject;
};

function ProjectCard({ project }: ProjectCardProps) {
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
    <Link
      key={project.id}
      href={`/project/${project.id}`}
      className="group block"
    >
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        {/* Project Icon */}
        <div
          className={`w-16 h-16 ${projectColor} rounded-2xl flex items-center justify-center mb-4`}
        >
          <Image
            src="/static/icons/ProjectLogo.svg"
            alt={project.name}
            width={32}
            height={32}
            className="h-8 w-8"
            loading="lazy"
          />
        </div>

        {/* Project Info */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
            {project.name}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Image
                src="/static/icons/Checkmark.svg"
                alt="Tasks"
                width={16}
                height={16}
                className="h-4 w-4"
                loading="lazy"
              />
              <span>{project.tasksCount} tasks</span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src="/static/icons/User.svg"
                alt="Team"
                width={16}
                height={16}
                className="h-4 w-4"
                loading="lazy"
              />
              <span>{project.teamSize} members</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          <Image
            src="/static/icons/ArrowRight.svg"
            alt="View project"
            width={16}
            height={16}
            className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors"
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  );
}

export default React.memo(ProjectCard);
