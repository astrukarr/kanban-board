'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/components/ui/Loading';

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // No token - redirect to login page with message and return URL
      const returnUrl = encodeURIComponent(pathname);
      router.replace(
        `/login?message=Authentication required&returnUrl=${returnUrl}`
      );
      setIsAuthenticated(false);
    } else {
      // Token exists - allow access
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading message="Checking authentication..." />
      </div>
    );
  }

  // Redirect if not authenticated
  if (isAuthenticated === false) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}
