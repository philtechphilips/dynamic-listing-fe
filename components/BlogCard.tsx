import Link from 'next/link';
import Image from 'next/image';

// Types
type ContentType = 'post' | 'event' | 'podcast' | 'resource';
type LayoutType = 'default' | 'horizontal' | 'compact';

interface Tag {
  id: string | number;
  name: string;
}

interface Category {
  id: string | number;
  name: string;
}

interface User {
  name: string;
  initials?: string;
  profile_image_url?: string;
  image?: string; // Backend API uses "image"
}

interface Post {
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
  event_date_time?: string | Date;
  created_at?: string | Date;
  reading_time?: number;
  video_url?: string;
  author_name?: string;
  author_profile_image?: string;
  user?: User;
  author?: User;
  category?: Category;
  categories?: Category[];
  tags?: Tag[];
  // Backend fields
  featuredImage?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  authorId?: string;
}

interface BlogCardProps {
  post?: Post;
  image?: string;
  date?: string;
  readTime?: string;
  category?: string;
  title?: string;
  author?: string;
  authorImage?: string;
  href?: string;
  layout?: LayoutType;
  showCategory?: boolean;
  showAuthor?: boolean;
  showReadTime?: boolean;
  imageHeight?: string;
  showTags?: boolean;
  onPodcastPlay?: (post: Post) => void;
}

// Helper function to calculate read time
function calculateReadTime(content?: string): string {
  if (!content) return '1 mins Read';
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return `${Math.ceil(wordCount / 200)} mins Read`;
}

// Helper function to format date
function formatDate(date?: string | Date): string {
  if (!date) return 'Coming Soon';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

// Helper function to limit string length
function limitString(str: string, limit: number): string {
  if (str.length <= limit) return str;
  return str.substring(0, limit) + '...';
}

// Helper function to get content route
function getContentRoute(type: ContentType, slug: string): string {
  return `/item/${slug}`;
}

// Play button overlay component for podcasts
function PlayButton({ size = 'lg', onClick }: { size?: 'sm' | 'lg'; onClick: (e: React.MouseEvent) => void }) {
  const sizeClasses = size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  const iconSize = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';

  return (
    <button
      onClick={onClick}
      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-200 rounded-lg group"
    >
      <div className={`${sizeClasses} bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 group-hover:scale-110`}>
        <svg className={`${iconSize} text-gray-900 ml-1`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </button>
  );
}

// Author avatar component
function AuthorAvatar({
  user,
  authorImage,
  author,
  size = 'md'
}: {
  user?: User;
  authorImage?: string;
  author: string;
  size?: 'sm' | 'md';
}) {
  const sizeClasses = size === 'md' ? 'w-10 h-10' : 'w-8 h-8';
  const textSize = size === 'md' ? 'text-sm' : 'text-xs';

  const imageSrc = user?.profile_image_url || user?.image;
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt={author}
        width={size === 'md' ? 40 : 32}
        height={size === 'md' ? 40 : 32}
        className={`${sizeClasses} rounded-full object-cover`}
      />
    );
  }

  if (authorImage && authorImage !== '/images/profile-img.svg') {
    return (
      <Image
        src={authorImage}
        alt={author}
        width={size === 'md' ? 40 : 32}
        height={size === 'md' ? 40 : 32}
        className={`${sizeClasses} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center`}
      style={{ background: 'linear-gradient(135deg, #D61818 0%, #6366f1 100%)' }}
    >
      <span className={`text-white font-bold ${textSize}`}>
        {user?.initials || author.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

// Tags component
function TagsList({ tags, category, showTags, showCategory }: {
  tags?: Tag[];
  category: string;
  showTags: boolean;
  showCategory: boolean;
}) {
  if (showTags && tags && tags.length > 0) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center py-1 px-2 bg-primary/10 rounded-md w-fit">
            <p className="text-primary text-sm font-medium">{tag.name}</p>
          </div>
        ))}
      </div>
    );
  }

  if (showCategory) {
    return (
      <div className="flex items-center py-1 px-2 bg-primary/10 rounded-md w-fit">
        <p className="text-primary text-sm font-medium">{category}</p>
      </div>
    );
  }

  return null;
}

export default function BlogCard({
  post,
  image: propImage = '/images/music.svg',
  date: propDate = 'June 12, 2025',
  readTime: propReadTime = '3 mins Read',
  category: propCategory = 'Tags',
  title: propTitle = '69 Discovery: 12 Politically-Conscious Afrobeats Songs You Should Listen To',
  author: propAuthor = 'Stephanie white',
  authorImage: propAuthorImage = '',
  href: propHref = '#',
  layout = 'default',
  showCategory = true,
  showAuthor = true,
  showReadTime = true,
  imageHeight = 'h-full',
  showTags = false,
  onPodcastPlay,
}: BlogCardProps) {
  // Process post data if provided
  let image = propImage;
  let date = propDate;
  let readTime = propReadTime;
  let category = propCategory;
  let title = propTitle;
  let author = propAuthor;
  let authorImage = propAuthorImage;
  let href = propHref;
  let excerpt = '';
  let contentType: ContentType = 'post';

  if (post) {
    title = post.title;
    excerpt = post.excerpt || '';
    contentType = post.type || post.content_type || 'post';

    // Get image
    image = post.featuredImage || post.featured_image_webp || post.featured_image || propImage;

    switch (contentType) {
      case 'post':
        date = formatDate(post.published_at || post.createdAt);
        author = post.author?.name || post.user?.name || post.author_name || 'Anonymous';
        authorImage = post.author_profile_image || post.author?.image || post.user?.image || '/images/profile-img.svg';
        category = post.category?.name || 'Blog';
        href = getContentRoute('post', post.slug);
        readTime = calculateReadTime(post.content);
        break;

      case 'event':
        date = formatDate(post.event_date_time) || 'TBD';
        author = post.user?.name || 'Event Organizer';
        authorImage = '/images/profile-img.svg';
        category = post.category?.name || 'Event';
        href = getContentRoute('event', post.slug);
        readTime = 'Event';
        break;

      case 'podcast':
        date = formatDate(post.published_at || post.createdAt);
        author = post.user?.name || 'Podcast Host';
        authorImage = '/images/profile-img.svg';
        category = post.category?.name || 'Podcast';
        href = getContentRoute('podcast', post.slug);
        readTime = post.reading_time ? `${post.reading_time} mins` : 'Podcast';
        break;

      case 'resource':
        date = formatDate(post.created_at) || 'Available';
        author = post.user?.name || 'Resource Provider';
        authorImage = '/images/profile-img.svg';
        category = post.categories?.[0]?.name || 'Resource';
        href = getContentRoute('resource', post.slug);
        readTime = 'Resource';
        break;

      default:
        date = formatDate(post.published_at || post.createdAt);
        author = post.author?.name || post.user?.name || post.author_name || 'Anonymous';
        authorImage = post.author_profile_image || '/images/profile-img.svg';
        category = post.category?.name || 'Tags';
        href = getContentRoute('post', post.slug);
        readTime = calculateReadTime(post.content);
    }
  }

  const handlePodcastPlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (post && onPodcastPlay) {
      onPodcastPlay(post);
    }
  };

  const isPodcast = post?.video_url && contentType === 'podcast';

  // Horizontal Layout
  if (layout === 'horizontal') {
    return (
      <Link
        href={href}
        className="w-full flex md:flex-row flex-col gap-6 hover:opacity-90 transition-opacity"
      >
        <div className={`md:w-1/2 w-full ${imageHeight || 'h-[200px]'} overflow-hidden rounded-lg relative`}>
          <Image
            src={image}
            alt={title}
            fill
            className={`w-full ${imageHeight} object-cover scale-100 hover:scale-105 transition-all duration-500`}
          />
          {isPodcast && <PlayButton onClick={handlePodcastPlay} />}
        </div>

        <div className="flex flex-col md:w-1/2 w-full">
          <div className="md:mb-4 mb-0">
            <TagsList tags={post?.tags} category={category} showTags={showTags} showCategory={showCategory} />
          </div>

          {showReadTime && (
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-4 md:mt-4">
              <p>{date}</p>
              <span className="w-1 h-1 rounded-full bg-current" />
              <p>{readTime}</p>
            </div>
          )}

          <h5 className="font-clash text-foreground font-semibold text-2xl md:mt-6 mt-4">
            {limitString(title, 52)}
          </h5>

          {excerpt && (
            <p className="text-muted-foreground text-sm md:mt-3 mt-2 leading-relaxed line-clamp-2">
              {limitString(excerpt, 120)}
            </p>
          )}

          {showAuthor && (
            <div className="flex items-center gap-2 mt-6">
              <AuthorAvatar user={post?.author || post?.user} authorImage={authorImage} author={author} />
              <p className="font-medium text-sm text-foreground">{author}</p>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Compact Layout
  if (layout === 'compact') {
    return (
      <Link href={href} className="w-full block hover:opacity-90 transition-opacity">
        <div className="w-full overflow-hidden rounded-lg relative">
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className={`w-full ${imageHeight} object-cover scale-100 hover:scale-105 transition-all duration-500`}
          />
          {isPodcast && <PlayButton size="sm" onClick={handlePodcastPlay} />}
        </div>

        <div className="mt-4">
          <TagsList tags={post?.tags} category={category} showTags={showTags} showCategory={showCategory} />
        </div>

        <h5 className="font-clash text-foreground font-semibold text-lg mt-4">
          {limitString(title, 50)}
        </h5>

        {showReadTime && (
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-2">
            <p>{date}</p>
            <span className="w-1 h-1 rounded-full bg-current" />
            <p>{readTime}</p>
          </div>
        )}

        {showAuthor && (
          <div className="flex items-center gap-2 mt-4">
            <AuthorAvatar user={post?.author || post?.user} authorImage={authorImage} author={author} size="sm" />
            <p className="font-medium text-sm text-foreground">{author}</p>
          </div>
        )}
      </Link>
    );
  }

  // Default Layout
  return (
    <Link href={href} className="w-full h-full flex flex-col hover:opacity-90 transition-opacity">
      <div className={`w-full overflow-hidden rounded-lg relative ${imageHeight === 'h-full' ? 'flex-1' : imageHeight}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="w-full h-full object-cover scale-100 hover:scale-105 transition-all duration-500"
        />
        {isPodcast && <PlayButton onClick={handlePodcastPlay} />}
      </div>

      <div className="flex md:flex-row flex-col-reverse md:items-center items-start justify-between mt-7">
        {showReadTime && (
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-4 md:mt-0">
            <p>{date}</p>
            <span className="w-1 h-1 rounded-full bg-current" />
            <p>{readTime}</p>
          </div>
        )}
        <TagsList tags={post?.tags} category={category} showTags={showTags} showCategory={showCategory} />
      </div>

      <h5 className="font-clash text-foreground font-semibold text-2xl mt-4">
        {limitString(title, 50)}
      </h5>

      {excerpt && (
        <p className="text-muted-foreground text-sm mt-3 leading-relaxed line-clamp-3">
          {limitString(excerpt, 150)}
        </p>
      )}

      {showAuthor && (
        <div className="flex items-center gap-2 mt-6">
          <AuthorAvatar user={post?.author || post?.user} authorImage={authorImage} author={author} />
          <p className="font-medium text-sm text-foreground">{author}</p>
        </div>
      )}
    </Link>
  );
}
