import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import Link from "next/link";
// Hum niche naye components banayenge
import TrashActions from "@/components/TrashActions";

export default async function TrashPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  await connectToDatabase();
  const trashedNotes = await Note.find({ 
    userId: (session.user as any).id || session.user?.email, 
    isTrash: true 
  }).sort({ updatedAt: -1 });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-red-600">Trash Bin</h1>
        <Link href="/dashboard" className="text-blue-500 hover:underline">← Back to Dashboard</Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trashedNotes.length === 0 ? (
          <p className="text-gray-500 italic col-span-full text-center">Trash khali hai.</p>
        ) : (
          trashedNotes.map((note) => (
            <div key={note._id.toString()} className="p-5 rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
              <h2 className="font-bold text-xl text-gray-700">{note.title}</h2>
              <p className="text-gray-500 text-sm mt-2 line-clamp-3">{note.content}</p>
              
              <div className="mt-6 pt-4 border-t flex justify-between gap-2">
                {/* Is component mein Restore aur Delete buttons honge */}
                <TrashActions noteId={note._id.toString()} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}