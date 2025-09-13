import { dashboardData } from '@/data/dashboardData';
import type { DashboardData } from '@/types/cms';

export function getDashboardData(): DashboardData {
  return dashboardData;
}

export function getDashboardDataSync(): DashboardData {
  return dashboardData;
}
