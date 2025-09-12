import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header/Header';
import { getDashboardDataSync } from '@/lib/cms/dashboard';

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
    default:
      return 'bg-slate-100';
  }
};

const getStatColor = (color: string) => {
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

export default function DashboardPage() {
  const data = getDashboardDataSync();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header data={data.header} currentPage="dashboard" />

      {/* Main Content */}
      <main className="px-4 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600">
              Overview of your projects and team activity
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {data.stats.map(stat => (
              <div
                key={stat.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
              >
                <div className="flex items-center justify-between mb-2">
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
                  <span className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-600">
                  {stat.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Recent Projects */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Recent Projects
              </h2>
              <Link
                href="/projects"
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.recentProjects.map(project => (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="group block"
                >
                  <div className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all">
                    {/* Project Icon */}
                    <div
                      className={`w-12 h-12 ${getProjectColor(project.color)} rounded-xl flex items-center justify-center mb-3`}
                    >
                      <Image
                        src="/static/icons/ProjectLogo.svg"
                        alt={project.name}
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </div>

                    {/* Project Info */}
                    <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{project.tasksCount} tasks</span>
                      <span>{project.lastActivity}</span>
                    </div>
                    <div className="mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}
                      >
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
