/**
 * =============================================================================
 * ITEM DETAIL PAGE
 * =============================================================================
 *
 * Dynamic page displaying full details of a single listing/item.
 * This is a server component with SEO metadata support.
 *
 * Features:
 * - Full listing details (title, description, images, contact info)
 * - Rating and review system
 * - Comments section
 * - Share functionality
 * - Related listings
 * - SEO metadata generation
 *
 * @route /item/[slug]
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  eventsCategory,
} from "@/lib/mockData";
import { Listing, Post, Podcast, Resource, Event } from "@/types";
import ListingInteractions from "@/components/ListingInteractions";
import ShareActions from "@/components/ShareActions";
import Comments from "@/components/Comments";
import {
  MapPin,
  Globe,
  Phone,
  Mail,
  Clock,
  Star,
  ArrowLeft,
  Calendar,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import styles from "./item-content.module.css";

/** Base API URL for fetching listing data */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Body HTML for display.
 * - `content` from DB is raw HTML produced by TinyMCE (WYSIWYG).  Its \n chars
 *   are just source formatting between tags – we must NOT convert them to <br />.
 * - `excerpt` / `fallback` are plain text: convert \n → <br /> so line breaks show.
 */
function getBodyHtml(
  content: string | null | undefined,
  excerpt: string | null | undefined,
  fallback: string,
): string {
  // Prefer rich content from WYSIWYG editor
  if (content) {
    // Content is already HTML; return as-is (don't inject <br /> between tags)
    return content;
  }
  // Fall back to excerpt or default – plain text, so convert newlines
  const raw = excerpt || fallback;
  if (!raw) return "";
  return raw.replace(/\n/g, "<br />");
}

// Helper types
type ContentItem = Listing | Post | Podcast | Resource | Event;

// Helper to get all events
const getAllEvents = (): Event[] => {
  const events: Event[] = [];
  if (eventsCategory.children) {
    eventsCategory.children.forEach((subCat) => {
      if (subCat.latest_events) {
        events.push(...subCat.latest_events);
      }
    });
  }
  return events;
};

// Helper to find any item by slug (including API)
const findItemBySlug = async (
  slug: string,
): Promise<
  | { item: any; type: "listing" | "post" | "podcast" | "resource" | "event" }
  | undefined
> => {
  // 1. Try fetching from API Listings
  try {
    const listingRes = await fetch(`${API_URL}/listings/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (listingRes.ok) {
      const data = await listingRes.json();
      if (data.listing) return { item: data.listing, type: "listing" };
    }
  } catch (e) { }

  // 2. Try fetching from API News
  try {
    const newsRes = await fetch(`${API_URL}/news/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (newsRes.ok) {
      const data = await newsRes.json();
      if (data.news) return { item: data.news, type: "post" };
    }
  } catch (e) { }

  // 3. Check mock listings
  const allListings = [
    ...topRestaurants,
    ...topMovies,
    ...topElectricians,
    ...topHotels,
    ...topGyms,
    ...topSalons,
    ...topPlumbers,
  ];
  const listing = allListings.find((item) => item.slug === slug);
  if (listing) return { item: listing, type: "listing" };

  // 4. Check mock posts
  const allPosts = [...latestPosts, ...newsPosts, ...trendingPosts];
  const post = allPosts.find((item) => item.slug === slug);
  if (post) return { item: post, type: "post" };

  // 5. Check mock podcasts/videos
  const allPodcasts = [...latestPodcasts, ...topVideos];
  const podcast = allPodcasts.find((item) => item.slug === slug);
  if (podcast) return { item: podcast, type: "podcast" };

  // 6. Check mock resources
  const resource = latestResources.find((item) => item.slug === slug);
  if (resource) return { item: resource, type: "resource" };

  // 7. Check mock events
  const event = getAllEvents().find((item) => item.slug === slug);
  if (event) return { item: event, type: "event" };

  return undefined;
};

// Helper to get image URL
const getImageUrl = (item: ContentItem): string => {
  if ("featured_image_webp" in item && item.featured_image_webp)
    return item.featured_image_webp;
  if ("featured_image" in item && item.featured_image)
    return item.featured_image;
  return "/images/music.svg";
};

// Helper to get date
const getDate = (item: ContentItem): string => {
  if ("published_at" in item && item.published_at)
    return new Date(item.published_at).toLocaleDateString();
  if ("created_at" in item && item.created_at)
    return new Date(item.created_at).toLocaleDateString();
  if ("event_date_time" in item && item.event_date_time)
    return new Date(item.event_date_time).toLocaleDateString();
  return "";
};

// Helper to format date for display
const formatDate = (date?: string | Date): string => {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

// Helper to get related content (including API)
const getRelatedContent = async (
  currentSlug: string,
  type: "listing" | "post" | "podcast" | "resource" | "event",
  categoryId?: string,
): Promise<any[]> => {
  let apiContent: any[] = [];

  // 1. Try fetching from API based on type
  try {
    if (type === "listing" || (type === "post" && categoryId)) {
      const url = categoryId
        ? `${API_URL}/listings?category=${categoryId}`
        : `${API_URL}/listings`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        if (data.listings) apiContent = [...apiContent, ...data.listings];
      }
    }

    if (type === "post") {
      const url = categoryId
        ? `${API_URL}/news?category=${categoryId}`
        : `${API_URL}/news`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        if (data.news) apiContent = [...apiContent, ...data.news];
      }
    }
  } catch (e) { }

  // 2. Filter and return
  return apiContent
    .filter((item) => item.slug !== currentSlug)
    .filter((v, i, a) => a.findIndex((t) => t.slug === v.slug) === i) // Deduplicate
    .slice(0, 3);
};

// Star Rating Component
function StarRating({
  rating = 0,
  reviewCount,
}: {
  rating?: number;
  reviewCount?: number;
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 text-yellow-400 fill-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 opacity-50" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="w-4 h-4 text-muted-foreground/30"
          />
        ))}
      </div>
      {rating > 0 && (
        <span className="text-sm font-semibold text-white">
          {rating.toFixed(1)}
          {reviewCount && (
            <span className="text-white/80 font-normal"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}

// Generate Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await findItemBySlug(slug);

  if (!result) {
    return {
      title: "Item Not Found",
    };
  }

  const { item } = result;
  const title = item.title;
  // @ts-ignore
  const description =
    item.excerpt ||
    item.content?.substring(0, 160) ||
    `Check out ${title} on Dynamic Listing.`;
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

export default async function UnifiedDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await findItemBySlug(slug);

  if (!result) {
    notFound();
  }

  const { item, type } = result;
  const isVideo = item.is_video === true;
  const isListing = type === "listing" && !isVideo;
  const isContent =
    ["post", "podcast", "resource", "event"].includes(type) || isVideo;

  const title = item.title;
  const image = item.featuredImage || item.featured_image || getImageUrl(item);
  const date = getDate(item);
  // @ts-ignore
  const author = item.author?.name || item.author_name || item.user?.name || "";
  // @ts-ignore
  const bodyContent =
    item.content || item.excerpt || "No description available.";
  /** Raw HTML from DB (WYSIWYG) when item.content is set; else plain text with newlines as <br /> */
  const bodyHtml = getBodyHtml(
    item.content,
    item.excerpt,
    "No description available.",
  );
  // @ts-ignore
  const categoryName =
    item.category?.name || item.category_obj?.name || item.category || type;

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

                <h1 className="text-3xl md:text-5xl font-clash font-bold tracking-tight">
                  {title}
                </h1>

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
                  <StarRating
                    rating={item.rating}
                    reviewCount={item.reviewCount || item.review_count}
                  />

                  {(item.priceRange || item.price_range) && (
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      <span className="font-semibold">
                        {item.priceRange || item.price_range}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Listing Content */}
          <div className="max-w-7xl mx-auto px-5 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-clash font-bold text-foreground mb-4">
                    About
                  </h2>
                  <div
                    className="rich-text break-words overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: bodyHtml,
                    }}
                  />
                </CardContent>
              </Card>

              {/* @ts-ignore */}
              {item.tags && item.tags.length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {/* @ts-ignore */}
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="px-3 py-1 border-0"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-6">
                <ListingInteractions
                  listingTitle={title}
                  listingId={String(item.id)}
                  initialRating={item.rating || 0}
                  // @ts-ignore
                  initialReviewCount={
                    item.reviewCount || item.review_count || 0
                  }
                />
                <Comments
                  listingId={
                    (type as string) === "listing" ? String(item.id) : undefined
                  }
                  newsId={
                    (type as string) === "post" ? String(item.id) : undefined
                  }
                />
              </div>

              {/* Related Content for Listings */}
              {await (async () => {
                const relatedItems = await getRelatedContent(
                  slug,
                  type,
                  item.categoryId,
                );
                if (relatedItems.length > 0) {
                  return (
                    <div className="mt-12 pt-10 border-t border-border/40">
                      <div className="mb-8">
                        <h2 className="text-2xl font-clash font-bold text-foreground">
                          Related {categoryName}
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                          Discover more in this category
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedItems.map((relatedItem) => {
                          const imageUrl =
                            relatedItem.featuredImage ||
                            relatedItem.featured_image_webp ||
                            relatedItem.featured_image ||
                            "/images/music.svg";
                          const excerpt = relatedItem.excerpt || "";
                          const publishDate =
                            relatedItem.published_at ||
                            relatedItem.createdAt ||
                            relatedItem.created_at;

                          return (
                            <Link
                              key={relatedItem.id}
                              href={`/item/${relatedItem.slug}`}
                              className="group"
                            >
                              <Card className="border-0 shadow-sm hover:shadow-md transition-all overflow-hidden h-full">
                                <div className="relative h-40 w-full overflow-hidden bg-muted">
                                  <Image
                                    src={imageUrl}
                                    alt={relatedItem.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                </div>
                                <CardContent className="p-4 space-y-2">
                                  <h3 className="font-clash font-semibold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                    {relatedItem.title}
                                  </h3>
                                  {excerpt && (
                                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                      {excerpt}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>
                                      {relatedItem.location || "Location"}
                                    </span>
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
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm sticky top-32">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-clash font-bold text-foreground">
                    Contact & Info
                  </h3>

                  <div className="space-y-4">
                    {/* @ts-ignore */}
                    {item.address && (
                      <>
                        <div className="flex gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm">
                              Address
                            </h4>
                            {/* @ts-ignore */}
                            <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">
                              {item.address}
                            </p>
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
                            <h4 className="font-semibold text-foreground text-sm">
                              Website
                            </h4>
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
                            <h4 className="font-semibold text-foreground text-sm">
                              Phone
                            </h4>
                            {/* @ts-ignore */}
                            <a
                              href={`tel:${item.phone}`}
                              className="text-muted-foreground hover:text-primary text-sm mt-0.5 block"
                            >
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
                            <h4 className="font-semibold text-foreground text-sm">
                              Email
                            </h4>
                            {/* @ts-ignore */}
                            <a
                              href={`mailto:${item.email}`}
                              className="text-muted-foreground hover:text-primary text-sm mt-0.5 block break-all"
                            >
                              {/* @ts-ignore */}
                              {item.email}
                            </a>
                          </div>
                        </div>
                        <Separator />
                      </>
                    )}

                    {(item.openingHours || item.opening_hours) && (
                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm">
                            Opening Hours
                          </h4>
                          <p className="text-muted-foreground text-sm mt-0.5 whitespace-pre-line leading-relaxed">
                            {item.openingHours || item.opening_hours}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Google Map */}
                  {(item.googleMapUrl || item.google_map_url || item.address) &&
                    (() => {
                      const mapUrl =
                        item.googleMapUrl || item.google_map_url || "";
                      const isEmbedUrl =
                        mapUrl.includes("/embed") ||
                        mapUrl.includes("maps/embed");

                      // For non-embed URLs or if we have an address, construct an embed URL using the address
                      const address = item.address || item.location || "";
                      const embedUrl = isEmbedUrl
                        ? mapUrl
                        : `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

                      return (
                        <>
                          <Separator />
                          <div className="space-y-3">
                            <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              Location Map
                            </h4>
                            <div className="rounded-lg overflow-hidden border border-border/50">
                              <iframe
                                src={embedUrl}
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                              ></iframe>
                            </div>
                            {mapUrl && !isEmbedUrl && (
                              <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2 text-primary hover:underline text-sm"
                              >
                                <Globe className="w-3.5 h-3.5" />
                                Open in Google Maps
                              </a>
                            )}
                          </div>
                        </>
                      );
                    })()}

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
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div
                  className="rich-text break-words overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: bodyHtml,
                  }}
                />
              </CardContent>
            </Card>

            {/* Related Content */}
            {await (async () => {
              const relatedItems = await getRelatedContent(
                slug,
                type,
                item.categoryId,
              );
              if (relatedItems.length > 0) {
                return (
                  <div className="mt-16 pt-12 border-t border-border/40">
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-clash font-bold text-foreground">
                        {type === "post"
                          ? "Related Articles"
                          : type === "podcast"
                            ? "More Podcasts"
                            : "More Resources"}
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        Discover more content you might enjoy
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedItems.map((relatedItem) => {
                        const imageUrl =
                          relatedItem.featuredImage ||
                          relatedItem.featured_image_webp ||
                          relatedItem.featured_image ||
                          "/images/music.svg";
                        const excerpt = relatedItem.excerpt || "";
                        const publishDate =
                          relatedItem.published_at ||
                          relatedItem.createdAt ||
                          relatedItem.created_at;

                        return (
                          <Link
                            key={relatedItem.id}
                            href={`/item/${relatedItem.slug}`}
                            className="group"
                          >
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
                                  {relatedItem.category?.name ||
                                    relatedItem.category ||
                                    type}
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

            {/* Video Embed */}
            {(() => {
              const videoUrl = "video_url" in item ? item.video_url : null;
              if (!videoUrl) return null;

              const getYouTubeId = (url: string) => {
                const regExp =
                  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = url.match(regExp);
                return match && match[2].length === 11 ? match[2] : null;
              };

              const videoId = getYouTubeId(videoUrl);
              if (!videoId) return null;

              return (
                <Card className="mt-10 border-0 shadow-sm overflow-hidden">
                  {/* iOS-compatible responsive video container using padding-bottom technique */}
                  <div
                    className="relative w-full bg-muted overflow-hidden"
                    style={{ paddingBottom: '56.25%' }} /* 16:9 aspect ratio */
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?playsinline=1`}
                      title={title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                    ></iframe>
                  </div>
                </Card>
              );
            })()}

            {/* Comments for Posts/Videos/Resources */}
            <div className="mt-12">
              <Comments
                listingId={
                  (type as string) === "listing" ? String(item.id) : undefined
                }
                newsId={
                  (type as string) === "post" ? String(item.id) : undefined
                }
              />
            </div>

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
