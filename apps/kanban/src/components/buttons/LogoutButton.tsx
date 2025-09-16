'use client';

import { logout } from '@/utils/auth';

type LogoutButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function LogoutButton({
  className = 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer',
  children = 'Logout',
}: LogoutButtonProps) {
  return (
    <button onClick={logout} className={className}>
      {children}
    </button>
  );
}
