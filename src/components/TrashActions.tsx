"use client";

import { restoreNote, deletePermanently } from "@/app/actions/notes";

export default function TrashActions({ noteId }: { noteId: string }) {
  return (
    <div className="flex gap-4">
      <button
        onClick={async () => await restoreNote(noteId)}
        className="text-green-600 hover:text-green-800 text-sm font-semibold"
      >
        Restore
      </button>
      <button
        onClick={async () => {
          if (confirm("Hamesha ke liye delete kar dein? Ye wapas nahi aayega!")) {
            await deletePermanently(noteId);
          }
        }}
        className="text-red-600 hover:text-red-800 text-sm font-semibold"
      >
        Delete Permanently
      </button>
    </div>
  );
}