"use client";

import React from 'react';
import Link from 'next/link';
import {
    MessageSquare,
    Star,
    ExternalLink,
    Clock,
    ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserDashboardPage() {
    // Mock data for user activities
    const stats = [
        { label: 'Total Comments', value: '12', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Average Rating', value: '4.8', icon: Star, iconProps: { fill: "currentColor" }, color: 'text-yellow-500', bg: 'bg-yellow-50' },
        { label: 'Saved Listings', value: '8', icon: Star, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    const recentComments = [
        {
            id: '1',
            listing: 'The Golden Fork',
            text: 'Absolutely loved my experience here! The service was top-notch.',
            date: '2 days ago',
            slug: 'the-golden-fork'
        },
        {
            id: '2',
            listing: 'Luxury Beachfront Villa',
            text: 'Great experience, everything was as described in the listing.',
            date: '1 week ago',
            slug: 'luxury-beachfront-villa'
        },
        {
            id: '3',
            listing: 'Zen Spa & Wellness',
            text: 'Reasonable prices for such a central location and great staff.',
            date: '2 weeks ago',
            slug: 'zen-spa'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-clash font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Monitor your activity, manage comments, and review your history.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                                    <stat.icon className="w-6 h-6" {...(stat.iconProps || {})} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-50">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Comments */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-clash font-semibold text-gray-900">Recent Activity</h2>
                        <Link href="/dashboard/comments" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentComments.map((comment) => (
                            <div key={comment.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-primary/20 transition-colors group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{comment.listing}</span>
                                        <Link href={`/listing/${comment.slug}`} target="_blank">
                                            <ExternalLink className="w-3 h-3 text-gray-400 hover:text-primary" />
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <Clock className="w-3 h-3" />
                                        {comment.date}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-0">"{comment.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Tips */}
                <div className="space-y-6">
                    <h2 className="text-xl font-clash font-semibold text-gray-900">Account Safety</h2>
                    <Card className="border-none bg-primary/[0.03] shadow-none rounded-3xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-12 -mt-12 blur-2xl" />
                        <CardContent className="p-6 relative">
                            <h3 className="font-bold text-gray-900 mb-2">Build your profile</h3>
                            <p className="text-sm text-gray-600 mb-4">Complete your account details to get personalized recommendations and more!</p>
                            <Button className="w-full bg-primary hover:bg-red-700 text-white rounded-full">
                                Complete Profile
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Minimal Button internal implementation to avoid missing components if Button.tsx is old-style
function Button({ children, className, onClick, ...props }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 ${className} font-semibold transition-all active:scale-95`}
            {...props}
        >
            {children}
        </button>
    );
}
