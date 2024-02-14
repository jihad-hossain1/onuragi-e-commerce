import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/src/config/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Onuragi",
  description: "Buy original & handicraft products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-zinc-800 text-white p-2">
          <AuthProvider>
            <Navbar />
            <section className="min-h-screen max-w-screen-xl mx-auto p-2">
              {children}
            </section>
            <Toaster />
            <Footer />
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
