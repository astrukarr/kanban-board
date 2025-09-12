import type { HomePageData, DashboardData, ProjectsData } from '@/types/cms';
import { readFileSync } from 'fs';
import { join } from 'path';

// Cache storage
const cache = new Map<string, { data: unknown; timestamp: number }>();

// Environment-based cache duration
const CACHE_DURATION =
  process.env.NODE_ENV === 'production'
    ? 60 * 60 * 1000 // 1 hour in production
    : 5 * 60 * 1000; // 5 minutes in development

/**
 * Generic cache function
 */
export function getCachedData<T>(key: string, fetcher: () => T): T {
  const cached = cache.get(key);
  const now = Date.now();

  // Check if cache is valid
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }

  // Fetch new data
  const data = fetcher();
  cache.set(key, { data, timestamp: now });
  return data;
}

/**
 * Generic async cache function
 */
export async function getCachedDataAsync<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key);
  const now = Date.now();

  // Check if cache is valid
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }

  // Fetch new data
  const data = await fetcher();
  cache.set(key, { data, timestamp: now });
  return data;
}

/**
 * Clear cache (useful for development)
 */
export function clearCMSCache(): void {
  cache.clear();
}

/**
 * Invalidate specific cache entry
 */
export function invalidateCache(key: string): void {
  cache.delete(key);
}

/**
 * Invalidate all cache entries matching pattern
 */
export function invalidateCachePattern(pattern: string): void {
  const regex = new RegExp(pattern);
  for (const key of cache.keys()) {
    if (regex.test(key)) {
      cache.delete(key);
    }
  }
}

/**
 * Get cache stats (useful for debugging)
 */
export function getCacheStats() {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
    entries: Array.from(cache.entries()).map(([key, value]) => ({
      key,
      timestamp: value.timestamp,
      age: Date.now() - value.timestamp,
    })),
  };
}

/**
 * Warm up cache with all CMS data
 */
export async function warmUpCache(): Promise<void> {
  console.log('🔥 Warming up CMS cache...');

  try {
    // Import all CMS functions
    const { getHomePageData } = await import('./homePage');
    const { getDashboardData } = await import('./dashboard');
    const { getProjectsData } = await import('./projects');

    // Preload all data
    await Promise.all([
      getHomePageData(),
      getDashboardData(),
      getProjectsData(),
    ]);

    console.log('✅ CMS cache warmed up successfully!');
    console.log('Cache stats:', getCacheStats());
  } catch (error) {
    console.error('❌ Error warming up cache:', error);
  }
}

// Home Page Data
export async function getHomePageData(): Promise<HomePageData> {
  return getCachedDataAsync('homePage', async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const filePath = join(process.cwd(), 'src', 'data', 'cms', 'homePage.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}

export function getHomePageDataSync(): HomePageData {
  return getCachedData('homePageSync', () => {
    const filePath = join(process.cwd(), 'src', 'data', 'cms', 'homePage.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}

// Dashboard Data
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

// Projects Data
export async function getProjectsData(): Promise<ProjectsData> {
  return getCachedDataAsync('projects', async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const filePath = join(process.cwd(), 'src', 'data', 'cms', 'projects.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}

export function getProjectsDataSync(): ProjectsData {
  return getCachedData('projectsSync', () => {
    const filePath = join(process.cwd(), 'src', 'data', 'cms', 'projects.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}
