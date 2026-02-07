import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  await connectToDatabase();
  const userId = (session.user as any).id || session.user?.email;

  // Stats calculate karna
  const totalNotes = await Note.countDocuments({ userId, isTrash: false });
  const trashedNotes = await Note.countDocuments({ userId, isTrash: true });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8 border-b pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">User Profile</h1>
          <p className="text-gray-500">Manage your account and view activity</p>
        </div>
        <Link href="/dashboard" className="text-blue-600 hover:underline text-sm">
          Back to Dashboard
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* User Info Card */}
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Details</h2>
          <div className="space-y-3">
            <p><span className="font-medium text-gray-500">Email:</span> {session.user?.email}</p>
            <p><span className="font-medium text-gray-500">Name:</span> {session.user?.name || "Not set"}</p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Activity Stats</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">{totalNotes}</p>
              <p className="text-xs text-blue-600 uppercase tracking-wider">Active Notes</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-700">{trashedNotes}</p>
              <p className="text-xs text-red-600 uppercase tracking-wider">In Trash</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Shortcut */}
      <div className="p-6 bg-gray-50 border-2 border-dashed rounded-xl text-center">
        <p className="text-gray-600 mb-4">Password ya theme change karna chahte hain?</p>
        <Link 
          href="/settings" 
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Go to Settings
        </Link>
      </div>
    </div>
  );
}