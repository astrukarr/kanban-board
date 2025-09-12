import BoardWrapper from '@/components/taskBoardSection/BoardWrapper';
import SectionWrapper from '@/components/projectInfoSection/SectionWrapper';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock project data with slugs - in real app this would be fetched based on slug
const getProjectData = (slug: string) => {
  const projects = {
    'project-planetx': {
      name: 'Project PlanetX',
      description: 'Revolutionary space exploration project',
    },
    'ecotech-solutions': {
      name: 'EcoTech Solutions',
      description: 'Sustainable technology solutions',
    },
    'healthcare-pro': {
      name: 'HealthCare Pro',
      description: 'Digital healthcare platform',
    },
    financeflow: {
      name: 'FinanceFlow',
      description: 'Personal finance management',
    },
    'edulearn-platform': {
      name: 'EduLearn Platform',
      description: 'Online learning management',
    },
    'smartcity-iot': {
      name: 'SmartCity IoT',
      description: 'IoT infrastructure for smart cities',
    },
  };

  return projects[slug as keyof typeof projects] || projects['project-planetx'];
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Project Info Section */}
      <SectionWrapper />

      {/* Kanban Board */}
      <BoardWrapper />
    </div>
  );
}
