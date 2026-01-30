'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import ListingCard from '@/components/ListingCard';
import PodcastCard from '@/components/PodcastCard';
import { Search, Filter, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    router.push('/search');
  };

  const tabs = [
    { id: 'all', label: 'All Results' },
    { id: 'news', label: 'News' },
    { id: 'listings', label: 'Listings' },
    { id: 'videos', label: 'Videos' },
  ] as const;

  const totalResults = newsResults.length + listingResults.length + videoResults.length;

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-clash font-bold text-foreground tracking-tight">
            Search
          </h1>
          <p className="text-muted-foreground">
            Find listings, news, videos and more
          </p>
        </div>

        {/* Enhanced Search Input */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSearchSubmit} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search for listings, news, videos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 pr-10 h-12 text-base"
                />
                {query && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button type="submit" size="lg" className="px-8 text-white">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Count & Tabs */}
        {query && totalResults > 0 && (
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="border-0 px-3 py-1.5 text-sm">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                {totalResults} {totalResults === 1 ? 'result' : 'results'} found
              </Badge>
              <span className="text-muted-foreground text-sm">for</span>
              <span className="font-semibold text-foreground">"{query}"</span>
            </div>

            <Separator />

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => {
                const count = tab.id === 'all'
                  ? totalResults
                  : tab.id === 'news'
                    ? newsResults.length
                    : tab.id === 'listings'
                      ? listingResults.length
                      : videoResults.length;

                return (
                  <Button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    variant={activeTab === tab.id ? 'default' : 'outline'}
                    className={`whitespace-nowrap gap-2 ${activeTab === tab.id ? 'text-white shadow-md' : ''}`}
                  >
                    {tab.label}
                    <Badge
                      variant={activeTab === tab.id ? 'secondary' : 'secondary'}
                      className={`${activeTab === tab.id ? 'bg-white/20 text-white border-0' : 'border-0'}`}
                    >
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Results */}
        {!query ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="text-center py-20">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Start Your Search
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter keywords to discover listings, news articles, videos and more
              </p>
            </CardContent>
          </Card>
        ) : totalResults === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Results Found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find anything matching <strong>"{query}"</strong>
              </p>
              <div className="space-y-2 text-sm text-muted-foreground max-w-sm mx-auto text-left">
                <p className="font-medium text-foreground">Try:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Checking your spelling</li>
                  <li>Using different keywords</li>
                  <li>Searching for more general terms</li>
                </ul>
              </div>
              <Button onClick={handleClearSearch} variant="outline" className="mt-6">
                Clear Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {(activeTab === 'all' || activeTab === 'news') && newsResults.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-clash font-bold text-foreground">News Articles</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {newsResults.length} {newsResults.length === 1 ? 'article' : 'articles'} found
                    </p>
                  </div>
                  {activeTab === 'all' && newsResults.length > 3 && (
                    <Button variant="ghost" onClick={() => setActiveTab('news')}>
                      View All
                    </Button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(activeTab === 'all' ? newsResults.slice(0, 3) : newsResults).map((post) => (
                    <BlogCard key={post.id} post={post} imageHeight="h-48" showTags />
                  ))}
                </div>
              </section>
            )}

            {(activeTab === 'all' || activeTab === 'listings') && listingResults.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-clash font-bold text-foreground">Listings</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {listingResults.length} {listingResults.length === 1 ? 'listing' : 'listings'} found
                    </p>
                  </div>
                  {activeTab === 'all' && listingResults.length > 3 && (
                    <Button variant="ghost" onClick={() => setActiveTab('listings')}>
                      View All
                    </Button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(activeTab === 'all' ? listingResults.slice(0, 3) : listingResults).map((listing) => (
                    <ListingCard key={listing.id} listing={listing} imageHeight="h-48" />
                  ))}
                </div>
              </section>
            )}

            {(activeTab === 'all' || activeTab === 'videos') && videoResults.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-clash font-bold text-foreground">Videos & Podcasts</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {videoResults.length} {videoResults.length === 1 ? 'video' : 'videos'} found
                    </p>
                  </div>
                  {activeTab === 'all' && videoResults.length > 3 && (
                    <Button variant="ghost" onClick={() => setActiveTab('videos')}>
                      View All
                    </Button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(activeTab === 'all' ? videoResults.slice(0, 3) : videoResults).map((video) => (
                    <div key={video.id}>
                      <PodcastCard podcast={video} variant="sidebar" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
