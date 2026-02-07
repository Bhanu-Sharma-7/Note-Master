import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";

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
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Providers>
          {/* Navbar har page par upar dikhega */}
          <Navbar />
          
          <main className="min-h-screen">
            {children}
          </main>

          {/* Aap chahein toh yaha ek simple Footer bhi add kar sakte hain */}
          <footer className="py-8 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Note-Master. All rights reserved.
          </footer>
        </Providers>
      </body>
    </html>
  );
}