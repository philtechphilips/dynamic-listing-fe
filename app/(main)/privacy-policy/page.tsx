import React from 'react';

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
                <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

                <p>
                    Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
                </p>

                <h2 className="text-2xl font-semibold mt-8 text-gray-800 dark:text-gray-100">1. Information We Collect</h2>
                <p>
                    We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
                    We also let you know why we’re collecting it and how it will be used.
                </p>

                <h2 className="text-2xl font-semibold mt-8 text-gray-800 dark:text-gray-100">2. Data Retention</h2>
                <p>
                    We only retain collected information for as long as necessary to provide you with your requested service.
                    What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                </p>

                <h2 className="text-2xl font-semibold mt-8 text-gray-800 dark:text-gray-100">3. Sharing of Information</h2>
                <p>
                    We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
                </p>

                <h2 className="text-2xl font-semibold mt-8 text-gray-800 dark:text-gray-100">4. Your Rights</h2>
                <p>
                    You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
                </p>

                <p className="mt-8">
                    This policy is effective as of 2024.
                </p>
            </div>
        </div>
    );
}
