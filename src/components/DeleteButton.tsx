"use client"

import { deleteNote } from "@/app/actions/notes"; // Action import karein

export default function DeleteButton({ noteId }: { noteId: string }) {
  return (
    <button 
      onClick={async () => {
        if(confirm("Are you sure?")) {
            await deleteNote(noteId); // Server action call karein
        }
      }}
      className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
    >
      Delete
    </button>
  );
}