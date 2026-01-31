import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
import AdminNavbar from "@/components/AdminNavbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard - Dynamic Listing",
  description: "Admin dashboard for managing Dynamic Listing",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen w-full`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AdminLayoutWrapper>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="w-full">
              <AdminNavbar />
              <div className="px-4">{children}</div>
            </main>
          </SidebarProvider>
        </AdminLayoutWrapper>
      </ThemeProvider>
    </div>
  );
}
