"use client";
import { restoreNote, deletePermanently } from "@/app/actions/notes";

export default function TrashActions({ noteId }: { noteId: string }) {
  return (
    <div className="flex w-full justify-between">
      <button 
        onClick={() => restoreNote(noteId)}
        className="text-green-600 hover:text-green-800 text-sm font-semibold"
      >
        Restore
      </button>
      <button 
        onClick={() => {
          if(confirm("Hamesha ke liye delete karein?")) deletePermanently(noteId)
        }}
        className="text-red-600 hover:text-red-800 text-sm font-semibold"
      >
        Delete Forever
      </button>
    </div>
  );
}