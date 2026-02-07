"use client";
import { createNote } from "@/app/actions/notes";
import { useRef } from "react";

export default function NoteForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function clientAction(formData: FormData) {
    const result = await createNote(formData);
    if (result.success) {
      formRef.current?.reset(); // Form ko clear karne ke liye
    } else if (result.error) {
      alert(result.error);
    }
  }

  return (
    <form 
      ref={formRef} 
      action={clientAction} 
      className="mb-8 flex flex-col gap-3 max-w-md bg-gray-50 p-4 rounded-xl border border-gray-200"
    >
      <h3 className="font-semibold text-gray-700 mb-1">Create New Note</h3>
      
      <input 
        name="title" 
        placeholder="Note Title" 
        className="border p-2 rounded-lg text-black focus:ring-2 focus:ring-blue-400 outline-none transition" 
        required 
      />

      <input 
        name="tags" 
        placeholder="Tags (e.g. work, ideas, personal)" 
        className="border p-2 rounded-lg text-black text-sm focus:ring-2 focus:ring-blue-400 outline-none transition" 
      />

      <textarea 
        name="content" 
        placeholder="Write your note here..." 
        className="border p-2 rounded-lg text-black min-h-[100px] focus:ring-2 focus:ring-blue-400 outline-none transition" 
        required 
      />

      <button 
        type="submit" 
        className="bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm"
      >
        Save Note
      </button>
    </form>
  );
}