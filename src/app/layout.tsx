import type { Metadata } from 'next';
import './globals.css';
import OfflineBanner from '@/components/OfflineBanner';

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'Next.js + Tailwind Kanban',
  manifest: '/manifest.json',
  themeColor: '#6366f1',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <OfflineBanner />
        {children}
      </body>
    </html>
  );
}
