import { projectsData } from '@/data/projectsData';
import type { ProjectsData } from '@/types/cms';

export function getProjectsData(): ProjectsData {
  return projectsData;
}

export function getProjectsDataSync(): ProjectsData {
  return projectsData;
}
