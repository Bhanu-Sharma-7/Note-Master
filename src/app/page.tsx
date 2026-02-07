import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Capture Ideas. <br /> Organize Life.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Note-Master ek minimal aur powerful workspace hai jahan aap apne vicharon ko 
              safe rakh sakte hain. Aaj hi apna digital diary shuru karein.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {session ? (
                <Link 
                  href="/dashboard" 
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all"
                >
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link 
                    href="/register" 
                    className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all"
                  >
                    Start Writing for Free
                  </Link>
                  <Link 
                    href="/login" 
                    className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                  >
                    Member Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Subtle Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Fast & Fluid</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Next.js App Router ki wajah se instant loading aur smooth navigation.
              </p>
            </div>
            <div className="p-10 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🏷️</div>
              <h3 className="text-xl font-bold mb-3">Smart Tagging</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Apne notes ko tags ke saath organize karein aur turant search karein.
              </p>
            </div>
            <div className="p-10 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Secure Storage</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Aapka saara data MongoDB Atlas par safely encrypted aur stored hai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-2xl font-black mb-4 tracking-tighter">
            Note<span className="text-blue-600">.</span>Master
          </p>
          <div className="flex justify-center gap-6 mb-8 text-sm font-medium text-gray-400">
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
            <Link href="/terms" className="hover:text-blue-600">Terms</Link>
          </div>
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} Note-Master. Designed for productive minds.
          </p>
        </div>
      </footer>
    </div>
  );
}