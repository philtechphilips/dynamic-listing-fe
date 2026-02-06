"use client";

import { useState } from "react";
import { Share2, Check, Link2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <Button
        onClick={handleShare}
        variant="outline"
        className="group relative overflow-hidden rounded-full px-6 py-2.5 h-auto border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105"
      >
        <span className="relative flex items-center gap-2.5 z-10">
          {showTooltip ? (
            <>
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-green-600" />
              </div>
              <span className="font-semibold text-green-600">Link Copied!</span>
            </>
          ) : (
            <>
              <div className="w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Share2 className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Share Article
              </span>
            </>
          )}
        </span>

        {/* Animated background on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>
    </div>
  );
}
