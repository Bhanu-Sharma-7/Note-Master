import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import User from "@/models/User";
import TrashActions from "@/components/TrashActions";
import { FaTrashAlt, FaCalendarAlt } from "react-icons/fa";

export default async function TrashPage() {
  const session = await getServerSession();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  await connectToDatabase();

  // 1. Robust ID Logic (Aapka BSON Error Fix)
  let userId = (session.user as any).id;
  if (!userId && session.user.email) {
    const dbUser = await User.findOne({ email: session.user.email }).select("_id");
    userId = dbUser?._id;
  }

  if (!userId) {
    redirect("/login");
  }

  // 2. Fetch Trashed Notes
  const trashedNotes = await Note.find({ 
    userId, 
    isTrash: true 
  }).sort({ updatedAt: -1 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0A0F1A] to-[#030712] text-white">
      {/* Navbar Space - Important Fix */}
      <div className="h-16"></div> {/* This creates space for fixed navbar */}
      
      <div className="px-4 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Clean Header Section - Adjusted spacing */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/5 rounded-xl border border-rose-500/20">
                <FaTrashAlt size={24} className="text-rose-400" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-white">Recycle Bin</h1>
                <p className="text-gray-400 text-sm mt-1">
                  {trashedNotes.length} deleted item{trashedNotes.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {trashedNotes.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-32">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500/5 to-rose-600/5 rounded-full flex items-center justify-center border border-dashed border-rose-500/20 mb-6">
                  <FaTrashAlt size={28} className="text-rose-500/40" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">Recycle Bin Empty</h3>
                <p className="text-gray-400 text-center max-w-md">
                  No deleted notes found
                </p>
              </div>
            ) : (
              /* Notes Grid - Clean Cards */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {trashedNotes.map((note) => (
                  <div 
                    key={note._id.toString()} 
                    className="group"
                  >
                    {/* Note Card */}
                    <div className="h-full bg-white/5 rounded-xl border border-white/10 hover:border-rose-500/20 transition-all duration-300 overflow-hidden flex flex-col">
                      
                      {/* Card Header */}
                      <div className="p-5 flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <span className="px-2 py-1 bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider rounded">
                            ARCHIVED
                          </span>
                        </div>
                        
                        {/* Note Title */}
                        <h3 className="font-bold text-lg text-white mb-3 truncate">
                          {note.title || "Untitled Note"}
                        </h3>
                        
                        {/* Note Content Preview */}
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 italic mb-5">
                          {note.content || "No content"}
                        </p>
                      </div>
                      
                      {/* Card Footer */}
                      <div className="p-4 border-t border-white/10 bg-white/2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt size={12} className="text-gray-500" />
                            <span className="text-sm text-gray-300 font-medium">
                              {new Date(note.updatedAt).toLocaleDateString('en-GB', { 
                                day: 'numeric', 
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center gap-1">
                            <TrashActions noteId={note._id.toString()} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}