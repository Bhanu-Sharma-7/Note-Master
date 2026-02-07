import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import User from "@/models/User";
import { FaUserShield, FaCloud, FaCalendarAlt, FaChevronLeft, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  await connectToDatabase();

  // 1. Robust ID Logic (BSON Fix preserved)
  let userId = (session.user as any).id;
  if (!userId && session.user.email) {
    const dbUser = await User.findOne({ email: session.user.email }).select("_id");
    userId = dbUser?._id;
  }

  if (!userId) redirect("/login");

  // 2. Stats calculation
  const totalNotes = await Note.countDocuments({ userId, isTrash: false });
  const trashedNotes = await Note.countDocuments({ userId, isTrash: true });
  
  const avatarLetter = session.user.name ? session.user.name[0].toUpperCase() : "?";

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-12 px-6 overflow-hidden relative">
      
      {/* --- Aesthetic Background Glows --- */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* --- Top Navigation --- */}
        <div className="mb-12">
          <Link 
            href="/dashboard" 
            className="group inline-flex items-center gap-2 text-gray-500 hover:text-emerald-500 transition-all text-[11px] font-black uppercase tracking-[0.4em]"
          >
            <FaChevronLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </Link>
        </div>

        {/* --- Profile Card Container --- */}
        <div className="bg-[#0B0F1A] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl relative">
          
          {/* Header Banner with Gradient */}
          <div className="h-48 bg-gradient-to-r from-emerald-600/20 via-blue-600/20 to-purple-600/20 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          </div>

          <div className="px-8 md:px-12 pb-12">
            {/* Avatar & Basic Info */}
            <div className="relative -mt-16 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                <div className="w-32 h-32 bg-[#111827] rounded-[2.5rem] border-[6px] border-[#0B0F1A] shadow-2xl flex items-center justify-center text-5xl font-black text-emerald-500 relative group overflow-hidden">
                   <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   {avatarLetter}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-black text-white tracking-tight">{session.user.name}</h1>
                  <p className="text-gray-500 font-medium">{session.user.email}</p>
                </div>
              </div>
              
              <button className="px-6 py-3 bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 border border-white/5 rounded-2xl transition-all flex items-center gap-3 text-xs font-black uppercase tracking-widest active:scale-95">
                <FaSignOutAlt /> Log Out
              </button>
            </div>

            {/* --- Stats Display --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="group p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-[2.5rem] hover:border-emerald-500/30 transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                    <FaCloud size={20} />
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Storage</span>
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Notes</p>
                <p className="text-5xl font-black text-white group-hover:scale-110 transition-transform origin-left duration-500">{totalNotes}</p>
              </div>

              <div className="group p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-[2.5rem] hover:border-rose-500/30 transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
                    <FaCalendarAlt size={20} />
                  </div>
                  <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Marked for Purge</span>
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Trash Count</p>
                <p className="text-5xl font-black text-white group-hover:scale-110 transition-transform origin-left duration-500">{trashedNotes}</p>
              </div>
            </div>

            {/* --- Account Details Section --- */}
            <div className="mt-12 space-y-4">
               <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-6">Security & Identity</h3>
               
               <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-4">
                      <FaUserShield className="text-blue-500" />
                      <span className="text-sm font-bold text-gray-400">Account Status</span>
                    </div>
                    <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-tighter border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      Verified Member
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-4">
                      <FaCloud className="text-purple-500" />
                      <span className="text-sm font-bold text-gray-400">Database Sync</span>
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-widest">Standard Tier</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* --- Footer Signature --- */}
        <div className="mt-16 text-center">
          <div className="inline-block h-px w-24 bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-6"></div>
          <p className="text-[10px] font-black text-gray-700 uppercase tracking-[1em] mb-2">Note-Master Terminal</p>
          <p className="text-[9px] font-medium text-gray-800 tracking-widest italic">Personal Diary v1.0 • All Rights Reserved 2026</p>
        </div>

      </div>
    </div>
  );
}