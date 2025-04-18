import { Metadata } from 'next/types';
import React from 'react';
import { SigninForm } from './_components/sign-in-form';

export const metadata: Metadata = {
  title: 'Login | SonicSoal',
  description:
    'Login to your SonicSoal account to access frequency-optimized audio experiences',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 relative overflow-hidden flex flex-col">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-70 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-[50vh] bg-gradient-to-tl from-primary/5 via-secondary/5 to-transparent opacity-70 dark:opacity-30 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[25vw] h-[25vw] rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <SigninForm />
      </div>
    </div>
  );
}
