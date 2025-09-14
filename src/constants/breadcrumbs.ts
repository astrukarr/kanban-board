import type { Crumb } from '@/types';

export const DASHBOARD_BREADCRUMBS: Crumb[] = [
  { id: 'home', iconSrc: '/static/icons/Home.svg', alt: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
];

export const PROJECT_BREADCRUMBS: Crumb[] = [
  { id: 'home', iconSrc: '/static/icons/Home.svg', alt: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'project', label: 'Project' },
  { id: 'projectX', label: 'Project PlanetX' },
];
