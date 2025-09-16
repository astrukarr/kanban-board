import dynamic from 'next/dynamic';
import SectionWrapper from '@/components/projectInfoSection/SectionWrapper';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import AppLayout from '@/components/layout/AppLayout';
import { PROJECT_BREADCRUMBS } from '@/constants/breadcrumbs';
import RealtimeRoom from '@/components/realtime/RealtimeRoom';

const BoardWrapper = dynamic(
  () => import('@/components/taskBoardSection/BoardWrapper'),
  {
    loading: () => <LoadingSkeleton variant="board" />,
  }
);

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return (
    <AppLayout breadcrumbs={PROJECT_BREADCRUMBS}>
      <div className="min-h-screen bg-slate-50">
        {/* Realtime connection (room = project slug) */}
        <RealtimeRoom
          roomId={`kanban-${slug}`}
          endpoint={
            process.env.NEXT_PUBLIC_YWS_ENDPOINT || 'ws://localhost:1234'
          }
        />
        {/* Project Info Section */}
        <SectionWrapper />

        {/* Kanban Board */}
        <BoardWrapper />
      </div>
    </AppLayout>
  );
}
