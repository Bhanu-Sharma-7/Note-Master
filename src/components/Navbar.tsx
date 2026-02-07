"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Agar user login nahi hai, toh Navbar nahi dikhayenge
  if (!session) return null;

  // Active link style karne ke liye helper function
  const isActive = (path: string) => pathname === path ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-500";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/dashboard" className="text-2xl font-black tracking-tight text-gray-900">
          Note<span className="text-blue-600">.</span>Master
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
          <Link href="/trash" className={isActive("/trash")}>
            Trash Bin
          </Link>
          <Link href="/profile" className={isActive("/profile")}>
            Profile
          </Link>
          <Link href="/settings" className={isActive("/settings")}>
            Settings
          </Link>
        </div>

        {/* User Action */}
        <div className="flex items-center gap-4">
          <span className="hidden lg:inline text-xs text-gray-400">
            {session.user?.email}
          </span>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}