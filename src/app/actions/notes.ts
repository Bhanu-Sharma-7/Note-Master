"use server" // Ye line sabse top par honi chahiye taaki ye file server par chale

import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

// --- 1. NOTE CREATE KARNE KA ACTION ---
export async function createNote(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const session = await getServerSession();
    if (!session || !session.user) throw new Error("Unauthorized");

    await connectToDatabase();

    // User ID nikalne ka robust tarika (BSON error fix ke sath)
    let userId = (session.user as any).id;
    if (!userId && session.user.email) {
      const dbUser = await User.findOne({ email: session.user.email }).select("_id");
      userId = dbUser?._id;
    }

    if (!userId) throw new Error("User ID not found");

    const newNote = new Note({ userId, title, content });
    await newNote.save();
    
    revalidatePath("/dashboard"); // UI refresh karne ke liye
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// --- 2. NOTE UPDATE KARNE KA ACTION (Naya Function) ---
export async function updateNote(noteId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await connectToDatabase();
    
    // Database mein note ko dhund kar update karein
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );

    if (!updatedNote) throw new Error("Note not found");

    revalidatePath("/dashboard"); // Dashboard update karne ke liye
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// --- 3. NOTE DELETE KARNE KA ACTION ---
export async function deleteNote(noteId: string) {
  try {
    await connectToDatabase();
    await Note.findByIdAndDelete(noteId);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// 1. Note ko Trash mein bhejne ke liye (Soft Delete)
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

// 2. Note ko wapas Dashboard mein lane ke liye (Restore)
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

// 3. Note ko hamesha ke liye mitane ke liye (Permanent Delete)
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