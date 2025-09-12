import type { ProjectsData } from '@/types/cms';
import { getCachedDataAsync, getCachedData } from './cache';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Fetches projects data from CMS with caching
 * @returns Promise<ProjectsData>
 */
export async function getProjectsData(): Promise<ProjectsData> {
  return getCachedDataAsync('projects', async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const filePath = join(process.cwd(), 'src', 'data', 'cms', 'projects.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}

/**
 * Synchronous version with caching for client-side usage
 * @returns ProjectsData
 */
export function getProjectsDataSync(): ProjectsData {
  return getCachedData('projectsSync', () => {
    const filePath = join(process.cwd(), 'src', 'data', 'cms', 'projects.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}
