import Header from '@/components/header/Header';
import ProjectCard from '@/components/projects/ProjectCard';
import EmptyState from '@/components/projects/EmptyState';
import { getProjectsDataSync } from '@/lib/cms/projects';

export default function ProjectsPage() {
  const data = getProjectsDataSync();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header data={data.header} currentPage="projects" />

      <main className="px-4 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {data.projectsPageTitle}
            </h1>
            <p className="text-slate-600">{data.projectsPageDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Empty State (if no projects) */}
          {data.projects.length === 0 && (
            <EmptyState
              title={data.emptyState.title}
              description={data.emptyState.description}
              button={data.emptyState.button}
            />
          )}
        </div>
      </main>
    </div>
  );
}
