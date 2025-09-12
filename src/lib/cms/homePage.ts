import type { HomePageData } from '@/types/cms';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Fetches home page data from CMS
 * In a real app, this would be an API call to your headless CMS
 */
export async function getHomePageData(): Promise<HomePageData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // In a real app, this would be:
  // const response = await fetch('/api/cms/home-page');
  // return response.json();

  const filePath = join(process.cwd(), 'src', 'data', 'cms', 'homePage.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

/**
 * Get home page data synchronously (for static generation)
 */
export function getHomePageDataSync(): HomePageData {
  const filePath = join(process.cwd(), 'src', 'data', 'cms', 'homePage.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
