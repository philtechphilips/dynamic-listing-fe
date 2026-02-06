/**
 * =============================================================================
 * HOME PAGE
 * =============================================================================
 *
 * The main landing page of the application.
 * Displays news articles, videos, and listings organized by category.
 *
 * Features:
 * - News section with headline support
 * - Video listings with modal player
 * - Category-based listing sections
 * - Responsive design for mobile/desktop
 *
 * @route /
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import SectionHeader, { MobileViewAllButton } from "@/components/SectionHeader";
import BlogCard from "@/components/BlogCard";
import TabSection from "@/components/TabSection";
import EventTabSection from "@/components/EventTabSection";
import ResourceCard from "@/components/ResourceCard";
import PodcastCard from "@/components/PodcastCard";
import PodcastPlayerModal from "@/components/PodcastPlayerModal";
import FeaturedBanner from "@/components/FeaturedBanner";
import ListingCard from "@/components/ListingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Podcast } from "@/types";
import { Newspaper, Loader2 } from "lucide-react";

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
} from "@/lib/mockData";
import { Listing, NewsItem, Category } from "@/types";

/** Base API URL for fetching data */
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007/api/v1";

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
        fetch(`${API_URL}/categories`),
      ]);

      const [newsData, listingsData, categoriesData] = await Promise.all([
        newsRes.json(),
        listingsRes.json(),
        categoriesRes.json(),
      ]);

      setNews(newsData.news || []);
      setListings(listingsData.listings || []);
      setCategories(categoriesData.categories || []);
    } catch (error) {
      console.error("Error fetching home data:", error);
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

  const isEffectiveHeadline = (item: NewsItem) => {
    if (!item.isHeadline) return false;
    if (!item.headlineUntil) return true;
    return new Date(item.headlineUntil) >= new Date();
  };

  // Ensure headline (if any) is always first so it shows in the left/main slot
  const displayNews = (() => {
    if (!news.length) return [];
    const headlineIdx = news.findIndex(isEffectiveHeadline);
    if (headlineIdx <= 0) return news;
    const rest = [...news];
    const [headline] = rest.splice(headlineIdx, 1);
    return [headline, ...rest];
  })();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50/50 pt-20">
        <div className="w-full 2xl:px-[120px] md:px-10 px-5 py-20">
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
            <Loader2
              className="w-12 h-12 text-primary animate-spin"
              strokeWidth={2}
            />
            <p className="text-muted-foreground font-medium">Loading...</p>
          </div>
          <div className="mt-8 space-y-12 max-w-5xl mx-auto">
            <div>
              <Skeleton className="h-10 w-32 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-[280px] w-full rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="h-[120px] w-full rounded-lg" />
                  <Skeleton className="h-[120px] w-full rounded-lg" />
                </div>
              </div>
            </div>
            <div>
              <Skeleton className="h-8 w-40 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-[200px] w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pt-20">
      {/* News Section */}
      <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-20">
        <h2 className="text-foreground font-bold md:text-5xl text-4xl font-clash tracking-tight">
          News
        </h2>

        {/* Desktop Layout — headline (if set) is always the left/main card */}
        <div className="mt-12 w-full hidden md:flex md:flex-row flex-col gap-8">
          {displayNews.length > 0 ? (
            <>
              <div className="md:w-1/2 w-full">
                <BlogCard
                  post={{ ...displayNews[0], type: "post" }}
                  imageHeight="h-[450px]"
                  showTags
                  showHeadlineBadge={isEffectiveHeadline(displayNews[0])}
                />
              </div>
              <div className="md:w-1/2 w-full flex flex-col gap-6">
                {displayNews.slice(1, 3).map((post) => (
                  <BlogCard
                    key={post.id}
                    post={{ ...post, type: "post" }}
                    layout="horizontal"
                    imageHeight="h-full"
                    showTags
                    showHeadlineBadge={isEffectiveHeadline(post)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-center py-16">
              <p className="text-muted-foreground text-base">
                No news available.
              </p>
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="mt-12 w-full flex md:hidden flex-col gap-8">
          {displayNews.length > 0 ? (
            displayNews.map((post) => (
              <BlogCard
                key={post.id}
                post={{ ...post, type: "post" }}
                imageHeight="h-[300px]"
                showTags
                showHeadlineBadge={isEffectiveHeadline(post)}
              />
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Newspaper className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-foreground font-semibold text-lg mb-2">
                No News Available
              </h3>
              <p className="text-muted-foreground text-center text-sm max-w-md">
                We&apos;re working on bringing you the latest news.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Videos Section */}
      {listings.filter((l) => l.is_video).length > 0 && (
        <section className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16">
          <SectionHeader title="Videos" viewAllHref="/category/videos" />

          <div className="mt-12 w-full flex md:flex-row flex-col gap-8">
            {listings
              .filter((l) => l.is_video)
              .slice(0, 3)
              .map((video) => (
                <div key={video.id} className="w-full">
                  <PodcastCard
                    podcast={
                      {
                        id: video.id,
                        title: video.title,
                        slug: video.slug,
                        featured_image:
                          video.featuredImage || video.featured_image,
                        published_at: video.published_at || video.createdAt,
                        video_url: video.video_url,
                        content: video.excerpt || video.content,
                      } as any
                    }
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
        const catListings = listings.filter(
          (l) => l.categoryId === cat.id && !l.is_video,
        );
        if (catListings.length === 0) return null;

        return (
          <section
            key={cat.id}
            className="w-full bg-background 2xl:px-[120px] md:px-10 px-5 py-16 border-t dark:border-stone-800"
          >
            <SectionHeader
              title={cat.name}
              viewAllHref={`/category/${cat.slug}`}
            />

            <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catListings.slice(0, 3).map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  imageHeight="h-[300px]"
                />
              ))}
            </div>

            <MobileViewAllButton href={`/category/${cat.slug}`} />
          </section>
        );
      })}
    </main>
  );
}
