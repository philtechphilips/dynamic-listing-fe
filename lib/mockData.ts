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
    content: `Afrobeats has always been more than just a genre; it's a movement. In recent years, a wave of artists has used their platform to address social and political issues affecting the continent. From Burna Boy's "Monsters You Made" to Falz's "This Is Nigeria," music is becoming a powerful tool for activism.
    
    This list curates 12 songs that not only make you move but also make you think. We explore the lyrics, the context, and the impact of these politically conscious tracks. These artists are fearlessly speaking truth to power, demanding accountability, and inspiring a new generation to stay woke.
    
    Listen to the playlist and dive deep into the stories behind the songs that are defining a politically charged era of African music.`,
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
    content: `From the townships of South Africa to the clubs of London and Lagos, Amapiano has become a global phenomenon. Its distinctive log drum basslines and soulful piano chords have captured the hearts of music lovers worldwide. But how did this genre rise so quickly?
    
    We trace the roots of Amapiano, exploring its evolution from Kwaito and Deep House. We speak to pioneers like Kabza De Small and DJ Maphorisa about the early days and the explosive growth of the sound. The genre's ability to constantly reinvent itself is key to its longevity.
    
    As Amapiano continues to dominate charts and festivals, we look at what the future holds for this infectious sound and how it's shaping the global perception of African electronic music.`,
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
    content: `2025 is shaping up to be the biggest year yet for African music festivals. From Afro Nation in Portugal to Felabration in Lagos and specialized jazz festivals in Cape Town, the calendar is packed with unmissable events.
    
    This guide breaks down the top festivals you need to attend this year. We cover lineups, ticket prices, travel tips, and what to expect from each experience. Whether you're a hardcore raver or looking for a chilled cultural experience, there's a festival for you.
    
    Pack your bags and get ready for a season of incredible music, vibrant culture, and unforgettable memories across the continent and beyond.`,
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
    content: `In a major development for the African music industry, a new streaming platform, "AfroStream," has officially launched today. Promoting itself as an artist-first platform, it promises higher royalty rates and better discovery tools for independent African artists.
    
    The launch event in Nairobi was attended by industry heavyweights and top artists who endorsed the platform's mission to democratize music distribution. With features tailored to local markets, such as mobile money integration and offline listening modes optimized for lower-end devices, AfroStream aims to capture the massive untapped market of African listeners.
    
    Analysts predict this could shake up the dominance of international players like Spotify and Apple Music on the continent.`,
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
    content: `The 2025 Grammy nominations have been announced, and it's a historic year for African music. A record-breaking number of artists from the continent have received nods across multiple categories, not just in the Global Music field.
    
    Leading the pack are heavyweights like Tems and Burna Boy, but there are also surprise nominations for rising stars in the Alternative and R&B categories. This shift signals the Recording Academy's growing recognition of the diversity and quality of music coming out of Africa.
    
    We break down the key nominations, the snubs, and what this means for the future of African music on the global stage.`,
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
    content: `Universal Music Group has announced a historic $50 million investment fund dedicated to developing talent and infrastructure within the African music ecosystem. The fund will focus on signing new artists, building state-of-the-art recording studios, and improving distribution networks.
    
    "Africa is the future of music," said the CEO in a press statement. This move comes as major labels race to establish a stronger foothold in the continent's booming entertainment sector. The investment is expected to create jobs and provide resources that have been long lacking in many local industries.
    
    Industry experts weigh in on the potential impact and challenges of this massive influx of capital.`,
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
    content: `In a deal that has sent shockwaves through the industry, Afrobeats superstar Wizkid has reportedly signed a new multi-album deal worth over $30 million. The partnership with a major global distributor gives him unprecedented creative control and ownership of his masters.
    
    This deal sets a new benchmark for what is possible for African artists, shifting the power dynamic back towards the creators. Sources close to the artist say the new deal will allow him to launch his own label imprint and sign upcoming talent.
    
    We analyze the details of the contract and compare it to other major deals in the history of the genre.`,
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
    content: `The "Pan-African Sound Festival" is a bold new initiative set to launch simultaneously across 10 African capital cities next month. The goal is to unite the continent through music, with live streams connecting performances from Lagos to Nairobi, Johannesburg to Cairo.
    
    Organizers hope to foster cross-cultural collaboration and tour circuits within the continent. "It's about time we toured our own continent as much as we tour Europe," said one of the lead organizers. The lineup features a mix of established legends and exciting new discoveries from each host country.
    
    Tickets go on sale this Friday, with affordable pricing tiers to ensure accessibility for all fans.`,
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
    content: `The African Giant is back! Burna Boy has officially announced the release date for his highly anticipated seventh studio album. While the title remains under wraps, sources close to the production team hint at a return to his dancehall roots infused with experimental electronic sounds.
    
    The album is rumored to feature collaborations with global icons as well as emerging talent from the Nigerian underground scene. In a cryptic tweet, Burna teased, "This one is for the soul, but it will make your body move."
    
    Fans are already speculating about the tracklist and potential tour dates. We break down everything we know so far, from confirmed producers to the possible themes the album will explore.`,
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
    content: `Nigerian Hip-Hop has come a long way since the days of The Remedies and Plantashun Boiz. Today, artists like Olamide, Phyno, and Blaqbonez are topping charts not just in Lagos, but in London and New York. But the journey hasn't been a straight line.
    
    We take a retrospective look at the evolution of the genre, from the raw, grit-infused rhymes of the early 2000s to the polished, Afrobeats-fused sound that dominates the airwaves today. We examine the role of indigenous rap in bringing the genre to the masses and how streaming has democratized access for independent artists.
    
    This is the definitive history of how Nigerian MCs found their voice and took it to the world stage.`,
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
    content: `"It still feels like a dream," says Tems, reflecting on her historic Grammy win. In this exclusive interview, the singer-songwriter opens up about her whirlwind journey from quitting her corporate job to collaborating with Beyoncé and Drake.
    
    She discusses the pressure of newfound fame, her creative process, and why she chooses to stay grounded in her identity. "I make music for me first," she insists. "If the world likes it, that's a blessing."
    
    Tems also gives us a sneak peek into her upcoming projects, hinting at a more acoustic, intimate sound for her next EP. Read on to discover the woman behind the voice that conquered the globe.`,
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
          event_location: "Makati",
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
          event_location: "Taguig",
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
          event_location: "Laguna",
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
    content: `Experience the pinnacle of fine dining at The Gourmet Kitchen, where culinary artistry meets the rich flavors of Africa. Our award-winning chefs meticulously craft each dish using locally sourced ingredients, reimagining traditional recipes with a modern, sophisticated twist. 
    
    From our signature Jollof Risotto to the delicate Plantain Gnocchi, every bite is a journey through the continent's diverse culinary landscape. The ambiance is equally captivating, featuring elegant decor inspired by African art and culture, creating the perfect setting for a romantic dinner or a celebratory feast.
    
    Join us for an unforgettable gastronomic adventure that celebrates the heritage and future of African cuisine.`,
    featured_image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 324,
    location: "Makati",
    category: "Fine Dining",
    price_range: "$$$$",
    tags: [
      { id: 1, name: "Fine Dining", slug: "fine-dining" },
      { id: 101, name: "Romantic", slug: "romantic" },
      { id: 102, name: "Fusion", slug: "fusion" },
    ],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "The Gourmet Kitchen - Best Fine Dining Restaurant in Lagos",
    seo_description:
      "Experience award-winning contemporary African cuisine at The Gourmet Kitchen in Lagos.",
    seo_keywords: "fine dining, restaurant, Lagos, African cuisine",
    address: "123 Victoria Island, Lagos, Nigeria",
    website: "https://thegourmetkitchen.com",
    phone: "+234 800 123 4567",
    email: "reservations@thegourmetkitchen.com",
    opening_hours: "Mon-Sun: 11:00 AM - 11:00 PM",
    google_map_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.527631695278783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc939f243026a798!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1626078726000!5m2!1sen!2sng",
  },
  {
    id: 302,
    title: "Spice Route Bistro",
    slug: "spice-route-bistro",
    excerpt:
      "Authentic Indian-African fusion restaurant known for its bold flavors and vibrant atmosphere.",
    content: `Spice Route Bistro invites you to explore the vibrant intersection of Indian and East African cuisines. Our menu is a celebration of the historical trade routes that connected these two rich culinary traditions, resulting in dishes that are bold, aromatic, and deeply satisfying.
    
    Savor our famous Butter Chicken with a hint of Swahili spices, or try the Samosa Chaat topped with tangy tamarind chutney. The lively atmosphere, reminiscent of a bustling spice market, makes every meal a festive occasion.
    
    Whether you're a spice enthusiast or looking for comfort food with a kick, Spice Route Bistro offers a unique dining experience that honors the shared history of two continents.`,
    featured_image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    rating: 4.6,
    review_count: 287,
    location: "Mandaluyong",
    category: "Fusion",
    price_range: "$$$",
    tags: [
      { id: 2, name: "Fusion", slug: "fusion" },
      { id: 103, name: "Spicy", slug: "spicy" },
      { id: 104, name: "Casual", slug: "casual" },
    ],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "Spice Route Bistro - Indian-African Fusion Restaurant Nairobi",
    seo_description:
      "Discover authentic Indian-African fusion cuisine at Spice Route Bistro in Nairobi.",
    seo_keywords: "fusion restaurant, Indian food, Nairobi, African cuisine",
    address: "88 Westlands Road, Nairobi, Kenya",
    website: "https://spiceroutebistro.co.ke",
    phone: "+254 700 123 456",
    email: "dine@spiceroutebistro.co.ke",
    opening_hours: "Mon-Sun: 12:00 PM - 10:30 PM",
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
    location: "Pasig",
    category: "Seafood",
    price_range: "$$$",
    tags: [{ id: 3, name: "Seafood", slug: "seafood" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Coastal Catch Seafood - Best Seafood Restaurant Cape Town",
    seo_description:
      "Enjoy fresh seafood with ocean views at Coastal Catch Seafood in Cape Town.",
    seo_keywords: "seafood, restaurant, Cape Town, fresh fish",
    address: "22 Victoria & Alfred Waterfront, Cape Town, South Africa",
    website: "https://coastalcatch.co.za",
    phone: "+27 21 555 0199",
    email: "info@coastalcatch.co.za",
    opening_hours: "Tue-Sun: 11:30 AM - 10:00 PM",
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
    location: "Quezon",
    category: "Vegan",
    price_range: "$$",
    tags: [{ id: 4, name: "Vegan", slug: "vegan" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "The Vegan Garden - Best Vegan Restaurant Accra",
    seo_description:
      "Experience creative plant-based cuisine at The Vegan Garden in Accra.",
    seo_keywords: "vegan, restaurant, Accra, plant-based",
    address: "15 Osu Oxford Street, Accra, Ghana",
    website: "https://vegangarden.gh",
    phone: "+233 20 555 6789",
    email: "hello@vegangarden.gh",
    opening_hours: "Mon-Sat: 9:00 AM - 8:00 PM",
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
    location: "Taguig",
    category: "Barbecue",
    price_range: "$$",
    tags: [{ id: 5, name: "BBQ", slug: "bbq" }],
    created_at: "2025-06-05T10:00:00Z",
    seo_title: "BBQ Masters - Best Barbecue Restaurant Johannesburg",
    seo_description:
      "Taste authentic African barbecue at BBQ Masters in Johannesburg.",
    seo_keywords: "barbecue, BBQ, restaurant, Johannesburg, smoked meat",
    address: "42 Maboneng Precinct, Johannesburg, South Africa",
    website: "https://bbqmasters.co.za",
    phone: "+27 11 555 3344",
    email: "smoke@bbqmasters.co.za",
    opening_hours: "Wed-Sun: 12:00 PM - 11:00 PM",
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
    content: `Return to the Pride Lands in "The Lion King: Legacy", a breathtaking animated adventure that continues the saga of Simba and his family. This new chapter explores the challenges faced by the next generation as they navigate a changing world and discover their own place in the Circle of Life.
    
    With stunning visuals that push the boundaries of animation and a powerful musical score featuring new songs by top African artists, this film is a tribute to the beauty and resilience of the African savanna.
    
    Don't miss the cinematic event of the year that celebrates family, courage, and the enduring spirit of nature.`,
    featured_image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
    rating: 4.9,
    review_count: 1245,
    location: "Cinema Release",
    category: "Animation",
    price_range: "$$",
    tags: [
      { id: 1, name: "Animation", slug: "animation" },
      { id: 105, name: "Family", slug: "family" },
      { id: 106, name: "Adventure", slug: "adventure" },
    ],
    created_at: "2025-06-10T10:00:00Z",
    seo_title: "The Lion King: Legacy - Best Animated Movie 2025",
    seo_description:
      "Watch the epic animated adventure The Lion King: Legacy in theaters now.",
    seo_keywords: "animation, movie, cinema, family film",
    website: "https://www.disney.com/the-lion-king",
    opening_hours: "Showing times vary by theater",
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
    website: "https://netflix.com/title/12345",
    opening_hours: "Available on Streaming & Select Theaters",
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
    website: "https://loveinlagos-movie.com",
    opening_hours: "In Theaters Natiowide",
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
    website: "https://warriorqueen.com",
    opening_hours: "IMAX & Standard Theaters",
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
    content: `Pro Electric Services is your trusted partner for all electrical needs in Lagos. With over 15 years of experience, our team of licensed and insured electricians is dedicated to providing top-quality workmanship and exceptional customer service.
    
    We specialize in a wide range of services, including residential wiring, commercial installations, lighting design, and emergency repairs. We prioritize safety and code compliance in every project we undertake, ensuring your home or business is powered reliably and securely.
    
    Contact us today for a free estimate and experience the difference of working with true professionals.`,
    featured_image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop",
    rating: 4.9,
    review_count: 156,
    location: "Makati",
    category: "Electrical Services",
    price_range: "$$",
    google_map_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15856.88569502795!2d3.375295414770757!3d6.527631695278783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc939f243026a798!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1626078726000!5m2!1sen!2sng",
    tags: [
      { id: 1, name: "Residential", slug: "residential" },
      { id: 107, name: "Commercial", slug: "commercial" },
      { id: 108, name: "Licensed", slug: "licensed" },
    ],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "Pro Electric Services - Best Electrician Lagos",
    seo_description:
      "Professional electrical services in Lagos. Licensed and insured electricians.",
    seo_keywords: "electrician, electrical services, Lagos, wiring",
    address: "45 Lekki Phase 1, Lagos, Nigeria",
    website: "https://proelectric.com",
    phone: "+234 800 987 6543",
    email: "contact@proelectric.com",
    opening_hours: "Mon-Fri: 8:00 AM - 6:00 PM",
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
    location: "Mandaluyong",
    category: "Electrical Services",
    price_range: "$$",
    tags: [{ id: 2, name: "Emergency", slug: "emergency" }],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "Bright Solutions Electrical - Emergency Electrician Nairobi",
    seo_description:
      "24/7 emergency electrical services in Nairobi. Expert electricians available.",
    seo_keywords: "electrician, emergency, Nairobi, electrical repair",
    address: "101 Upper Hill, Nairobi, Kenya",
    website: "https://brightsolutions.co.ke",
    phone: "+254 722 999 888",
    email: "emergency@brightsolutions.co.ke",
    opening_hours: "24/7 Emergency Service",
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
    location: "Pasig",
    category: "Commercial Electrical",
    price_range: "$$$",
    tags: [{ id: 3, name: "Commercial", slug: "commercial" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Master Electric Co. - Commercial Electrician Cape Town",
    seo_description:
      "Commercial and industrial electrical services in Cape Town. 20+ years experience.",
    seo_keywords:
      "commercial electrician, industrial, Cape Town, electrical contractor",
    address: "5 Industrial Way, Paarden Eiland, Cape Town",
    website: "https://masterelectric.co.za",
    phone: "+27 21 555 7777",
    email: "projects@masterelectric.co.za",
    opening_hours: "Mon-Fri: 7:00 AM - 5:00 PM",
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
    location: "Quezon",
    category: "Residential Electrical",
    price_range: "$$",
    tags: [{ id: 4, name: "Safety", slug: "safety" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "Safe Wire Electrical - Residential Electrician Accra",
    seo_description:
      "Safe and reliable residential electrical services in Accra.",
    seo_keywords: "residential electrician, safety, Accra, wiring",
    address: "22 East Legon, Accra, Ghana",
    website: "https://safewire.gh",
    phone: "+233 24 555 4321",
    email: "service@safewire.gh",
    opening_hours: "Mon-Sat: 8:00 AM - 6:00 PM",
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
    content: `Escape to paradise at Grand African Resort, a sanctuary of luxury nestled along the pristine coastline of Lagos. Our resort offers an unparalleled blend of modern elegance and traditional African charm, featuring spacious suites with breathtaking ocean views and private balconies.
    
    Indulge your senses at our world-class spa, savor exquisite cuisine at our beachfront restaurants, or simply relax by our infinity pool. Whether you're seeking a romantic getaway, a family vacation, or a venue for a special event, Grand African Resort promises an experience of pure bliss and relaxation.
    
    Book your stay with us and discover the true meaning of African hospitality.`,
    featured_image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 542,
    location: "Makati",
    category: "Luxury Resort",
    price_range: "$$$$",
    tags: [
      { id: 1, name: "Beachfront", slug: "beachfront" },
      { id: 109, name: "Spa", slug: "spa" },
      { id: 110, name: "Pool", slug: "pool" },
    ],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "Grand African Resort - Best Luxury Hotel Lagos",
    seo_description:
      "Experience luxury at Grand African Resort in Lagos. Beachfront location with world-class amenities.",
    seo_keywords: "luxury hotel, resort, Lagos, beachfront, spa",
    address: "1 Eko Atlantic Blvd, Lagos, Nigeria",
    website: "https://grandafricanresort.com",
    phone: "+234 1 555 0000",
    email: "reservations@grandafricanresort.com",
    opening_hours: "24/7 Check-in",
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
    location: "Mandaluyong",
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
    location: "Pasig",
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
    location: "Quezon",
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
    content: `Transform your fitness journey at FitZone Premium Gym, Lagos's premier destination for health and wellness. Our state-of-the-art facility is equipped with the latest cardio and strength training machines, ensuring you have everything you need to achieve your goals.
    
    Our certified personal trainers are here to guide and motivate you, offering personalized workout plans and nutritional advice. Join our vibrant community and participate in a wide variety of group fitness classes, from high-energy HIIT to calming yoga sessions.
    
    At FitZone, we believe that fitness is a lifestyle. Come visit us and start building a stronger, healthier you today.`,
    featured_image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    rating: 4.9,
    review_count: 423,
    location: "Makati",
    category: "Fitness Center",
    price_range: "$$",
    tags: [
      { id: 1, name: "Premium", slug: "premium" },
      { id: 111, name: "Classes", slug: "classes" },
      { id: 112, name: "Personal Training", slug: "personal-training" },
    ],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "FitZone Premium Gym - Best Gym Lagos",
    seo_description:
      "Join FitZone Premium Gym in Lagos. Modern equipment, personal trainers, and group classes.",
    seo_keywords: "gym, fitness center, Lagos, personal training, workout",
    address: "77 Admiralty Way, Lekki Phase 1, Lagos",
    website: "https://fitzone.com",
    phone: "+234 81 222 3344",
    email: "join@fitzone.com",
    opening_hours: "Mon-Sun: 5:00 AM - 11:00 PM",
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
    location: "Mandaluyong",
    category: "CrossFit",
    price_range: "$$",
    tags: [{ id: 2, name: "CrossFit", slug: "crossfit" }],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "CrossFit Nairobi - Best CrossFit Gym Kenya",
    seo_description:
      "High-intensity CrossFit training at CrossFit Nairobi. Certified coaches and community workouts.",
    seo_keywords: "CrossFit, gym, Nairobi, high-intensity, training",
    address: "12 Waiyaki Way, Nairobi",
    website: "https://crossfitnairobi.co.ke",
    phone: "+254 711 555 666",
    email: "coach@crossfitnairobi.co.ke",
    opening_hours: "Mon-Sat: 6:00 AM - 9:00 PM",
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
    location: "Pasig",
    category: "Yoga Studio",
    price_range: "$$",
    tags: [{ id: 3, name: "Yoga", slug: "yoga" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Yoga Studio Cape Town - Best Yoga Classes",
    seo_description:
      "Find peace at Yoga Studio Cape Town. Various yoga styles, meditation, and wellness programs.",
    seo_keywords: "yoga, meditation, Cape Town, wellness, studio",
    address: "33 Long Street, Cape Town City Centre",
    website: "https://yogastudio.co.za",
    phone: "+27 21 444 5566",
    email: "namaste@yogastudio.co.za",
    opening_hours: "Mon-Sun: 7:00 AM - 8:00 PM",
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
    location: "Quezon",
    category: "24/7 Gym",
    price_range: "$$",
    tags: [{ id: 4, name: "24/7", slug: "24-7" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "Powerhouse Fitness - 24/7 Gym Accra",
    seo_description:
      "24/7 access gym in Accra. Strength training, cardio, and nutrition counseling available.",
    seo_keywords: "gym, 24/7, Accra, fitness, strength training",
    address: "55 Oxford Street, Osu, Accra",
    website: "https://powerhouse.gh",
    phone: "+233 26 777 8899",
    email: "info@powerhouse.gh",
    opening_hours: "24/7 Access",
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
    content: `Step into a world of elegance and style at Glamour Hair & Beauty Salon. We are passionate about helping you look and feel your absolute best. Our team of expert stylists and beauty therapists stays ahead of the latest trends and techniques to deliver exceptional results tailored to your unique personality.
    
    From precision haircuts and vibrant coloring to rejuvenating facials and luxurious manicures, we offer a comprehensive range of services using only high-quality, professional products. Relax in our chic and comfortable salon environment while we pamper you from head to toe.
    
    Book your appointment at Glamour Hair & Beauty Salon and let us unveil your inner radiance.`,
    featured_image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 367,
    location: "Makati",
    category: "Hair Salon",
    price_range: "$$",
    tags: [
      { id: 1, name: "Hair", slug: "hair" },
      { id: 113, name: "Beauty", slug: "beauty" },
      { id: 114, name: "Coloring", slug: "coloring" },
    ],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "Glamour Hair & Beauty Salon - Best Hair Salon Lagos",
    seo_description:
      "Premium hair and beauty services at Glamour Salon in Lagos. Expert stylists and color treatments.",
    seo_keywords: "hair salon, beauty, Lagos, hairstyling, color",
    address: "8 Ozumba Mbadiwe Ave, Victoria Island, Lagos",
    website: "https://glamoursalon.com",
    phone: "+234 1 222 3333",
    email: "book@glamoursalon.com",
    opening_hours: "Tue-Sat: 9:00 AM - 7:00 PM",
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
    location: "Mandaluyong",
    category: "Nail Salon",
    price_range: "$$",
    tags: [{ id: 2, name: "Nails", slug: "nails" }],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "Nairobi Nail Studio - Best Nail Salon Kenya",
    seo_description:
      "Expert nail services at Nairobi Nail Studio. Manicures, pedicures, and nail art.",
    seo_keywords: "nail salon, manicure, pedicure, Nairobi, nail art",
    address: "The Hub Karen, Nairobi",
    website: "https://nairobinails.co.ke",
    phone: "+254 733 444 555",
    email: "appointments@nairobinails.co.ke",
    opening_hours: "Mon-Sun: 10:00 AM - 6:00 PM",
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
    location: "Pasig",
    category: "Spa",
    price_range: "$$$",
    tags: [{ id: 3, name: "Spa", slug: "spa" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Cape Town Spa & Wellness - Best Spa Cape Town",
    seo_description:
      "Relax at Cape Town Spa & Wellness. Massages, facials, and body treatments available.",
    seo_keywords: "spa, wellness, Cape Town, massage, facial",
    address: "10 Kloof Street, Gardens, Cape Town",
    website: "https://ctspa.co.za",
    phone: "+27 21 888 9999",
    email: "relax@ctspa.co.za",
    opening_hours: "Mon-Sun: 9:00 AM - 9:00 PM",
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
    location: "Quezon",
    category: "Barber Shop",
    price_range: "$$",
    tags: [{ id: 4, name: "Barber", slug: "barber" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "Accra Barber Shop - Best Barber Accra",
    seo_description:
      "Expert barbering services at Accra Barber Shop. Traditional and modern styles available.",
    seo_keywords: "barber shop, grooming, Accra, haircut, styling",
    address: "14 Spintex Road, Accra",
    website: "https://accrabarber.gh",
    phone: "+233 27 111 2222",
    email: "cut@accrabarber.gh",
    opening_hours: "Mon-Sat: 8:00 AM - 8:00 PM",
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
    content: `When plumbing issues strike, you need a service you can rely on. Reliable Plumbing Services offers prompt, professional, and affordable plumbing solutions for homes and businesses across Lagos. Our team is available 24/7 to handle emergencies, from burst pipes to clogged drains.
    
    We pride ourselves on our transparency and integrity, providing upfront pricing and guaranteed satisfaction on all our work. Whether you need a simple repair, a new installation, or routine maintenance, our skilled technicians possess the expertise to get the job done right the first time.
    
    Trust Reliable Plumbing Services to keep your water flowing smoothly.`,
    featured_image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop",
    rating: 4.8,
    review_count: 278,
    location: "Laguna",
    category: "Plumbing Services",
    price_range: "$$",
    tags: [
      { id: 1, name: "Emergency", slug: "emergency" },
      { id: 115, name: "Repairs", slug: "repairs" },
      { id: 116, name: "Maintenance", slug: "maintenance" },
    ],
    created_at: "2025-06-01T10:00:00Z",
    seo_title: "Reliable Plumbing Services - Best Plumber Lagos",
    seo_description:
      "24/7 plumbing services in Lagos. Emergency repairs, installations, and maintenance.",
    seo_keywords: "plumber, plumbing, Lagos, emergency, repairs",
    address: "99 Isaac John St, Ikeja GRA, Lagos",
    website: "https://reliableplumbing.ng",
    phone: "+234 80 555 6666",
    email: "help@reliableplumbing.ng",
    opening_hours: "24/7 Emergency",
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
    location: "Mandaluyong",
    category: "Plumbing Services",
    price_range: "$$",
    tags: [{ id: 2, name: "Commercial", slug: "commercial" }],
    created_at: "2025-06-02T10:00:00Z",
    seo_title: "Master Plumber Co. - Professional Plumber Nairobi",
    seo_description:
      "Expert plumbing services in Nairobi. Residential and commercial solutions available.",
    seo_keywords: "plumber, plumbing, Nairobi, commercial, residential",
    address: "44 Mombasa Road, Industrial Area, Nairobi",
    website: "https://masterplumber.co.ke",
    phone: "+254 20 222 3333",
    email: "service@masterplumber.co.ke",
    opening_hours: "Mon-Fri: 8:00 AM - 5:00 PM",
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
    location: "Pasig",
    category: "Plumbing Services",
    price_range: "$$",
    tags: [{ id: 3, name: "Fast Service", slug: "fast-service" }],
    created_at: "2025-06-03T10:00:00Z",
    seo_title: "Quick Fix Plumbing - Fast Plumber Cape Town",
    seo_description:
      "Fast plumbing service in Cape Town. Same-day repairs for leaks, clogs, and water heaters.",
    seo_keywords: "plumber, plumbing, Cape Town, fast service, repairs",
    address: "15 Bree Street, Cape Town City Centre",
    website: "https://quickfix.co.za",
    phone: "+27 82 123 4567",
    email: "dispatch@quickfix.co.za",
    opening_hours: "Mon-Sat: 7:00 AM - 7:00 PM",
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
    location: "Quezon",
    category: "Plumbing Services",
    price_range: "$$",
    tags: [{ id: 4, name: "Certified", slug: "certified" }],
    created_at: "2025-06-04T10:00:00Z",
    seo_title: "Pro Plumbing Solutions - Certified Plumber Accra",
    seo_description:
      "Certified plumbing services in Accra. Quality guarantee on all work performed.",
    seo_keywords: "plumber, plumbing, Accra, certified, professional",
    address: "33 Independence Ave, Accra",
    website: "https://proplumbing.gh",
    phone: "+233 30 222 4444",
    email: "info@proplumbing.gh",
    opening_hours: "Mon-Fri: 8:00 AM - 6:00 PM",
  },
];
