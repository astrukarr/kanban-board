import Header from '@/components/header/Header';
import StatsGrid from '@/components/dashboard/StatsGrid';
import RecentProjects from '@/components/dashboard/RecentProjects';
import { getDashboardDataSync } from '@/lib/cms/dashboard';

export default function DashboardPage() {
  const data = getDashboardDataSync();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header data={data.header} currentPage="dashboard" />

      <main className="px-4 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {data.pageTitle}
            </h1>
            <p className="text-slate-600">{data.pageDescription}</p>
          </div>

          <StatsGrid stats={data.stats} />

          <RecentProjects
            title={data.recentProjectsTitle}
            viewAllButton={data.viewAllButton}
            projects={data.recentProjects}
          />
        </div>
      </main>
    </div>
  );
}
