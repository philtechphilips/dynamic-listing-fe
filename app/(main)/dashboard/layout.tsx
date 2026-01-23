"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    MessageSquare,
    Star,
    Settings,
    LogOut,
    User as UserIcon,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        name: 'My Comments',
        href: '/dashboard/comments',
        icon: MessageSquare,
    },
    {
        name: 'My Reviews',
        href: '/dashboard/reviews',
        icon: Star,
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50/50 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Dashboard Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-32">
                            <div className="p-6 border-b border-gray-50 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <UserIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">User Dashboard</h3>
                                    <p className="text-xs text-gray-500">Welcome back, User</p>
                                </div>
                            </div>

                            <nav className="p-4 space-y-1">
                                {sidebarItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                                isActive
                                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                                                {item.name}
                                            </div>
                                            {isActive && <ChevronRight className="w-4 h-4" />}
                                        </Link>
                                    );
                                })}

                                <button
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-4 border-t border-gray-50 pt-6"
                                    onClick={() => console.log('Logout')}
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Dashboard Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>

                </div>
            </div>
        </div>
    );
}
