"use server";
import { connectToDatabase } from "@/lib/db";
import Note from "@/models/Note";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

// 1. Create Note with Tags support
export async function createNote(formData: FormData) {
  const session = await getServerSession();
  if (!session) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  
  // Tags ko comma se separate karke array banana
  const tagsString = formData.get("tags") as string;
  const tags = tagsString 
    ? tagsString.split(",").map(tag => tag.trim()).filter(tag => tag !== "") 
    : [];

  await connectToDatabase();
  
  const newNote = new Note({
    userId: (session.user as any).id || session.user?.email,
    title,
    content,
    tags, // Array field
  });

  await newNote.save();
  revalidatePath("/dashboard");
  return { success: true };
}

// 2. Move to Trash
export async function moveToTrash(noteId: string) {
  await connectToDatabase();
  await Note.findByIdAndUpdate(noteId, { isTrash: true });
  revalidatePath("/dashboard");
  revalidatePath("/trash");
  return { success: true };
}

// 3. Restore Note
export async function restoreNote(noteId: string) {
  await connectToDatabase();
  await Note.findByIdAndUpdate(noteId, { isTrash: false });
  revalidatePath("/dashboard");
  revalidatePath("/trash");
  return { success: true };
}

// 4. Delete Permanently
export async function deletePermanently(noteId: string) {
  await connectToDatabase();
  await Note.findByIdAndDelete(noteId);
  revalidatePath("/trash");
  return { success: true };
}