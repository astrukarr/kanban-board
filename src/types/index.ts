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
