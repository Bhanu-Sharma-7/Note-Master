"use client";

import { useState } from "react";
import { updateNote } from "@/app/actions/notes";

interface Note {
  _id: string;
  title: string;
  content: string;
}

export default function EditNoteModal({ note }: { note: Note }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await updateNote(note._id, formData);
    setLoading(false);
    
    if (result?.success) {
      setIsOpen(false); // Update hone ke baad modal band kar dein
    } else {
      alert("Kuch gadbad ho gayi: " + result?.error);
    }
  }

  return (
    <>
      {/* Edit Button jo har Note Card par dikhega */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors"
      >
        Edit
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Edit Note</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form action={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  name="title"
                  defaultValue={note.title}
                  required
                  className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  name="content"
                  defaultValue={note.content}
                  required
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}