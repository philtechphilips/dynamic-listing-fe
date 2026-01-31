'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import ListingCard from '@/components/ListingCard';
import BlogCard from '@/components/BlogCard';
import { Filter, Search } from 'lucide-react';
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007/api/v1";

// Helper to normalize slugs for comparison (e.g., "Restaurants" -> "restaurants")
const normalizeSlug = (slug: string) => slug.toLowerCase();

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const normalizedSlug = normalizeSlug(slug);

  const [category, setCategory] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'top_rated' | 'latest' | 'most_viewed'>('latest');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [filterPrice, setFilterPrice] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(9);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<any>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Category
        const catRes = await fetch(`${API_URL}/categories/${slug}`);
        if (!catRes.ok) throw new Error('Category not found');
        const catData = await catRes.json();
        const categoryObj = catData.category;
        setCategory(categoryObj);

        // 2. Fetch Content
        let contentItems: any[] = [];
        if (normalizedSlug === 'news') {
          const res = await fetch(`${API_URL}/news?category=${categoryObj.id}`);
          if (res.ok) {
            const data = await res.json();
            contentItems = data.news || [];
          }
        } else {
          const res = await fetch(`${API_URL}/listings?category=${categoryObj.id}`);
          if (res.ok) {
            const data = await res.json();
            contentItems = data.listings || [];
          }
        }

        setItems(contentItems);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, normalizedSlug]);

  const categoryName = category?.name || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  const isNews = normalizedSlug === 'news';
  const isVideos = normalizedSlug === 'podcasts' || normalizedSlug === 'videos' || normalizedSlug === 'podcast';
  const isListing = !isNews && !isVideos;

  const handleVideoPlay = (podcast: any) => {
    setSelectedPodcast(podcast);
    setIsPlayerOpen(true);
  };

  // Filtering and Sorting Logic
  const processedItems = useMemo(() => {
    let result = [...items];

    // 1. Filter by Location
    if (filterLocation && filterLocation !== 'all') {
      result = result.filter(item => {
        const loc = item.location || item.address;
        return loc?.toLowerCase().includes(filterLocation.toLowerCase());
      });
    }

    // 2. Filter by Price
    if (filterPrice && filterPrice !== 'all') {
      result = result.filter(item =>
        (item.priceRange || item.price_range) === filterPrice
      );
    }

    // 3. Sort
    switch (sortBy) {
      case 'top_rated':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'latest':
        result.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.created_at || a.published_at || 0).getTime();
          const dateB = new Date(b.createdAt || b.created_at || b.published_at || 0).getTime();
          return dateB - dateA;
        });
        break;
      case 'most_viewed':
        // Random as mock for views
        break;
    }

    return result;
  }, [items, filterLocation, filterPrice, sortBy]);

  const visibleItems = processedItems.slice(0, visibleCount);
  const hasMore = visibleCount < processedItems.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  if (loading) {
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
          <Badge variant="secondary" className="mb-3 uppercase tracking-wider border-0">
            Category
          </Badge>
          <h1 className="text-4xl md:text-5xl font-clash font-bold text-foreground tracking-tight">{categoryName}</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Explore our top picks and latest updates for {categoryName}.
          </p>
        </div>

        {/* Filters and Sorting Controls */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            className="md:hidden gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>

          {/* Filters (Desktop: Always visible, Mobile: Conditional) */}
          <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-3 w-full md:w-auto`}>
            {isListing && (
              <>
                {/* Location Filter */}
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger className="w-full md:w-[180px] border-0 bg-muted/50 hover:bg-muted transition-colors">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Lagos">Lagos</SelectItem>
                    <SelectItem value="Abuja">Abuja</SelectItem>
                    <SelectItem value="London">London</SelectItem>
                  </SelectContent>
                </Select>

                {/* Price Filter */}
                <Select value={filterPrice} onValueChange={setFilterPrice}>
                  <SelectTrigger className="w-full md:w-[180px] border-0 bg-muted/50 hover:bg-muted transition-colors">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="$">$ (Budget)</SelectItem>
                    <SelectItem value="$$">$$ (Moderate)</SelectItem>
                    <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>

          {/* Sort Dropdown */}
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
              {visibleItems.map((item: any) => {
                if (isVideos || item.is_video) {
                  return (
                    <div key={item.id} className="h-full">
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
                    <div key={item.id} className="h-full">
                      <BlogCard
                        post={{
                          ...item,
                          featured_image: item.featuredImage || item.featured_image,
                          created_at: item.createdAt || item.created_at
                        }}
                        imageHeight="h-[250px]"
                      />
                    </div>
                  );
                }

                return (
                  <div key={item.id} className="h-full">
                    <ListingCard listing={item} imageHeight="h-[260px]" />
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
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
