import BoardWrapper from '@/components/taskBoardSection/BoardWrapper';
import SectionWrapper from '@/components/projectInfoSection/SectionWrapper';

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
