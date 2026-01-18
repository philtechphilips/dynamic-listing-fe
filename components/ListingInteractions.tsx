"use client";

import { useState } from 'react';
import { Share2, Star } from 'lucide-react';

export default function ListingInteractions({ listingTitle }: { listingTitle: string }) {
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleRate = (rating: number) => {
    setUserRating(rating);
    setHasRated(true);
    // Here you would typically send the rating to your API
    console.log(`Rated ${rating} for ${listingTitle}`);
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
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div className="border-t border-gray-100 pt-8 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        
        {/* Rating Section */}
        <div className="space-y-2">
          <h3 className="font-clash font-semibold text-lg text-gray-900">
            {hasRated ? "Thanks for rating!" : "Rate this listing"}
          </h3>
          
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                onMouseEnter={() => !hasRated && setUserRating(star)}
                onMouseLeave={() => !hasRated && setUserRating(0)}
                disabled={hasRated}
                className={`group focus:outline-none transition-transform ${hasRated ? 'cursor-default' : 'hover:scale-110'}`}
                aria-label={`Rate ${star} stars`}
              >
                <Star 
                  className={`w-4 h-4 transition-colors duration-200 ${
                    star <= userRating 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-200 fill-transparent group-hover:text-yellow-200'
                  }`} 
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
        </div>

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
