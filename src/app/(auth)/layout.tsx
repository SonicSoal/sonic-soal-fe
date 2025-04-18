import { AuthProvider } from '@/contexts/auth-context';
import type React from 'react';

export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
