import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NoteForm from "@/components/NoteForm";
import MoveToTrashButton from "@/components/MoveToTrashButton"; // Naya button import kiya
import EditNoteModal from "@/components/EditNoteModal";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import User from "@/models/User";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Dashboard({ searchParams }: Props) {
  const sParams = await searchParams;
  const query = sParams.q || "";
  const session = await getServerSession();
  
  // 1. Session check
  if (!session || !session.user) redirect("/login");

  await connectToDatabase();

  // 2. User ID nikalne ka robust tarika (BSON Error fix)
  let userId = (session.user as any).id;
  if (!userId && session.user.email) {
    const dbUser = await User.findOne({ email: session.user.email }).select("_id");
    userId = dbUser?._id.toString();
  }

  if (!userId) redirect("/login");

  // 3. Notes fetch karna (isTrash: false wale notes hi yahan dikhenge)
  const notes = await Note.find({ 
    userId, 
    isTrash: false, // Jo trash mein nahi hain sirf wahi dashboard par dikhao
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } }
    ]
  }).sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        
        {/* Header aur Search Bar */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
            My <span className="text-blue-600">Notes</span>
          </h1>
          <div className="max-w-xl mx-auto relative">
            <form action="/dashboard" method="GET">
              <input 
                name="q" 
                defaultValue={query}
                placeholder="Search your thoughts..." 
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </form>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form Section */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
            <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                New Note
              </h2>
              <NoteForm />
            </div>
          </aside>

          {/* Right Column: Notes List */}
          <main className="lg:col-span-8">
            {notes.length === 0 ? (
              <div className="py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-center">
                <h3 className="text-xl font-semibold text-gray-400">Yahan koi notes nahi hain.</h3>
              </div>
            ) : (
              <div className="columns-1 md:columns-2 gap-6 space-y-6">
                {notes.map((note) => (
                  <div key={note._id.toString()} className="break-inside-avoid bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h2 className="font-bold text-lg text-gray-800 mb-2">{note.title}</h2>
                    <p className="text-gray-600 text-sm mb-6 whitespace-pre-wrap">{note.content}</p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        {new Date(note.createdAt).toLocaleDateString('en-GB')}
                      </span>
                      
                      <div className="flex items-center gap-4">
                        {/* 1. Edit Option */}
                        <EditNoteModal note={JSON.parse(JSON.stringify(note))} />
                        
                        {/* 2. Trash Option (Move to Trash) */}
                        <MoveToTrashButton noteId={note._id.toString()} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}