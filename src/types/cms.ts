// Simple Data Types
export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Button {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface Header {
  name: Image;
  logo: Image;
  ctaButton: Button;
}

export interface Hero {
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaButtons: Button[];
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface StatCard {
  id: string;
  title: string;
  value: number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: 'indigo' | 'emerald' | 'blue' | 'purple' | 'orange' | 'teal';
}

export interface RecentProject {
  id: string;
  name: string;
  status: 'active' | 'planning' | 'completed';
  tasksCount: number;
  lastActivity: string;
  color: 'indigo' | 'emerald' | 'blue' | 'purple' | 'orange' | 'teal';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'planning' | 'completed';
  progress: number;
  teamSize: number;
  deadline: string;
  tasksCount: number;
  color: 'indigo' | 'emerald' | 'blue' | 'purple' | 'orange' | 'teal';
}

export interface Cta {
  title: string;
  subtitle: string;
  button: Button;
  backgroundColor: 'indigo' | 'emerald' | 'blue' | 'purple' | 'orange' | 'teal';
}

export interface Footer {
  copyright: string;
}

export interface HomePageData {
  header: Header;
  hero: Hero;
  features: Feature[];
  stats: {
    totalProjects: number;
    activeTasks: number;
    teamMembers: number;
  };
  cta: Cta;
  footer: Footer;
}

export interface DashboardData {
  header: Header;
  pageTitle: string;
  pageDescription: string;
  stats: StatCard[];
  recentProjectsTitle: string;
  viewAllButton: Button;
  recentProjects: RecentProject[];
}

export interface ProjectsData {
  header: Header;
  projectsPageTitle: string;
  projectsPageDescription: string;
  projects: Project[];
  emptyState: {
    title: string;
    description: string;
    button: Button;
  };
}
