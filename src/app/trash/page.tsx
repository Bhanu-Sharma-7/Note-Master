import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import User from "@/models/User";
import TrashActions from "@/components/TrashActions";

export default async function TrashPage() {
  const session = await getServerSession();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  await connectToDatabase();

  // 1. Robust ID Logic (BSON Error Fix)
  let userId = (session.user as any).id;

  // Agar session mein ID nahi hai, toh email se database se nikaalein
  if (!userId && session.user.email) {
    const dbUser = await User.findOne({ email: session.user.email }).select("_id");
    userId = dbUser?._id;
  }

  // Final check agar abhi bhi ID nahi mili
  if (!userId) {
    redirect("/login");
  }

  // 2. Sirf wahi notes jo is user ke hain aur trash mein hain
  const trashedNotes = await Note.find({ 
    userId, 
    isTrash: true 
  }).sort({ updatedAt: -1 });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="p-2 bg-red-100 rounded-lg text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </span>
            Trash Bin
          </h1>
          <p className="text-gray-500 mt-2">Yahan aapke delete kiye huye notes 30 din tak rehte hain (Coming soon feature).</p>
        </header>

        {trashedNotes.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg font-medium">Trash khali hai!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trashedNotes.map((note) => (
              <div key={note._id.toString()} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">{note.title}</h2>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">{note.content}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Deleted
                  </span>
                  {/* Yahan hamare TrashActions kaam karenge */}
                  <TrashActions noteId={note._id.toString()} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}