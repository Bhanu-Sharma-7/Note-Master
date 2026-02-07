"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBook } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      alert("Invalid Email or Password");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#030712] px-6 transition-colors duration-500 overflow-hidden">
      
      {/* Decorative Glow Blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full hidden dark:block"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full hidden dark:block"></div>

      {/* Main Container - Width set to 380px for a compact look */}
      <div className="w-full max-w-[380px] z-10">
        
        {/* Compact Glass Card */}
        <div className="bg-white dark:bg-[#111827]/60 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/[0.05]">
          
          {/* Minimal Logo Section */}
          <div className="text-center mb-7">
            <div className="inline-flex p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mb-4 shadow-md shadow-emerald-500/20">
              <FaBook className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Note Master
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Securely sign in to your diary
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3.5 bg-gray-50 dark:bg-[#1F2937]/50 border border-transparent dark:border-white/[0.03] rounded-xl focus:bg-white dark:focus:bg-[#1F2937] focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3.5 bg-gray-50 dark:bg-[#1F2937]/50 border border-transparent dark:border-white/[0.03] rounded-xl focus:bg-white dark:focus:bg-[#1F2937] focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-sm font-medium text-gray-900 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center px-1">
              <label className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 cursor-pointer">
                <input type="checkbox" className="accent-emerald-500 w-3.5 h-3.5 rounded" /> 
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-[#030712] rounded-xl font-bold transition-all active:scale-[0.97] shadow-lg shadow-emerald-500/10 text-sm mt-2"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 text-center border-t border-gray-100 dark:border-white/[0.05] pt-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              New here?{" "}
              <Link href="/register" className="text-emerald-600 dark:text-emerald-500 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}