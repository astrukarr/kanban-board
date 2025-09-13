import RequireAuth from '@/components/auth/RequireAuth';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
