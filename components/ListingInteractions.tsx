"use client";

import { useState, useEffect } from 'react';
import { Share2, Star, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007/api/v1";

interface ListingInteractionsProps {
  listingTitle: string;
  listingId?: string;
  initialRating?: number;
  initialReviewCount?: number;
}

export default function ListingInteractions({
  listingTitle,
  listingId,
  initialRating = 0,
  initialReviewCount = 0
}: ListingInteractionsProps) {
  const { isAuthenticated, token } = useAuth();
  const [userRating, setUserRating] = useState<number>(0);
  const [startHoverRating, setStarHoverRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState(false);
  const [avgRating, setAvgRating] = useState<number>(initialRating);
  const [reviewCount, setReviewCount] = useState<number>(initialReviewCount);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserRating = async () => {
      if (!isAuthenticated || !listingId) return;

      try {
        const response = await fetch(`${API_URL}/ratings/${listingId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.rating) {
            setUserRating(data.rating.value);
            setHasRated(true);
          }
          if (data.avgRating !== undefined) setAvgRating(data.avgRating);
          if (data.reviewCount !== undefined) setReviewCount(data.reviewCount);
        }
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };

    fetchUserRating();
  }, [listingId, isAuthenticated, token]);

  const handleRate = async (rating: number) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to rate");
      return;
    }

    if (!listingId) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          listingId,
          value: rating
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserRating(rating);
        setHasRated(true);
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
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: listingTitle,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="border-t border-gray-100 pt-8 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

        {/* Rating Section */}
        {listingId && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-clash font-semibold text-lg text-gray-900">
                {hasRated ? "Thanks for rating!" : "Rate this listing"}
              </h3>
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRate(star)}
                    onMouseEnter={() => setStarHoverRating(star)}
                    onMouseLeave={() => setStarHoverRating(0)}
                    disabled={isSubmitting || !isAuthenticated}
                    className={`group focus:outline-none transition-transform ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : 'hover:scale-110 active:scale-95'}`}
                    aria-label={`Rate ${star} stars`}
                    type="button"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors duration-200 ${(startHoverRating || userRating) >= star
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-200 fill-transparent'
                        }`}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>

              {/* Display Aggregate Rating */}
              <div className="flex flex-col border-l border-gray-200 pl-4">
                <span className="text-sm font-bold text-gray-900 leading-none">
                  {avgRating.toFixed(1)}
                  <span className="text-gray-400 font-normal ml-1">/ 5</span>
                </span>
                <span className="text-xs text-gray-500">{reviewCount} reviews</span>
              </div>
            </div>
            {!isAuthenticated && (
              <p className="text-xs text-muted-foreground italic">Sign in to rate</p>
            )}
          </div>
        )}

        {/* Share Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-full font-medium transition-colors text-sm border border-gray-200"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            {/* Tooltip */}
            {showShareTooltip && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-10 animate-in zoom-in-95 duration-200">
                Link copied!
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
