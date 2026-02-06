/**
 * =============================================================================
 * REGISTER PAGE
 * =============================================================================
 *
 * User registration page for creating new accounts.
 *
 * Features:
 * - Email/password registration with email verification
 * - OTP (One-Time Password) registration
 * - Google OAuth signup
 * - Automatic redirect if already authenticated
 *
 * @route /register
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { Mail, Lock, User as UserIcon, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/** Available signup methods */
type SignupMethod = "password" | "otp";

/**
 * Register Page Component
 * Handles new user account creation.
 */
export default function RegisterPage() {
  const [signupMethod, setSignupMethod] = useState<SignupMethod>("password");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [step, setStep] = useState<"initial" | "otp_sent">("initial");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  // Google Sign-Up handler using authorization code flow
  // MUST be called before any conditional returns (Rules of Hooks)
  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        setError(null);

        // Get user info from Google using the access token
        const userInfoRes = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          },
        );
        const userInfo = await userInfoRes.json();

        // Send to our backend for authentication
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              credential: tokenResponse.access_token,
              email: userInfo.email,
              name: userInfo.name,
              googleId: userInfo.sub,
            }),
          },
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Google signup failed");

        login(data.token, data.user);
        setMessage("Account created successfully! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } catch (err: any) {
        setError(err.message || "Google signup failed");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google Signup Error:", error);
      setError("Google signup failed. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (signupMethod === "password") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          },
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Signup failed");
        setMessage(data.message);
      } else {
        if (step === "initial") {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/request-otp`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            },
          );
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "OTP request failed");
          setMessage("OTP sent to your email.");
          setStep("otp_sent");
        } else {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, otp }),
            },
          );
          const data = await res.json();
          if (!res.ok)
            throw new Error(data.message || "OTP verification failed");

          login(data.token, data.user);
          setMessage("Login successful! Redirecting...");
          setTimeout(() => router.push("/dashboard"), 1500);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full border-0 shadow-lg">
        <CardContent className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Join Dynamic Listing today
            </p>
          </div>

          <div className="space-y-6">
            <Button
              type="button"
              onClick={() => handleGoogleSignup()}
              variant="outline"
              className="w-full gap-3 h-11"
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
              Sign up with Google
            </Button>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-3 bg-card text-xs text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setSignupMethod("password");
                  setStep("initial");
                  setError(null);
                  setMessage(null);
                }}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  signupMethod === "password"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setSignupMethod("otp");
                  setStep("initial");
                  setError(null);
                  setMessage(null);
                }}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  signupMethod === "otp"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Email OTP
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive text-center">{error}</p>
              </div>
            )}
            {message && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm text-green-700 text-center">{message}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {signupMethod === "password" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {signupMethod === "otp" && step === "otp_sent" ? (
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {signupMethod === "password" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full gap-2 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    {signupMethod === "password"
                      ? "Create Account"
                      : step === "initial"
                        ? "Send Verification Code"
                        : "Verify Code"}
                  </>
                )}
              </Button>
            </form>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
