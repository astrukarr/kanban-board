import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'Next.js + Tailwind Kanban',
};

const crumbs = [
  { id: 'home', iconSrc: '/static/icons/Home.svg', alt: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'project', label: 'Project' },
  { id: 'planetx', label: 'Project PlanetX' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 md:ml-20 flex flex-col">
            <Header breadcrumbs={crumbs} />

            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
