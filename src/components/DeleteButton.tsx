"use client";
import { moveToTrash } from "@/app/actions/notes";

export default function DeleteButton({ noteId }: { noteId: string }) {
  return (
    <button 
      onClick={async () => {
        if (confirm("Kya aap is note ko trash mein bhejna chahte hain?")) {
          await moveToTrash(noteId);
        }
      }}
      className="text-red-500 hover:text-red-700 text-sm font-medium"
    >
      Delete
    </button>
  );
}