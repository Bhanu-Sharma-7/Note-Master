"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8 border-b pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-sans">Settings</h1>
          <p className="text-gray-500">Apne account ki preferences set karein</p>
        </div>
        <Link href="/dashboard" className="text-blue-600 hover:underline text-sm">
          Back to Dashboard
        </Link>
      </header>

      <div className="space-y-6">
        {/* Logout Section */}
        <div className="p-6 bg-white border rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Logout</h2>
            <p className="text-sm text-gray-500">Session khatam karne ke liye yaha click karein</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition"
          >
            Sign Out
          </button>
        </div>

        {/* Placeholder for Theme/Language (Aapke features) */}
        <div className="p-6 bg-gray-50 border rounded-xl opacity-60">
          <h2 className="text-lg font-semibold italic">Appearance (Coming Soon)</h2>
          <p className="text-sm text-gray-500 font-sans">Dark mode aur Language settings agle update mein aayengi.</p>
        </div>

        {/* Danger Zone */}
        <div className="p-6 border border-red-200 rounded-xl bg-red-50">
          <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>
          <p className="text-sm text-red-600 mb-4">Account delete karne se saare notes hamesha ke liye mit jayenge.</p>
          <button 
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
            onClick={() => alert("Ye feature abhi developer mode mein hai.")}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}