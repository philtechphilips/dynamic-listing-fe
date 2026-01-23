
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  topRestaurants,
  topMovies,
  topElectricians,
  topHotels,
  topGyms,
  topSalons,
  topPlumbers
} from '@/lib/mockData';
import { Listing } from '@/types';
import ListingInteractions from '@/components/ListingInteractions';

// Helper to find listing
const findListingBySlug = (slug: string): Listing | undefined => {
  const allListings = [
    ...topRestaurants,
    ...topMovies,
    ...topElectricians,
    ...topHotels,
    ...topGyms,
    ...topSalons,
    ...topPlumbers,
  ];
  return allListings.find((item) => item.slug === slug);
};

// Generate SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = findListingBySlug(slug);

  if (!listing) {
    return {
      title: 'Listing Not Found',
    };
  }

  return {
    title: `${listing.title} - Dynamic Listing`,
    description: listing.excerpt || `Check out ${listing.title} on Dynamic Listing.`,
    openGraph: {
      title: listing.title,
      description: listing.excerpt,
      images: [listing.featured_image || '/images/music.svg'],
    },
  };
}

// Reused StarRating component (Display Only)
function StarRating({ rating = 0, reviewCount }: { rating?: number; reviewCount?: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      {rating > 0 && (
        <span className="text-base font-medium text-gray-800">
          {rating.toFixed(1)}
          {reviewCount && <span className="text-gray-500"> ({reviewCount} reviews)</span>}
        </span>
      )}
    </div>
  );
}

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = findListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero / Header Section */}
      <div className="relative h-[400px] md:h-[500px] w-full -mt-25">
        <Image
          src={listing.featured_image || '/images/music.svg'}
          alt={listing.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto">
            {/* Category Tag */}
            {listing.category && (
              <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full mb-4">
                {listing.category}
              </span>
            )}

            <h1 className="text-3xl md:text-5xl font-clash font-bold mb-4">{listing.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
              {listing.location && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{listing.location}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <StarRating rating={listing.rating} reviewCount={listing.review_count} />
              </div>

              {listing.price_range && (
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                  <span className="font-semibold text-white">{listing.price_range}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl">
            <h2 className="text-2xl font-clash font-semibold text-gray-900 mb-4">About</h2>
            <div className="prose max-w-none text-gray-600 leading-relaxed">
              <p>{listing.content || listing.excerpt || "No description available."}</p>
            </div>
          </div>

          {/* Tags */}
          {listing.tags && listing.tags.length > 0 && (
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {listing.tags.map(tag => (
                  <span key={tag.id} className="px-4 py-2 bg-primary-300 text-primary rounded-full text-sm font-semibold hover:opacity-80 transition-opacity cursor-default">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <ListingInteractions listingTitle={listing.title} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 sticky top-32">
            <h3 className="text-xl font-clash font-semibold text-gray-900 mb-6">Contact & Info</h3>

            <div className="space-y-6">
              {listing.address && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-gray-600 text-sm mt-1">{listing.address}</p>
                  </div>
                </div>
              )}

              {listing.website && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Website</h4>
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm mt-1 block break-all"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              )}

              {listing.phone && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <a href={`tel:${listing.phone}`} className="text-gray-600 hover:text-primary text-sm mt-1 block">
                      {listing.phone}
                    </a>
                  </div>
                </div>
              )}

              {listing.email && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <a href={`mailto:${listing.email}`} className="text-gray-600 hover:text-primary text-sm mt-1 block break-all">
                      {listing.email}
                    </a>
                  </div>
                </div>
              )}

              {listing.opening_hours && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Opening Hours</h4>
                    <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">{listing.opening_hours}</p>
                  </div>
                </div>
              )}
            </div>

            {listing.google_map_url && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Location</h4>
                <div className="rounded-xl overflow-hidden shadow-sm h-64 relative border border-gray-200">
                  <iframe
                    src={listing.google_map_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${listing.title} Location`}
                  />
                </div>
                <div className="mt-2 text-right">
                  <a
                    href={listing.google_map_url.replace('/embed', '')} // Simple fallback attempt, though ideally we store both or construct the link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            )}


            <div className="mt-8 pt-6 border-t">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-gray-700 font-medium"
              >
                <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Back to Listings
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* Related Listings */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 mt-20 pt-12 border-t border-gray-100">
        <h2 className="text-2xl font-clash font-bold text-gray-900 mb-8">Related Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            ...topRestaurants,
            ...topMovies,
            ...topElectricians,
            ...topHotels,
            ...topGyms,
            ...topSalons,
            ...topPlumbers,
          ]
            .filter(item => item.category === listing.category && item.slug !== listing.slug)
            .slice(0, 3)
            .map(item => (
              <Link href={`/listing/${item.slug}`} key={item.id} className="group block h-full">
                <div className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.featured_image || '/images/music.svg'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur text-xs font-medium text-gray-900 rounded-md">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-clash font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      {item.rating && (
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md">
                          <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-900">{item.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-auto pt-4 border-t border-gray-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
