import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/src/config/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatedNavbar } from "@/components/Navbar/AnimatedNavbar";
import Topbar from "@/components/Navbar/topbar/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Onuragi",
  description: "Buy original & handicraft products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <Topbar />
              {/* <Navbar /> */}
              <AnimatedNavbar />
              <section className="min-h-screen">{children}</section>
              <Toaster />
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
