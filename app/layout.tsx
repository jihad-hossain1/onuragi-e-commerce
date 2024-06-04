import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/src/config/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatedNavbar } from "@/components/Navbar/AnimatedNavbar";
import Topbar from "@/components/Navbar/topbar/Topbar";
import Navbar from "@/components/Navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Onuragi",
  description: "Buy original & handicraft products",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="dark:bg-zinc-800">
          <ThemeProvider>
            <AuthProvider>
              <Topbar />

              <Navbar />
              {/* <AnimatedNavbar /> */}
              <div className="min-h-screen">{children}</div>
              <Toaster />
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
