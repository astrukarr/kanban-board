export type SidebarItemProps = {
  id: string;
  src: string;
  alt: string;
};

export type Crumb = {
  id: string;
  label?: string;
  iconSrc?: string;
  alt?: string;
};

export type BreadcrumbsProps = {
  items: Crumb[];
};

export type MainAction = { id: string; icon: string; label: string };

export type ViewTabId = 'grid' | 'list' | 'column' | 'row';

export type ViewTab = { id: ViewTabId; icon: string; label: string };
