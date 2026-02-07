import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <header className="max-w-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Note-<span className="text-blue-600">Master</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Apne vicharon ko organize karein. Ek safe aur simple jagah jaha aap 
          apne notes likh sakte hain, save kar sakte hain aur manage kar sakte hain.
        </p>

        <div className="flex gap-4 justify-center">
          {session ? (
            <Link 
              href="/dashboard" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Get Started (Signup)
              </Link>
              <Link 
                href="/login" 
                className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </header>

      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-2">📝 Easy Writing</h3>
          <p className="text-gray-500 text-sm">Bina kisi rukawat ke apne notes likhein.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-2">🔒 Secure</h3>
          <p className="text-gray-500 text-sm">Aapka data sirf aapke liye hai.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-2">🗑️ Trash Bin</h3>
          <p className="text-gray-500 text-sm">Galti se delete hua? Trash se wapas layein.</p>
        </div>
      </section>
    </div>
  );
}