'use client';

import { useAuth } from '@/contexts/auth-context';

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return children;
}
