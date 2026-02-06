"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewNotePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [noteData, setNoteData] = useState({ title: "", content: "", tag: "" });

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteData.title || !noteData.content) return;
    
    setLoading(true);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id,
          ...noteData,
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 md:p-0">
      <div className="flex justify-between items-center">
        <Link 
          href="/dashboard" 
          className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Dashboard
        </Link>
        <div className="flex gap-3">
          <button 
            onClick={handleCreateNote}
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Publish Note"}
          </button>
        </div>
      </div>

      <div className="bg-[#111622] border border-gray-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Title of your concept..."
            className="w-full bg-transparent text-3xl md:text-4xl font-bold outline-none placeholder:text-gray-700 text-white"
            value={noteData.title}
            onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
          />
          
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">Tag:</span>
            <input
              type="text"
              placeholder="e.g. Work, Ideas"
              className="bg-[#161b26] border border-gray-800 rounded-full px-4 py-1.5 text-xs outline-none focus:border-emerald-500 text-emerald-400 transition-all"
              value={noteData.tag}
              onChange={(e) => setNoteData({ ...noteData, tag: e.target.value })}
            />
          </div>

          <hr className="border-gray-800" />

          <textarea
            placeholder="Start writing your thoughts here..."
            rows={15}
            className="w-full bg-transparent text-lg outline-none placeholder:text-gray-700 text-gray-300 resize-none leading-relaxed"
            value={noteData.content}
            onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}