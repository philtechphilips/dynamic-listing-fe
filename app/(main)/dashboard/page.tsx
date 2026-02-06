"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    MessageSquare,
    Star,
    ExternalLink,
    Clock,
    ArrowRight,
    TrendingUp,
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { apiFetch, getAuthHeaders } from "@/lib/api";

interface StatCardProps {
    label: string;
    value: string | number;
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
    date: string | Date;
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
                    {typeof date === 'string' ? date : formatDistanceToNow(new Date(date), { addSuffix: true })}
                </div>
            </CardContent>
        </Card>
    );
}

interface DashboardData {
    stats: {
        totalReviews: number;
        averageRating: number;
        totalComments: number;
    };
    recentActivity: {
        id: string;
        listing: string;
        slug: string;
        text: string;
        date: string;
        rating?: number;
    }[];
}

export default function UserDashboardPage() {
    const { token } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!token) return;

            try {
                const response = await apiFetch(`/user/dashboard`, {
                    headers: getAuthHeaders()
                });

                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    const statsConfig = [
        {
            label: 'Total Reviews',
            key: 'totalReviews',
            icon: MessageSquare,
            // trend: '+2 this week' // Mock trend
        },
        {
            label: 'Average Rating',
            key: 'averageRating',
            icon: Star,
            iconProps: { fill: "currentColor" },
            // trend: '+0.3' // Mock trend
        },
        {
            label: 'Total Comments',
            key: 'totalComments',
            icon: MessageSquare
        },
    ];

    if (loading) {
        return <div className="p-8 text-center">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Track your activity and manage your reviews</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statsConfig.map((stat, i) => (
                    <StatCard
                        key={i}
                        label={stat.label}
                        value={data?.stats[stat.key as keyof typeof data.stats] ?? 0}
                        icon={stat.icon}
                        iconProps={stat.iconProps}
                    // trend={stat.trend}
                    />
                ))}
            </div>

            <Separator className="my-8" />

            {/* Main Content Grid */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Your latest reviews and interactions</p>
                    </div>
                    <Link href="/dashboard/reviews">
                        <Button variant="ghost" size="sm" className="gap-1">
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="space-y-3">
                    {data?.recentActivity.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No recent activity found.</p>
                    ) : (
                        data?.recentActivity.map((activity) => (
                            <ActivityCard key={activity.id} {...activity} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
