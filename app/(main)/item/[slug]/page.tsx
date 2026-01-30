import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
  trendingPosts,
  latestPodcasts,
  topVideos,
  latestResources,
  eventsCategory
} from '@/lib/mockData';
import { Listing, Post, Podcast, Resource, Event } from '@/types';
import ListingInteractions from '@/components/ListingInteractions';
import ShareActions from '@/components/ShareActions';
import Comments from '@/components/Comments';
import { MapPin, Globe, Phone, Mail, Clock, Star, ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Helper types
type ContentItem = Listing | Post | Podcast | Resource | Event;

// Helper to get all events
const getAllEvents = (): Event[] => {
  const events: Event[] = [];
  if (eventsCategory.children) {
    eventsCategory.children.forEach(subCat => {
      if (subCat.latest_events) {
        events.push(...subCat.latest_events);
      }
    });
  }
  return events;
};

// Helper to find any item by slug
const findItemBySlug = (slug: string): { item: ContentItem; type: 'listing' | 'post' | 'podcast' | 'resource' | 'event' } | undefined => {
  // Check listings
  const allListings = [
    ...topRestaurants,
    ...topMovies,
    ...topElectricians,
    ...topHotels,
    ...topGyms,
    ...topSalons,
    ...topPlumbers,
  ];
  const listing = allListings.find(item => item.slug === slug);
  if (listing) return { item: listing, type: 'listing' };

  // Check posts
  const allPosts = [...latestPosts, ...newsPosts, ...trendingPosts];
  const post = allPosts.find(item => item.slug === slug);
  if (post) return { item: post, type: 'post' };

  // Check podcasts/videos
  const allPodcasts = [...latestPodcasts, ...topVideos];
  const podcast = allPodcasts.find(item => item.slug === slug);
  if (podcast) return { item: podcast, type: 'podcast' };

  // Check resources
  const resource = latestResources.find(item => item.slug === slug);
  if (resource) return { item: resource, type: 'resource' };

  // Check events
  const event = getAllEvents().find(item => item.slug === slug);
  if (event) return { item: event, type: 'event' };

  return undefined;
};

// Helper to get image URL
const getImageUrl = (item: ContentItem): string => {
  if ('featured_image_webp' in item && item.featured_image_webp) return item.featured_image_webp;
  if ('featured_image' in item && item.featured_image) return item.featured_image;
  return '/images/music.svg';
};

// Helper to get date
const getDate = (item: ContentItem): string => {
  if ('published_at' in item && item.published_at) return new Date(item.published_at).toLocaleDateString();
  if ('created_at' in item && item.created_at) return new Date(item.created_at).toLocaleDateString();
  if ('event_date_time' in item && item.event_date_time) return new Date(item.event_date_time).toLocaleDateString();
  return '';
};

// Helper to format date for display
const formatDate = (date?: string | Date): string => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

// Helper to get related content
const getRelatedContent = (currentSlug: string, type: 'listing' | 'post' | 'podcast' | 'resource' | 'event'): (Post | Podcast | Resource)[] => {
  if (type === 'listing') return [];

  let allContent: (Post | Podcast | Resource)[] = [];
  
  if (type === 'post') {
    allContent = [...latestPosts, ...newsPosts, ...trendingPosts];
  } else if (type === 'podcast') {
    allContent = [...latestPodcasts, ...topVideos];
  } else if (type === 'resource') {
    allContent = [...latestResources];
  }

  return allContent
    .filter(item => item.slug !== currentSlug)
    .slice(0, 3);
};

// Star Rating Component
function StarRating({ rating = 0, reviewCount }: { rating?: number; reviewCount?: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 opacity-50" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/30" />
        ))}
      </div>
      {rating > 0 && (
        <span className="text-sm font-semibold text-foreground">
          {rating.toFixed(1)}
          {reviewCount && <span className="text-muted-foreground font-normal"> ({reviewCount})</span>}
        </span>
      )}
    </div>
  );
}

// Generate Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = findItemBySlug(slug);

  if (!result) {
    return {
      title: 'Item Not Found',
    };
  }

  const { item } = result;
  const title = item.title;
  // @ts-ignore
  const description = item.excerpt || item.content?.substring(0, 160) || `Check out ${title} on Dynamic Listing.`;
  const image = getImageUrl(item);

  return {
    title: `${title} - Dynamic Listing`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [image],
    },
  };
}

export default async function UnifiedDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = findItemBySlug(slug);

  if (!result) {
    notFound();
  }

  const { item, type } = result;
  const isListing = type === 'listing';
  const isContent = ['post', 'podcast', 'resource', 'event'].includes(type);

  const title = item.title;
  const image = getImageUrl(item);
  const date = getDate(item);
  // @ts-ignore
  const author = item.author_name || item.user?.name || '';
  // @ts-ignore
  const bodyContent = item.content || item.excerpt || 'No description available.';
  // @ts-ignore
  const categoryName = item.category?.name || item.category || type;

  return (
    <main className="min-h-screen bg-gray-50/50 pt-24 pb-20">
      {isListing ? (
        <>
          {/* Listing Hero */}
          <div className="relative h-[400px] md:h-[500px] w-full -mt-25">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
              <div className="max-w-7xl mx-auto space-y-4">
                {categoryName && (
                  <Badge variant="default" className="text-white px-3 py-1">
                    {categoryName}
                  </Badge>
                )}

                <h1 className="text-3xl md:text-5xl font-clash font-bold tracking-tight">{title}</h1>

                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                  {/* @ts-ignore */}
                  {item.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {/* @ts-ignore */}
                      <span>{item.location}</span>
                    </div>
                  )}

                  {/* @ts-ignore */}
                  <StarRating rating={item.rating} reviewCount={item.review_count} />

                  {/* @ts-ignore */}
                  {item.price_range && (
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      {/* @ts-ignore */}
                      <span className="font-semibold">{item.price_range}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Listing Content */}
          <div className="max-w-7xl mx-auto px-5 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-clash font-bold text-foreground mb-4">About</h2>
                  <div className="prose max-w-none text-muted-foreground leading-relaxed">
                    <p>{bodyContent}</p>
                  </div>
                </CardContent>
              </Card>

              {/* @ts-ignore */}
              {item.tags && item.tags.length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {/* @ts-ignore */}
                      {item.tags.map(tag => (
                        <Badge key={tag.id} variant="secondary" className="px-3 py-1 border-0">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-6">
                <ListingInteractions listingTitle={title} />
                <Comments />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm sticky top-32">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-clash font-bold text-foreground">Contact & Info</h3>

                  <div className="space-y-4">
                    {/* @ts-ignore */}
                    {item.address && (
                      <>
                        <div className="flex gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm">Address</h4>
                            {/* @ts-ignore */}
                            <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">{item.address}</p>
                          </div>
                        </div>
                        <Separator />
                      </>
                    )}

                    {/* @ts-ignore */}
                    {item.website && (
                      <>
                        <div className="flex gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                            <Globe className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm">Website</h4>
                            {/* @ts-ignore */}
                            <a
                              // @ts-ignore
                              href={item.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-sm mt-0.5 block break-all"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                        <Separator />
                      </>
                    )}

                    {/* @ts-ignore */}
                    {item.phone && (
                      <>
                        <div className="flex gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm">Phone</h4>
                            {/* @ts-ignore */}
                            <a href={`tel:${item.phone}`} className="text-muted-foreground hover:text-primary text-sm mt-0.5 block">
                              {/* @ts-ignore */}
                              {item.phone}
                            </a>
                          </div>
                        </div>
                        <Separator />
                      </>
                    )}

                    {/* @ts-ignore */}
                    {item.email && (
                      <>
                        <div className="flex gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm">Email</h4>
                            {/* @ts-ignore */}
                            <a href={`mailto:${item.email}`} className="text-muted-foreground hover:text-primary text-sm mt-0.5 block break-all">
                              {/* @ts-ignore */}
                              {item.email}
                            </a>
                          </div>
                        </div>
                        <Separator />
                      </>
                    )}

                    {/* @ts-ignore */}
                    {item.opening_hours && (
                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm">Opening Hours</h4>
                          {/* @ts-ignore */}
                          <p className="text-muted-foreground text-sm mt-0.5 whitespace-pre-line leading-relaxed">{item.opening_hours}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href="/">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Home
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Content Header */}
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-4 capitalize border-0">
                {categoryName}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-clash font-bold text-foreground mb-6 leading-tight tracking-tight">
                {title}
              </h1>

              <div className="flex items-center justify-center gap-3 text-muted-foreground text-sm">
                {date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{date}</span>
                  </div>
                )}
                {author && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{author}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 mb-10 group">
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-muted">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex justify-center mb-10">
              <ShareActions title={title} />
            </div>

            {/* Content */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: bodyContent.replace(/\n/g, '<br />') }} />
                </div>
              </CardContent>
            </Card>

            {/* Related Content */}
            {(() => {
              const relatedItems = getRelatedContent(slug, type);
              if (relatedItems.length > 0) {
                return (
                  <div className="mt-16 pt-12 border-t border-border/40">
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-clash font-bold text-foreground">
                        {type === 'post' ? 'Related Articles' : type === 'podcast' ? 'More Podcasts' : 'More Resources'}
                      </h2>
                      <p className="text-muted-foreground mt-2">Discover more content you might enjoy</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedItems.map((relatedItem) => {
                        // @ts-ignore
                        const imageUrl = relatedItem.featured_image_webp || relatedItem.featured_image || '/images/music.svg';
                        // @ts-ignore
                        const excerpt = relatedItem.excerpt || '';
                        // @ts-ignore
                        const publishDate = relatedItem.published_at || relatedItem.created_at;
                        
                        return (
                          <Link key={relatedItem.id} href={`/item/${relatedItem.slug}`} className="group">
                            <Card className="border-0 shadow-sm hover:shadow-md transition-all overflow-hidden h-full">
                              <div className="relative h-48 w-full overflow-hidden bg-muted">
                                <Image
                                  src={imageUrl}
                                  alt={relatedItem.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              </div>
                              <CardContent className="p-5 space-y-3">
                                <Badge variant="secondary" className="border-0">
                                  {/* @ts-ignore */}
                                  {relatedItem.category?.name || type}
                                </Badge>
                                <h3 className="font-clash font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                  {relatedItem.title}
                                </h3>
                                {excerpt && (
                                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                    {excerpt}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                                  <Calendar className="w-3 h-3" />
                                  <span>{formatDate(publishDate)}</span>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            <div className="mt-10">
              <Comments />
            </div>

            {/* Video Embed */}
            {'video_url' in item && item.video_url && (
              <Card className="mt-10 border-0 shadow-sm overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-muted">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.video_url.split('v=')[1]}`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full min-h-[400px]"
                  ></iframe>
                </div>
              </Card>
            )}

            {/* Navigation */}
            <div className="mt-12 flex justify-center">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
