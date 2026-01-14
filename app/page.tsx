'use client';

import { useState } from 'react';
import SectionHeader, { MobileViewAllButton } from '@/components/SectionHeader';
import BlogCard from '@/components/BlogCard';
import TabSection from '@/components/TabSection';
import EventTabSection from '@/components/EventTabSection';
import ResourceCard from '@/components/ResourceCard';
import PodcastCard from '@/components/PodcastCard';
import PodcastPlayerModal from '@/components/PodcastPlayerModal';
import FeaturedBanner from '@/components/FeaturedBanner';
import ListingCard from '@/components/ListingCard';
import { Podcast } from '@/types';

// Import mock data
import {
  latestPosts,
  newsPosts,
  mainCategories,
  eventsCategory,
  latestResources,
  latestPodcasts,
  topVideos,
  topRestaurants,
  topMovies,
  topElectricians,
  topHotels,
  topGyms,
  topSalons,
  topPlumbers,
} from '@/lib/mockData';

export default function Home() {
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);

  const handlePodcastPlay = (podcast: Podcast) => {
    setSelectedPodcast(podcast);
    setIsPodcastModalOpen(true);
  };

  const closePodcastModal = () => {
    setIsPodcastModalOpen(false);
    setSelectedPodcast(null);
  };

  const handleVideoPlay = (video: Podcast) => {
    setSelectedPodcast(video);
    setIsPodcastModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* News Section */}
      <section className="w-full bg-white 2xl:px-[120px] md:px-10 px-5 py-20">
        <h3 className="text-gray-100 font-semibold md:text-5xl text-4xl font-clash">
          News
        </h3>

        {/* Desktop Layout */}
        <div className="mt-16 w-full hidden md:flex md:flex-row flex-col gap-12">
          {newsPosts.length > 0 ? (
            <>
              <div className="md:w-1/2 w-full">
                <BlogCard post={newsPosts[0]} showTags />
              </div>
              <div className="md:w-1/2 w-full flex flex-col gap-6">
                {newsPosts.slice(1, 4).map((post) => (
                  <BlogCard key={post.id} post={post} layout="horizontal" showTags />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-center py-16">
              <p className="text-gray-200 text-lg">No news available.</p>
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="mt-16 w-full flex md:hidden flex-col gap-10">
          {newsPosts.length > 0 ? (
            newsPosts.map((post) => (
              <BlogCard key={post.id} post={post} imageHeight="h-[300px]" showTags />
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-16 px-4">
              <div className="w-24 h-24 bg-primary-300 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h4 className="text-gray-100 font-semibold text-xl mb-3 font-clash">No News Available</h4>
              <p className="text-gray-200 text-center max-w-md leading-relaxed">
                We&apos;re working on bringing you the latest news.
              </p>
            </div>
          )}
        </div>
      </section>





      {/* Top Videos Section */}
      {topVideos.length > 0 && (
        <section className="w-full bg-white 2xl:px-[120px] md:px-10 px-5 py-20">
          <SectionHeader title="Top Videos" viewAllHref="/all-post/top-videos" />

          <div className="mt-16 w-full flex md:flex-row flex-col gap-10">
            {topVideos.map((video) => (
              <div key={video.id} className="w-full">
                <PodcastCard
                  podcast={video}
                  variant="sidebar"
                  onPlay={handleVideoPlay}
                />
              </div>
            ))}
          </div>

          <MobileViewAllButton href="/all-post/top-videos" />
        </section>
      )}

      {/* Top Restaurants Section */}
      {topRestaurants.length > 0 && (
        <section className="w-full bg-white 2xl:px-[120px] md:px-10 px-5 py-20">
          <SectionHeader title="Top Restaurants" viewAllHref="/listing/restaurants" />

          <div className="mt-16 w-full flex md:flex-row flex-col gap-10">
            {topRestaurants.map((restaurant) => (
              <ListingCard key={restaurant.id} listing={restaurant} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/listing/restaurants" />
        </section>
      )}

      {/* Top Movies Section */}
      {topMovies.length > 0 && (
        <section className="w-full bg-white 2xl:px-[120px] md:px-10 px-5 py-20">
          <SectionHeader title="Top Movies of the Week" viewAllHref="/listing/movies" />

          <div className="mt-16 w-full flex md:flex-row flex-col gap-10">
            {topMovies.map((movie) => (
              <ListingCard key={movie.id} listing={movie} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/listing/movies" />
        </section>
      )}

      {/* Top Electricians Section */}
      {topElectricians.length > 0 && (
        <section className="w-full bg-white 2xl:px-[120px] md:px-10 px-5 py-20">
          <SectionHeader title="Top Electricians" viewAllHref="/listing/electricians" />

          <div className="mt-16 w-full flex md:flex-row flex-col gap-10">
            {topElectricians.map((electrician) => (
              <ListingCard key={electrician.id} listing={electrician} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/listing/electricians" />
        </section>
      )}

      {/* Top Hotels Section */}
      {topHotels.length > 0 && (
        <section className="w-full bg-white 2xl:px-[120px] md:px-10 px-5 py-20">
          <SectionHeader title="Top Hotels" viewAllHref="/listing/hotels" />

          <div className="mt-16 w-full flex md:flex-row flex-col gap-10">
            {topHotels.map((hotel) => (
              <ListingCard key={hotel.id} listing={hotel} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/listing/hotels" />
        </section>
      )}

      {/* Top Gyms Section */}
      {topGyms.length > 0 && (
        <section className="w-full bg-white 2xl:px-[120px] md:px-10 px-5 py-20">
          <SectionHeader title="Top Gyms & Fitness Centers" viewAllHref="/listing/gyms" />

          <div className="mt-16 w-full flex md:flex-row flex-col gap-10">
            {topGyms.map((gym) => (
              <ListingCard key={gym.id} listing={gym} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/listing/gyms" />
        </section>
      )}

      {/* Top Salons Section */}
      {topSalons.length > 0 && (
        <section className="w-full bg-white 2xl:px-[120px] md:px-10 px-5 py-20">
          <SectionHeader title="Top Salons & Spas" viewAllHref="/listing/salons" />

          <div className="mt-16 w-full flex md:flex-row flex-col gap-10">
            {topSalons.map((salon) => (
              <ListingCard key={salon.id} listing={salon} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/listing/salons" />
        </section>
      )}

      {/* Top Plumbers Section */}
      {topPlumbers.length > 0 && (
        <section className="w-full bg-white 2xl:px-[120px] md:px-10 px-5 py-20">
          <SectionHeader title="Top Plumbers" viewAllHref="/listing/plumbers" />

          <div className="mt-16 w-full flex md:flex-row flex-col gap-10">
            {topPlumbers.map((plumber) => (
              <ListingCard key={plumber.id} listing={plumber} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/listing/plumbers" />
        </section>
      )}
    </main>
  );
}
