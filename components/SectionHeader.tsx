import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  viewAllText?: string;
  showViewAll?: boolean;
}

export default function SectionHeader({
  title,
  viewAllHref = "#",
  viewAllText = "View all",
  showViewAll = true,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-10">
      <h3 className="text-gray-100 font-semibold md:text-5xl text-4xl font-clash flex-shrink-0">
        {title}
      </h3>
      <div className="flex-1 h-[3px] bg-gray-100" />
      {showViewAll && (
        <Link
          href={viewAllHref}
          className="bg-gray-400 hidden md:flex rounded-full py-3 px-8 w-fit text-gray-100 font-semibold hover:text-gray-300 transition-colors duration-500 flex-shrink-0"
        >
          {viewAllText}
        </Link>
      )}
    </div>
  );
}

// Mobile View All Button component
export function MobileViewAllButton({
  href = "#",
  text = "View all",
}: {
  href?: string;
  text?: string;
}) {
  return (
    <div className="mt-10 flex items-center justify-center">
      <Link
        href={href}
        className="bg-gray-400 md:hidden flex rounded-full py-3 px-8 w-fit text-gray-100 font-semibold hover:text-gray-300 transition-colors duration-500"
      >
        {text}
      </Link>
    </div>
  );
}
