"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import GetStartedButton from "./GetStartedButton";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const isContactPage = pathname === "/contact-us";

  return (
    <footer className="bg-white 2xl:px-30 md:px-16 px-5 pt-16 pb-12">
      <div className="w-full flex md:flex-row flex-wrap md:flex-nowrap md:gap-10 gap-x-2 gap-y-10 items-start justify-between">
        <div className="md:w-1/4 w-full">
          {/* Logo Replacement */}
          <Link href="/" className="inline-block">
            <h2 className="text-2xl font-bold font-clash text-gray-900">
              Dynamic Listing
            </h2>
          </Link>

          <p className="text-sm text-gray-600 mt-2 font-medium">
            Creativity. Culture. Data. Global Impact.
          </p>

          <section className="bg-white">
            <div className="">
              <div className="mt-8 flex">
                <form action="" className="w-full">
                  <div className="bg-gray-100 flex items-center rounded-full p-1 pl-4 w-full max-w-[340px]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400"
                    >
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6L12 13L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-transparent border-none outline-none rounded-l-md px-3 py-2 w-full focus:ring-0 text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
          <p className="text-sm text-gray-600 font-medium mt-3">
            Get the latest updates and insights from Dynamic Listing. No spam.
            Just value.
          </p>

          <div className="mt-6">
            <div className="flex items-center gap-4 mt-4">
              <a
                target="_blank"
                aria-label="Visit us on Facebook"
                href="https://facebook.com"
                className="hover:opacity-80 transition-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                target="_blank"
                href="https://instagram.com"
                aria-label="Visit us on Instagram"
                className="hover:opacity-80 transition-opacity"
              >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.906C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.96039 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8H12.63C13.5235 8.00008 14.3808 8.35506 15.0126 8.98687C15.6444 9.61869 15.9994 10.476 15.9994 11.37H16Z" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 6.5H17.51" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                target="_blank"
                href="https://youtube.com"
                aria-label="Visit us on YouTube"
                className="hover:opacity-80 transition-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.54 6.42C22.4208 5.94541 22.1795 5.51061 21.8398 5.15874C21.5001 4.80687 21.0734 4.54972 20.6 4.41C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.41C2.92659 4.54972 2.49988 4.80687 2.16017 5.15874C1.82046 5.51061 1.57916 5.94541 1.46 6.42C1.26477 8.28315 1.26477 10.1568 1.46 12.02C1.57916 12.4946 1.82046 12.9294 2.16017 13.2813C2.49988 13.6331 2.92659 13.8903 3.4 14.03C5.12 14.44 12 14.44 12 14.44C12 14.44 18.88 14.44 20.6 14.03C21.0734 13.8903 21.5001 13.6331 21.8398 13.2813C22.1795 12.9294 22.4208 12.4946 22.54 12.02C22.7352 10.1568 22.7352 8.28315 22.54 6.42Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Column 2 - Discover */}
        <div className="md:col-span-2 col-span-1">
          <h4 className="text-gray-100 font-semibold text-lg mb-6 font-clash">
            Discover
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/search"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                href="/category/news"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Latest News
              </Link>
            </li>
            <li>
              <Link
                href="/category/events"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/category/podcasts"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Podcasts
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Categories */}
        <div className="md:col-span-2 col-span-1">
          <h4 className="text-gray-100 font-semibold text-lg mb-6 font-clash">
            Categories
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/category/restaurants"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Restaurants
              </Link>
            </li>
            <li>
              <Link
                href="/category/movies"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/category/hotels"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                href="/category/gyms"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Gyms & Fitness
              </Link>
            </li>
            <li>
              <Link
                href="/category/salons"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Salons & Spas
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Company */}
        <div className="md:col-span-2 col-span-1">
          <h4 className="text-gray-100 font-semibold text-lg mb-6 font-clash">
            Company
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/about"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Login
              </Link>
            </li>
             <li>
              <Link
                href="/privacy-policy"
                className="text-gray-200 hover:text-primary transition-colors inline-block"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-700 my-10"></div>

      <div className="flex md:flex-row flex-col-reverse md:items-center items-start gap-4 md:justify-between">
        <p className="text-gray-600 font-medium text-sm text-left">
          © {currentYear} Dynamic Listing. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy-policy"
            className="text-gray-600 font-medium text-sm hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-gray-600 font-medium text-sm hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
