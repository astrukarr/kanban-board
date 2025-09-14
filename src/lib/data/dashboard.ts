import { dashboardData } from '@/data/dashboardData';
import type { DashboardData } from '@/types/data';

export function getDashboardData(): DashboardData {
  return dashboardData;
}

export function getDashboardDataSync(): DashboardData {
  return dashboardData;
}
