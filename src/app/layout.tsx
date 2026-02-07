import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note-Master | Manage Your Digital Diary",
  description: "A simple and secure way to manage your personal notes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning yahan zaroori hai kyunki next-themes html attributes ko modify karta hai
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider>
          <Providers>
            <Navbar />
            <main className="min-h-screen bg-gray-50 dark:bg-[#0B141D]">
              {children}
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}