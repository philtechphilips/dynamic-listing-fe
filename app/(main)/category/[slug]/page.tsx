/**
 * =============================================================================
 * CATEGORY PAGE
 * =============================================================================
 *
 * Dynamic page displaying listings filtered by category.
 * This is a server component that handles SEO and passes data to CategoryClient.
 *
 * @route /category/[slug]
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryClient from "./CategoryClient";

/** Base API URL for fetching category data */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch category data from the server
 */
async function getCategoryData(slug: string) {
  try {
    const res = await fetch(`${API_URL}/categories/${slug}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

/**
 * Generate dynamic SEO metadata for the category
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryData(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const title = category.seoTitle || `${category.name} - Dynamic Listing`;
  const description =
    category.seoDescription ||
    category.description ||
    `Explore our top picks and latest updates for ${category.name}.`;
  const keywords =
    category.seoKeywords || `${category.name}, dynamic listing, directory`;

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
  };
}

/**
 * Server Component Entry Point
 */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryData(slug);

  if (!category) {
    notFound();
  }

  return <CategoryClient slug={slug} initialCategory={category} />;
}
