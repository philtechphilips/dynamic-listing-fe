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
                    <path d="M22.54 6.42C22.4208 5.94541 22.1795 5.51061 21.8398 5.15874C21.5001 4.80687 21.0734 4.54972 20.6 4.41C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.41C2.92659 4.54972 2.49988 4.80687 2.16017 5.15874C1.82046 5.51061 1.57916 5.94541 1.46 6.42C1.26477 8.28315 1.26477 10.1568 1.46 12.02C1.57916 12.4946 1.82046 12.9294 2.16017 13.2813C2.49988 13.6331 2.92659 13.8903 3.4 14.03C5.12 14.44 12 14.44 12 14.44C12 14.44 18.88 14.44 20.6 14.03C21.0734 13.8903 21.5001 13.6331 21.8398 13.2813C22.1795 12.9294 22.4208 12.4946 22.54 12.02C22.7352 10.1568 22.7352 8.28315 22.54 6.42Z" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="md:w-fit w-[40%]">
          <h6 className="text-gray-900 font-clash font-semibold text-lg">
            Quick Links
          </h6>
          <ul className="flex flex-col gap-4 text-gray-600 font-medium text-sm mt-4">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="hover:text-primary transition-colors"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-primary transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/case-study"
                className="hover:text-primary transition-colors"
              >
                Case Studies
              </Link>
            </li>
            <li>
              <Link
                href="/partner"
                className="hover:text-primary transition-colors"
              >
                Partners
              </Link>
            </li>
            <li>
              <Link
                href="/faqs"
                className="hover:text-primary transition-colors"
              >
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:w-fit w-[50%]">
          <h6 className="text-gray-900 font-clash font-semibold text-lg">
            Top Categories
          </h6>
          <ul className="flex flex-col gap-4 text-gray-600 font-medium text-sm mt-4">
            <li>
              <Link
                href="/listing/restaurants"
                className="hover:text-primary transition-colors"
              >
                Restaurants
              </Link>
            </li>
            <li>
              <Link
                href="/listing/movies"
                className="hover:text-primary transition-colors"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/listing/hotels"
                className="hover:text-primary transition-colors"
              >
                Hotels
              </Link>
            </li>
             <li>
                <Link
                    href="/listing/gyms"
                    className="hover:text-primary transition-colors"
                >
                    Gyms & Fitness
                </Link>
             </li>
              <li>
                  <Link
                      href="/all-post/news"
                      className="hover:text-primary transition-colors"
                  >
                      Latest News
                  </Link>
              </li>
            <li>
              <Link className="flex flex-row gap-2 items-center" href="/#">
                <p>Musifyr</p>
                <div className="border border-gray-300 rounded-full text-[10px] font-medium text-primary px-2 py-0.5">
                  Coming Soon
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:w-fit">
          <h6 className="text-gray-900 font-clash font-semibold text-lg">
            Contact
          </h6>
          <div className="flex items-start gap-2 mt-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 text-gray-900">
                <path d="M22 16.92V19.92C22.0011 20.1986 21.9204 20.471 21.767 20.7057C21.6137 20.9403 21.3941 21.1274 21.1343 21.2449C20.8745 21.3624 20.5855 21.4055 20.3013 21.3691C20.017 21.3327 19.7492 21.2183 19.53 21.04C16.5004 18.9882 13.9189 16.4067 11.8671 13.3771C11.6877 13.1555 11.5727 12.8851 11.5362 12.5996C11.4996 12.3142 11.543 12.0245 11.6611 11.7634C11.7792 11.5024 11.967 11.2804 12.2032 11.1235C12.4394 10.9666 12.7144 10.881 12.9972 10.8771H15.9972C16.8909 10.8711 17.6534 11.5645 17.72 12.4552C17.7735 13.1666 18.1578 13.8016 18.7738 14.2045C19.0494 14.3853 19.3804 14.4754 19.71 14.4593C20.0397 14.4431 20.3541 14.3214 20.6 14.1147L21.45 13.3999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.11 13.89L13.16 11.84" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 4H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 8H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <p className="text-gray-600 font-medium">+234 810 288 2412</p>
              <p className="text-gray-600 font-medium mt-2">+44 7459 802902</p>
            </div>
          </div>

          <div className="flex items-start gap-2 mt-4">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 text-gray-900">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="text-gray-600 font-medium">
              <p>info@dynamiclisting.com</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/4 w-full">
          <h6 className="text-gray-900 font-clash font-semibold text-lg">
            Office Locations
          </h6>
          <div className="flex items-start gap-2 mt-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 text-gray-900">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <h6 className="text-gray-900 font-semibold">Nigeria Office</h6>
              <p className="text-gray-600 font-medium mt-2">
                Dynamic Listing Brand 22 Imoro Peace Avenue , Ikorodu
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-4">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 text-gray-900">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <h6 className="text-gray-900 font-semibold">
                United Kingdom Office
              </h6>
              <p className="text-gray-600 font-medium mt-2">
                Dynamic Listing Brand 58 Strathmore Avenue CV1 2AH
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200 my-10"></div>

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
