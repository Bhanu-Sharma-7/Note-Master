"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Settings</h1>
            <p className="text-gray-500 font-medium">Manage your account preferences and security</p>
          </div>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
          >
            Done
          </Link>
        </header>

        <div className="space-y-6">
          {/* Profile Section */}
          <section className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Account Session</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-xl">
                  👋
                </div>
                <div>
                  <p className="font-bold text-gray-800">Sign Out</p>
                  <p className="text-xs text-gray-500">Apne current session ko end karein</p>
                </div>
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-6 py-2 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-100"
              >
                Logout
              </button>
            </div>
          </section>

          {/* Preferences Placeholder */}
          <section className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Preferences</h2>
            <div className="space-y-4 opacity-50 cursor-not-allowed">
              <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl">
                <p className="font-semibold text-gray-700">Dark Mode</p>
                <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl">
                <p className="font-semibold text-gray-700">Language (Hinglish)</p>
                <span className="text-xs font-bold text-blue-600">Coming Soon</span>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="p-8 bg-red-50 rounded-3xl border border-red-100 shadow-sm">
            <h2 className="text-sm font-black uppercase tracking-widest text-red-400 mb-6">Danger Zone</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-red-800">Delete Account</p>
                <p className="text-xs text-red-600/70">Aapka saara data (notes aur profile) hamesha ke liye delete ho jayega.</p>
              </div>
              <button 
                disabled
                className="px-6 py-2 bg-white text-red-600 text-sm font-bold rounded-xl border border-red-200 opacity-50"
              >
                Delete Forever
              </button>
            </div>
          </section>
        </div>

        <p className="mt-12 text-center text-xs text-gray-300 font-medium">
          Note-Master Version 1.0.0 (Beta)
        </p>
      </div>
    </div>
  );
}