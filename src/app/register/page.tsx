"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBook } from "react-icons/fa";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Account created successfully! Please login.");
        router.push("/login");
      } else {
        const data = await res.json();
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#030712] px-6 transition-colors duration-500 overflow-hidden">
      
      {/* Decorative Glow Blobs */}
      <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full hidden dark:block"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full hidden dark:block"></div>

      {/* Main Container - Compact Width 380px */}
      <div className="w-full max-w-[380px] z-10">
        
        {/* Compact Glass Card */}
        <div className="bg-white dark:bg-[#111827]/60 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/[0.05]">
          
          {/* Minimal Logo Section */}
          <div className="text-center mb-7">
            <div className="inline-flex p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-4 shadow-md shadow-emerald-500/20">
              <FaBook className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Join Us
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Start your digital diary today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3.5 bg-gray-50 dark:bg-[#1F2937]/50 border border-transparent dark:border-white/[0.03] rounded-xl focus:bg-white dark:focus:bg-[#1F2937] focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3.5 bg-gray-50 dark:bg-[#1F2937]/50 border border-transparent dark:border-white/[0.03] rounded-xl focus:bg-white dark:focus:bg-[#1F2937] focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3.5 bg-gray-50 dark:bg-[#1F2937]/50 border border-transparent dark:border-white/[0.03] rounded-xl focus:bg-white dark:focus:bg-[#1F2937] focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-[#030712] rounded-xl font-bold transition-all active:scale-[0.97] shadow-lg shadow-emerald-500/10 text-sm mt-2"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 text-center border-t border-gray-100 dark:border-white/[0.05] pt-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Already a member?{" "}
              <Link href="/login" className="text-emerald-600 dark:text-emerald-500 font-bold hover:underline">
                Login Here
              </Link>
            </p>
          </div>
        </div>

        {/* Minimal Bottom Info */}
        <div className="mt-8 flex justify-center gap-6">
            <span className="text-[10px] text-gray-400 dark:text-gray-600 font-bold tracking-widest uppercase">Privacy First</span>
            <span className="text-[10px] text-gray-400 dark:text-gray-600 font-bold tracking-widest uppercase">Secure Storage</span>
        </div>
      </div>
    </div>
  );
}