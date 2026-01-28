'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl text-center">
                {status === 'loading' && (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-900">Verifying your email...</h2>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
                        >
                            Sign in to your account
                        </Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
                        >
                            Try again
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
