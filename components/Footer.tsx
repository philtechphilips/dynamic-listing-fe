"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Separator } from "./ui/separator";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border/40 pt-16 pb-8 px-5 md:px-16 2xl:px-30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold font-clash text-foreground">
                Dynamic Listing
              </h2>
            </Link>

            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Creativity. Culture. Data. Global Impact.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit us on Facebook"
                href="https://facebook.com"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-white transition-all flex items-center justify-center group"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://instagram.com"
                aria-label="Visit us on Instagram"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-white transition-all flex items-center justify-center group"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://youtube.com"
                aria-label="Visit us on YouTube"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-white transition-all flex items-center justify-center group"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Discover */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Discover
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/search"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/category/news"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Latest News
                </Link>
              </li>
              <li>
                <Link
                  href="/category/events"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/category/podcasts"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Podcasts
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/restaurants"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  href="/category/movies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/category/hotels"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  href="/category/gyms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Gyms & Fitness
                </Link>
              </li>
              <li>
                <Link
                  href="/category/salons"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Salons & Spas
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Dynamic Listing. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
