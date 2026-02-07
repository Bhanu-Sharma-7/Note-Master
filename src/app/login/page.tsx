"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      alert("Invalid Email or Password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black tracking-tighter text-gray-900">
            Note<span className="text-blue-600">.</span>Master
          </Link>
          <p className="text-gray-500 mt-2 font-medium text-sm">Welcome back! Please enter your details.</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Login to Account"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-sm text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Support Links */}
        <p className="mt-8 text-center text-xs text-gray-400 font-medium">
          Protected by AES-256 Encryption
        </p>
      </div>
    </div>
  );
}