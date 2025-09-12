import type { ProjectsData } from '@/types/cms';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Fetches projects data from CMS
 * @returns Promise<ProjectsData>
 */
export async function getProjectsData(): Promise<ProjectsData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const filePath = join(process.cwd(), 'src', 'data', 'cms', 'projects.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

/**
 * Synchronous version for client-side usage
 * @returns ProjectsData
 */
export function getProjectsDataSync(): ProjectsData {
  const filePath = join(process.cwd(), 'src', 'data', 'cms', 'projects.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
