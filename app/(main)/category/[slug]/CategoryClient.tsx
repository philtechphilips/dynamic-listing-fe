"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import ListingCard from "@/components/ListingCard";
import BlogCard from "@/components/BlogCard";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PodcastCard from "@/components/PodcastCard";
import PodcastPlayerModal from "@/components/PodcastPlayerModal";

/** Base API URL for fetching data */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Helper to normalize slugs for comparison */
const normalizeSlug = (slug: string) => slug.toLowerCase();

interface CategoryClientProps {
  slug: string;
  initialCategory: any;
}

export default function CategoryClient({
  slug,
  initialCategory,
}: CategoryClientProps) {
  const normalizedSlug = normalizeSlug(slug);

  const [category, setCategory] = useState<any>(initialCategory);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortBy, setSortBy] = useState<"top_rated" | "latest" | "most_viewed">(
    "latest",
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState<any>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // Reset state when slug shifts
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    setCategory(initialCategory);
  }, [slug, initialCategory]);

  // Handle sort change separately to avoid flickering on initial load
  useEffect(() => {
    if (page === 1) {
      // Just reset items if we are on first page and sort changes
      // Actually the effect below handles page 1
    } else {
      setItems([]);
      setPage(1);
      setHasMore(true);
    }
  }, [sortBy]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      // Only set main loading on initial fetch
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        // Fetch Content
        let newItems: any[] = [];
        let totalItems = 0;

        // Construct query params
        const params = new URLSearchParams({
          category: category.id,
          page: page.toString(),
          limit: "9",
        });

        if (normalizedSlug === "news") {
          const res = await fetch(`${API_URL}/news?${params.toString()}`);
          if (res.ok) {
            const data = await res.json();
            newItems = data.news || [];
            totalItems = data.pagination?.total || 0;
          }
        } else {
          const res = await fetch(`${API_URL}/listings?${params.toString()}`);
          if (res.ok) {
            const data = await res.json();
            newItems = data.listings || [];
            totalItems = data.pagination?.total || 0;
          }
        }

        if (page === 1) {
          setItems(newItems);
        } else {
          setItems((prev) => [...prev, ...newItems]);
        }

        setHasMore(
          items.length + newItems.length < totalItems && newItems.length > 0,
        );
      } catch (error) {
        console.error("Error fetching items:", error);
        if (page === 1) setItems([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchCategoryData();
  }, [slug, normalizedSlug, page, sortBy, category.id]);

  const categoryName =
    category?.name ||
    slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
  const displayHeading = category?.customHeading || categoryName;
  const displayDescription =
    category?.description ||
    `Explore our top picks and latest updates for ${categoryName}.`;

  const isNews = normalizedSlug === "news";
  const isVideos =
    normalizedSlug === "podcasts" ||
    normalizedSlug === "videos" ||
    normalizedSlug === "podcast";

  const handleVideoPlay = (podcast: any) => {
    setSelectedPodcast(podcast);
    setIsPlayerOpen(true);
  };

  const visibleItems = useMemo(() => {
    const result = [...items];
    if (sortBy === "top_rated") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "most_viewed") {
      result.sort((a, b) => {
        const viewsA =
          a.viewCount ?? a.view_count ?? a.reviewCount ?? a.review_count ?? 0;
        const viewsB =
          b.viewCount ?? b.view_count ?? b.reviewCount ?? b.review_count ?? 0;
        return viewsB - viewsA;
      });
    }
    return result;
  }, [items, sortBy]);

  if (loading && page === 1) {
    return (
      <main className="min-h-screen bg-gray-50/50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground font-medium">
            Loading {categoryName}...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-clash font-bold text-foreground tracking-tight">
            {displayHeading}
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            {displayDescription}
          </p>
        </div>

        {/* Sorting Controls */}
        <div className="mb-8 flex justify-end items-center">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Sort by:</span>
            <Select
              value={sortBy}
              onValueChange={(value: any) => setSortBy(value)}
            >
              <SelectTrigger className="w-[140px] border-0 bg-transparent font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top_rated">Top Rated</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="most_viewed">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content Grid */}
        {visibleItems.length > 0 ? (
          <>
            <div
              className={`grid grid-cols-1 ${isVideos ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"} gap-6 md:gap-8`}
            >
              {visibleItems.map((item: any, index: number) => {
                if (isVideos || item.is_video) {
                  return (
                    <div key={`${item.id}-${index}`} className="h-full">
                      <PodcastCard
                        podcast={
                          {
                            id: item.id,
                            title: item.title,
                            slug: item.slug,
                            featured_image:
                              item.featuredImage ||
                              item.featured_image_webp ||
                              item.featured_image,
                            published_at:
                              item.createdAt ||
                              item.created_at ||
                              item.published_at,
                            video_url: item.video_url,
                            content: item.excerpt || item.content,
                            author_name:
                              item.author?.name ||
                              item.author_name ||
                              item.user?.name,
                          } as any
                        }
                        variant="sidebar"
                        onPlay={handleVideoPlay}
                      />
                    </div>
                  );
                }

                if (isNews) {
                  return (
                    <div key={`${item.id}-${index}`} className="h-full">
                      <BlogCard
                        post={{
                          ...item,
                          featured_image:
                            item.featuredImage || item.featured_image,
                          created_at: item.createdAt || item.created_at,
                        }}
                        imageHeight="h-[250px]"
                        showHeadlineBadge={
                          item.isHeadline &&
                          (!item.headlineUntil ||
                            new Date(item.headlineUntil) >= new Date())
                        }
                      />
                    </div>
                  );
                }

                return (
                  <div key={`${item.id}-${index}`} className="h-full">
                    <ListingCard listing={item} imageHeight="h-[260px]" />
                  </div>
                );
              })}
            </div>

            {/* Infinite Scroll Sentinel */}
            {hasMore && (
              <div
                ref={(node) => {
                  if (loadingMore) return;
                  const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                      setPage((prev) => prev + 1);
                    }
                  });
                  if (node) observer.observe(node);
                  return () => observer.disconnect();
                }}
                className="py-12 flex justify-center w-full"
              >
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {!hasMore && items.length > 0 && (
              <div className="py-8 text-center text-muted-foreground text-sm">
                You've reached the end of the list.
              </div>
            )}
          </>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                No items found
              </h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                We couldn't find any content for this category. Try checking
                back later or browse other categories.
              </p>
              <Button asChild className="text-white">
                <Link href="/">Browse All</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <PodcastPlayerModal
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        podcast={selectedPodcast}
      />
    </main>
  );
}
