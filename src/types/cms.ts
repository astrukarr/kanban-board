// CMS Data Types
export interface CMSPageMeta {
  title: string;
  description: string;
  keywords: string[];
}

export interface CMSImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CMSButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface CMSHeader {
  name: CMSImage;
  logo: CMSImage;
  ctaButton: CMSButton;
}

export interface CMSHero {
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaButtons: CMSButton[];
}

export interface CMSFeature {
  id: string;
  title: string;
  description: string;
  icon: CMSImage;
  color: 'indigo' | 'emerald' | 'blue' | 'purple' | 'orange' | 'teal';
}

export interface CMSFeatures {
  title: string;
  items: CMSFeature[];
}

export interface CMSCta {
  title: string;
  subtitle: string;
  button: CMSButton;
  backgroundColor: 'indigo' | 'emerald' | 'blue' | 'purple' | 'orange' | 'teal';
}

export interface CMSFooterLink {
  text: string;
  href: string;
}

export interface CMSFooter {
  copyright: string;
  links: CMSFooterLink[];
}

export interface HomePageData {
  meta: CMSPageMeta;
  header: CMSHeader;
  hero: CMSHero;
  features: CMSFeatures;
  cta: CMSCta;
  footer: CMSFooter;
}

// Dashboard Types
export interface CMSStatCard {
  id: string;
  title: string;
  value: number;
  icon: CMSImage;
  color: 'indigo' | 'emerald' | 'blue' | 'purple' | 'orange' | 'teal';
}

export interface CMSRecentProject {
  id: string;
  name: string;
  status: 'active' | 'planning' | 'completed';
  tasksCount: number;
  lastActivity: string;
  color: 'indigo' | 'emerald' | 'blue' | 'purple' | 'orange' | 'teal';
}

export interface DashboardData {
  meta: CMSPageMeta;
  header: CMSHeader;
  stats: CMSStatCard[];
  recentProjects: CMSRecentProject[];
  quickActions: CMSButton[];
}

// Projects Types
export interface CMSProject {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'planning' | 'completed';
  tasksCount: number;
  teamSize: number;
  color: 'indigo' | 'emerald' | 'blue' | 'purple' | 'orange' | 'teal';
}

export interface ProjectsData {
  meta: CMSPageMeta;
  header: CMSHeader;
  projects: CMSProject[];
  emptyState: {
    title: string;
    description: string;
    button: CMSButton;
  };
}
