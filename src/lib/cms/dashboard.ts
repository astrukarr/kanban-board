import type { DashboardData } from '@/types/cms';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Fetches dashboard data from CMS
 * @returns Promise<DashboardData>
 */
export async function getDashboardData(): Promise<DashboardData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const filePath = join(process.cwd(), 'src', 'data', 'cms', 'dashboard.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

/**
 * Synchronous version for client-side usage
 * @returns DashboardData
 */
export function getDashboardDataSync(): DashboardData {
  const filePath = join(process.cwd(), 'src', 'data', 'cms', 'dashboard.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
