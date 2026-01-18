'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  latestPosts, 
  newsPosts, 
  trendingPosts,
  latestPodcasts,
  topVideos,
  latestResources,
  eventsCategory
} from '@/lib/mockData';
import { Post, Podcast, Resource, Event, Category } from '@/types';

// Helper types
type ContentItem = Post | Podcast | Resource | Event;

// Helper to flatten events from category structure
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

// Helper to find content
const findContent = (type: string, slug: string): ContentItem | undefined => {
  switch (type) {
    case 'post':
      return [
        ...latestPosts, 
        ...newsPosts, 
        ...trendingPosts,
        // Also check nested posts in mainCategories if needed, but these are main ones
      ].find(item => item.slug === slug);
    
    case 'podcast':
      return [...latestPodcasts, ...topVideos].find(item => item.slug === slug);
      
    case 'resource':
      return latestResources.find(item => item.slug === slug);
      
    case 'event':
      return getAllEvents().find(item => item.slug === slug);
      
    default:
      return undefined;
  }
};

// Helper to get image URL safely
const getImageUrl = (item: ContentItem): string => {
  if ('featured_image_webp' in item && item.featured_image_webp) return item.featured_image_webp;
  if ('featured_image' in item && item.featured_image) return item.featured_image;
  return '/images/music.svg';
};

// Helper to get title safely
const getTitle = (item: ContentItem): string => {
  return item.title;
};

// Helper to get date safely
const getDate = (item: ContentItem): string => {
  if ('published_at' in item && item.published_at) return new Date(item.published_at).toLocaleDateString();
  if ('created_at' in item && item.created_at) return new Date(item.created_at).toLocaleDateString();
  if ('event_date_time' in item && item.event_date_time) return new Date(item.event_date_time).toLocaleDateString();
  return '';
};

export default function ContentDetailPage() {
  const params = useParams();
  const type = params.type as string;
  const slug = params.slug as string;
  const content = findContent(type, slug);

  if (!content) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 px-5 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-clash font-semibold text-gray-900 mb-4">Content Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <Link href="/" className="px-6 py-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all">
          Back to Home
        </Link>
      </div>
    );
  }

  const title = getTitle(content);
  const image = getImageUrl(content);
  const date = getDate(content);
  // @ts-ignore - accessing common properties that might not exist on all overlapping types without strict guards
  const author = content.author_name || content.user?.name || '';
  // @ts-ignore
  const bodyContent = content.content || content.excerpt || 'No content available.';
  // @ts-ignore
  const categoryName = content.category?.name || type;

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-5 md:px-0">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 capitalize">
            {categoryName}
          </span>
          <h1 className="text-3xl md:text-5xl font-clash font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
            {date && <p>{date}</p>}
            {author && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <p>by {author}</p>
              </>
            )}
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full h-[300px] md:h-[500px] relative rounded-2xl overflow-hidden mb-12">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
           {/* Render HTML content safely if needed, or just text for now */}
           {/* For mock data we often have plain text or simple HTML */}
           <div dangerouslySetInnerHTML={{ __html: bodyContent.replace(/\n/g, '<br />') }} />
        </div>
        
        {/* Video Embed for Podcasts/Videos */}
        {'video_url' in content && content.video_url && (
            <div className="mt-12 mb-12">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                <iframe 
                  src={`https://www.youtube.com/embed/${content.video_url.split('v=')[1]}`} 
                  title={title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full min-h-[400px]"
                ></iframe>
              </div>
            </div>
        )}

        {/* Related Content */}
        <div className="mt-20 pt-12 border-t border-gray-100">
          <h2 className="text-2xl font-clash font-bold text-gray-900 mb-8">Related Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Simple Related Cards Logic */}
             {(
                type === 'post' ? [...latestPosts, ...newsPosts].filter(p => p.slug !== slug && p.category?.id === (content as Post).category?.id).slice(0, 3) :
                type === 'podcast' ? latestPodcasts.filter(p => p.slug !== slug).slice(0, 3) :
                type === 'resource' ? latestResources.filter(p => p.slug !== slug).slice(0, 3) :
                // For events or others, just show latest posts for now as fallback
                latestPosts.slice(0, 3)
             ).map((item) => (
               <Link href={`/content/${type}/${item.slug}`} key={item.id} className="group block">
                 <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                   <Image 
                      src={'featured_image_webp' in item && item.featured_image_webp ? item.featured_image_webp : 'featured_image' in item && item.featured_image ? item.featured_image : '/images/music.svg'} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                 </div>
                 <h3 className="font-clash font-semibold text-lg text-gray-900 leading-tight group-hover:text-primary transition-colors">
                   {item.title}
                 </h3>
                 <p className="text-gray-500 text-sm mt-2">
                   {'published_at' in item ? new Date(item.published_at as string).toLocaleDateString() : 'created_at' in item ? new Date(item.created_at as string).toLocaleDateString() : ''}
                 </p>
               </Link>
             ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 flex justify-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
