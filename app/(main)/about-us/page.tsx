/**
 * =============================================================================
 * ABOUT US PAGE
 * =============================================================================
 * 
 * Static page displaying information about the platform and company.
 * Contains mission statement, founding story, and vision.
 * 
 * @route /about-us
 */

import React from 'react';

/**
 * About Us Page Component
 * Renders the company information and mission statement.
 */
export default function AboutUsPage() {
    return (
        <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">About Us</h1>
            <div className="prose dark:prose-invert max-w-none space-y-6 text-lg text-gray-600 dark:text-gray-300">
                <p>
                    Welcome to our platform! We are dedicated to providing the best service to our users.
                    Our mission is to simplify your life with our innovative solutions.
                </p>
                <p>
                    Founded in 2024, our team has been working effectively to bring you a seamless experience.
                    We believe in quality, integrity, and customer satisfaction.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h2 className="text-2xl font-semibold mt-8 text-gray-800 dark:text-gray-100">Our Vision</h2>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    );
}
