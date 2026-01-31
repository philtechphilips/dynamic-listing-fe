'use client';

import { useState, useEffect, useCallback } from 'react';
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
  topRestaurants,
  topMovies,
  topElectricians,
  topHotels,
  topGyms,
  topSalons,
  topPlumbers,
} from '@/lib/mockData';
import { Listing, NewsItem, Category } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8007/api/v1';

export default function Home() {
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHomeData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [newsRes, listingsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/news?status=Published`),
        fetch(`${API_URL}/listings?status=Published`),
        fetch(`${API_URL}/categories`)
      ]);

      const [newsData, listingsData, categoriesData] = await Promise.all([
        newsRes.json(),
        listingsRes.json(),
        categoriesRes.json()
      ]);

      setNews(newsData.news || []);
      setListings(listingsData.listings || []);
      setCategories(categoriesData.categories || []);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

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
          {news.length > 0 ? (
            <>
              <div className="md:w-1/2 w-full">
                <BlogCard post={{ ...news[0], type: 'post' }} imageHeight="h-[450px]" showTags />
              </div>
              <div className="md:w-1/2 w-full flex flex-col gap-6">
                {news.slice(1, 4).map((post) => (
                  <BlogCard key={post.id} post={{ ...post, type: 'post' }} layout="horizontal" imageHeight="h-[140px]" showTags />
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
          {news.length > 0 ? (
            news.map((post) => (
              <BlogCard key={post.id} post={{ ...post, type: 'post' }} imageHeight="h-[300px]" showTags />
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





      {/* Videos Section */}
      {listings.filter(l => l.is_video).length > 0 && (
        <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16">
          <SectionHeader title="Videos" viewAllHref="/category/videos" />

          <div className="mt-12 w-full flex md:flex-row flex-col gap-8">
            {listings.filter(l => l.is_video).slice(0, 3).map((video) => (
              <div key={video.id} className="w-full">
                <PodcastCard
                  podcast={{
                    id: video.id,
                    title: video.title,
                    slug: video.slug,
                    featured_image: video.featuredImage || video.featured_image,
                    published_at: video.published_at || video.createdAt,
                    video_url: video.video_url,
                    content: video.excerpt || video.content,
                  } as any}
                  variant="sidebar"
                  onPlay={handleVideoPlay}
                />
              </div>
            ))}
          </div>

          <MobileViewAllButton href="/all-post/videos" />
        </section>
      )}

      {categories.map((cat) => {
        const catListings = listings.filter(l => l.categoryId === cat.id && !l.is_video);
        if (catListings.length === 0) return null;

        return (
          <section key={cat.id} className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16 border-t dark:border-stone-800">
            <SectionHeader title={cat.name} viewAllHref={`/category/${cat.slug}`} />

            <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catListings.slice(0, 3).map((listing) => (
                <ListingCard key={listing.id} listing={listing} imageHeight="h-[300px]" />
              ))}
            </div>

            <MobileViewAllButton href={`/category/${cat.slug}`} />
          </section>
        );
      })}
    </main>
  );
}
