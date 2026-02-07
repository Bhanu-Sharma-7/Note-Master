import Link from "next/link";
import { getServerSession } from "next-auth";
import { FaBook, FaCheckCircle, FaSearch, FaSync, FaChartLine } from "react-icons/fa";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] text-gray-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-5%] left-[15%] w-[30%] h-[30%] bg-emerald-500/5 blur-[100px] rounded-full hidden dark:block"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-6 animate-fade-in">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            AI Insights 2.0
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15]">
            Capture your <span className="text-emerald-500 italic">thoughts</span>, <br className="hidden md:block" />
            elevate your life.
          </h1>
          
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed font-medium">
            A high-fidelity digital diary for deep thinkers. 
            Organize, encrypt, and rediscover your personal journey effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {session ? (
              <Link 
                href="/dashboard" 
                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-[#030712] rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/10 active:scale-95 text-sm"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link 
                  href="/register" 
                  className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-[#030712] rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/10 active:scale-95 text-sm"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/login" 
                  className="px-8 py-3.5 bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-[#1F2937] transition-all text-sm"
                >
                  Watch Demo
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="py-14 bg-gray-50/50 dark:bg-[#070B14]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Feature Deep-Dive</h2>
            <p className="text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold">Precision tools for digital memory</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 bg-white dark:bg-[#111827] rounded-[1.8rem] border border-gray-100 dark:border-white/[0.05] hover:border-emerald-500/20 transition-all group shadow-sm">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5 text-emerald-500">
                <FaSearch size={16} />
              </div>
              <h3 className="text-lg font-bold mb-3">Semantic Search</h3>
              <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed">
                Context-aware AI search that finds thoughts by concept, not just keywords.
              </p>
            </div>

            <div className="p-7 bg-white dark:bg-[#111827] rounded-[1.8rem] border border-gray-100 dark:border-white/[0.05] hover:border-blue-500/20 transition-all group shadow-sm">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5 text-blue-500">
                <FaSync size={16} />
              </div>
              <h3 className="text-lg font-bold mb-3">Seamless Sync</h3>
              <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed">
                Access your diary anywhere, anytime. Works perfectly even offline.
              </p>
            </div>

            <div className="p-7 bg-white dark:bg-[#111827] rounded-[1.8rem] border border-gray-100 dark:border-white/[0.05] hover:border-purple-500/20 transition-all group shadow-sm">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center mb-5 text-purple-500">
                <FaChartLine size={16} />
              </div>
              <h3 className="text-lg font-bold mb-3">Mood Analytics</h3>
              <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed">
                Visualize emotional patterns and track your productivity trends easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA (Conditional) --- */}
      {!session && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-emerald-600 dark:bg-emerald-500 py-12 px-8 md:py-16 md:px-12 rounded-[2.5rem] text-center text-white relative overflow-hidden shadow-xl shadow-emerald-500/10">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Start your legacy today.</h2>
                <p className="text-emerald-100 mb-8 text-sm max-w-md mx-auto opacity-90 leading-relaxed">
                  Join thousands mastering their internal world. <br /> Risk-free 14-day trial.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/register" className="px-8 py-3.5 bg-white text-emerald-600 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-all shadow-lg active:scale-95">
                    Create Account
                  </Link>
                  <Link href="#" className="px-8 py-3.5 bg-emerald-700/30 backdrop-blur-md text-white border border-emerald-400/30 rounded-xl font-bold text-sm hover:bg-emerald-700/50 transition-all active:scale-95">
                    View Pricing
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 blur-[40px] rounded-full"></div>
            </div>
          </div>
        </section>
      )}

      {/* --- MINIMAL FOOTER --- */}
      <footer className="py-10 text-center border-t border-gray-100 dark:border-white/[0.05]">
        <div className="flex justify-center items-center gap-2 mb-3">
          <FaBook className="text-emerald-500 text-sm" />
          <span className="font-bold text-sm tracking-tight">Note Master</span>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-bold">
          Focus • Privacy • Security
        </p>
      </footer>
    </div>
  );
}