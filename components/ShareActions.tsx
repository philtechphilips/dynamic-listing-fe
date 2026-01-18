"use client";

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareActions({ title }: { title: string }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-900 font-medium"
      >
        {showTooltip ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5" />}
        {showTooltip ? "Link Copied" : "Share"}
      </button>
      
      {/* Tooltip for Copy Feedback (Alternative position if needed) */}
      {/* Using simple state toggle on button text for better UX here */}
    </div>
  );
}
