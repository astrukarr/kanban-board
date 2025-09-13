'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // No token - redirect to login page with message
      router.push('/login?message=Please sign in to access settings');
      setIsAuthenticated(false);
    } else {
      // Token exists - allow access
      setIsAuthenticated(true);
    }
  }, [router]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600">Checking authentication...</div>
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
