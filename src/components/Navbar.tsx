"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaBook, FaSignOutAlt, FaTrash, FaUser, FaThLarge, FaCog, FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full h-14 z-[100] bg-[#030712]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo Section - Left */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-500/30">
              <FaBook className="text-white text-xs" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Note<span className="text-emerald-500">Master</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {session && (
              <>
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-emerald-400 transition-all duration-200 group"
                >
                  <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                    <FaThLarge size={11} />
                  </div>
                  Dashboard
                </Link>
                <Link 
                  href="/trash" 
                  className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-rose-400 transition-all duration-200 group"
                >
                  <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-rose-500/20 transition-colors">
                    <FaTrash size={11} />
                  </div>
                  Recycle Bin
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FaSearch size={14} className="text-gray-400" />
            </button>
            
            {isSearchOpen && (
              <div className="absolute right-0 top-12 w-64 p-2 bg-[#0A0F1A] rounded-lg border border-white/10 shadow-xl">
                <input
                  type="text"
                  placeholder="Search notes..."
                  className="w-full px-3 py-2 bg-white/5 rounded border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* User Section */}
          {session ? (
            <div className="flex items-center gap-3">
              {/* Settings */}
              <Link 
                href="/settings" 
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                title="Settings"
              >
                <FaCog 
                  size={14} 
                  className="text-gray-400 group-hover:text-purple-400 transition-colors animate-spin-slow" 
                />
              </Link>

              {/* Profile */}
              <Link 
                href="/profile" 
                className="flex items-center gap-2 p-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase()}
                  </span>
                </div>
              </Link>

              {/* Logout */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg border border-rose-500/20 transition-colors group"
                title="Sign Out"
              >
                <FaSignOutAlt 
                  size={14} 
                  className="text-rose-400 group-hover:text-rose-300 transition-colors" 
                />
              </button>
            </div>
          ) : (
            /* Login/Signup */
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-xs font-bold text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}