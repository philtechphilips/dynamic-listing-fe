import Link from "next/link";
import Image from "next/image";
import { Listing, Category } from "@/types";

interface ListingCardProps {
  listing: Listing;
  layout?: "default" | "horizontal" | "compact";
  imageHeight?: string;
  showTags?: boolean;
}

// Helper function to format date
function formatDate(date?: string | Date): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

// Helper function to limit string length
function limitString(str: string, limit: number): string {
  if (str.length <= limit) return str;
  return str.substring(0, limit) + "...";
}

// Helper function to extract category name
function getCategoryName(category?: string | Category): string {
  if (!category) return "";
  if (typeof category === "string") return category;
  return category.name || "";
}

// Star rating component
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
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half)"
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-gray-300 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      {rating > 0 && (
        <span className="text-sm font-medium text-gray-200">
          {rating.toFixed(1)}
          {reviewCount && (
            <span className="text-gray-300"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}

export default function ListingCard({
  listing,
  layout = "default",
  imageHeight = "h-full",
  showTags = false,
}: ListingCardProps) {
  const href = `/item/${listing.slug}`;

  // Horizontal Layout
  if (layout === "horizontal") {
    return (
      <Link
        href={href}
        className="w-full flex md:flex-row flex-col gap-6 hover:opacity-90 transition-opacity"
      >
        <div
          className={`md:w-1/2 w-full overflow-hidden rounded-lg relative ${imageHeight || "h-[200px]"}`}
        >
          <Image
            src={
              listing.featuredImage ||
              listing.featured_image ||
              "/images/music.svg"
            }
            alt={listing.title}
            fill
            className="w-full h-full object-cover scale-100 hover:scale-105 transition-all duration-500"
          />
          {listing.is_video && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:w-1/2 w-full">
          {(listing.category || listing.category_obj) && (
            <div className="flex items-center py-1 px-2 bg-primary-300 rounded-md w-fit mb-2">
              <p className="text-primary text-sm font-medium">
                {listing.category_obj?.name ||
                  getCategoryName(listing.category)}
              </p>
            </div>
          )}

          {listing.is_video && (
            <div className="flex items-center gap-1.5 py-0.5 px-2 bg-red-500/10 border border-red-500/20 rounded-full w-fit mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider">
                Video
              </p>
            </div>
          )}

          {listing.location && (
            <div className="flex items-center gap-2 text-sm font-medium text-gray-200 mt-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{listing.location}</p>
            </div>
          )}

          <h5 className="font-clash text-gray-100 font-semibold text-xl md:mt-4 mt-2">
            {limitString(listing.title, 52)}
          </h5>

          {listing.excerpt && (
            <p className="text-gray-200 text-sm md:mt-3 mt-2 leading-relaxed line-clamp-2">
              {limitString(listing.excerpt, 120)}
            </p>
          )}

          <div className="mt-4">
            <StarRating
              rating={listing.rating}
              reviewCount={listing.reviewCount || listing.review_count}
            />
          </div>

          {(listing.priceRange || listing.price_range) && (
            <p className="text-sm font-medium text-gray-200 mt-2">
              {listing.priceRange || listing.price_range}
            </p>
          )}
        </div>
      </Link>
    );
  }

  // Compact Layout
  if (layout === "compact") {
    return (
      <Link
        href={href}
        className="w-full block hover:opacity-90 transition-opacity"
      >
        <div className="w-full overflow-hidden rounded-lg relative">
          <Image
            src={
              listing.featuredImage ||
              listing.featured_image ||
              "/images/music.svg"
            }
            alt={listing.title}
            width={400}
            height={300}
            className={`w-full ${imageHeight} object-cover scale-100 hover:scale-105 transition-all duration-500`}
          />
          {listing.is_video && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          {(listing.category || listing.category_obj) && (
            <div className="flex items-center py-1 px-2 bg-primary-300 rounded-md w-fit mb-2">
              <p className="text-primary text-sm font-medium">
                {listing.category_obj?.name ||
                  getCategoryName(listing.category)}
              </p>
            </div>
          )}

          {listing.is_video && (
            <div className="flex items-center gap-1.5 py-0.5 px-2 bg-red-500/10 border border-red-500/20 rounded-full w-fit mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider">
                Video
              </p>
            </div>
          )}

          <h5 className="font-clash text-gray-100 font-semibold text-lg mt-2">
            {limitString(listing.title, 50)}
          </h5>

          {listing.location && (
            <div className="flex items-center gap-2 text-sm font-medium text-gray-200 mt-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm">{listing.location}</p>
            </div>
          )}

          <div className="mt-2">
            <StarRating
              rating={listing.rating}
              reviewCount={listing.reviewCount || listing.review_count}
            />
          </div>
        </div>
      </Link>
    );
  }

  // Default Layout
  return (
    <Link
      href={href}
      className="w-full h-full flex flex-col hover:opacity-90 transition-opacity"
    >
      <div
        className={`w-full overflow-hidden rounded-lg relative ${imageHeight}`}
      >
        <Image
          src={
            listing.featuredImage ||
            listing.featured_image ||
            "/images/music.svg"
          }
          alt={listing.title}
          fill
          className="w-full h-full object-cover scale-100 hover:scale-105 transition-all duration-500"
        />
        {listing.is_video && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all">
            <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-7 h-7 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
              Video
            </div>
          </div>
        )}
      </div>

      <div className="flex md:flex-row flex-col-reverse md:items-center items-start justify-between mt-4">
        <div className="flex flex-col gap-2">
          {listing.category && (
            <div className="flex items-center py-1 px-2 bg-primary-300 rounded-md w-fit">
              <p className="text-primary text-sm font-medium">
                {listing.category_obj?.name ||
                  getCategoryName(listing.category)}
              </p>
            </div>
          )}
          {listing.is_video && (
            <div className="flex items-center gap-1.5 py-0.5 px-2 bg-red-500/10 border border-red-500/20 rounded-full w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider">
                Video
              </p>
            </div>
          )}
        </div>
        {listing.location && (
          <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <p>{listing.location}</p>
          </div>
        )}
      </div>

      <h5 className="font-clash text-gray-100 font-semibold text-2xl mt-4">
        {limitString(listing.title, 50)}
      </h5>

      {listing.excerpt && (
        <p className="text-gray-200 text-sm mt-3 leading-relaxed line-clamp-3">
          {limitString(listing.excerpt, 150)}
        </p>
      )}

      <div className="mt-4">
        <StarRating
          rating={listing.rating}
          reviewCount={listing.reviewCount || listing.review_count}
        />
      </div>

      {(listing.priceRange || listing.price_range) && (
        <p className="text-sm font-medium text-gray-200 mt-2">
          {listing.priceRange || listing.price_range}
        </p>
      )}
    </Link>
  );
}
