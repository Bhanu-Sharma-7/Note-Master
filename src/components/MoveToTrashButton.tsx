"use client";

import { moveToTrash } from "@/app/actions/notes";
import { useState } from "react";

export default function MoveToTrashButton({ noteId }: { noteId: string }) {
  const [loading, setLoading] = useState(false);

  const handleTrash = async () => {
    if (confirm("Kya aap is note ko Trash mein daalna chahte hain?")) {
      setLoading(true);
      await moveToTrash(noteId);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleTrash}
      disabled={loading}
      className="text-orange-500 hover:text-orange-700 text-sm font-semibold transition-colors disabled:opacity-50"
    >
      {loading ? "Moving..." : "Trash"}
    </button>
  );
}