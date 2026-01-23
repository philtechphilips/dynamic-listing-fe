"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ArrowDown, ArrowRight, ChevronRight, X, User, Search, LayoutDashboard, MessageSquare, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => pathname === path;
  const isPathActive = (path: string) => pathname?.startsWith(path);

  return (
    <>
      <div className="md:py-6 2xl:px-30 md:px-16 px-4 py-4 fixed top-0 left-0 right-0 bg-transparent z-[1000]">
        <nav
          className="bg-surface-300/60 border border-surface-300 md:px-10 px-4 py-2 rounded-full flex justify-between items-center relative z-10"
          style={{
            boxShadow: "0px 4px 4px 0px #1A1A1A0D",
            backdropFilter: "blur(35px)",
            WebkitBackdropFilter: "blur(35px)",
          }}
        >
          <Link
            href="/"
            className={`w-fit z-50 font-bold text-2xl ${isActive("/") ? "opacity-100" : "opacity-90 hover:opacity-100"
              }`}
            aria-label="Dynamic Listing Home"
          >
            <span className="text-primary font-clash">Dynamic</span>
            <span className="text-gray-100 font-clash">Listing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="md:flex hidden items-center gap-8 z-10">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href="/category/restaurants"
                  className={`font-semibold text-base ${isPathActive("/category/restaurants")
                    ? "text-primary transition-colors"
                    : "text-gray-100 hover:text-primary transition-colors"
                    }`}
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  href="/category/movies"
                  className={`font-semibold text-base ${isPathActive("/category/movies")
                    ? "text-primary transition-colors"
                    : "text-gray-100 hover:text-primary transition-colors"
                    }`}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/category/hotels"
                  className={`font-semibold text-base ${isPathActive("/category/hotels")
                    ? "text-primary transition-colors"
                    : "text-gray-100 hover:text-primary transition-colors"
                    }`}
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  href="/category/gyms"
                  className={`font-semibold text-base ${isPathActive("/category/gyms")
                    ? "text-primary transition-colors"
                    : "text-gray-100 hover:text-primary transition-colors"
                    }`}
                >
                  Gyms
                </Link>
              </li>

              <li className="relative group">
                <Link
                  href="#"
                  className="font-semibold text-base text-gray-100 hover:text-primary flex items-center gap-1 transition-colors"
                >
                  More <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                <div
                  className="absolute rounded-lg p-2 top-8 w-[200px] left-1/2 transform -translate-x-1/2 bg-white flex flex-col gap-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                  style={{
                    boxShadow: "0px 10px 18px -2px #10192812",
                  }}
                >
                  <Link
                    href="/category/salons"
                    className="block px-4 py-2 hover:bg-surface-300 rounded-md text-gray-100 hover:text-primary transition-colors font-medium text-sm"
                  >
                    Salons
                  </Link>
                  <Link
                    href="/category/podcasts"
                    className="block px-4 py-2 hover:bg-surface-300 rounded-md text-gray-100 hover:text-primary transition-colors font-medium text-sm"
                  >
                    Podcast
                  </Link>
                </div>
              </li>
            </ul>

            {/* Animated Search Bar - Desktop */}
            <div className={`hidden lg:flex items-center transition-all duration-300 ease-in-out ${searchQuery ? 'w-64' : 'w-auto'}`}>
              <form
                onSubmit={handleSearch}
                className={`relative flex items-center bg-white/10 border border-gray-200/50 rounded-full overflow-hidden transition-all duration-300 ${searchQuery ? 'w-64 shadow-md bg-white' : 'w-10 h-10 hover:w-64 hover:bg-white hover:shadow-md'
                  }`}
              >
                <button
                  type="submit"
                  className={`absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors z-10`}
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full h-full bg-transparent border-none py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-0 placeholder-gray-400 text-gray-900 transition-opacity duration-200`}
                />
              </form>
            </div>

            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="bg-primary hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-sm shadow-md shadow-primary/20 active:scale-95"
                  >
                    <User className="w-4 h-4" />
                    Account
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-2xl border-gray-100 shadow-xl z-[1001]">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
                  </div>
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 cursor-pointer">
                    <Link href="/dashboard" className="flex items-center gap-2 w-full py-2">
                      <LayoutDashboard className="w-4 h-4 text-primary" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 cursor-pointer">
                    <Link href="/dashboard/comments" className="flex items-center gap-2 w-full py-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span>My Comments</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 cursor-pointer border-t border-gray-50 mt-1">
                    <button className="flex items-center gap-2 w-full py-2 text-red-600">
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Toggles */}
          <div className="md:hidden flex items-center gap-10">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="text-gray-100"
            >
              <div className="space-y-1.5 cursor-pointer">
                <span className="block w-8 h-0.5 bg-gray-100"></span>
                <span className="block w-8 h-0.5 bg-gray-100"></span>
                <span className="block w-8 h-0.5 bg-gray-100"></span>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-[500ms] ease-in-out ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden bg-white p-4 w-[85vw] h-screen z-50 fixed top-0 right-0 shadow-2xl transition-transform duration-[500ms] ease-in-out ${isMobileMenuOpen
          ? "translate-x-0"
          : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="font-bold text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-primary font-clash">Dynamic</span>
            <span className="text-gray-100 font-clash">Listing</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Menu">
            <X className="w-6 h-6 text-gray-100" />
          </button>
        </div>

        <ul className="flex flex-col gap-6">
          {/* Search Bar - Mobile */}
          <li>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </li>
          <li>
            <Link
              href="/category/restaurants"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-lg flex items-center gap-3 ${isPathActive("/category/restaurants") ? "text-primary" : "text-gray-200"
                }`}
            >
              Restaurants
            </Link>
          </li>
          <li>
            <Link
              href="/category/movies"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-lg flex items-center gap-3 ${isPathActive("/category/movies") ? "text-primary" : "text-gray-200"
                }`}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              href="/category/hotels"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-lg flex items-center gap-3 ${isPathActive("/category/hotels") ? "text-primary" : "text-gray-200"
                }`}
            >
              Hotels
            </Link>
          </li>
          <li>
            <Link
              href="/category/gyms"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-lg flex items-center gap-3 ${isPathActive("/category/gyms") ? "text-primary" : "text-gray-200"
                }`}
            >
              Gyms
            </Link>
          </li>
          <li>
            <Link
              href="/category/salons"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-lg flex items-center gap-3 ${isPathActive("/category/salons") ? "text-primary" : "text-gray-200"
                }`}
            >
              Salons
            </Link>
          </li>
          <li>
            <Link
              href="/category/podcasts"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-lg flex items-center gap-3 ${isPathActive("/category/podcasts") ? "text-primary" : "text-gray-200"
                }`}
            >
              Podcast
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-lg flex items-center gap-3 ${isPathActive("/dashboard") ? "text-primary" : "text-gray-200"}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              My Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/comments"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-semibold text-lg flex items-center gap-3 ${isPathActive("/dashboard/comments") ? "text-primary" : "text-gray-200"}`}
            >
              <MessageSquare className="w-5 h-5" />
              My Comments
            </Link>
          </li>
        </ul>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <Link
            href="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 shadow-lg shadow-primary/20"
          >
            <User className="w-5 h-5" />
            My Account
          </Link>
        </div>
      </div>
    </>
  );
}
