'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import ListingCard from '@/components/ListingCard';
import BlogCard from '@/components/BlogCard';
import { ChevronDown, Filter, ChevronUp } from 'lucide-react';
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

// Helper to normalize slugs for comparison (e.g., "Restaurants" -> "restaurants")
const normalizeSlug = (slug: string) => slug.toLowerCase();

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const normalizedSlug = normalizeSlug(slug);

  // Determine Category Name and Content
  const [sortBy, setSortBy] = useState<'top_rated' | 'latest' | 'most_viewed'>('top_rated');
  const [filterLocation, setFilterLocation] = useState<string>('');
  const [filterPrice, setFilterPrice] = useState<string>(''); // e.g., "$", "$$", "$$$"
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
    if (filterLocation) {
        result = result.filter(item => 
            // @ts-ignore
            item.location?.toLowerCase().includes(filterLocation.toLowerCase())
        );
    }

    // 2. Filter by Price (Mock - exact match length for simplicity or just check string)
    if (filterPrice) {
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
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
           <span className="text-primary font-medium tracking-wider uppercase text-sm">Category</span>
           <h1 className="text-4xl md:text-5xl font-clash font-bold text-gray-900 mt-3">{categoryName}</h1>
           <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
             Explore our top picks and latest updates for {categoryName}.
           </p>
        </div>



        {/* Filters and Sorting Controls */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Mobile Filter Toggle */}
            <button 
                className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
                <Filter className="w-4 h-4" />
                Filters
            </button>

            {/* Filters (Desktop: Always visible, Mobile: Conditional) */}
            <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 w-full md:w-auto`}>
               {isListing && (
                   <>
                     {/* Location Filter */}
                    <div className="relative">
                        <select 
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-full py-3 px-5 pr-10 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-48 transition-colors shadow-sm cursor-pointer"
                        >
                            <option value="">All Locations</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja">Abuja</option>
                            <option value="London">London</option>
                        </select>
                         <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                    </div>

                    {/* Price Filter */}
                    <div className="relative">
                        <select 
                            value={filterPrice}
                            onChange={(e) => setFilterPrice(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-full py-3 px-5 pr-10 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-48 transition-colors shadow-sm cursor-pointer"
                        >
                            <option value="">Any Price</option>
                            <option value="$">$ (Budget)</option>
                            <option value="$$">$$ (Moderate)</option>
                            <option value="$$$">$$$ (Expensive)</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                    </div>
                   </>
               )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative self-end md:self-auto">
                <span className="text-gray-500 text-sm mr-2">Sort by:</span>
                <div className="inline-block relative">
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="appearance-none font-medium bg-transparent border-none pr-6 text-gray-900 focus:ring-0 cursor-pointer"
                    >
                        <option value="top_rated">Top Rated</option>
                        <option value="latest">Latest</option>
                        <option value="most_viewed">Most Viewed</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-900 pointer-events-none" />
                </div>
            </div>
        </div>

        {/* Content Grid */}
        {visibleItems.length > 0 ? (
          <>
            <div className={`grid grid-cols-1 ${isListing ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
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
                <div className="mt-16 flex justify-center">
                    <button 
                        onClick={handleLoadMore}
                        className="px-8 py-3 border border-gray-200 rounded-full text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Load More
                    </button>
                </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 text-center max-w-md">
              We couldn't find any content for this category. Try checking back later or browse other categories.
            </p>
            <Link href="/" className="mt-6 px-6 py-2.5 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all">
              Browse All
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
