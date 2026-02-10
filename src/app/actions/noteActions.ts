"use server";

import connectDB from "@/lib/mongodb";
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";

// 1. Naya Note Save karne ke liye
export async function createNote(formData: FormData) {
  await connectDB();

  const title = formData.get("title");
  const content = formData.get("content");

  // Abhi ke liye temporary userId (Auth ke baad change karenge)
  const userId = "user_123"; 

  try {
    const newNote = new Note({
      title,
      content,
      userId,
    });

    await newNote.save();
    
    // Page refresh kiye bina data update karne ke liye
    revalidatePath("/dashboard"); 
    return { success: true, message: "Note created successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to create note" };
  }
}

// 2. Saare Notes Fetch karne ke liye
export async function getNotes() {
  await connectDB();
  try {
    // Sirf wahi notes lao jo delete nahi huye hain
    const notes = await Note.find({ isDeleted: false }).sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(notes)) };
  } catch (error) {
    return { success: false, message: "Failed to fetch notes" };
  }
}