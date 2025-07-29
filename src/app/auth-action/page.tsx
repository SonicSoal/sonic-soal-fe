/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  checkActionCode,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Loader2,
  CheckCircle,
  XCircle,
  Shield,
  Mail,
  Lock,
  Smartphone,
} from 'lucide-react';
import Link from 'next/link';

type AuthActionMode =
  | 'resetPassword'
  | 'verifyEmail'
  | 'recoverEmail'
  | 'revertSecondFactorAddition';

interface AuthActionState {
  status: 'verifying' | 'ready' | 'submitting' | 'success' | 'error';
  email?: string;
  errorCode?: string;
  errorMessage?: string;
}

// Zod schema for password reset form
const passwordResetSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordResetForm = z.infer<typeof passwordResetSchema>;

export default function AuthActionPage() {
  const params = useSearchParams();
  const router = useRouter();
  const mode = params.get('mode') as AuthActionMode;
  const oobCode = params.get('oobCode');
  const continueUrl = params.get('continueUrl') || '/dashboard';

  const [state, setState] = useState<AuthActionState>({ status: 'verifying' });

  // React Hook Form setup
  const form = useForm<PasswordResetForm>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Verify the action code on mount
  useEffect(() => {
    if (!mode || !oobCode) {
      setState({
        status: 'error',
        errorCode: 'INVALID_ACTION',
        errorMessage: 'Invalid or missing action parameters.',
      });
      return;
    }

    const verifyCode = async () => {
      try {
        let email: string | undefined;

        switch (mode) {
          case 'resetPassword':
            email = await verifyPasswordResetCode(auth, oobCode);
            break;
          case 'verifyEmail':
            await checkActionCode(auth, oobCode);
            break;
          case 'recoverEmail':
          case 'revertSecondFactorAddition':
            await checkActionCode(auth, oobCode);
            break;
          default:
            throw new Error('Unsupported action mode');
        }

        setState({
          status: 'ready',
          email,
        });
      } catch (err: any) {
        console.error('Auth action verification error:', err);

        let errorMessage = 'This action link is invalid or has expired.';
        let errorCode = 'UNKNOWN_ERROR';

        if (err.code) {
          errorCode = err.code;
          switch (err.code) {
            case 'auth/invalid-action-code':
              errorMessage = 'This action link is invalid or has expired.';
              break;
            case 'auth/expired-action-code':
              errorMessage =
                'This action link has expired. Please request a new one.';
              break;
            case 'auth/user-disabled':
              errorMessage = 'This account has been disabled.';
              break;
            case 'auth/user-not-found':
              errorMessage = 'No account found with this email address.';
              break;
            case 'auth/weak-password':
              errorMessage =
                'Password is too weak. Please choose a stronger password.';
              break;
            case 'auth/email-already-in-use':
              errorMessage = 'An account with this email already exists.';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Invalid email address format.';
              break;
            default:
              errorMessage = err.message || 'An unexpected error occurred.';
          }
        }

        setState({
          status: 'error',
          errorCode,
          errorMessage,
        });
      }
    };

    verifyCode();
  }, [mode, oobCode]);

  const handlePasswordReset = async (data: PasswordResetForm) => {
    if (!oobCode) return;

    setState((prev) => ({ ...prev, status: 'submitting' }));

    try {
      await confirmPasswordReset(auth, oobCode, data.newPassword);
      setState((prev) => ({ ...prev, status: 'success' }));
    } catch (err: any) {
      console.error('Password reset error:', err);

      let errorMessage = 'Failed to reset password.';
      let errorCode = 'UNKNOWN_ERROR';

      if (err.code) {
        errorCode = err.code;
        switch (err.code) {
          case 'auth/weak-password':
            errorMessage =
              'Password is too weak. Please choose a stronger password (at least 6 characters).';
            break;
          case 'auth/expired-action-code':
            errorMessage =
              'This password reset link has expired. Please request a new one.';
            break;
          case 'auth/invalid-action-code':
            errorMessage =
              'Invalid password reset link. Please request a new one.';
            break;
          default:
            errorMessage = err.message || 'Failed to reset password.';
        }
      }

      setState({
        status: 'error',
        errorCode,
        errorMessage,
      });
    }
  };

  const handleEmailVerification = async () => {
    if (!oobCode) return;

    setState((prev) => ({ ...prev, status: 'submitting' }));

    try {
      await applyActionCode(auth, oobCode);
      setState((prev) => ({ ...prev, status: 'success' }));

      setTimeout(() => {
        router.push(continueUrl);
      }, 2000);
    } catch (err: any) {
      console.error('Email verification error:', err);

      let errorMessage = 'Failed to verify email.';
      let errorCode = 'UNKNOWN_ERROR';

      if (err.code) {
        errorCode = err.code;
        switch (err.code) {
          case 'auth/invalid-action-code':
            errorMessage = 'This verification link is invalid or has expired.';
            break;
          case 'auth/expired-action-code':
            errorMessage =
              'This verification link has expired. Please request a new one.';
            break;
          default:
            errorMessage = err.message || 'Failed to verify email.';
        }
      }

      setState({
        status: 'error',
        errorCode,
        errorMessage,
      });
    }
  };

  const getActionIcon = () => {
    switch (mode) {
      case 'resetPassword':
        return <Lock className="h-8 w-8 text-primary" />;
      case 'verifyEmail':
        return <Mail className="h-8 w-8 text-green-600" />;
      case 'recoverEmail':
        return <Shield className="h-8 w-8 text-purple-600" />;
      case 'revertSecondFactorAddition':
        return <Smartphone className="h-8 w-8 text-orange-600" />;
      default:
        return <Shield className="h-8 w-8 text-muted-foreground" />;
    }
  };

  const getActionTitle = () => {
    switch (mode) {
      case 'resetPassword':
        return 'Reset Your Password';
      case 'verifyEmail':
        return 'Verify Your Email';
      case 'recoverEmail':
        return 'Recover Email Address';
      case 'revertSecondFactorAddition':
        return 'Remove Second Factor';
      default:
        return 'Account Action';
    }
  };

  const getActionDescription = () => {
    switch (mode) {
      case 'resetPassword':
        return 'Enter your new password below to complete the reset process.';
      case 'verifyEmail':
        return 'Click the button below to verify your email address.';
      case 'recoverEmail':
        return 'Your email address will be recovered.';
      case 'revertSecondFactorAddition':
        return 'Second factor authentication will be removed from your account.';
      default:
        return 'Complete the requested action.';
    }
  };

  const getSuccessMessage = () => {
    switch (mode) {
      case 'resetPassword':
        return 'Password reset successfully! Redirecting to dashboard...';
      case 'verifyEmail':
        return 'Email verified successfully! Redirecting to dashboard...';
      case 'recoverEmail':
        return 'Email recovered successfully! Redirecting to dashboard...';
      case 'revertSecondFactorAddition':
        return 'Second factor removed successfully! Redirecting to dashboard...';
      default:
        return 'Action completed successfully! Redirecting...';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements matching SonicSoal design */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] rounded-full bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent blur-3xl opacity-60 dark:opacity-20"></div>
        <div
          className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-primary/5 blur-3xl opacity-60 dark:opacity-20"
          style={{
            animation: 'pulse 15s ease-in-out infinite',
            animationDelay: '0s',
          }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-secondary/5 blur-3xl opacity-60 dark:opacity-20"
          style={{
            animation: 'pulse 18s ease-in-out infinite',
            animationDelay: '2s',
          }}
        ></div>
      </div>

      {/* Sound wave decorative elements */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      <div className="absolute left-0 right-0 top-[45%] -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-secondary/10 to-transparent"></div>
      <div className="absolute left-0 right-0 top-[55%] -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>

      <Card className="w-full max-w-md shadow-xl border-0 bg-background/80 backdrop-blur-lg relative z-10 max-sm:bg-transparent max-sm:border-0 max-sm:p-0">
        <CardHeader className="text-center space-y-6">
          {/* SonicSoal Logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex items-center gap-2">
                <img
                  src="/sonic-soal.svg"
                  className="w-8 h-8"
                  alt="SonicSoal"
                />
                <img
                  src="/SonicSoal.svg"
                  className="w-32 max-lg:hidden"
                  alt="SonicSoal"
                />
              </div>
            </Link>
          </div>

          {/* Action Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-xl opacity-20 rounded-full"></div>
              <div className="relative bg-gradient-to-r p-4 rounded-full from-primary/10 to-secondary/10 backdrop-blur-sm border border-white/10">
                {getActionIcon()}
              </div>
            </div>
          </div>

          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-[#5CB8FF] to-secondary text-transparent bg-clip-text">
              {getActionTitle()}
            </CardTitle>
            <CardDescription className="mt-2 text-muted-foreground">
              {getActionDescription()}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Loading State */}
          {state.status === 'verifying' && (
            <div className="flex flex-col items-center space-y-4 py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">
                Verifying your action link...
              </p>
            </div>
          )}

          {/* Error State */}
          {state.status === 'error' && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{state.errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Password Reset Form */}
          {state.status === 'ready' &&
            mode === 'resetPassword' &&
            state.email && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handlePasswordReset)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="flex items-center space-x-2 p-3 bg-muted rounded-md border">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {state.email}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={state.status !== 'ready'}
                    className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg mt-3"
                  >
                    <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative flex items-center justify-center">
                      {state.status !== 'ready' ? (
                        <>
                          <div className="relative mr-3">
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                            <div className="relative bg-white/30 rounded-full p-1">
                              <Lock className="h-4 w-4 text-white animate-pulse" />
                            </div>
                          </div>
                          <span className="animate-pulse">Resetting Password...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Reset Password
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </Form>
            )}

          {/* Email Verification */}
          {state.status === 'ready' && mode === 'verifyEmail' && (
            <div className="space-y-4">
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  Click the button below to verify your email address.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleEmailVerification}
                disabled={state.status !== 'ready'}
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg"
              >
                <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative flex items-center justify-center">
                  {state.status !== 'ready' ? (
                    <>
                      <div className="relative mr-3">
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                        <div className="relative bg-white/30 rounded-full p-1">
                          <Mail className="h-4 w-4 text-white animate-pulse" />
                        </div>
                      </div>
                      <span className="animate-pulse">Verifying Email...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Verify Email
                    </>
                  )}
                </span>
              </Button>
            </div>
          )}

          {/* Other Actions */}
          {state.status === 'ready' &&
            (mode === 'recoverEmail' ||
              mode === 'revertSecondFactorAddition') && (
              <div className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    {mode === 'recoverEmail'
                      ? 'Your email address will be recovered when you click the button below.'
                      : 'Second factor authentication will be removed from your account.'}
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={handleEmailVerification}
                  disabled={state.status !== 'ready'}
                  className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg"
                >
                  <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="relative flex items-center justify-center">
                    {state.status !== 'ready' ? (
                      <>
                        <div className="relative mr-3">
                          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                          <div className="relative bg-white/30 rounded-full p-1">
                            <Shield className="h-4 w-4 text-white animate-pulse" />
                          </div>
                        </div>
                        <span className="animate-pulse">Processing...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        {mode === 'recoverEmail' ? 'Recover Email' : 'Remove Second Factor'}
                      </>
                    )}
                  </span>
                </Button>
              </div>
            )}

          {/* Success State */}
          {state.status === 'success' && (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{getSuccessMessage()}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* Action Type Badge */}
          {mode && (
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-xs">
                {mode
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())}
              </Badge>
            </div>
          )}

          {/* Back to Home Link */}
          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to SonicSoal
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
