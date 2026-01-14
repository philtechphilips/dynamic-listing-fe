"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    discover: [
      { href: "/listing/restaurants", label: "Restaurants" },
      { href: "/listing/movies", label: "Movies" },
      { href: "/listing/hotels", label: "Hotels" },
      { href: "/listing/gyms", label: "Gyms & Fitness" },
      { href: "/listing/salons", label: "Salons & Spas" },
    ],
    services: [
      { href: "/listing/electricians", label: "Electricians" },
      { href: "/listing/plumbers", label: "Plumbers" },
      { href: "/all-post/podcast", label: "Podcasts" },
      { href: "/all-post/top-videos", label: "Videos" },
      { href: "/all-post/news", label: "News" },
    ],
    company: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/careers", label: "Careers" },
      { href: "/advertise", label: "Advertise" },
      { href: "/press", label: "Press" },
    ],
    support: [
      { href: "/help", label: "Help Center" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-gray-100 overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-400/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

      {/* Main Footer Content */}
      <div className="relative 2xl:px-[120px] md:px-10 px-5 pt-20 pb-10">
        {/* Top Section - Logo, Description, Newsletter */}
        <div className="flex flex-col lg:flex-row gap-16 pb-16 border-b border-white/10">
          {/* Brand Section */}
          <div className="lg:w-1/3">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                {/* Glowing effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-red-500 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
              </div>
              <div className="flex flex-col relative">
                <span className="text-white font-clash font-bold text-3xl leading-tight group-hover:text-primary transition-colors duration-300">
                  Dynamic
                </span>
                <span className="text-sm text-gray-300 font-medium -mt-1">
                  Discover & Explore
                </span>
              </div>
            </Link>
            <p className="mt-6 text-gray-300 leading-relaxed max-w-sm">
              Your ultimate destination for discovering the best local
              businesses, entertainment, and services. Explore top-rated venues
              and stay informed with the latest news.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">
                Subscribe to our newsletter
              </h4>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <button className="group relative px-6 py-3.5 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-red-600 to-red-700 group-hover:from-red-600 group-hover:via-red-700 group-hover:to-red-800 transition-all duration-300" />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
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
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Discover Column */}
            <div>
              <h4 className="text-white font-clash font-semibold text-lg mb-6 relative inline-block">
                Discover
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-red-500" />
              </h4>
              <ul className="space-y-4">
                {footerLinks.discover.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-white font-clash font-semibold text-lg mb-6 relative inline-block">
                Services
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-red-500" />
              </h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-clash font-semibold text-lg mb-6 relative inline-block">
                Company
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-red-500" />
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="text-white font-clash font-semibold text-lg mb-6 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-red-500" />
              </h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-0 h-0.5 bg-primary group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear}{" "}
              <span className="text-white font-medium">Dynamic</span>. All
              rights reserved.
            </p>
            <span className="hidden md:block text-gray-600">|</span>
            <p className="text-gray-400 text-sm">
              Made with{" "}
              <span className="text-primary animate-pulse inline-block">❤</span>{" "}
              for discovering amazing places
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                  {social.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="mt-10 h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />
      </div>
    </footer>
  );
}
