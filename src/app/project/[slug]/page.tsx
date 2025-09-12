import dynamic from 'next/dynamic';
import SectionWrapper from '@/components/projectInfoSection/SectionWrapper';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

// Dynamically import BoardWrapper to reduce initial bundle size
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
  // Destructure params to avoid unused variable warning
  await params;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Project Info Section */}
      <SectionWrapper />

      {/* Kanban Board */}
      <BoardWrapper />
    </div>
  );
}
