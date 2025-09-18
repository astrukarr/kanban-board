import type { Metadata, Viewport } from 'next';
import './globals.css';
import OfflineBanner from '@/components/offlineBanner/OfflineBanner';

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'Next.js + Tailwind Kanban',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6366f1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Skip to content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-slate-900 focus:shadow"
        >
          Skip to main content
        </a>
        <OfflineBanner />
        <main id="main-content" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
