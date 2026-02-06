import Link from "next/link";
import Image from "next/image";
import { Resource } from "@/types";

interface ResourceCardProps {
  resource: Resource;
}

// Helper function to limit string
function limitString(str: string, limit: number): string {
  if (str.length <= limit) return str;
  return str.substring(0, limit) + "...";
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link href={`/item/${resource.slug}`} className="block">
      <div className="flex flex-col w-full group">
        {/* Image */}
        <div className="w-full h-[300px] overflow-hidden rounded-lg">
          <Image
            src={resource.featured_image || "/images/music.svg"}
            alt={resource.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          />
        </div>

        {/* Title with Arrow */}
        <div className="flex items-center justify-between mt-4">
          <h5 className="font-clash text-gray-100 font-semibold text-lg">
            {limitString(resource.title, 50)}
          </h5>

          {/* Animated Arrow */}
          <div className="relative overflow-hidden w-6 h-6">
            {/* First arrow - slides out */}
            <svg
              className="absolute inset-0 transform group-hover:translate-x-8 group-hover:opacity-0 transition-all duration-500 ease-in-out w-6 h-6 text-gray-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
            {/* Second arrow - slides in */}
            <svg
              className="absolute inset-0 transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out w-6 h-6 text-gray-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-sm font-medium text-gray-200 pr-20 mt-1">
          {limitString(resource.excerpt || resource.title, 80)}
        </p>
      </div>
    </Link>
  );
}
