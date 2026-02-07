import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import MoveToTrashButton from "@/components/MoveToTrashButton";
import EditNoteModal from "@/components/EditNoteModal";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import User from "@/models/User";
import { 
  FaSearch, FaStickyNote, FaFolder, FaStar, 
  FaCloud, FaChevronRight, FaRegClock, FaPlus, FaThLarge 
} from "react-icons/fa";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Dashboard({ searchParams }: Props) {
  const sParams = await searchParams;
  const query = sParams.q || "";
  const session = await getServerSession();
  
  // 1. Session check
  if (!session || !session.user) redirect("/login");

  await connectToDatabase();

  // 2. User ID robust logic (BSON Error fix)
  let userId = (session.user as any).id;
  if (!userId && session.user.email) {
    const dbUser = await User.findOne({ email: session.user.email }).select("_id");
    userId = dbUser?._id.toString();
  }

  if (!userId) redirect("/login");

  // 3. Notes fetch logic (isTrash: false)
  const notes = await Note.find({ 
    userId, 
    isTrash: false, 
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } }
    ]
  }).sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-[#030712] text-white flex pt-16">
      
      {/* --- SIDEBAR (Fixed & Clean Design) --- */}
      <aside className="w-64 border-r border-white/5 bg-[#0B0F1A] p-5 hidden lg:flex flex-col gap-8 fixed left-0 h-[calc(100vh-64px)] overflow-y-auto">
        <nav className="flex flex-col gap-1.5">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-3 mb-2">Main Menu</p>
          <button className="flex items-center justify-between px-4 py-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl text-[13px] font-bold">
            <span className="flex items-center gap-3"><FaThLarge size={14} /> Dashboard</span>
            <FaChevronRight size={10} className="opacity-50" />
          </button>
          <button className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:bg-white/5 rounded-xl text-[13px] font-medium transition-all group">
            <FaStickyNote className="group-hover:text-emerald-500" /> All Notes
          </button>
        </nav>

        <div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-3 mb-2">Recent Folders</p>
          <div className="flex flex-col gap-1 text-[13px] text-gray-400 px-3">
             <span className="py-1 hover:text-emerald-500 cursor-pointer transition-colors flex items-center gap-2"># Personal Diary</span>
             <span className="py-1 hover:text-emerald-500 cursor-pointer transition-colors flex items-center gap-2"># Work Projects</span>
          </div>
        </div>

        {/* Upgrade Card */}
        <div className="mt-auto p-4 bg-gradient-to-br from-emerald-500/10 to-transparent border border-white/5 rounded-2xl">
          <p className="text-[11px] font-bold text-emerald-400 mb-1 tracking-widest">PRO PLAN</p>
          <p className="text-[10px] text-gray-500 mb-3 leading-tight">Unlimited storage & encrypted notes.</p>
          <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-[#030712] text-[11px] font-black rounded-lg transition-all shadow-lg shadow-emerald-500/10">
            Upgrade Now
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-0 lg:ml-64 p-5 md:p-8">
        
        {/* Top Header: Search & Full-Page New Note Link */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-xl group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors text-xs" />
            <form action="/dashboard" method="GET">
              <input 
                name="q" 
                defaultValue={query}
                placeholder="Search your digital diary..." 
                className="w-full pl-11 pr-4 py-2.5 bg-[#111827] border border-white/5 rounded-xl outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all text-[13px]"
              />
            </form>
          </div>

          {/* New Note Button -> Full Page Redirect */}
          <Link 
            href="/dashboard/new"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#030712] rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10 active:scale-95"
          >
             <FaPlus size={10} /> New Note
          </Link>
        </div>

        {/* Stats Grid (Image 3 exact look) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Notes", val: notes.length, icon: <FaStickyNote />, color: "emerald", trend: "+12%" },
            { label: "Notebooks", val: "14", icon: <FaFolder />, color: "blue", trend: "Active" },
            { label: "Favorites", val: "128", icon: <FaStar />, color: "orange", trend: "8 total" },
            { label: "Cloud Usage", val: "4.2 GB", icon: <FaCloud />, color: "purple", trend: "Synced" },
          ].map((stat, i) => (
            <div key={i} className="p-5 bg-[#111827]/60 border border-white/5 rounded-[1.5rem] relative group hover:bg-[#111827] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-500 text-sm`}>
                  {stat.icon}
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-${stat.color}-500/10 text-${stat.color}-500 uppercase tracking-tighter`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black mt-1">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Notes Grid (Masonry Design) */}
        <div className="flex items-center justify-between mb-6 px-1">
           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Recent Notes</h2>
           <div className="flex gap-4 text-gray-600">
              <FaThLarge size={14} className="text-emerald-500" />
           </div>
        </div>

        {notes.length === 0 ? (
          <div className="py-24 bg-[#111827]/20 rounded-[2.5rem] border border-dashed border-white/5 text-center">
            <p className="text-gray-500 text-sm italic">No thoughts captured yet. Tap "New Note" to write.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
            {notes.map((note) => (
              <div key={note._id.toString()} className="break-inside-avoid bg-[#111827] p-6 rounded-[1.8rem] border border-white/[0.05] hover:border-emerald-500/30 transition-all group relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg">Diary Entry</span>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <EditNoteModal note={JSON.parse(JSON.stringify(note))} />
                  </div>
                </div>

                <h2 className="font-bold text-base text-gray-100 mb-3 leading-tight group-hover:text-emerald-400 transition-colors">
                  {note.title}
                </h2>
                <p className="text-gray-400 text-[13px] leading-relaxed mb-6 whitespace-pre-wrap line-clamp-[12]">
                  {note.content}
                </p>
                
                <div className="flex justify-between items-center pt-5 border-t border-white/5">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                    <FaRegClock size={10} /> {new Date(note.createdAt).toLocaleDateString('en-GB')}
                  </span>
                  <MoveToTrashButton noteId={note._id.toString()} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}