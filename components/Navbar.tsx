"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  X,
  User,
  Search,
  LayoutDashboard,
  MessageSquare,
  LogOut,
  Menu
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007/api/v1";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const navLinks = categories.length > 0
    ? categories.slice(0, 4).map(cat => ({ href: `/category/${cat.slug}`, label: cat.name }))
    : [
      { href: "/category/restaurants", label: "Restaurants" },
      { href: "/category/movies", label: "Movies" },
      { href: "/category/hotels", label: "Hotels" },
      { href: "/category/gyms", label: "Gyms" },
    ];

  const moreLinks = categories.length > 0
    ? categories.slice(4).map(cat => ({ href: `/category/${cat.slug}`, label: cat.name }))
    : [
      { href: "/category/salons", label: "Salons" },
      { href: "/category/podcasts", label: "Podcasts" },
    ];

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
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isPathActive = (path: string) => pathname?.startsWith(path);

  return (
    <>
      {/* Navbar Container */}
      <div className="fixed top-0 left-0 right-0 z-[1000] px-4 py-4 md:px-16 md:py-6 2xl:px-30">
        <nav className="bg-white/80 backdrop-blur-xl border border-border/40 shadow-sm rounded-full px-4 md:px-10 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-xl md:text-2xl font-clash z-50 hover:opacity-90 transition-opacity"
            aria-label="Dynamic Listing Home"
          >
            <span className="text-primary">Dynamic</span>
            <span className="text-foreground">Listing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Nav Links */}
            <ul className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "font-semibold text-sm transition-colors",
                      isPathActive(link.href)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* More Dropdown */}
              {moreLinks.length > 0 && (
                <li className="relative group">
                  <button className="font-semibold text-sm text-foreground hover:text-primary flex items-center gap-1 transition-colors">
                    More
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl shadow-lg border border-border/40 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </li>
              )}
            </ul>

            {/* Desktop Search */}
            <div className="hidden lg:flex items-center">
              <form
                onSubmit={handleSearch}
                className={cn(
                  "relative flex items-center bg-muted rounded-full overflow-hidden transition-all duration-300",
                  searchQuery ? "w-64 shadow-sm" : "w-10 h-10 hover:w-64"
                )}
              >
                <button
                  type="submit"
                  className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors z-10"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full bg-transparent border-none py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-0 placeholder:text-muted-foreground text-foreground"
                />
              </form>
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="default" className="gap-2 text-white">
                    <User className="w-4 h-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-[1100] border-0 shadow-lg">
                  <div className="px-3 py-2">
                    <p className="text-xs text-muted-foreground">Signed in as</p>
                    <p className="text-sm font-semibold text-foreground truncate">
                      {user?.name || "User"}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/comments" className="flex items-center gap-2 cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                      <span>My Comments</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="default" className="text-white">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-foreground"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "md:hidden bg-white w-[85vw] h-screen z-50 fixed top-0 right-0 shadow-2xl transition-transform duration-300 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center p-4 border-b border-border/40">
          <Link
            href="/"
            className="font-bold text-xl font-clash"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-primary">Dynamic</span>
            <span className="text-foreground">Listing</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-foreground"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </form>

          {/* Mobile Nav Links */}
          <nav className="space-y-1">
            {[...navLinks, ...moreLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg font-semibold text-base transition-colors",
                  isPathActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <div className="my-4">
                  <div className="h-px bg-border/40" />
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-base transition-colors",
                    isPathActive("/dashboard")
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/comments"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-base transition-colors",
                    isPathActive("/dashboard/comments")
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <MessageSquare className="w-5 h-5" />
                  My Comments
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile Menu Footer */}
        <div className="p-4 border-t border-border/40">
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="px-3 py-2 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Signed in as</p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {user?.name || "User"}
                </p>
              </div>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button asChild className="w-full text-white">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
