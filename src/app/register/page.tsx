"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black tracking-tighter text-gray-900">
            Note<span className="text-blue-600">.</span>Master
          </Link>
          <p className="text-gray-500 mt-2 font-medium text-sm">Join us and start organizing your thoughts today.</p>
        </div>

        {/* Register Card */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              {loading ? "Creating Account..." : "Create Free Account"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                Login Here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-xs text-gray-400 font-medium italic">
          By signing up, you agree to our Terms and Conditions.
        </p>
      </div>
    </div>
  );
}