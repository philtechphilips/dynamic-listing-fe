/**
 * =============================================================================
 * FORGOT PASSWORD PAGE
 * =============================================================================
 * 
 * Password recovery page that sends a reset link to user's email.
 * 
 * Features:
 * - Email input for password recovery
 * - Success state with confirmation message
 * - Error handling and validation
 * 
 * @route /forgot-password
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

/** Base API URL for authentication endpoints */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007";

/**
 * Forgot Password Page Component
 * Handles password reset email requests.
 */
export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setIsSuccess(false);

        try {
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong. Please try again.");
            }

            setIsSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to send reset link.");
        } finally {
            setIsLoading(false);
        }
    };

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
                                Check your email
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                We have sent a password reset link to <strong>{email}</strong>.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-center text-muted-foreground">
                                Please check your inbox (and spam folder) for further instructions. The link will expire in 1 hour.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Button
                                    variant="outline"
                                    className="w-full h-11"
                                    onClick={() => setIsSuccess(false)}
                                >
                                    Try another email
                                </Button>
                                <Link href="/login" className="w-full">
                                    <Button className="w-full h-11 text-white">Return to Login</Button>
                                </Link>
                            </div>
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
                            Forgot Password
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-11"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 text-center">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full h-11 text-white" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending Link...
                                </>
                            ) : (
                                "Send Reset Link"
                            )}
                        </Button>

                        <div className="text-center">
                            <Link
                                href="/login"
                                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
