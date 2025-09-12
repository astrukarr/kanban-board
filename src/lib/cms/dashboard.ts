import type { DashboardData } from '@/types/cms';
import { getCachedDataAsync, getCachedData } from './cache';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Fetches dashboard data from CMS with caching
 * @returns Promise<DashboardData>
 */
export async function getDashboardData(): Promise<DashboardData> {
  return getCachedDataAsync('dashboard', async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const filePath = join(
      process.cwd(),
      'src',
      'data',
      'cms',
      'dashboard.json'
    );
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}

/**
 * Synchronous version with caching for client-side usage
 * @returns DashboardData
 */
export function getDashboardDataSync(): DashboardData {
  return getCachedData('dashboardSync', () => {
    const filePath = join(
      process.cwd(),
      'src',
      'data',
      'cms',
      'dashboard.json'
    );
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}
