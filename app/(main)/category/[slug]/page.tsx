/**
 * =============================================================================
 * CATEGORY PAGE
 * =============================================================================
 * 
 * Dynamic page displaying listings filtered by category.
 * 
 * Features:
 * - Display category details
 * - List all listings in category
 * - Pagination with "load more"
 * - Sort options
 * - Video and podcast support
 * 
 * @route /category/[slug]
 */

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import ListingCard from '@/components/ListingCard';
import BlogCard from '@/components/BlogCard';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PodcastCard from '@/components/PodcastCard';
import PodcastPlayerModal from '@/components/PodcastPlayerModal';

/** Base API URL for fetching category data */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007/api/v1";

/** Helper to normalize slugs for comparison (e.g., "Restaurants" -> "restaurants") */
const normalizeSlug = (slug: string) => slug.toLowerCase();

/**
 * Category Page Component
 * Displays listings filtered by the category slug.
 */
export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const normalizedSlug = normalizeSlug(slug);

  const [category, setCategory] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortBy, setSortBy] = useState<'top_rated' | 'latest' | 'most_viewed'>('latest');
  // const [visibleCount, setVisibleCount] = useState(9); // Removed visibleCount
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState<any>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // Reset state when slug or sort changes
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
  }, [slug, normalizedSlug, sortBy]); // Add sortBy dependency to reset list on sort change

  useEffect(() => {
    const fetchCategoryAndData = async () => {
      // Only set main loading on initial fetch
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        // 1. Fetch Category (only if not already fetched or slug changed)
        let categoryObj = category;
        if (!categoryObj || categoryObj.slug !== slug) { // Simple check, though slug dependency above resets items
          const catRes = await fetch(`${API_URL}/categories/${slug}`);
          if (!catRes.ok) throw new Error('Category not found');
          const catData = await catRes.json();
          categoryObj = catData.category;
          setCategory(categoryObj);
        }

        // 2. Fetch Content
        let newItems: any[] = [];
        let totalItems = 0;

        // Construct query params
        const params = new URLSearchParams({
          category: categoryObj.id,
          page: page.toString(),
          limit: '9'
        });

        if (normalizedSlug === 'news') {
          const res = await fetch(`${API_URL}/news?${params.toString()}`);
          if (res.ok) {
            const data = await res.json();
            newItems = data.news || [];
            totalItems = data.pagination?.total || 0;
          }
        } else {
          // For listings, we can pass dummy sort params if supported by backend, 
          // but currently backend only supports default sort. 
          // If we want to support 'sortBy' on backend, we'd add it to query params.
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
          setItems(prev => [...prev, ...newItems]);
        }

        // Determine if there are more pages
        setHasMore(items.length + newItems.length < totalItems && newItems.length > 0);

      } catch (error) {
        console.error("Error fetching category data:", error);
        if (page === 1) setItems([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchCategoryAndData();
  }, [slug, normalizedSlug, page, sortBy]); // Run when these change. Note: category dependency removed to avoid double fetch loop, handled logic inside.

  const categoryName = category?.name || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  const isNews = normalizedSlug === 'news';
  const isVideos = normalizedSlug === 'podcasts' || normalizedSlug === 'videos' || normalizedSlug === 'podcast';

  const handleVideoPlay = (podcast: any) => {
    setSelectedPodcast(podcast);
    setIsPlayerOpen(true);
  };

  // Client-side sort is now only for the CURRENTLY fetched items if we wanted to re-sort them visually,
  // but strictly speaking with server-side pagination, re-sorting usually requires re-fetching.
  // We will assume the backend returns date-sorted by default.
  // For 'top_rated' or 'most_viewed', we would ideally pass this to the backend.
  // Since we haven't implemented backend sort params for these yet, we will keep the client-side sort
  // applied to the *accumulated* list, which is imperfect but works for the user's current request context.
  // Actually, re-sorting a growing list from server is odd. 
  // Let's rely on the simple fetch order. If user changes sort, we reset page to 1 (handled in first useEffect).

  // We skip complex `useMemo` processing for slicing since we display `items` directly.

  // However, we might still want to apply the "Headline" logic visually even if backend sent them in pages.
  // The backend for news ALREADY sorts headlines to top of the *page*.

  // If we want to support client-side sorting of the *viewed* items:
  const visibleItems = useMemo(() => {
    // Create a shallow copy to sort
    const result = [...items];
    if (sortBy === 'top_rated') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'most_viewed') {
      result.sort((a, b) => {
        const viewsA = a.viewCount ?? a.view_count ?? a.reviewCount ?? a.review_count ?? 0;
        const viewsB = b.viewCount ?? b.view_count ?? b.reviewCount ?? b.review_count ?? 0;
        return viewsB - viewsA;
      });
    }
    // For 'latest', we assume backend default order is fine.
    return result;
  }, [items, sortBy]);


  if (loading && page === 1) {
    return (
      <main className="min-h-screen bg-gray-50/50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading {categoryName}...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-clash font-bold text-foreground tracking-tight">{categoryName}</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Explore our top picks and latest updates for {categoryName}.
          </p>
        </div>

        {/* Sorting Controls */}
        <div className="mb-8 flex justify-end items-center">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Sort by:</span>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
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
            <div className={`grid grid-cols-1 ${isVideos ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 md:gap-8`}>
              {visibleItems.map((item: any, index: number) => {
                // Use index in key if IDs are not unique across pages? IDs should be unique.
                if (isVideos || item.is_video) {
                  return (
                    <div key={`${item.id}-${index}`} className="h-full">
                      <PodcastCard
                        podcast={{
                          id: item.id,
                          title: item.title,
                          slug: item.slug,
                          featured_image: item.featuredImage || item.featured_image_webp || item.featured_image,
                          published_at: item.createdAt || item.created_at || item.published_at,
                          video_url: item.video_url,
                          content: item.excerpt || item.content,
                          author_name: item.author?.name || item.author_name || item.user?.name,
                        } as any}
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
                          featured_image: item.featuredImage || item.featured_image,
                          created_at: item.createdAt || item.created_at
                        }}
                        imageHeight="h-[250px]"
                        showHeadlineBadge={
                          item.isHeadline &&
                          (!item.headlineUntil || new Date(item.headlineUntil) >= new Date())
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
                  if (loadingMore) return; // Don't trigger if already loading more
                  const observer = new IntersectionObserver(entries => {
                    if (entries[0].isIntersecting && hasMore) {
                      setPage(prev => prev + 1);
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
              <h3 className="text-xl font-bold text-foreground mb-2">No items found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                We couldn't find any content for this category. Try checking back later or browse other categories.
              </p>
              <Button asChild className="text-white">
                <Link href="/">
                  Browse All
                </Link>
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
