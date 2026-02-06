import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const popularContent = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    badge: "Real Estate",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    count: 12500,
  },
  {
    id: 2,
    title: "The Golden Fork Restaurant",
    badge: "Dining",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    count: 8200,
  },
  {
    id: 3,
    title: "Mountain View Cabin",
    badge: "Real Estate",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    count: 5400,
  },
  {
    id: 4,
    title: "Zen Spa & Wellness",
    badge: "Health",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    count: 4100,
  },
  {
    id: 5,
    title: "Cozy Downtown Studio",
    badge: "Real Estate",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    count: 3800,
  },
];

const trendingSearches = [
  {
    id: 1,
    title: "Villas with Pool",
    badge: "Real Estate",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400",
    count: 24500,
  },
  {
    id: 2,
    title: "Best Pizza Near Me",
    badge: "Food",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    count: 18200,
  },
  {
    id: 3,
    title: "Emergency Plumber",
    badge: "Services",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400",
    count: 12400,
  },
  {
    id: 4,
    title: "Cheap Car Rental",
    badge: "Auto",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400",
    count: 9100,
  },
  {
    id: 5,
    title: "Luxury Spas",
    badge: "Wellness",
    image: "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?w=400",
    count: 8800,
  },
];

const latestComments = [
  {
    id: 1,
    title: "The service here was absolutely incredible!",
    badge: "The Golden Fork",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    count: 1, // Just to keep the data structure consistent
  },
  {
    id: 2,
    title: "Best beachfront view I've ever seen.",
    badge: "Luxury Beachfront Villa",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
    count: 1,
  },
  {
    id: 3,
    title: "Very professional staff and clean environment.",
    badge: "Zen Spa & Wellness",
    image: "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?w=400",
    count: 1,
  },
  {
    id: 4,
    title: "Reasonable prices for such a central location.",
    badge: "Cozy Downtown Studio",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    count: 1,
  },
];

const CardList = ({ title }: { title: string }) => {
  const getList = () => {
    switch (title) {
      case "Popular Content":
        return popularContent;
      case "Trending Searches":
        return trendingSearches;
      case "Latest Comments":
        return latestComments;
      default:
        return popularContent;
    }
  };

  const list = getList();

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {list.map((item: any) => (
          <Card
            key={item.id}
            className="flex-row items-center justify-between gap-4 p-4"
          >
            <div className="w-12 h-12 rounded-sm relative overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-1 p-0 min-w-0">
              <CardTitle className="text-sm font-medium line-clamp-2">
                {item.title}
              </CardTitle>
              <Badge variant="secondary" className="mt-1 truncate max-w-full">
                {item.badge}
              </Badge>
            </CardContent>
            {title !== "Latest Comments" && (
              <CardFooter className="p-0 flex-shrink-0 font-semibold text-gray-500">
                {item.count >= 1000
                  ? `${(item.count / 1000).toFixed(1)}K`
                  : item.count}
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;
