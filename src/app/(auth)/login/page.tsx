"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120] p-4">
      <div className="w-full max-auto max-w-[400px] bg-[#111827] border border-gray-800 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#10b981] p-2 rounded-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Note Master</h1>
          <p className="text-gray-400 text-sm mt-1">Capture your digital diary effortlessly</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full bg-[#1f2937] border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-[#10b981]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full bg-[#1f2937] border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-[#10b981]"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-between items-center text-xs px-1">
            <label className="text-gray-400 flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[#10b981]" /> Remember me
            </label>
            <Link href="#" className="text-[#10b981] hover:underline">Forgot password?</Link>
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#10b981] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}