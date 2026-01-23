'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import ListingCard from '@/components/ListingCard';
import PodcastCard from '@/components/PodcastCard';
import Input from '@/components/Input';
import { Search } from 'lucide-react';
import {
  newsPosts,
  topRestaurants,
  topMovies,
  topElectricians,
  topHotels,
  topGyms,
  topSalons,
  topPlumbers,
  topVideos,
  latestPodcasts,
} from '@/lib/mockData';
import { Post, Listing, Podcast } from '@/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'listings' | 'videos'>('all');

  // Combine listings
  const allListings = [
    ...topRestaurants,
    ...topMovies,
    ...topElectricians,
    ...topHotels,
    ...topGyms,
    ...topSalons,
    ...topPlumbers,
  ];

  // Combine videos/podcasts
  const allVideos = [...topVideos, ...latestPodcasts];

  // Search Results State
  const [newsResults, setNewsResults] = useState<Post[]>([]);
  const [listingResults, setListingResults] = useState<Listing[]>([]);
  const [videoResults, setVideoResults] = useState<Podcast[]>([]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!query) {
      setNewsResults([]);
      setListingResults([]);
      setVideoResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    // Filter News
    const filteredNews = newsPosts.filter((post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        (post.excerpt?.toLowerCase() || '').includes(lowerQuery) ||
        post.tags?.some(tag => tag.name.toLowerCase().includes(lowerQuery))
    );
    setNewsResults(filteredNews);

    // Filter Listings
    const filteredListings = allListings.filter((listing) =>
      listing.title.toLowerCase().includes(lowerQuery) ||
      (listing.excerpt?.toLowerCase() || '').includes(lowerQuery) ||
      listing.tags?.some(tag => tag.name.toLowerCase().includes(lowerQuery)) ||
      (listing.category?.toLowerCase() || '').includes(lowerQuery)
    );
    setListingResults(filteredListings);

    // Filter Videos
    const filteredVideos = allVideos.filter((video) =>
      video.title.toLowerCase().includes(lowerQuery) ||
      (video.content?.toLowerCase() || '').includes(lowerQuery)
    );
    setVideoResults(filteredVideos);
    
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };
  
    const tabs = [
    { id: 'all', label: 'All' },
    { id: 'news', label: 'News' },
    { id: 'listings', label: 'Listings' },
    { id: 'videos', label: 'Videos' },
  ] as const;


  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Results</h1>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <Input
             icon={<Search className="w-5 h-5" />}
             placeholder="Search for listings, news, videos..."
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             className="max-w-xl"
          />
        </form>

        {/* Tabs */}
        {query && (
            <div className="flex gap-4 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
            {tabs.map((tab) => (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-1 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                >
                {tab.label} (
                    {tab.id === 'all'
                    ? newsResults.length + listingResults.length + videoResults.length
                    : tab.id === 'news'
                    ? newsResults.length
                    : tab.id === 'listings'
                    ? listingResults.length
                    : videoResults.length}
                )
                </button>
            ))}
            </div>
        )}

        {/* Results */}
        {!query ? (
             <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Enter a search term to find what you're looking for.</p>
             </div>
        ) : (
             <div className="space-y-12">
            {(activeTab === 'all' || activeTab === 'news') && newsResults.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-900">News</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsResults.map((post) => (
                    <BlogCard key={post.id} post={post} imageHeight="h-48" showTags />
                  ))}
                </div>
              </section>
            )}

            {(activeTab === 'all' || activeTab === 'listings') && listingResults.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Listings</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listingResults.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} imageHeight="h-48" />
                  ))}
                </div>
              </section>
            )}

            {(activeTab === 'all' || activeTab === 'videos') && videoResults.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Videos & Podcasts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {videoResults.map((video) => (
                    <div key={video.id}>
                        <PodcastCard podcast={video} variant="sidebar" />
                    </div>
                  ))}
                </div>
              </section>
            )}

             {newsResults.length === 0 && listingResults.length === 0 && videoResults.length === 0 && (
                 <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No results found for "{query}".</p>
                    <p className="text-gray-400 mt-2">Try checking your spelling or use different keywords.</p>
                 </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SearchContent />
        </Suspense>
    )
}
