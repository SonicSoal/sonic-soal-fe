'use client';

import { ProgressProvider } from '@bprogress/next/app';

export default function ProgressLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider
      height="2px"
      color="#8326ff"
      options={{ showSpinner: true }}
      shallowRouting
      delay={70}
    >
      {children}
    </ProgressProvider>
  );
}
