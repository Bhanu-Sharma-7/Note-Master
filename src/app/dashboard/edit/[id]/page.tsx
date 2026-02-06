"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [noteData, setNoteData] = useState({ title: "", content: "", tag: "" });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`/api/notes/${id}`);
        if (res.ok) {
          const data = await res.json();
          setNoteData({
            title: data.title || "",
            content: data.content || "",
            tag: data.tag || ""
          });
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
      });
      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error("Update Error:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="text-emerald-500 font-black tracking-[0.4em] animate-pulse">SYNCING DATA...</div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-6 animate-in fade-in zoom-in-95 duration-500">
      {/* Header with Navigation & Action */}
      <div className="flex justify-between items-center">
        <Link href="/dashboard" className="group flex items-center gap-3 text-gray-500 hover:text-white transition-all">
          <div className="bg-[#111622] p-2.5 rounded-xl border border-white/5 group-hover:border-white/10 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <span className="text-[11px] font-black tracking-widest uppercase">Discard Changes</span>
        </Link>
        
        <button 
          onClick={handleUpdate}
          disabled={saving}
          className="bg-[#10b981] hover:bg-[#059669] text-white px-10 py-3.5 rounded-2xl font-black text-xs tracking-[0.2em] shadow-xl shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {saving ? "SAVING..." : "PUBLISH UPDATE"}
        </button>
      </div>

      {/* Premium Editor Container */}
      <div className="bg-[#111622] border border-white/[0.05] rounded-[3rem] p-8 md:p-16 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Glow Effect like 3.jpg */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/[0.03] blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 space-y-10">
          {/* Title Input */}
          <input
            className="w-full bg-transparent text-5xl md:text-7xl font-black outline-none text-white placeholder:text-gray-800 tracking-tighter leading-tight"
            value={noteData.title}
            onChange={(e) => setNoteData({...noteData, title: e.target.value})}
            placeholder="Untitled Concept"
          />

          {/* Tag Metadata Section */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-2xl px-5 py-3">
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Tag:</span>
              <input
                className="bg-transparent text-xs text-emerald-400 outline-none font-black uppercase tracking-widest w-32"
                value={noteData.tag}
                onChange={(e) => setNoteData({...noteData, tag: e.target.value})}
                placeholder="CATEGORY"
              />
            </div>
            <div className="h-1 w-1 rounded-full bg-gray-800"></div>
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Auto-saved to cloud</span>
          </div>

          <div className="h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>

          {/* Content Area */}
          <textarea
            className="w-full bg-transparent text-xl outline-none text-gray-400 min-h-[500px] resize-none leading-relaxed font-medium placeholder:text-gray-800"
            value={noteData.content}
            onChange={(e) => setNoteData({...noteData, content: e.target.value})}
            placeholder="Start drafting your masterpiece..."
          />
        </div>
      </div>
    </div>
  );
}