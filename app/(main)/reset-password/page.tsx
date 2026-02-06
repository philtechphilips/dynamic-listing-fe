/**
 * =============================================================================
 * RESET PASSWORD PAGE
 * =============================================================================
 *
 * Password reset page for users who have received a reset link.
 * Also used for admin invitations to set initial password.
 *
 * Features:
 * - Token validation
 * - Password strength requirements (min 8 characters)
 * - Password confirmation
 * - Auto-login after successful reset
 * - Role-based redirect (admin vs user)
 *
 * @route /reset-password?token=xxx
 */

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

/** Base API URL for authentication endpoints */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Reset Password Content Component
 * Handles the password reset form logic.
 */
function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const token = searchParams.get("token");

  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/auth/verify-reset-token?token=${token}`,
        );
        const data = await response.json();

        if (response.ok) {
          setIsValid(true);
          setUserInfo(data.user);
        } else {
          setError(data.message || "Invalid or expired link");
        }
      } catch (err) {
        setError("Failed to validate link. Please try again.");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to set password");
      }

      setIsSuccess(true);

      // Auto-login the user
      if (data.token && data.user) {
        login(data.token, data.user);

        // Redirect based on role
        setTimeout(() => {
          if (data.user.role === "admin") {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to set password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full border-0 shadow-lg">
          <CardContent className="p-8 sm:p-10">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Validating your link...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!token || !isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full border-0 shadow-lg">
          <CardContent className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Invalid or Expired Link
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {error || "This password reset link is invalid or has expired."}
              </p>
            </div>
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                Please contact your administrator to request a new invitation
                link.
              </p>
              <Link href="/login" className="w-full block">
                <Button variant="outline" className="w-full h-11">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full border-0 shadow-lg">
          <CardContent className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Password Set Successfully!
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Your password has been set. Redirecting you to the dashboard...
              </p>
            </div>
            <div className="text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full border-0 shadow-lg">
        <CardContent className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Set Your Password
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {userInfo ? (
                <>
                  Welcome, <span className="font-medium">{userInfo.name}</span>!
                  Create a password for your account.
                </>
              ) : (
                "Create a secure password for your account."
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {userInfo && (
              <div className="bg-muted/50 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Setting password for
                </p>
                <p className="font-medium">{userInfo.email}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  disabled={isSubmitting}
                  className="pl-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  disabled={isSubmitting}
                  className="pl-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center border border-destructive/20">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting Password...
                </>
              ) : (
                "Set Password & Continue"
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
