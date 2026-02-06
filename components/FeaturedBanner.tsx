"use client";

import { useState, useEffect } from "react";
import GetStartedButton from "./GetStartedButton";

interface FeaturedBannerProps {
  href?: string;
  text?: string;
  buttonText?: string;
}

export default function FeaturedBanner({
  href = "/get-featured",
  text = "Ready for the spotlight? Let's make it happen.",
  buttonText = "Get Featured",
}: FeaturedBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    // Optionally persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("featured-banner-closed", "true");
    }
  };

  // Check if banner was previously closed
  useEffect(() => {
    if (typeof window !== "undefined") {
      const wasClosed = localStorage.getItem("featured-banner-closed");
      if (wasClosed === "true") {
        setIsVisible(false);
      }
    }
  }, []);

  // Don't render until mounted (to avoid hydration mismatch)
  if (!isMounted || !isVisible) return null;

  return (
    <div
      id="featured-banner"
      className="bg-primary rounded-lg p-3 md:w-[440px] w-[304px] flex md:flex-row flex-col gap-6 items-start justify-between fixed top-3/4 right-10 z-20"
    >
      {/* Text */}
      <div className="md:w-48 w-full md:pr-0 pr-10">
        <p className="text-white font-semibold text-base">{text}</p>
      </div>

      {/* Button - positioned up */}
      <div className="-mt-10 mr-7">
        <GetStartedButton href={href} text={buttonText} />
      </div>

      {/* Close Button */}
      <button
        onClick={closeBanner}
        className="text-white cursor-pointer text-lg transition-colors absolute top-2 right-2 hover:text-gray-300"
        aria-label="Close featured banner"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
