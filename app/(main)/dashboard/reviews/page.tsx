"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Star,
    Trash2,
    Edit3,
    ExternalLink,
    Search
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const initialReviews = [
    {
        id: '1',
        listing: 'The Golden Fork',
        rating: 5,
        text: 'Best fine dining experience in the city. The truffle pasta is a absolute must-try! The wine selection is also quite impressive.',
        date: 'Jan 21, 2026',
        slug: 'the-golden-fork',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
    },
    {
        id: '2',
        listing: 'Zen Spa & Wellness',
        rating: 4,
        text: 'Very relaxing atmosphere. The staff were professional. I would have given 5 stars but my session started 10 minutes late.',
        date: 'Dec 28, 2025',
        slug: 'zen-spa',
        image: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?w=400'
    },
    {
        id: '3',
        listing: 'Cozy Downtown Studio',
        rating: 3,
        text: 'Good location, but the neighbors were quite noisy during my stay. The apartment itself was clean and well-equipped.',
        date: 'Nov 12, 2025',
        slug: 'cozy-downtown-studio',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
    }
];

interface ReviewCardProps {
    review: typeof initialReviews[0];
    onDelete: (id: string) => void;
}

function ReviewCard({ review, onDelete }: ReviewCardProps) {
    return (
        <Card className="group hover:shadow-md transition-all duration-300 border-0 overflow-hidden flex flex-col">
            {/* Review Card Header with Image */}
            <div className="h-36 relative">
                <img
                    src={review.image}
                    alt={review.listing}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-base leading-tight truncate">
                            {review.listing}
                        </h3>
                        <div className="flex items-center gap-0.5 mt-1.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                    key={s}
                                    className={`w-3.5 h-3.5 ${s <= review.rating
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-white/30 fill-white/10'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                    <Link
                        href={`/item/${review.slug}`}
                        target="_blank"
                        className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all shrink-0"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>

            {/* Review Content */}
            <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "{review.text}"
                    </p>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground/80">
                        {review.date}
                    </span>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => console.log('Edit', review.id)}
                            title="Edit Review"
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                        >
                            <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(review.id)}
                            title="Delete Review"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function MyReviewsPage() {
    const [reviews, setReviews] = useState(initialReviews);
    const [search, setSearch] = useState('');

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    const filteredReviews = reviews.filter(r =>
        r.listing.toLowerCase().includes(search.toLowerCase()) ||
        r.text.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Reviews</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your ratings and detailed reviews of local businesses
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Search reviews..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Stats Badge */}
            {filteredReviews.length > 0 && (
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="border-0">
                        {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
                    </Badge>
                    {search && (
                        <span className="text-sm text-muted-foreground">
                            matching "{search}"
                        </span>
                    )}
                </div>
            )}

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <Card className="col-span-full border-0">
                        <CardContent className="text-center py-16">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {search ? 'No reviews found' : 'No reviews yet'}
                            </h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                {search
                                    ? 'Try searching for something else or clear your search.'
                                    : 'Start exploring listings and share your experience with the community.'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
