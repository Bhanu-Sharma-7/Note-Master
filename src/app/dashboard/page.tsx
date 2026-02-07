import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NoteForm from "@/components/NoteForm";
import DeleteButton from "@/components/DeleteButton";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const query = searchParams.q || "";
  const userId = (session.user as any).id || session.user?.email;

  await connectToDatabase();
  
  const notes = await Note.find({ 
    userId,
    isTrash: false,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
      { tags: { $in: [new RegExp(query, "i")] } }
    ]
  }).sort({ createdAt: -1 });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Search Section */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Your Workspace
        </h1>
        <form action="/dashboard" method="GET" className="relative group">
          <input 
            name="q" 
            defaultValue={query}
            placeholder="Search notes, ideas, or #tags..." 
            className="w-full p-4 pl-6 pr-12 border-2 border-gray-200 rounded-2xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 bg-white"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500">
            🔍
          </div>
        </form>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Form (Sticky) */}
        <aside className="lg:col-span-4 h-fit lg:sticky lg:top-24">
          <NoteForm />
        </aside>

        {/* Right Side: Notes List */}
        <div className="lg:col-span-8">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-inner">
              <span className="text-5xl mb-4">✍️</span>
              <p className="text-gray-500 font-medium">
                {query ? `No results for "${query}"` : "Nothing here yet. Write your heart out!"}
              </p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {notes.map((note) => (
                <div 
                  key={note._id.toString()} 
                  className="break-inside-avoid flex flex-col justify-between p-6 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Subtle Accent Bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div>
                    <h2 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {note.title}
                    </h2>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags && note.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold uppercase tracking-tighter">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                      {new Date(note.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                    <DeleteButton noteId={note._id.toString()} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}