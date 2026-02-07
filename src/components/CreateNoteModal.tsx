"use client";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import NoteForm from "./NoteForm";

export default function CreateNoteModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#030712] rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10 active:scale-95"
      >
        <FaPlus size={10} /> New Note
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Blur Background */}
          <div 
            className="absolute inset-0 bg-[#030712]/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-[#0B0F1A] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-emerald-500 uppercase tracking-widest flex items-center gap-3">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                Create Note
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Aapka Purana NoteForm Yahan Kaam Karega */}
            <NoteForm /> 
            
            <p className="text-[10px] text-gray-500 mt-6 text-center uppercase tracking-tighter">
              Your thoughts are encrypted and secure.
            </p>
          </div>
        </div>
      )}
    </>
  );
}