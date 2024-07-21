import type { Metadata } from "next";
import { Inter as FontSans} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "../components/Navbar";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import Footer from "@/components/Footer";

const fontSans = FontSans({ subsets: ["latin"],
  variable: "--font-sans",
 });

export const metadata: Metadata = {
  title: "Hover",
  description: "High Quality Development Courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
    </ReactQueryClientProvider>
  );
}
