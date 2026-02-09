"use client";

import { Podcast } from "@/types";

interface PodcastPlayerModalProps {
  podcast: Podcast | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

// Helper to get embed URL
function getEmbedUrl(url: string): string {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  // Return original URL if not YouTube
  return url;
}

export default function PodcastPlayerModal({
  podcast,
  isOpen,
  onClose,
}: PodcastPlayerModalProps) {
  if (!isOpen || !podcast) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close video player"
        >
          <svg
            className="w-8 h-8"
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

        {/* Video Title */}
        <h3 className="text-white font-semibold text-xl mb-4 font-clash">
          {podcast.title}
        </h3>

        {/* Video Player - iOS-compatible responsive container */}
        <div
          className="relative w-full bg-black rounded-lg overflow-hidden"
          style={{ paddingBottom: '56.25%' }} /* 16:9 aspect ratio */
        >
          {podcast.video_url && (
            <iframe
              src={getEmbedUrl(podcast.video_url) + '&playsinline=1'}
              className="absolute top-0 left-0 w-full h-full border-0"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={podcast.title}
            />
          )}
        </div>
      </div>
    </div>
  );
}
