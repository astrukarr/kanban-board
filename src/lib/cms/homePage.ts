import { homePageData } from '@/data/homePageData';
import type { HomePageData } from '@/types/cms';

export function getHomePageData(): HomePageData {
  return homePageData;
}

export function getHomePageDataSync(): HomePageData {
  return homePageData;
}
