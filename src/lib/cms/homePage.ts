import type { HomePageData } from '@/types/cms';
import { getCachedDataAsync, getCachedData } from './cache';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Fetches home page data from CMS with caching
 * In a real app, this would be an API call to your headless CMS
 */
export async function getHomePageData(): Promise<HomePageData> {
  return getCachedDataAsync('homePage', async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // In a real app, this would be:
    // const response = await fetch('/api/cms/home-page');
    // return response.json();

    const filePath = join(process.cwd(), 'src', 'data', 'cms', 'homePage.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}

/**
 * Get home page data synchronously with caching (for static generation)
 */
export function getHomePageDataSync(): HomePageData {
  return getCachedData('homePageSync', () => {
    const filePath = join(process.cwd(), 'src', 'data', 'cms', 'homePage.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}
