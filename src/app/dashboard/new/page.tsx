import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NoteForm from "@/components/NoteForm";
import Link from "next/link";
import { FaChevronLeft, FaPenNib } from "react-icons/fa";

export default async function NewNotePage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-12 px-4 md:px-0">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button & Header */}
        <div className="flex items-center justify-between mb-10">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-gray-500 hover:text-emerald-500 transition-all font-bold text-xs uppercase tracking-widest"
          >
            <FaChevronLeft size={10} /> Back to Library
          </Link>
          <div className="flex items-center gap-2 text-emerald-500/50">
            <FaPenNib size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">New Entry</span>
          </div>
        </div>

        {/* Diary Interface Container */}
        <div className="bg-[#0B0F1A] border border-white/5 rounded-[2.5rem] shadow-2xl p-8 md:p-16 min-h-[70vh] relative overflow-hidden">
          
          {/* Subtle Diary Lines Background (Optional CSS effect) */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px)', backgroundSize: '100% 3rem' }}>
          </div>

          <div className="relative z-10">
            <header className="mb-12">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                Capture Your <span className="text-emerald-500">Thoughts.</span>
              </h1>
              <p className="text-gray-500 text-sm font-medium italic">
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </header>

            {/* NoteForm ko humne pass kiya hai, isme design updates niche hain */}
            <NoteForm isFullPage={true} />
          </div>
        </div>

        <p className="text-center text-gray-600 text-[10px] mt-8 font-bold uppercase tracking-widest">
          Focus Mode Active • Auto-saving enabled
        </p>
      </div>
    </div>
  );
}