"use client";

import { useState } from "react";
import { createNote } from "@/lib/actions"; // Aapka server action
import { FaSave, FaFeather, FaBookOpen, FaSpinner } from "react-icons/fa";

interface NoteFormProps {
  isFullPage?: boolean;
}

export default function NoteForm({ isFullPage = false }: NoteFormProps) {
  const [pending, setPending] = useState(false);

  // Server Action ko handle karne ke liye function
  async function handleFormAction(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title.trim() || !content.trim()) {
      alert("Bhai, Title aur Content likhna zaroori hai!");
      return;
    }

    setPending(true);
    
    try {
      const result = await createNote(formData);
      if (result?.error) {
        alert("Error: " + result.error);
        setPending(false);
      }
      // Note: Success hone par 'createNote' action khud redirect kar dega
    } catch (err) {
      console.error("Client-side error:", err);
      setPending(false);
    }
  }

  return (
    <form action={handleFormAction} className="flex flex-col gap-6">
      
      {/* --- Title Input --- */}
      <div className="relative group">
        <input
          name="title"
          type="text"
          placeholder="Give your thought a title..."
          autoFocus={isFullPage}
          className={`w-full bg-transparent border-none outline-none font-black text-white placeholder:text-gray-800 tracking-tight transition-all ${
            isFullPage ? "text-3xl md:text-5xl mb-2" : "text-xl mb-1"
          }`}
          required
        />
        <div className="h-[2px] w-0 group-focus-within:w-full bg-emerald-500/40 transition-all duration-700 mt-2"></div>
      </div>

      {/* --- Content Area (Diary Feel) --- */}
      <div className="relative min-h-[400px] md:min-h-[500px]">
        {/* Diary Lines Background Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.04]" 
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px)', 
            backgroundSize: '100% 3.5rem',
            marginTop: '0.5rem' 
          }}
        ></div>

        <textarea
          name="content"
          placeholder="Start writing your story here..."
          className={`w-full bg-transparent border-none outline-none text-gray-300 placeholder:text-gray-800 min-h-[400px] md:min-h-[500px] leading-[3.5rem] resize-none relative z-10 scrollbar-hide ${
            isFullPage ? "text-lg md:text-xl" : "text-base"
          }`}
          required
        />
      </div>

      {/* --- Action Footer --- */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 gap-6 mt-4">
        <div className="flex items-center gap-5 text-gray-600">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            <FaFeather size={12} className="text-emerald-500" /> 
            <span>Ink Mode</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            <FaBookOpen size={12} className="text-blue-500" /> 
            <span>Draft Saved</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full md:w-auto px-12 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#030712] font-black rounded-[1.5rem] transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {pending ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Etching Thoughts...</span>
            </>
          ) : (
            <>
              <FaSave className="group-hover:translate-y-[-2px] transition-transform" /> 
              <span>Close & Save Entry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}