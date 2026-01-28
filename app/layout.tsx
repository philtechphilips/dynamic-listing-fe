import type { Metadata } from "next";
import { Geom, Lato } from "next/font/google";
import "./fonts.css";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geom = Geom({
    variable: "--font-geom",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
});

const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: "Dynamic Listing - Your Ultimate Guide to Lifestyle & Entertainment",
    description: "Discover top-rated restaurants, movies, events, and more across Africa. The premier platform for listings and news.",
    openGraph: {
        title: "Dynamic Listing",
        description: "Discover top-rated restaurants, movies, events, and more across Africa.",
        type: "website",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geom.variable} ${lato.variable} antialiased`}
            >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
