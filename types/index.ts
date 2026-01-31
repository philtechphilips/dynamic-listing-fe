// User type
export interface User {
  id: string | number;
  name: string;
  initials?: string;
  profile_image_url?: string;
}

// Tag type
export interface Tag {
  id: string | number;
  name: string;
  slug: string;
}

// Category type
export interface Category {
  id: string | number;
  name: string;
  slug: string;
  children?: Category[];
  latest_posts?: Post[];
  latest_events?: Event[];
}

// Base content type
export type ContentType = 'post' | 'event' | 'podcast' | 'resource';

// Post type
export interface Post {
  id: string | number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  type?: ContentType;
  content_type?: ContentType;
  featured_image?: string;
  featured_image_webp?: string;
  published_at?: string | Date;
  created_at?: string | Date;
  reading_time?: number;
  video_url?: string;
  author_name?: string;
  author_profile_image?: string;
  user?: User;
  category?: Category;
  categories?: Category[];
  tags?: Tag[];
  // Backend fields
  featuredImage?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

// Event type
export interface Event {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  event_date_time?: string | Date;
  event_location?: string;
  tags?: Tag[];
  user?: User;
  category?: Category;
}

// Podcast type
export interface Podcast {
  id: string | number;
  title: string;
  slug: string;
  content?: string;
  featured_image?: string;
  featured_image_webp?: string;
  published_at?: string | Date;
  reading_time?: number;
  video_url?: string;
  user?: User;
}

// Resource type
export interface Resource {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  created_at?: string | Date;
  user?: User;
  categories?: Category[];
}

// Listing type
export interface Listing {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  featured_image_webp?: string;
  rating?: number;
  review_count?: number;
  location?: string;
  category?: string | Category;
  price_range?: string;
  tags?: Tag[];
  created_at?: string | Date;
  published_at?: string | Date;
  user?: User;
  category_obj?: Category;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  opening_hours?: string;
  google_map_url?: string;
  // Backend fields
  featuredImage?: string;
  priceRange?: string;
  reviewCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  openingHours?: string;
  googleMapUrl?: string;
  categoryId?: string;
  is_video?: boolean;
  video_url?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

// News Item type (specific to backend News model)
export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  status: string;
  authorId?: string;
  categoryId?: string;
  category?: Category;
  author?: User;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Helper function types
export function getOptimizedImageUrl(post: Post | Podcast, format?: string): string {
  return post.featured_image_webp || post.featured_image || '/images/music.svg';
}
