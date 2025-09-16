'use client';

import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Loading message="Loading..." />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
