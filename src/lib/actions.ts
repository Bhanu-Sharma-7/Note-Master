"use server"

import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- 1. NOTE CREATE KARNE KA ACTION ---
export async function createNote(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) throw new Error("Title and Content are required");

    const session = await getServerSession();
    if (!session || !session.user) throw new Error("Unauthorized");

    await connectToDatabase();

    // User ID nikalne ka robust tarika (BSON error fix)
    let userId = (session.user as any).id;
    if (!userId && session.user.email) {
      const dbUser = await User.findOne({ email: session.user.email }).select("_id");
      userId = dbUser?._id;
    }

    if (!userId) throw new Error("User ID not found");

    const newNote = new Note({ 
      userId, 
      title, 
      content,
      isTrash: false 
    });
    
    await newNote.save();
    
    revalidatePath("/dashboard"); 
  } catch (error: any) {
    return { error: error.message };
  }
  
  // Successful creation ke baad redirect dashboard par
  redirect("/dashboard");
}

// --- 2. NOTE UPDATE KARNE KA ACTION ---
export async function updateNote(noteId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await connectToDatabase();
    
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );

    if (!updatedNote) throw new Error("Note not found");

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// --- 3. SOFT DELETE (TRASH) ---
export async function moveToTrash(noteId: string) {
  try {
    await connectToDatabase();
    await Note.findByIdAndUpdate(noteId, { isTrash: true });
    revalidatePath("/dashboard");
    revalidatePath("/trash");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// --- 4. RESTORE FROM TRASH ---
export async function restoreNote(noteId: string) {
  try {
    await connectToDatabase();
    await Note.findByIdAndUpdate(noteId, { isTrash: false });
    revalidatePath("/dashboard");
    revalidatePath("/trash");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// --- 5. PERMANENT DELETE ---
export async function deletePermanently(noteId: string) {
  try {
    await connectToDatabase();
    await Note.findByIdAndDelete(noteId);
    revalidatePath("/trash");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}