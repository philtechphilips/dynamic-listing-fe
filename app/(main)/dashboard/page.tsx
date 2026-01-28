"use client";

import React from 'react';
import Link from 'next/link';
import {
    MessageSquare,
    Star,
    ExternalLink,
    Clock,
    ArrowRight,
    TrendingUp,
    Eye,
    ThumbsUp,
    Users
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface StatCardProps {
    label: string;
    value: string;
    icon: React.ElementType;
    iconProps?: Record<string, any>;
    trend?: string;
}

function StatCard({ label, value, icon: Icon, iconProps, trend }: StatCardProps) {
    return (
        <Card className="group hover:shadow-md transition-all duration-300 border-0">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">{label}</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold tracking-tight text-foreground">{value}</h3>
                            {trend && (
                                <span className="text-xs text-green-600 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    {trend}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Icon className="w-5 h-5 text-primary" {...(iconProps || {})} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface ActivityCardProps {
    id: string;
    listing: string;
    text: string;
    date: string;
    slug: string;
    rating?: number;
}

function ActivityCard({ listing, text, date, slug, rating }: ActivityCardProps) {
    return (
        <Card className="group hover:shadow-md transition-all duration-200 border-0">
            <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-1">
                        <Link
                            href={`/item/${slug}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                        >
                            {listing}
                        </Link>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors shrink-0" />
                    </div>
                    {rating && (
                        <Badge variant="secondary" className="gap-1 shrink-0 border-0">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {rating}
                        </Badge>
                    )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">"{text}"</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                    <Clock className="w-3.5 h-3.5" />
                    {date}
                </div>
            </CardContent>
        </Card>
    );
}

export default function UserDashboardPage() {
    const stats = [
        {
            label: 'Total Reviews',
            value: '12',
            icon: MessageSquare,
            trend: '+2 this week'
        },
        {
            label: 'Average Rating',
            value: '4.8',
            icon: Star,
            iconProps: { fill: "currentColor" },
            trend: '+0.3'
        },
        {
            label: 'Saved Places',
            value: '8',
            icon: Star
        },
    ];

    const recentActivities = [
        {
            id: '1',
            listing: 'The Golden Fork',
            text: 'Absolutely loved my experience here! The service was top-notch.',
            date: '2 days ago',
            slug: 'the-golden-fork',
            rating: 5.0
        },
        {
            id: '2',
            listing: 'Luxury Beachfront Villa',
            text: 'Great experience, everything was as described in the listing.',
            date: '1 week ago',
            slug: 'luxury-beachfront-villa',
            rating: 4.5
        },
        {
            id: '3',
            listing: 'Zen Spa & Wellness',
            text: 'Reasonable prices for such a central location and great staff.',
            date: '2 weeks ago',
            slug: 'zen-spa',
            rating: 4.8
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Track your activity and manage your reviews</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            <Separator className="my-8" />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="xl:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
                            <p className="text-sm text-muted-foreground mt-0.5">Your latest reviews and interactions</p>
                        </div>
                        <Link href="/dashboard/comments">
                            <Button variant="ghost" size="sm" className="gap-1">
                                View All
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentActivities.map((activity) => (
                            <ActivityCard key={activity.id} {...activity} />
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Quick Stats</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Your activity overview</p>
                    </div>

                    <Card className="border-0">
                        <CardContent className="p-6 space-y-3">
                            <h3 className="font-semibold text-foreground">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Profile Views</span>
                                    <span className="font-medium text-foreground">247</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Helpful Votes</span>
                                    <span className="font-medium text-foreground">89</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Following</span>
                                    <span className="font-medium text-foreground">23</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
