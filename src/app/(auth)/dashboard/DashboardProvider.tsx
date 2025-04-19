'use client';

import { SonicLoader } from '@/components/sonic-loader';
import { useAuth } from '@/contexts/auth-context';

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  if (!user) {
    return <SonicLoader />;
  }
  return children;
}
