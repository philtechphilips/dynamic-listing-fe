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
import { Newspaper } from 'lucide-react';

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
    <main className="min-h-screen bg-gray-50/50 pt-20">
      {/* News Section */}
      <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-20">
        <h2 className="text-foreground font-bold md:text-5xl text-4xl font-clash tracking-tight">
          News
        </h2>

        {/* Desktop Layout */}
        <div className="mt-12 w-full hidden md:flex md:flex-row flex-col gap-8">
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
              <p className="text-muted-foreground text-base">No news available.</p>
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="mt-12 w-full flex md:hidden flex-col gap-8">
          {newsPosts.length > 0 ? (
            newsPosts.map((post) => (
              <BlogCard key={post.id} post={post} imageHeight="h-[300px]" showTags />
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Newspaper className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-foreground font-semibold text-lg mb-2">No News Available</h3>
              <p className="text-muted-foreground text-center text-sm max-w-md">
                We&apos;re working on bringing you the latest news.
              </p>
            </div>
          )}
        </div>
      </section>





      {/* Top Videos Section */}
      {topVideos.length > 0 && (
        <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16">
          <SectionHeader title="Top Videos" viewAllHref="/all-post/top-videos" />

          <div className="mt-12 w-full flex md:flex-row flex-col gap-8">
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
        <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16">
          <SectionHeader title="Top Restaurants" viewAllHref="/category/restaurants" />

          <div className="mt-12 w-full flex md:flex-row flex-col gap-8">
            {topRestaurants.map((restaurant) => (
              <ListingCard key={restaurant.id} listing={restaurant} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/category/restaurants" />
        </section>
      )}

      {/* Top Movies Section */}
      {topMovies.length > 0 && (
        <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16">
          <SectionHeader title="Top Movies of the Week" viewAllHref="/category/movies" />

          <div className="mt-12 w-full flex md:flex-row flex-col gap-8">
            {topMovies.map((movie) => (
              <ListingCard key={movie.id} listing={movie} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/category/movies" />
        </section>
      )}

      {/* Top Electricians Section */}
      {topElectricians.length > 0 && (
        <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16">
          <SectionHeader title="Top Electricians" viewAllHref="/category/electricians" />

          <div className="mt-12 w-full flex md:flex-row flex-col gap-8">
            {topElectricians.map((electrician) => (
              <ListingCard key={electrician.id} listing={electrician} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/category/electricians" />
        </section>
      )}

      {/* Top Hotels Section */}
      {topHotels.length > 0 && (
        <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16">
          <SectionHeader title="Top Hotels" viewAllHref="/category/hotels" />

          <div className="mt-12 w-full flex md:flex-row flex-col gap-8">
            {topHotels.map((hotel) => (
              <ListingCard key={hotel.id} listing={hotel} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/category/hotels" />
        </section>
      )}

      {/* Top Gyms Section */}
      {topGyms.length > 0 && (
        <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16">
          <SectionHeader title="Top Gyms & Fitness Centers" viewAllHref="/category/gyms" />

          <div className="mt-12 w-full flex md:flex-row flex-col gap-8">
            {topGyms.map((gym) => (
              <ListingCard key={gym.id} listing={gym} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/category/gyms" />
        </section>
      )}

      {/* Top Salons Section */}
      {topSalons.length > 0 && (
        <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16">
          <SectionHeader title="Top Salons & Spas" viewAllHref="/category/salons" />

          <div className="mt-12 w-full flex md:flex-row flex-col gap-8">
            {topSalons.map((salon) => (
              <ListingCard key={salon.id} listing={salon} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/category/salons" />
        </section>
      )}

      {/* Top Plumbers Section */}
      {topPlumbers.length > 0 && (
        <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16">
          <SectionHeader title="Top Plumbers" viewAllHref="/category/plumbers" />

          <div className="mt-12 w-full flex md:flex-row flex-col gap-8">
            {topPlumbers.map((plumber) => (
              <ListingCard key={plumber.id} listing={plumber} imageHeight="h-[300px]" />
            ))}
          </div>

          <MobileViewAllButton href="/category/plumbers" />
        </section>
      )}
    </main>
  );
}
