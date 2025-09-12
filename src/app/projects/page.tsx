import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header/Header';
import { getProjectsDataSync } from '@/lib/cms/projects';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-600';
    case 'planning':
      return 'bg-amber-100 text-amber-600';
    case 'completed':
      return 'bg-slate-100 text-slate-600';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

const getProjectColor = (color: string) => {
  switch (color) {
    case 'indigo':
      return 'bg-indigo-100';
    case 'emerald':
      return 'bg-emerald-100';
    case 'blue':
      return 'bg-blue-100';
    case 'purple':
      return 'bg-purple-100';
    case 'orange':
      return 'bg-orange-100';
    case 'teal':
      return 'bg-teal-100';
    default:
      return 'bg-slate-100';
  }
};

export default function ProjectsPage() {
  const data = getProjectsDataSync();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header data={data.header} currentPage="projects" />

      {/* Main Content */}
      <main className="px-4 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Your Projects
            </h1>
            <p className="text-slate-600">
              Manage and track all your projects in one place
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map(project => (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  {/* Project Icon */}
                  <div
                    className={`w-16 h-16 ${getProjectColor(project.color)} rounded-2xl flex items-center justify-center mb-4`}
                  >
                    <Image
                      src="/static/icons/ProjectLogo.svg"
                      alt={project.name}
                      width={32}
                      height={32}
                      className="h-8 w-8"
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
                        />
                        <span>{project.teamSize} members</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}
                    >
                      {project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)}
                    </span>
                    <Image
                      src="/static/icons/ArrowRight.svg"
                      alt="View project"
                      width={16}
                      height={16}
                      className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State (if no projects) */}
          {data.projects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/static/icons/ProjectLogo.svg"
                  alt="No projects"
                  width={48}
                  height={48}
                  className="h-12 w-12 text-slate-400"
                />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {data.emptyState.title}
              </h3>
              <p className="text-slate-600 mb-6">
                {data.emptyState.description}
              </p>
              <Link
                href={data.emptyState.button.href}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                {data.emptyState.button.text}
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
