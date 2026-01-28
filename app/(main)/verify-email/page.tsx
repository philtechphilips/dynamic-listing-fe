'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link.');
            return;
        }

        const verifyEmail = async () => {
            try {
                const res = await fetch(`http://localhost:8007/api/v1/auth/verify-email?token=${token}`, {
                    method: 'GET',
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Verification failed');
                setStatus('success');
                setMessage(data.message || 'Email verified successfully!');
            } catch (err: any) {
                setStatus('error');
                setMessage(err.message);
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full border-0 shadow-lg">
                <CardContent className="p-8 sm:p-10 text-center">
                    {status === 'loading' && (
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-foreground">Verifying...</h2>
                                <p className="text-sm text-muted-foreground">
                                    Please wait while we verify your email address
                                </p>
                            </div>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-foreground">Email Verified!</h2>
                                <p className="text-sm text-muted-foreground">{message}</p>
                            </div>
                            <Button asChild className="w-full text-white">
                                <Link href="/login">
                                    Sign in to your account
                                </Link>
                            </Button>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                                <XCircle className="w-8 h-8 text-destructive" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-foreground">Verification Failed</h2>
                                <p className="text-sm text-muted-foreground">{message}</p>
                            </div>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/register">
                                    Try again
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
