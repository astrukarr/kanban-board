import { getDashboardDataSync } from '@/lib/data/dashboard';
import dynamic from 'next/dynamic';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import Toolbar from '@/components/toolbar/Toolbar';
import MobileHeader from '@/components/menu/mobile/MobileHeader';
import Sidebar from '@/components/menu/desktop/Sidebar';

// Dynamically import dashboard components to reduce initial bundle size
const StatsGrid = dynamic(() => import('@/components/dashboard/StatsGrid'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <LoadingSkeleton key={i} variant="statCard" />
      ))}
    </div>
  ),
});

const RecentProjects = dynamic(
  () => import('@/components/dashboard/RecentProjects'),
  {
    loading: () => (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="w-32 h-6 bg-slate-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <LoadingSkeleton key={i} variant="recentProject" />
          ))}
        </div>
      </div>
    ),
  }
);

export default function DashboardPage() {
  const data = getDashboardDataSync();

  const crumbs = [
    { id: 'home', iconSrc: '/static/icons/Home.svg', alt: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <MobileHeader />
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-20">
        <Toolbar breadcrumbs={crumbs} />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-8 lg:px-8">
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
                projects={data.recentProjects}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
