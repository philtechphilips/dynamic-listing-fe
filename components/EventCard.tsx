import Link from "next/link";
import Image from "next/image";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

// Helper function to format date
function formatDate(date?: string | Date): string {
  if (!date) return "TBD";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Helper function to format time
function formatTime(date?: string | Date): string {
  if (!date) return "TBD";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
}

// Helper function to limit string
function limitString(str: string, limit: number): string {
  if (str.length <= limit) return str;
  return str.substring(0, limit) + "...";
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="flex md:flex-row flex-col gap-6 w-full">
      {/* Event Image */}
      <div className="md:w-1/2 h-[248px] overflow-hidden rounded-lg relative">
        <Image
          src={event.featured_image || "/images/music.svg"}
          alt={event.title}
          fill
          className="w-full h-full object-cover scale-100 hover:scale-105 transition-all duration-500"
        />
      </div>

      {/* Event Details */}
      <div className="md:w-1/2">
        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex items-center py-1 px-2 bg-primary-300 rounded-md w-fit">
            <p className="text-primary text-sm font-medium">
              {event.tags[0].name}
            </p>
          </div>
        )}

        {/* Date and Time */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-200 mt-4">
          <p>{formatDate(event.event_date_time)}</p>
          <span className="w-1 h-1 rounded-full bg-current" />
          <p>{formatTime(event.event_date_time)}</p>
        </div>

        {/* Title */}
        <h5 className="font-clash text-gray-100 font-semibold text-lg mb-2 mt-4">
          <Link
            href={`/item/${event.slug}`}
            className="hover:text-gray-300 transition-colors"
          >
            {limitString(event.title, 50)}
          </Link>
        </h5>

        {/* Excerpt */}
        <p className="text-sm font-medium text-gray-200">
          {limitString(event.excerpt || "", 120)}
        </p>

        {/* Location */}
        {event.event_location && (
          <div className="flex items-center gap-2 mt-6">
            <div className="flex items-center gap-1">
              <svg
                className="w-6 h-6 text-gray-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-gray-100 font-medium text-sm">
                {event.event_location}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
