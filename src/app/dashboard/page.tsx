"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(`/api/notes?userId=${session?.user?.id}`);
        if (res.ok) {
          const data = await res.json();
          setNotes(data);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [session]);

  const stats = [
    { label: "Total Notes", value: "1,284", iconColor: "text-emerald-400", bg: "bg-emerald-500/10", badge: "+12%" },
    { label: "Notebooks", value: "14", iconColor: "text-blue-400", bg: "bg-blue-500/10", badge: "Active" },
    { label: "Favorites", value: "128", iconColor: "text-orange-400", bg: "bg-orange-500/10", badge: "8 total" },
    { label: "Cloud Usage", value: "4.2 GB", iconColor: "text-purple-400", bg: "bg-purple-500/10", badge: "Synced" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* 4 Premium Stat Cards - Exact 3.jpg replica */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#111622] border border-white/[0.03] p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-white/[0.1] transition-all">
            <div className="flex justify-between items-start mb-8">
              <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.iconColor}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9h18"/><path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9"/><path d="m3 9 2.45-4.91A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.09L21 9"/></svg>
              </div>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${i === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {stat.badge}
              </span>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.15em] mb-1">{stat.label}</p>
            <h3 className="text-4xl font-black text-white tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Section Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Recent Notes</h2>
          <p className="text-gray-500 text-sm font-bold mt-1">Manage your digital brain effortlessly.</p>
        </div>
        <div className="flex bg-[#111622] p-1.5 rounded-2xl border border-white/[0.03]">
          <button className="p-2.5 text-white bg-[#1c2333] rounded-xl shadow-xl border border-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          </button>
          <button className="p-2.5 text-gray-600 hover:text-gray-400 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      {/* Notes Grid: 3.jpg Masonry Style */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {notes.map((note: any) => (
          <Link 
            href={`/dashboard/edit/${note._id}`} 
            key={note._id} 
            className="block bg-[#111622] border border-white/[0.03] p-10 rounded-[2.8rem] hover:border-emerald-500/40 transition-all group break-inside-avoid shadow-2xl relative overflow-hidden"
          >
            {/* Tag Badges */}
            <div className="flex gap-2 mb-8">
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-3.5 py-1.5 rounded-lg font-black uppercase tracking-widest border border-blue-500/10">
                {note.tag || "GENERAL"}
              </span>
            </div>
            
            <h3 className="text-2xl font-black text-white mb-5 leading-[1.2] group-hover:text-emerald-400 transition-colors tracking-tight">
              {note.title}
            </h3>
            
            <p className="text-gray-500 text-[15px] font-medium leading-relaxed mb-10 line-clamp-4">
              {note.content}
            </p>
            
            <div className="flex items-center justify-between pt-8 border-t border-white/[0.03]">
              <span className="text-[11px] text-gray-600 font-black uppercase tracking-widest">
                {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <div className="text-gray-700 group-hover:text-emerald-400 transition-all transform group-hover:translate-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}