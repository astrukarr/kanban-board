'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/components/ui/Loading';
import { isTokenValid, refreshTokenIfNeeded } from '@/utils/auth';

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      // Check if token exists and is valid
      if (!(await isTokenValid())) {
        // No valid token - redirect to login page with message and return URL
        const returnUrl = encodeURIComponent(pathname);
        router.replace(
          `/login?message=Authentication required&returnUrl=${returnUrl}`
        );
        setIsAuthenticated(false);
      } else {
        // Token is valid - check if refresh is needed
        await refreshTokenIfNeeded();
        setIsAuthenticated(true);
      }
    };

    checkAuth();
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
