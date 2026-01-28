'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

type LoginMethod = 'password' | 'otp';

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [step, setStep] = useState<'initial' | 'otp_sent'>('initial');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const formEmail = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (loginMethod === 'password') {
        const res = await fetch('http://localhost:8007/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formEmail, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');

        // Use auth context login function to store token and user
        login(data.token, data.user);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 1500);
      } else {
        if (step === 'initial') {
          // Request OTP
          setEmail(formEmail);
          const res = await fetch('http://localhost:8007/api/v1/auth/request-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formEmail }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'OTP request failed');
          setMessage('OTP sent to your email.');
          setStep('otp_sent');
        } else {
          // Verify OTP
          const res = await fetch('http://localhost:8007/api/v1/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'OTP verification failed');

          // Use auth context login function to store token and user
          login(data.token, data.user);
          setMessage('Login successful! Redirecting...');
          setTimeout(() => router.push('/dashboard'), 1500);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Show nothing while checking auth status
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google Auth flow here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <div className="space-y-6">
          {/* Option 3: Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
          >
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
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Login Method Tabs */}
          <div className="bg-gray-100 p-1 rounded-xl flex">
            <button
              type="button"
              onClick={() => { setLoginMethod('password'); setStep('initial'); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${loginMethod === 'password'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('otp')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${loginMethod === 'otp'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              Email OTP
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {loginMethod === 'otp' && step === 'otp_sent' ? (
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  label="Enter Code"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              ) : (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="you@example.com"
                  required
                  defaultValue={email}
                />
              )}

              {loginMethod === 'password' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                id="remember-me"
                name="remember-me"
                label="Remember me"
              />

              {loginMethod === 'password' && (
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-primary hover:text-red-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center bg-primary hover:bg-red-700 focus:ring-red-500 rounded-xl py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (
                  loginMethod === 'password'
                    ? 'Sign in'
                    : (step === 'initial' ? 'Send Login Code' : 'Verify Code')
                )}
              </Button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-primary hover:text-red-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
