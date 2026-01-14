import Link from 'next/link';
import Image from 'next/image';
import { Podcast } from '@/types';

interface PodcastCardProps {
  podcast: Podcast;
  variant?: 'featured' | 'sidebar' | 'mobile';
  onPlay?: (podcast: Podcast) => void;
}

// Helper function to format date
function formatDate(date?: string | Date): string {
  if (!date) return 'Coming Soon';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

export default function PodcastCard({ podcast, variant = 'sidebar', onPlay }: PodcastCardProps) {
  const handlePlay = () => {
    if (onPlay && podcast.video_url) {
      onPlay(podcast);
    }
  };

  // Featured variant - large card for desktop
  if (variant === 'featured') {
    return (
      <div className="rounded-2xl w-full h-[820px] overflow-hidden relative group">
        {/* Image */}
        <Image
          src={podcast.featured_image || '/images/music.svg'}
          alt={podcast.title}
          fill
          className="object-cover w-full h-full"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-overlay" />

        {/* Content */}
        <div className="absolute bottom-10 left-10 pr-48">
          <div className="flex items-center gap-2 text-sm font-medium text-white my-4">
            <p>{formatDate(podcast.published_at)}</p>
            <span className="w-1 h-1 rounded-full bg-current" />
            <p>{podcast.reading_time || 30} mins</p>
          </div>
          <h5 className="font-semibold text-4xl font-clash text-white mb-4">
            {podcast.title}
          </h5>
          {podcast.content && (
            <Link
              href={`/content/podcast/${podcast.slug}`}
              className="mt-4 text-sm font-medium w-fit text-white pb-1 hover-line-effect-white"
            >
              Read about it
            </Link>
          )}
        </div>

        {/* Play Button */}
        {podcast.video_url && (
          <button
            onClick={handlePlay}
            className="bg-gray-100/50 w-[120px] h-[120px] rounded-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-opacity-70"
            aria-label={`Play podcast: ${podcast.title}`}
          >
            <svg className="w-16 h-16 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  // Sidebar variant - smaller cards for desktop sidebar
  if (variant === 'sidebar') {
    return (
      <div className="w-full">
        <div className="h-60 overflow-hidden rounded-lg relative group">
          {/* Image */}
          <Image
            src={podcast.featured_image || '/images/music.svg'}
            alt={podcast.title}
            fill
            className="object-cover w-full h-full"
          />

          {/* Gradient Overlay - visible on hover */}
          <div className="absolute inset-0 gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Play Button */}
          {podcast.video_url && (
            <button
              onClick={handlePlay}
              className="bg-gray-100/50 w-20 h-20 rounded-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-opacity-70"
              aria-label={`Play podcast: ${podcast.title}`}
            >
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="pr-8">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-200 my-4">
            <p>{formatDate(podcast.published_at)}</p>
            <span className="w-1 h-1 rounded-full bg-current" />
            <p>{podcast.reading_time || 30} mins</p>
          </div>
          <h5 className="font-semibold text-lg font-clash text-gray-100 mb-4">
            {podcast.title}
          </h5>
          {podcast.content && (
            <Link
              href={`/content/podcast/${podcast.slug}`}
              className="mt-4 text-sm font-medium text-gray-100 pb-1 hover-line-effect"
            >
              Read about it
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Mobile variant - always visible overlay
  return (
    <div className="w-full">
      <div className="h-60 overflow-hidden rounded-lg relative group">
        {/* Image */}
        <Image
          src={podcast.featured_image || '/images/music.svg'}
          alt={podcast.title}
          fill
          className="object-cover w-full h-full"
        />

        {/* Gradient Overlay - always visible on mobile */}
        <div className="absolute inset-0 gradient-overlay" />

        {/* Play Button - always visible on mobile */}
        {podcast.video_url && (
          <button
            onClick={handlePlay}
            className="bg-gray-100/50 w-20 h-20 rounded-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-opacity-70 transition-opacity duration-300"
            aria-label={`Play podcast: ${podcast.title}`}
          >
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="pr-8">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-200 my-4">
          <p>{formatDate(podcast.published_at)}</p>
          <span className="w-1 h-1 rounded-full bg-current" />
          <p>{podcast.reading_time || 30} mins</p>
        </div>
        <h5 className="font-semibold text-lg font-clash text-gray-100 mb-4">
          {podcast.title}
        </h5>
        {podcast.content && (
          <Link
            href={`/content/podcast/${podcast.slug}`}
            className="mt-4 text-sm font-medium text-gray-100 pb-1 mobile-line-effect"
          >
            Read about it
          </Link>
        )}
      </div>
    </div>
  );
}
