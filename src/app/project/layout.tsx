import Toolbar from '@/components/toolbar/Toolbar';
import MobileHeader from '@/components/menu/mobile/MobileHeader';
import Sidebar from '@/components/menu/desktop/Sidebar';

const crumbs = [
  { id: 'home', iconSrc: '/static/icons/Home.svg', alt: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'project', label: 'Project' },
  { id: 'projectX', label: 'Project PlanetX' },
];

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <MobileHeader />
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-20">
        <Toolbar breadcrumbs={crumbs} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
