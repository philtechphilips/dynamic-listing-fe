'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ListingCard from '@/components/ListingCard';
import BlogCard from '@/components/BlogCard';
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

  if (!items || items.length === 0) {
     // Handle custom cases or show empty state
     // Just for demo, if no exact match, try to fuzzy match categories available in mockData? 
     // For now, simple 404-like state
  }

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

        {/* Content Grid */}
        {items.length > 0 ? (
          <div className={`grid grid-cols-1 ${isListing ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
            {items.map((item: any) => (
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
