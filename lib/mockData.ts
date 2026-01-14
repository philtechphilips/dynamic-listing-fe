import { Post, Category, Event, Podcast, Resource, Listing } from "@/types";

// Latest/Featured Posts for carousel and latest section
export const latestPosts: Post[] = [
  {
    id: 1,
    title:
      "69 Discovery: 12 Politically-Conscious Afrobeats Songs You Should Listen To",
    slug: "politically-conscious-afrobeats",
    excerpt:
      "Exploring the intersection of music and social commentary in modern Afrobeats.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    published_at: "2025-06-12T10:00:00Z",
    reading_time: 5,
    author_name: "Stephanie White",
    tags: [{ id: 1, name: "Music", slug: "music" }],
    category: { id: 1, name: "Culture", slug: "culture" },
  },
  {
    id: 2,
    title: "The Rise of Amapiano: How South African Beats Conquered the World",
    slug: "rise-of-amapiano",
    excerpt: "A deep dive into the global phenomenon of Amapiano music.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
    published_at: "2025-06-10T10:00:00Z",
    reading_time: 7,
    author_name: "James Okonkwo",
    tags: [{ id: 2, name: "Amapiano", slug: "amapiano" }],
    category: { id: 2, name: "Music", slug: "music" },
  },
  {
    id: 3,
    title:
      "Festival Season 2025: The Ultimate Guide to African Music Festivals",
    slug: "festival-season-2025",
    excerpt:
      "Your comprehensive guide to the best music festivals across Africa.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    published_at: "2025-06-08T10:00:00Z",
    reading_time: 10,
    author_name: "Amara Diallo",
    tags: [{ id: 3, name: "Festivals", slug: "festivals" }],
    category: { id: 3, name: "Events", slug: "events" },
  },
];

// News Posts
export const newsPosts: Post[] = [
  {
    id: 101,
    title: "Breaking: New Music Streaming Platform Launches in Africa",
    slug: "new-streaming-platform-africa",
    excerpt:
      "A revolutionary new platform aims to change how African artists distribute their music globally.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    published_at: "2025-06-15T10:00:00Z",
    reading_time: 5,
    author_name: "Jane Kariuki",
    tags: [{ id: 101, name: "Breaking News", slug: "breaking-news" }],
    category: { id: 1, name: "News", slug: "news" },
  },
  {
    id: 102,
    title: "Grammy Awards 2025: African Artists Dominate Nominations",
    slug: "grammy-2025-african-nominations",
    excerpt:
      "Record-breaking number of African artists receive Grammy nominations this year.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    published_at: "2025-06-14T10:00:00Z",
    reading_time: 6,
    author_name: "Michael Okafor",
    tags: [{ id: 102, name: "Awards", slug: "awards" }],
    category: { id: 1, name: "News", slug: "news" },
  },
  {
    id: 103,
    title: "Major Label Announces $50M Investment in African Music",
    slug: "major-label-investment-africa",
    excerpt:
      "Historic investment signals growing recognition of African music industry potential.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
    published_at: "2025-06-13T10:00:00Z",
    reading_time: 7,
    author_name: "Sarah Mensah",
    tags: [{ id: 103, name: "Industry", slug: "industry" }],
    category: { id: 1, name: "News", slug: "news" },
  },
  {
    id: 104,
    title: "Afrobeats Star Signs Multi-Million Dollar Deal",
    slug: "afrobeats-star-deal",
    excerpt:
      "Top artist secures one of the largest record deals in African music history.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    published_at: "2025-06-12T10:00:00Z",
    reading_time: 4,
    author_name: "Tunde Adeyemi",
    tags: [{ id: 104, name: "Business", slug: "business" }],
    category: { id: 1, name: "News", slug: "news" },
  },
  {
    id: 105,
    title: "New Music Festival Set to Launch Across 10 African Countries",
    slug: "pan-african-music-festival",
    excerpt:
      "Ambitious festival aims to unite African music scenes across the continent.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    published_at: "2025-06-11T10:00:00Z",
    reading_time: 8,
    author_name: "Amara Diallo",
    tags: [{ id: 105, name: "Festivals", slug: "festivals" }],
    category: { id: 1, name: "News", slug: "news" },
  },
];

// Trending Posts (keeping for backward compatibility)
export const trendingPosts: Post[] = [
  {
    id: 4,
    title: "Burna Boy Announces New Album: What We Know So Far",
    slug: "burna-boy-new-album",
    excerpt: "Everything you need to know about the upcoming release.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
    published_at: "2025-06-11T10:00:00Z",
    reading_time: 4,
    author_name: "David Mensah",
    tags: [{ id: 4, name: "Breaking", slug: "breaking" }],
    category: { id: 1, name: "Music", slug: "music" },
  },
  {
    id: 5,
    title:
      "The Evolution of Nigerian Hip-Hop: From Remedies to Global Recognition",
    slug: "evolution-nigerian-hiphop",
    excerpt:
      "Tracing the journey of Nigerian hip-hop from the streets to the world stage.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    published_at: "2025-06-09T10:00:00Z",
    reading_time: 8,
    author_name: "Chidi Nwankwo",
    tags: [{ id: 5, name: "Hip-Hop", slug: "hiphop" }],
    category: { id: 1, name: "Music", slug: "music" },
  },
  {
    id: 6,
    title: "Exclusive Interview: Tems on Her Grammy Win and What Comes Next",
    slug: "tems-grammy-interview",
    excerpt: "An intimate conversation with the Nigerian singer-songwriter.",
    content: "Full article content here...",
    featured_image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=600&fit=crop",
    published_at: "2025-06-07T10:00:00Z",
    reading_time: 6,
    author_name: "Folake Adebayo",
    tags: [{ id: 6, name: "Interview", slug: "interview" }],
    category: { id: 1, name: "Music", slug: "music" },
  },
];

// Main Categories with subcategories
export const mainCategories: Category[] = [
  {
    id: 1,
    name: "Music",
    slug: "music",
    children: [
      {
        id: 11,
        name: "Afrobeats",
        slug: "afrobeats",
        latest_posts: [
          {
            id: 101,
            title: "Top 10 Afrobeats Tracks of the Month",
            slug: "top-10-afrobeats-june",
            featured_image:
              "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
            published_at: "2025-06-10T10:00:00Z",
            reading_time: 5,
            author_name: "DJ Spinall",
            tags: [{ id: 1, name: "Afrobeats", slug: "afrobeats" }],
          },
          {
            id: 102,
            title:
              "The Afrobeats Takeover: How African Music Is Dominating Global Charts",
            slug: "afrobeats-global-charts",
            featured_image:
              "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
            published_at: "2025-06-08T10:00:00Z",
            reading_time: 7,
            author_name: "Kofi Mensah",
            tags: [{ id: 1, name: "Afrobeats", slug: "afrobeats" }],
          },
          {
            id: 103,
            title: "Rising Stars: 5 Afrobeats Artists to Watch in 2025",
            slug: "rising-afrobeats-artists-2025",
            featured_image:
              "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
            published_at: "2025-06-05T10:00:00Z",
            reading_time: 6,
            author_name: "Amina Bello",
            tags: [{ id: 1, name: "Afrobeats", slug: "afrobeats" }],
          },
        ],
      },
      {
        id: 12,
        name: "Hip-Hop",
        slug: "hiphop",
        latest_posts: [
          {
            id: 104,
            title: "African Hip-Hop: The New Wave",
            slug: "african-hiphop-new-wave",
            featured_image:
              "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
            published_at: "2025-06-09T10:00:00Z",
            reading_time: 6,
            author_name: "MC Flow",
            tags: [{ id: 5, name: "Hip-Hop", slug: "hiphop" }],
          },
        ],
      },
      {
        id: 13,
        name: "Amapiano",
        slug: "amapiano",
        latest_posts: [
          {
            id: 105,
            title: "Amapiano 101: Understanding the Genre",
            slug: "amapiano-101",
            featured_image:
              "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
            published_at: "2025-06-07T10:00:00Z",
            reading_time: 8,
            author_name: "DJ Maphorisa Fan",
            tags: [{ id: 2, name: "Amapiano", slug: "amapiano" }],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Culture",
    slug: "culture",
    children: [
      {
        id: 21,
        name: "Fashion",
        slug: "fashion",
        latest_posts: [
          {
            id: 201,
            title: "African Fashion Week: Highlights and Trends",
            slug: "african-fashion-week-highlights",
            featured_image:
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            published_at: "2025-06-06T10:00:00Z",
            reading_time: 5,
            author_name: "Style Maven",
            tags: [{ id: 7, name: "Fashion", slug: "fashion" }],
          },
        ],
      },
      {
        id: 22,
        name: "Film",
        slug: "film",
        latest_posts: [
          {
            id: 202,
            title: "Nollywood Goes Global: Nigerian Films on Netflix",
            slug: "nollywood-netflix",
            featured_image:
              "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
            published_at: "2025-06-04T10:00:00Z",
            reading_time: 6,
            author_name: "Cinema Critic",
            tags: [{ id: 8, name: "Film", slug: "film" }],
          },
        ],
      },
    ],
  },
];

// Events Category
export const eventsCategory: Category = {
  id: 3,
  name: "Events",
  slug: "events",
  children: [
    {
      id: 31,
      name: "Concerts",
      slug: "concerts",
      latest_events: [
        {
          id: 301,
          title: "Wizkid Live in Lagos: Made in Lagos Tour",
          slug: "wizkid-lagos-concert",
          excerpt:
            "Experience the magic of Wizkid live at the Eko Convention Center.",
          featured_image:
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
          event_date_time: "2025-07-15T20:00:00Z",
          event_location: "Eko Convention Center, Lagos",
          tags: [{ id: 9, name: "Concert", slug: "concert" }],
        },
        {
          id: 302,
          title: "Davido: The Timeless Tour",
          slug: "davido-timeless-tour",
          excerpt:
            "Join Davido for an unforgettable night of music and entertainment.",
          featured_image:
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
          event_date_time: "2025-08-20T19:00:00Z",
          event_location: "O2 Arena, London",
          tags: [{ id: 9, name: "Concert", slug: "concert" }],
        },
      ],
    },
    {
      id: 32,
      name: "Festivals",
      slug: "festivals",
      latest_events: [
        {
          id: 303,
          title: "Afro Nation 2025",
          slug: "afro-nation-2025",
          excerpt:
            "The world's biggest Afrobeats festival returns to Portugal.",
          featured_image:
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
          event_date_time: "2025-07-01T12:00:00Z",
          event_location: "Portimão, Portugal",
          tags: [{ id: 3, name: "Festival", slug: "festival" }],
        },
      ],
    },
  ],
};

// Latest Resources
export const latestResources: Resource[] = [
  {
    id: 1,
    title: "Music Producer Starter Kit",
    slug: "producer-starter-kit",
    excerpt: "Everything you need to start producing professional music.",
    featured_image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
    created_at: "2025-06-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Artist Branding Guide",
    slug: "artist-branding-guide",
    excerpt: "Build your brand as an independent artist.",
    featured_image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
    created_at: "2025-05-28T10:00:00Z",
  },
  {
    id: 3,
    title: "Music Distribution Handbook",
    slug: "distribution-handbook",
    excerpt: "Navigate the world of digital music distribution.",
    featured_image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    created_at: "2025-05-25T10:00:00Z",
  },
];

// Latest Podcasts
export const latestPodcasts: Podcast[] = [
  {
    id: 1,
    title: "The Afrobeats Conversation: Industry Insights",
    slug: "afrobeats-conversation-episode-1",
    content:
      "In this episode, we discuss the current state of the Afrobeats industry...",
    featured_image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop",
    published_at: "2025-06-10T10:00:00Z",
    reading_time: 45,
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Behind the Beat: Producers Tell Their Stories",
    slug: "behind-the-beat-episode-1",
    content:
      "Join us as we go behind the scenes with top African music producers...",
    featured_image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
    published_at: "2025-06-05T10:00:00Z",
    reading_time: 38,
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Culture Corner: Music, Fashion, and Identity",
    slug: "culture-corner-episode-1",
    content:
      "Exploring the intersection of African music, fashion, and cultural identity...",
    featured_image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
    published_at: "2025-06-01T10:00:00Z",
    reading_time: 52,
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

// Top Videos (using Podcast structure)
export const topVideos: Podcast[] = [
  {
    id: 201,
    title: "Top 10 Must-Watch Music Videos of 2025",
    slug: "top-10-music-videos-2025",
    content:
      "Discover the most captivating music videos that have taken the world by storm this year.",
    featured_image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    published_at: "2025-06-15T10:00:00Z",
    reading_time: 12,
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 202,
    title: "Behind the Scenes: Making of a Hit Music Video",
    slug: "behind-scenes-music-video",
    content:
      "Go behind the scenes and see how top artists create their most iconic music videos.",
    featured_image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    published_at: "2025-06-14T10:00:00Z",
    reading_time: 15,
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 203,
    title: "Viral Dance Challenges: The Videos That Broke the Internet",
    slug: "viral-dance-challenges",
    content:
      "Explore the dance challenges that took social media by storm and became global phenomena.",
    featured_image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    published_at: "2025-06-13T10:00:00Z",
    reading_time: 10,
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

// Top Restaurants
export const topRestaurants: Listing[] = [
  {
    id: 301,
    title: "The Gourmet Kitchen",
    slug: "the-gourmet-kitchen",
    excerpt:
      "Award-winning fine dining restaurant offering contemporary African cuisine with a modern twist.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 324,
    location: "Lagos, Nigeria",
    category: "Fine Dining",
    price_range: "$$$$",
    tags: [{ id: 1, name: "Fine Dining", slug: "fine-dining" }],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "The Gourmet Kitchen - Best Fine Dining Restaurant in Lagos",
    seo_description:
      "Experience award-winning contemporary African cuisine at The Gourmet Kitchen in Lagos.",
    seo_keywords: "fine dining, restaurant, Lagos, African cuisine",
  },
  {
    id: 302,
    title: "Spice Route Bistro",
    slug: "spice-route-bistro",
    excerpt:
      "Authentic Indian-African fusion restaurant known for its bold flavors and vibrant atmosphere.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    rating: 4.6,
    review_count: 287,
    location: "Nairobi, Kenya",
    category: "Fusion",
    price_range: "$$$",
    tags: [{ id: 2, name: "Fusion", slug: "fusion" }],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "Spice Route Bistro - Indian-African Fusion Restaurant Nairobi",
    seo_description:
      "Discover authentic Indian-African fusion cuisine at Spice Route Bistro in Nairobi.",
    seo_keywords: "fusion restaurant, Indian food, Nairobi, African cuisine",
  },
  {
    id: 303,
    title: "Coastal Catch Seafood",
    slug: "coastal-catch-seafood",
    excerpt:
      "Fresh seafood restaurant with ocean views, specializing in locally sourced fish and shellfish.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
    rating: 4.7,
    review_count: 412,
    location: "Cape Town, South Africa",
    category: "Seafood",
    price_range: "$$$",
    tags: [{ id: 3, name: "Seafood", slug: "seafood" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Coastal Catch Seafood - Best Seafood Restaurant Cape Town",
    seo_description:
      "Enjoy fresh seafood with ocean views at Coastal Catch Seafood in Cape Town.",
    seo_keywords: "seafood, restaurant, Cape Town, fresh fish",
  },
  {
    id: 304,
    title: "The Vegan Garden",
    slug: "the-vegan-garden",
    excerpt:
      "Plant-based restaurant offering creative vegan dishes made with locally grown ingredients.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    rating: 4.5,
    review_count: 198,
    location: "Accra, Ghana",
    category: "Vegan",
    price_range: "$$",
    tags: [{ id: 4, name: "Vegan", slug: "vegan" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "The Vegan Garden - Best Vegan Restaurant Accra",
    seo_description:
      "Experience creative plant-based cuisine at The Vegan Garden in Accra.",
    seo_keywords: "vegan, restaurant, Accra, plant-based",
  },
  {
    id: 305,
    title: "BBQ Masters",
    slug: "bbq-masters",
    excerpt:
      "Authentic African barbecue restaurant serving slow-smoked meats and traditional sides.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
    rating: 4.9,
    review_count: 523,
    location: "Johannesburg, South Africa",
    category: "Barbecue",
    price_range: "$$",
    tags: [{ id: 5, name: "BBQ", slug: "bbq" }],
    created_at: "2025-06-05T10:00:00Z",
    seo_title: "BBQ Masters - Best Barbecue Restaurant Johannesburg",
    seo_description:
      "Taste authentic African barbecue at BBQ Masters in Johannesburg.",
    seo_keywords: "barbecue, BBQ, restaurant, Johannesburg, smoked meat",
  },
];

// Top Movies
export const topMovies: Listing[] = [
  {
    id: 401,
    title: "The Lion King: Legacy",
    slug: "lion-king-legacy",
    excerpt:
      "Epic animated adventure following the journey of a young lion prince in the African savanna.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
    rating: 4.9,
    review_count: 1245,
    location: "Cinema Release",
    category: "Animation",
    price_range: "$$",
    tags: [{ id: 1, name: "Animation", slug: "animation" }],
    created_at: "2025-06-10T10:00:00Z",
    seo_title: "The Lion King: Legacy - Best Animated Movie 2025",
    seo_description:
      "Watch the epic animated adventure The Lion King: Legacy in theaters now.",
    seo_keywords: "animation, movie, cinema, family film",
  },
  {
    id: 402,
    title: "Nairobi Nights",
    slug: "nairobi-nights",
    excerpt:
      "Thrilling crime drama set in the streets of Nairobi, following a detective on a dangerous case.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop",
    rating: 4.7,
    review_count: 892,
    location: "Cinema Release",
    category: "Crime Drama",
    price_range: "$$",
    tags: [{ id: 2, name: "Crime", slug: "crime" }],
    created_at: "2025-06-11T10:00:00Z",
    seo_title: "Nairobi Nights - Crime Drama Movie 2025",
    seo_description:
      "Experience the thrilling crime drama Nairobi Nights in theaters.",
    seo_keywords: "crime drama, movie, Nairobi, thriller",
  },
  {
    id: 403,
    title: "Love in Lagos",
    slug: "love-in-lagos",
    excerpt:
      "Romantic comedy about two strangers who meet in Lagos and discover love in unexpected places.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&h=600&fit=crop",
    rating: 4.6,
    review_count: 634,
    location: "Cinema Release",
    category: "Romance",
    price_range: "$$",
    tags: [{ id: 3, name: "Romance", slug: "romance" }],
    created_at: "2025-06-12T10:00:00Z",
    seo_title: "Love in Lagos - Romantic Comedy Movie 2025",
    seo_description: "Watch the romantic comedy Love in Lagos in theaters now.",
    seo_keywords: "romance, comedy, movie, Lagos, romantic comedy",
  },
  {
    id: 404,
    title: "The Warrior Queen",
    slug: "the-warrior-queen",
    excerpt:
      "Historical epic about an African queen who led her people to victory against colonial forces.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 1023,
    location: "Cinema Release",
    category: "Historical Drama",
    price_range: "$$",
    tags: [{ id: 4, name: "Historical", slug: "historical" }],
    created_at: "2025-06-13T10:00:00Z",
    seo_title: "The Warrior Queen - Historical Epic Movie 2025",
    seo_description:
      "Experience the historical epic The Warrior Queen in theaters.",
    seo_keywords: "historical, epic, movie, African history",
  },
];

// Top Electricians
export const topElectricians: Listing[] = [
  {
    id: 501,
    title: "Pro Electric Services",
    slug: "pro-electric-services",
    excerpt:
      "Licensed and insured electrical contractors specializing in residential and commercial installations.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop",
    rating: 4.9,
    review_count: 156,
    location: "Lagos, Nigeria",
    category: "Electrical Services",
    price_range: "$$",
    tags: [{ id: 1, name: "Residential", slug: "residential" }],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "Pro Electric Services - Best Electrician Lagos",
    seo_description:
      "Professional electrical services in Lagos. Licensed and insured electricians.",
    seo_keywords: "electrician, electrical services, Lagos, wiring",
  },
  {
    id: 502,
    title: "Bright Solutions Electrical",
    slug: "bright-solutions-electrical",
    excerpt:
      "Expert electricians providing 24/7 emergency services and complete electrical solutions.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop",
    rating: 4.7,
    review_count: 203,
    location: "Nairobi, Kenya",
    category: "Electrical Services",
    price_range: "$$",
    tags: [{ id: 2, name: "Emergency", slug: "emergency" }],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "Bright Solutions Electrical - Emergency Electrician Nairobi",
    seo_description:
      "24/7 emergency electrical services in Nairobi. Expert electricians available.",
    seo_keywords: "electrician, emergency, Nairobi, electrical repair",
  },
  {
    id: 503,
    title: "Master Electric Co.",
    slug: "master-electric-co",
    excerpt:
      "Commercial and industrial electrical contractors with over 20 years of experience.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 178,
    location: "Cape Town, South Africa",
    category: "Commercial Electrical",
    price_range: "$$$",
    tags: [{ id: 3, name: "Commercial", slug: "commercial" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Master Electric Co. - Commercial Electrician Cape Town",
    seo_description:
      "Commercial and industrial electrical services in Cape Town. 20+ years experience.",
    seo_keywords:
      "commercial electrician, industrial, Cape Town, electrical contractor",
  },
  {
    id: 504,
    title: "Safe Wire Electrical",
    slug: "safe-wire-electrical",
    excerpt:
      "Residential electrical specialists focusing on safety and code compliance.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop",
    rating: 4.6,
    review_count: 134,
    location: "Accra, Ghana",
    category: "Residential Electrical",
    price_range: "$$",
    tags: [{ id: 4, name: "Safety", slug: "safety" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "Safe Wire Electrical - Residential Electrician Accra",
    seo_description:
      "Safe and reliable residential electrical services in Accra.",
    seo_keywords: "residential electrician, safety, Accra, wiring",
  },
];

// Top Hotels
export const topHotels: Listing[] = [
  {
    id: 601,
    title: "Grand African Resort",
    slug: "grand-african-resort",
    excerpt:
      "Luxury beachfront resort offering world-class amenities, spa services, and fine dining with stunning ocean views.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 542,
    location: "Lagos, Nigeria",
    category: "Luxury Resort",
    price_range: "$$$$",
    tags: [{ id: 1, name: "Beachfront", slug: "beachfront" }],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "Grand African Resort - Best Luxury Hotel Lagos",
    seo_description:
      "Experience luxury at Grand African Resort in Lagos. Beachfront location with world-class amenities.",
    seo_keywords: "luxury hotel, resort, Lagos, beachfront, spa",
  },
  {
    id: 602,
    title: "Safari Lodge Nairobi",
    slug: "safari-lodge-nairobi",
    excerpt:
      "Authentic safari experience with modern comforts, game drives, and traditional African hospitality.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
    rating: 4.7,
    review_count: 389,
    location: "Nairobi, Kenya",
    category: "Safari Lodge",
    price_range: "$$$",
    tags: [{ id: 2, name: "Safari", slug: "safari" }],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "Safari Lodge Nairobi - Best Safari Experience Kenya",
    seo_description:
      "Authentic safari experience at Safari Lodge Nairobi. Game drives and traditional hospitality.",
    seo_keywords: "safari lodge, hotel, Nairobi, game drives, wildlife",
  },
  {
    id: 603,
    title: "Cape Town Boutique Hotel",
    slug: "cape-town-boutique-hotel",
    excerpt:
      "Charming boutique hotel in the heart of Cape Town, featuring elegant rooms and personalized service.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
    rating: 4.6,
    review_count: 267,
    location: "Cape Town, South Africa",
    category: "Boutique Hotel",
    price_range: "$$$",
    tags: [{ id: 3, name: "Boutique", slug: "boutique" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Cape Town Boutique Hotel - Best Boutique Hotel Cape Town",
    seo_description:
      "Stay at Cape Town Boutique Hotel. Elegant rooms and personalized service in the city center.",
    seo_keywords: "boutique hotel, Cape Town, city center, elegant",
  },
  {
    id: 604,
    title: "Accra Business Hotel",
    slug: "accra-business-hotel",
    excerpt:
      "Modern business hotel with conference facilities, high-speed internet, and convenient city center location.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    rating: 4.5,
    review_count: 198,
    location: "Accra, Ghana",
    category: "Business Hotel",
    price_range: "$$",
    tags: [{ id: 4, name: "Business", slug: "business" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "Accra Business Hotel - Best Business Hotel Accra",
    seo_description:
      "Modern business hotel in Accra with conference facilities and city center location.",
    seo_keywords: "business hotel, Accra, conference, city center",
  },
];

// Top Gyms
export const topGyms: Listing[] = [
  {
    id: 701,
    title: "FitZone Premium Gym",
    slug: "fitzone-premium-gym",
    excerpt:
      "State-of-the-art fitness center with modern equipment, personal trainers, and group fitness classes.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    rating: 4.9,
    review_count: 423,
    location: "Lagos, Nigeria",
    category: "Fitness Center",
    price_range: "$$",
    tags: [{ id: 1, name: "Premium", slug: "premium" }],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "FitZone Premium Gym - Best Gym Lagos",
    seo_description:
      "Join FitZone Premium Gym in Lagos. Modern equipment, personal trainers, and group classes.",
    seo_keywords: "gym, fitness center, Lagos, personal training, workout",
  },
  {
    id: 702,
    title: "CrossFit Nairobi",
    slug: "crossfit-nairobi",
    excerpt:
      "High-intensity CrossFit training facility with certified coaches and community-focused workouts.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 312,
    location: "Nairobi, Kenya",
    category: "CrossFit",
    price_range: "$$",
    tags: [{ id: 2, name: "CrossFit", slug: "crossfit" }],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "CrossFit Nairobi - Best CrossFit Gym Kenya",
    seo_description:
      "High-intensity CrossFit training at CrossFit Nairobi. Certified coaches and community workouts.",
    seo_keywords: "CrossFit, gym, Nairobi, high-intensity, training",
  },
  {
    id: 703,
    title: "Yoga Studio Cape Town",
    slug: "yoga-studio-cape-town",
    excerpt:
      "Peaceful yoga studio offering various yoga styles, meditation classes, and wellness programs.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    rating: 4.7,
    review_count: 245,
    location: "Cape Town, South Africa",
    category: "Yoga Studio",
    price_range: "$$",
    tags: [{ id: 3, name: "Yoga", slug: "yoga" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Yoga Studio Cape Town - Best Yoga Classes",
    seo_description:
      "Find peace at Yoga Studio Cape Town. Various yoga styles, meditation, and wellness programs.",
    seo_keywords: "yoga, meditation, Cape Town, wellness, studio",
  },
  {
    id: 704,
    title: "Powerhouse Fitness",
    slug: "powerhouse-fitness",
    excerpt:
      "24/7 access gym with strength training equipment, cardio machines, and nutrition counseling.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop",
    rating: 4.6,
    review_count: 189,
    location: "Accra, Ghana",
    category: "24/7 Gym",
    price_range: "$$",
    tags: [{ id: 4, name: "24/7", slug: "24-7" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "Powerhouse Fitness - 24/7 Gym Accra",
    seo_description:
      "24/7 access gym in Accra. Strength training, cardio, and nutrition counseling available.",
    seo_keywords: "gym, 24/7, Accra, fitness, strength training",
  },
];

// Top Salons
export const topSalons: Listing[] = [
  {
    id: 801,
    title: "Glamour Hair & Beauty Salon",
    slug: "glamour-hair-beauty-salon",
    excerpt:
      "Premium hair salon offering cutting-edge hairstyles, color treatments, and beauty services.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 367,
    location: "Lagos, Nigeria",
    category: "Hair Salon",
    price_range: "$$",
    tags: [{ id: 1, name: "Hair", slug: "hair" }],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "Glamour Hair & Beauty Salon - Best Hair Salon Lagos",
    seo_description:
      "Premium hair and beauty services at Glamour Salon in Lagos. Expert stylists and color treatments.",
    seo_keywords: "hair salon, beauty, Lagos, hairstyling, color",
  },
  {
    id: 802,
    title: "Nairobi Nail Studio",
    slug: "nairobi-nail-studio",
    excerpt:
      "Specialized nail salon offering manicures, pedicures, nail art, and spa treatments.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
    rating: 4.7,
    review_count: 289,
    location: "Nairobi, Kenya",
    category: "Nail Salon",
    price_range: "$$",
    tags: [{ id: 2, name: "Nails", slug: "nails" }],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "Nairobi Nail Studio - Best Nail Salon Kenya",
    seo_description:
      "Expert nail services at Nairobi Nail Studio. Manicures, pedicures, and nail art.",
    seo_keywords: "nail salon, manicure, pedicure, Nairobi, nail art",
  },
  {
    id: 803,
    title: "Cape Town Spa & Wellness",
    slug: "cape-town-spa-wellness",
    excerpt:
      "Full-service spa offering massages, facials, body treatments, and relaxation therapies.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    rating: 4.9,
    review_count: 456,
    location: "Cape Town, South Africa",
    category: "Spa",
    price_range: "$$$",
    tags: [{ id: 3, name: "Spa", slug: "spa" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Cape Town Spa & Wellness - Best Spa Cape Town",
    seo_description:
      "Relax at Cape Town Spa & Wellness. Massages, facials, and body treatments available.",
    seo_keywords: "spa, wellness, Cape Town, massage, facial",
  },
  {
    id: 804,
    title: "Accra Barber Shop",
    slug: "accra-barber-shop",
    excerpt:
      "Traditional and modern barbering services with expert stylists and premium grooming products.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop",
    rating: 4.6,
    review_count: 234,
    location: "Accra, Ghana",
    category: "Barber Shop",
    price_range: "$$",
    tags: [{ id: 4, name: "Barber", slug: "barber" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "Accra Barber Shop - Best Barber Accra",
    seo_description:
      "Expert barbering services at Accra Barber Shop. Traditional and modern styles available.",
    seo_keywords: "barber shop, grooming, Accra, haircut, styling",
  },
];

// Top Plumbers
export const topPlumbers: Listing[] = [
  {
    id: 901,
    title: "Reliable Plumbing Services",
    slug: "reliable-plumbing-services",
    excerpt:
      "Licensed plumbers providing emergency repairs, installations, and maintenance services 24/7.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 278,
    location: "Lagos, Nigeria",
    category: "Plumbing Services",
    price_range: "$$",
    tags: [{ id: 1, name: "Emergency", slug: "emergency" }],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "Reliable Plumbing Services - Best Plumber Lagos",
    seo_description:
      "24/7 plumbing services in Lagos. Emergency repairs, installations, and maintenance.",
    seo_keywords: "plumber, plumbing, Lagos, emergency, repairs",
  },
  {
    id: 902,
    title: "Master Plumber Co.",
    slug: "master-plumber-co",
    excerpt:
      "Expert plumbing contractors specializing in residential and commercial plumbing solutions.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop",
    rating: 4.7,
    review_count: 195,
    location: "Nairobi, Kenya",
    category: "Plumbing Services",
    price_range: "$$",
    tags: [{ id: 2, name: "Commercial", slug: "commercial" }],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "Master Plumber Co. - Professional Plumber Nairobi",
    seo_description:
      "Expert plumbing services in Nairobi. Residential and commercial solutions available.",
    seo_keywords: "plumber, plumbing, Nairobi, commercial, residential",
  },
  {
    id: 903,
    title: "Quick Fix Plumbing",
    slug: "quick-fix-plumbing",
    excerpt:
      "Fast response plumbing service for leaks, clogs, and water heater repairs with same-day service.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop",
    rating: 4.6,
    review_count: 167,
    location: "Cape Town, South Africa",
    category: "Plumbing Services",
    price_range: "$$",
    tags: [{ id: 3, name: "Fast Service", slug: "fast-service" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Quick Fix Plumbing - Fast Plumber Cape Town",
    seo_description:
      "Fast plumbing service in Cape Town. Same-day repairs for leaks, clogs, and water heaters.",
    seo_keywords: "plumber, plumbing, Cape Town, fast service, repairs",
  },
  {
    id: 904,
    title: "Pro Plumbing Solutions",
    slug: "pro-plumbing-solutions",
    excerpt:
      "Professional plumbing services with certified technicians and quality guarantee on all work.",
    content: "Full content here...",
    featured_image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop",
    rating: 4.9,
    review_count: 312,
    location: "Accra, Ghana",
    category: "Plumbing Services",
    price_range: "$$",
    tags: [{ id: 4, name: "Certified", slug: "certified" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "Pro Plumbing Solutions - Certified Plumber Accra",
    seo_description:
      "Certified plumbing services in Accra. Quality guarantee on all work performed.",
    seo_keywords: "plumber, plumbing, Accra, certified, professional",
  },
];
