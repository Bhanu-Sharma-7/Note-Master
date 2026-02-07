import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import User from "@/models/User";

export default async function ProfilePage() {
  const session = await getServerSession();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  await connectToDatabase();

  // 1. Robust ID Logic (Sabhi pages ke liye standard fix)
  let userId = (session.user as any).id;

  if (!userId && session.user.email) {
    const dbUser = await User.findOne({ email: session.user.email }).select("_id");
    userId = dbUser?._id;
  }

  if (!userId) {
    redirect("/login");
  }

  // 2. Stats calculate karna (Correct userId ke saath)
  const totalNotes = await Note.countDocuments({ userId, isTrash: false });
  const trashedNotes = await Note.countDocuments({ userId, isTrash: true });
  
  // User ka pehla akshar avatar ke liye
  const avatarLetter = session.user.name ? session.user.name[0].toUpperCase() : "?";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Top Banner/Header */}
          <div className="h-32 bg-blue-600"></div>
          
          {/* Profile Info Section */}
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl font-bold text-blue-600 border-4 border-white">
                {avatarLetter}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">{session.user.name}</h1>
            <p className="text-gray-500 mb-8">{session.user.email}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Active Notes</p>
                <p className="text-3xl font-black text-blue-900">{totalNotes}</p>
              </div>
              
              <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-1">In Trash</p>
                <p className="text-3xl font-black text-red-900">{trashedNotes}</p>
              </div>
            </div>

            {/* Account Info */}
            <div className="mt-10 pt-8 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Account Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-[10px] uppercase">Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Storage Usage</span>
                <span className="text-gray-900 font-semibold">Standard Tier</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-400 text-xs">
          Note-Master v1.0 • Security & Performance Optimized
        </p>
      </div>
    </div>
  );
}