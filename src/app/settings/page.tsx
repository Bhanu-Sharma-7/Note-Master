"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FaSignOutAlt, FaMoon, FaLanguage, FaTrashRestore, FaShieldAlt, FaChevronLeft, FaCheck } from "react-icons/fa";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pt-28 pb-20 px-6 relative overflow-hidden">
      
      {/* --- Aesthetic Background Glows --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.4em] mb-4 group"
            >
              <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Library
            </Link>
            <h1 className="text-5xl font-black tracking-tighter text-white">
              Settings<span className="text-purple-500">.</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">Config & Security Terminal</p>
          </div>

          <Link 
            href="/dashboard" 
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#030712] rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/10 active:scale-95 flex items-center gap-2"
          >
            <FaCheck /> Save & Close
          </Link>
        </header>

        <div className="space-y-8">
          
          {/* --- Account Session Section --- */}
          <section className="bg-[#0B0F1A] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/[0.02] blur-3xl rounded-full"></div>
            
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gray-800"></span> 01. Session Identity
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
              <div className="flex items-center gap-5 text-center md:text-left">
                <div className="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                  <FaShieldAlt />
                </div>
                <div>
                  <p className="font-bold text-lg text-white">Active Session</p>
                  <p className="text-xs text-gray-500 italic">Manage your current authentication state</p>
                </div>
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full md:w-auto px-8 py-4 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 border border-rose-500/20 shadow-lg"
              >
                <FaSignOutAlt /> Terminate Session
              </button>
            </div>
          </section>

          {/* --- Preferences Section --- */}
          <section className="bg-[#0B0F1A] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gray-800"></span> 02. Preferences
            </h2>

            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                    <FaMoon />
                  </div>
                  <p className="font-bold text-gray-300 group-hover:text-white transition-colors">Visual Theme (Dark)</p>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative flex items-center px-1 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <div className="w-4 h-4 bg-[#030712] rounded-full ml-auto"></div>
                </div>
              </div>

              {/* Language Settings */}
              <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl opacity-60 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl">
                    <FaLanguage size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-300">System Language</p>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Default: Hinglish</p>
                  </div>
                </div>
                <span className="text-[9px] font-black text-blue-500 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-widest">Coming Soon</span>
              </div>
            </div>
          </section>

          {/* --- Danger Zone --- */}
          <section className="bg-rose-500/[0.02] border border-rose-500/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500/50 mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-rose-500/20"></span> 03. Danger Zone
            </h2>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xl font-black text-rose-500 tracking-tight">Erase Identity</p>
                <p className="text-xs text-gray-500 max-w-md leading-relaxed">
                  Aapka saara data, notes aur memories hamesha ke liye server se delete kar di jayengi. Ye action <span className="text-rose-500 font-bold italic">irreversible</span> hai.
                </p>
              </div>
              <button 
                disabled
                className="px-10 py-4 bg-white/[0.03] text-rose-500/30 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border border-white/5 cursor-not-allowed group-hover:border-rose-500/10 transition-all"
              >
                Delete Account Forever
              </button>
            </div>
          </section>
        </div>

        {/* --- Footer Signature --- */}
        <footer className="mt-20 text-center space-y-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto"></div>
          <p className="text-[10px] font-black text-gray-700 uppercase tracking-[1.2em]">Note-Master Core</p>
          <p className="text-[9px] text-gray-800 font-medium tracking-widest italic">V 1.0.0 • Distributed Ledger Security Enabled</p>
        </footer>

      </div>
    </div>
  );
}