'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import GoogleAuthProviderWrapper from '@/components/GoogleAuthProvider';
import AdminAuthGuard from '@/components/AdminAuthGuard';

interface AdminLayoutWrapperProps {
    children: React.ReactNode;
}

export default function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
    return (
        <GoogleAuthProviderWrapper>
            <AuthProvider>
                <AdminAuthGuard>
                    {children}
                </AdminAuthGuard>
            </AuthProvider>
        </GoogleAuthProviderWrapper>
    );
}
