import React from 'react';
import Toolbar from '@/components/toolbar/Toolbar';
import MobileHeader from '@/components/menu/mobile/MobileHeader';
import Sidebar from '@/components/menu/desktop/Sidebar';
import type { Crumb } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs: Crumb[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <MobileHeader />
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-20">
        <Toolbar breadcrumbs={breadcrumbs} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
