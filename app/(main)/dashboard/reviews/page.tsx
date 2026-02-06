"use client";

import React, { useState, useEffect } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from 'date-fns';
import { apiFetch, getAuthHeaders } from "@/lib/api";

interface Review {
    id: string;
    listing: string;
    rating: number;
    text: string;
    date: string;
    slug: string;
    image: string;
}

interface ReviewCardProps {
    review: Review;
    onDelete: (id: string) => void;
    userImage?: string;
    userName?: string;
}

function ReviewCard({ review, onDelete, userImage, userName }: ReviewCardProps) {
    return (
        <Card className="group hover:shadow-md transition-all duration-300 border-0 overflow-hidden flex flex-col">
            {/* Review Card Header with Image */}
            <div className="h-36 relative">
                <img
                    src={review.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"}
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

                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <Avatar className="h-6 w-6 shrink-0">
                            <AvatarImage src={userImage} alt={userName || "You"} />
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                {userName?.charAt(0)?.toUpperCase() || "?"}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground/80 truncate">
                            {format(new Date(review.date), 'MMM d, yyyy')}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        {/* <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => console.log('Edit', review.id)}
                            title="Edit Review"
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                        >
                            <Edit3 className="w-4 h-4" />
                        </Button> */}
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
    const { token, user } = useAuth();
    const { toast } = useToast();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!token) return;

            try {
                const response = await apiFetch(`/user/ratings`, {
                    headers: getAuthHeaders()
                });

                if (response.ok) {
                    const data = await response.json();
                    setReviews(data);
                } else {
                    console.error("Failed to fetch reviews");
                }
            } catch (error) {
                console.error("Error loading reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [token]);


    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            const response = await apiFetch(`/ratings/${deleteId}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                setReviews(reviews.filter(r => r.id !== deleteId));
                toast({
                    title: "Review deleted",
                    description: "Your review has been successfully removed.",
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to delete review. Please try again.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                variant: "destructive"
            });
        } finally {
            setDeleteId(null);
        }
    };

    const filteredReviews = reviews.filter(r =>
        r.listing.toLowerCase().includes(search.toLowerCase()) ||
        r.text.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading reviews...</div>;
    }

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
                            onDelete={setDeleteId}
                            userImage={user?.image}
                            userName={user?.name}
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

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete your review. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
