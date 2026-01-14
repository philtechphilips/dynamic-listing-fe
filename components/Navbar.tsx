"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/listing/restaurants", label: "Restaurants" },
    { href: "/listing/movies", label: "Movies" },
    { href: "/listing/hotels", label: "Hotels" },
    { href: "/listing/gyms", label: "Gyms" },
    { href: "/listing/salons", label: "Salons" },
    { href: "/all-post/podcast", label: "Podcast" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-400"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="2xl:px-[120px] md:px-10 px-5">
          <div className="flex items-center justify-between h-24">
            {/* Creative Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <div className="relative">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-red-600 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
                {/* Glowing effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-red-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-100 font-clash font-bold text-xl md:text-2xl leading-tight hidden sm:block group-hover:text-primary transition-colors duration-300">
                  Dynamic
                </span>
                <span className="text-xs text-gray-300 font-medium hidden sm:block -mt-1">
                  Discover & Explore
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Creative Effects */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-gray-100"
                      : "text-gray-200 hover:text-gray-100"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-300 to-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Content */}
                  <span className="relative flex items-center text-sm font-semibold">
                    {link.label}
                  </span>
                  {/* Active indicator dot */}
                  {isActive(link.href) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </div>

            {/* Login Button */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/login"
                className="group relative px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 group-hover:from-red-600 group-hover:via-red-700 group-hover:to-red-800 transition-all duration-300" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  Login
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button with Creative Animation */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative flex flex-col gap-1.5 p-3 rounded-lg hover:bg-gray-400 transition-colors duration-300 group"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-7 h-0.5 bg-gray-100 transition-all duration-500 rounded-full ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-2.5 bg-primary"
                    : "group-hover:bg-primary"
                }`}
              />
              <span
                className={`block w-7 h-0.5 bg-gray-100 transition-all duration-500 rounded-full ${
                  isMobileMenuOpen
                    ? "opacity-0 scale-0"
                    : "group-hover:bg-primary"
                }`}
              />
              <span
                className={`block w-7 h-0.5 bg-gray-100 transition-all duration-500 rounded-full ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-2.5 bg-primary"
                    : "group-hover:bg-primary"
                }`}
              />
            </button>
          </div>

          {/* Mobile Menu with Creative Slide Animation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-[600px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-6 space-y-2 border-t-2 border-gray-400 mt-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-2 ${
                    isActive(link.href)
                      ? "text-gray-100"
                      : "text-gray-200 hover:bg-gray-400 hover:text-gray-100"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-base font-semibold">{link.label}</span>
                  {isActive(link.href) && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative block px-6 py-3 text-sm font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 group-hover:from-red-600 group-hover:via-red-700 group-hover:to-red-800 transition-all duration-300" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Login
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

