"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Star, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { apiFetch, getAuthHeaders } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007/api/v1";

interface RatingSystemProps {
    listingId: string;
    initialRating?: number;
    initialReviewCount?: number;
}

export default function RatingSystem({ listingId, initialRating = 0, initialReviewCount = 0 }: RatingSystemProps) {
    const { isAuthenticated, token } = useAuth();
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [avgRating, setAvgRating] = useState<number>(initialRating);
    const [reviewCount, setReviewCount] = useState<number>(initialReviewCount);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserRating = async () => {
        if (!isAuthenticated || !listingId) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await apiFetch(`/ratings/${listingId}`, {
                headers: getAuthHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                if (data.rating) {
                    setRating(data.rating.value);
                }
            }
        } catch (error) {
            console.error("Error fetching user rating:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserRating();
    }, [listingId, isAuthenticated]);

    const handleRatingSubmit = async (value: number) => {
        if (!isAuthenticated) {
            toast.error("Please sign in to rate");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await apiFetch(`/ratings`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    listingId,
                    value
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setRating(value);
                setAvgRating(data.avgRating);
                setReviewCount(data.reviewCount);
                toast.success("Rating saved!");
            } else {
                toast.error("Failed to save rating");
            }
        } catch (error) {
            console.error("Error saving rating:", error);
            toast.error("Failed to save rating");
        } finally {
            setIsSubmitting(true); // Small delay to show state
            setTimeout(() => setIsSubmitting(false), 500);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-clash font-bold text-foreground">Community Rating</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i <= Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-foreground">{avgRating.toFixed(1)}</span>
                        <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
                    </div>
                </div>
            </div>

            <div className="pt-2 border-t border-primary/10">
                <p className="text-sm font-medium text-foreground mb-3">
                    {rating > 0 ? "Your Rating" : "Rate this listing"}
                </p>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                disabled={isSubmitting || !isAuthenticated}
                                className={`transition-all ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : 'hover:scale-110 active:scale-95'}`}
                                onClick={() => handleRatingSubmit(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                <Star
                                    className={`w-7 h-7 transition-colors ${(hoverRating || rating) >= star
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-muted-foreground/20'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                </div>
                {!isAuthenticated && (
                    <p className="text-[10px] text-muted-foreground mt-2 italic">
                        Login required to rate
                    </p>
                )}
            </div>
        </div>
    );
}
