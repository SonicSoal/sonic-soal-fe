'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AudioWaveformIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context'; // 🔥 import the auth context
// import { Separator } from "@/components/ui/separator"

export function SigninForm() {
  const { signInWithGoogle, user } = useAuth(); // 🔥 hook into the auth context

  const handleOAuthLogin = async (provider = 'google') => {
    try{
      if (provider === 'google') {
        await signInWithGoogle();
      }
    }catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  if (user) return null;

  return (
    <div className="w-full max-w-lg mx-auto">
      <Link
        href="/"
        className="
            relative z-20
            inline-flex items-center gap-2
            p-2 min-h-[44px] /* ensure 44px height */
            text-muted-foreground hover:text-foreground
            transition-colors
          "
      >
        <ArrowLeft size={16} />
        <span>Back to home</span>
      </Link>

      <Card className="w-full backdrop-blur-sm bg-background/70 border-primary/10 shadow-xl max-md:border-none">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-30 rounded-full"></div>
              <AudioWaveformIcon
                size={40}
                className="text-primary relative z-10"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#14D9C4] to-[#A46EFF] text-transparent bg-clip-text">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Sign in to your SonicSoal account to continue your frequency journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full relative overflow-hidden group border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            onClick={() => handleOAuthLogin('google')}
          >
            <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center justify-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </span>
          </Button>

          {/* <Button
            variant="outline"
            className="w-full relative overflow-hidden group border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            onClick={() => handleOAuthLogin('apple')}
            disabled={isLoading}
          >
            <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center justify-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.7023 0C15.1273 0.122 13.3848 1.0335 12.3278 2.3035C11.3598 3.4535 10.6348 5.0535 10.9398 6.6135C12.6448 6.6685 14.4148 5.7335 15.4348 4.4485C16.3873 3.2535 17.0248 1.6685 16.7023 0Z" />
                <path d="M21.9998 17.1429C21.7948 17.5879 21.5523 17.9979 21.2798 18.4004C20.8498 19.0504 20.3248 19.6179 19.7173 20.1004C19.2873 20.4504 18.9348 20.6929 18.6598 20.8279C18.1873 21.0754 17.6873 21.1954 17.1648 21.1879C16.7998 21.1804 16.4273 21.0904 16.0473 20.9179C15.8173 20.8204 15.5723 20.7004 15.3123 20.5579C15.0373 20.4079 14.7473 20.2654 14.4423 20.2654C14.1148 20.2654 13.8173 20.4079 13.5273 20.5579C13.2598 20.7004 13.0073 20.8279 12.7698 20.9329C12.4273 21.0904 12.0773 21.1729 11.7198 21.1879C11.2198 21.2029 10.7498 21.0829 10.3048 20.8429C10.0148 20.7004 9.64229 20.4429 9.19229 20.0779C8.54979 19.5654 8.00229 18.9604 7.55229 18.2729C7.06479 17.5329 6.66729 16.7179 6.36729 15.8279C6.04479 14.8729 5.88729 13.9329 5.88729 13.0079C5.88729 11.9654 6.11979 11.0629 6.58479 10.2929C6.94479 9.6854 7.42479 9.1979 8.02479 8.8304C8.62479 8.4629 9.27729 8.2754 9.97979 8.2604C10.3798 8.2604 10.8673 8.3954 11.4373 8.6554C11.8348 8.8454 12.1323 9.0054 12.3298 9.1354C12.5948 9.3104 12.8073 9.3929 12.9748 9.3929C13.0998 9.3929 13.2898 9.3179 13.5398 9.1654C13.7223 9.0504 13.9873 8.9054 14.3323 8.7304C14.8498 8.4854 15.2998 8.3029 15.6823 8.1829C16.2598 8.0104 16.7998 7.9354 17.3023 7.9579C17.9148 7.9879 18.4873 8.1304 19.0198 8.3879C19.9498 8.8304 20.6323 9.5129 21.0673 10.4329C20.3173 10.8979 19.7323 11.4979 19.3123 12.2329C18.8923 12.9679 18.6748 13.7704 18.6598 14.6404C18.6448 15.7129 18.9573 16.6379 19.5798 17.4229C19.8673 17.7754 20.1998 18.0654 20.5773 18.2954C20.7748 18.4154 20.9498 18.5054 21.1023 18.5654C21.4148 18.0904 21.7123 17.6304 21.9998 17.1429Z" />
              </svg>
              Continue with Apple
            </span>
          </Button> */}

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div> */}

          {/* <Button
            variant="outline"
            className="w-full relative overflow-hidden group border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            onClick={() => handleOAuthLogin('discord')}
            disabled={isLoading}
          >
            <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center justify-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
              Continue with Discord
            </span>
          </Button> */}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
          {/* <div>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              Sign up
            </Link>
          </div> */}
          <div>
            By continuing, you agree to our{' '}
            <Link
              href="/terms"
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              Privacy Policy
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
