import type { HomePageData } from '@/types/cms';

export const homePageData: HomePageData = {
  header: {
    name: {
      src: '/static/icons/HeaderLogoName.svg',
      alt: 'Kanban Board',
      width: 120,
      height: 40,
    },
    logo: {
      src: '/static/icons/Logo.svg',
      alt: 'Logo',
      width: 48,
      height: 48,
    },
    ctaButton: {
      text: 'View Dashboard',
      href: '/dashboard',
      variant: 'primary',
    },
  },
  hero: {
    title: 'Welcome to Kanban Board',
    titleHighlight: 'Kanban Board',
    subtitle: 'Organize your projects with ease',
    ctaButtons: [
      {
        text: 'Get Started',
        href: '/dashboard',
        variant: 'primary',
      },
    ],
  },
  features: [
    {
      title: 'Drag & Drop',
      description: 'Move tasks between columns effortlessly',
      icon: '/static/icons/Vector.svg',
    },
    {
      title: 'Real-time Updates',
      description: 'See changes instantly across your team',
      icon: '/static/icons/Graph.svg',
    },
    {
      title: 'Team Collaboration',
      description: 'Work together on projects seamlessly',
      icon: '/static/icons/User.svg',
    },
  ],
  stats: {
    totalProjects: 12,
    activeTasks: 48,
    teamMembers: 8,
  },
  cta: {
    title: 'Ready to get started?',
    subtitle: 'Join thousands of teams already using our platform',
    button: {
      text: 'Start Free Trial',
      href: '/dashboard',
      variant: 'primary',
    },
    backgroundColor: 'indigo',
  },
  footer: {
    copyright: '© 2024 Kanban Board. All rights reserved.',
  },
};
