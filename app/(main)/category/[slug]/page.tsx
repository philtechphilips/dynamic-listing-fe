'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import ListingCard from '@/components/ListingCard';
import BlogCard from '@/components/BlogCard';
import { ChevronDown, Filter, Search } from 'lucide-react';
import {
  topRestaurants,
  topMovies,
  topElectricians,
  topHotels,
  topGyms,
  topSalons,
  topPlumbers,
  latestPosts,
  newsPosts,
  latestPodcasts,
  topVideos,
  latestResources
} from '@/lib/mockData';
import { Listing, Post, Podcast, Resource } from '@/types';
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

// Helper to normalize slugs for comparison (e.g., "Restaurants" -> "restaurants")
const normalizeSlug = (slug: string) => slug.toLowerCase();

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const normalizedSlug = normalizeSlug(slug);

  // Determine Category Name and Content
  const [sortBy, setSortBy] = useState<'top_rated' | 'latest' | 'most_viewed'>('top_rated');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [filterPrice, setFilterPrice] = useState<string>('all'); // e.g., "$", "$$", "$$$"
  const [visibleCount, setVisibleCount] = useState(6);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle

  let categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  let items: (Listing | Post | Podcast | Resource)[] = [];
  let isListing = true; // Flag to determine which card to use

  // Filter Logic
  switch (normalizedSlug) {
    case 'restaurants':
      items = topRestaurants;
      break;
    case 'movies':
      items = topMovies;
      break;
    case 'hotels':
      items = topHotels;
      break;
    case 'gyms':
      items = topGyms;
      break;
    case 'salons':
      items = topSalons;
      break;
    case 'plumbers':
      items = topPlumbers;
      break;
    case 'electricians':
      items = topElectricians;
      break;
    case 'podcasts':
      items = [...latestPodcasts, ...topVideos];
      isListing = false;
      categoryName = "Podcasts & Videos";
      break;
    case 'news':
      items = [...latestPosts, ...newsPosts];
      isListing = false;
      break;
    case 'resources':
      items = latestResources;
      isListing = false;
      break;
    default:
      // Fallback or generic search if needed, currently empty to show "Not Found" logic
      items = [];
  }

  // Filtering and Sorting Logic
  const processedItems = useMemo(() => {
    let result = [...items];

    // 1. Filter by Location (Mock)
    if (filterLocation && filterLocation !== 'all') {
      result = result.filter(item =>
        // @ts-ignore
        item.location?.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    // 2. Filter by Price (Mock - exact match length for simplicity or just check string)
    if (filterPrice && filterPrice !== 'all') {
      result = result.filter(item =>
        // @ts-ignore
        item.price_range === filterPrice
      );
    }

    // 3. Sort
    switch (sortBy) {
      case 'top_rated':
        // @ts-ignore
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'latest':
        // Mock: reverse generic order or assume ID/date
        // @ts-ignore
        result.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        break;
      case 'most_viewed':
        // Mock: random shuffle or specific field if available
        break;
    }

    return result;
  }, [items, filterLocation, filterPrice, sortBy]);

  const visibleItems = processedItems.slice(0, visibleCount);
  const hasMore = visibleCount < processedItems.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };


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
            <div className={`grid grid-cols-1 ${isListing ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
              {visibleItems.map((item: any) => (
                isListing ? (
                  <div key={item.id} className="h-full">
                    <ListingCard listing={item as Listing} imageHeight="h-[260px]" />
                  </div>
                ) : (
                  <div key={item.id} className="h-full">
                    <BlogCard
                      post={item}
                      imageHeight={normalizedSlug === 'podcasts' || normalizedSlug === 'videos' ? 'h-[300px]' : 'h-[250px]'}
                    />
                  </div>
                )
              ))}
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
    </main>
  );
}
