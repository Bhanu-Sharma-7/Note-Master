import { connectToDB } from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

// Next.js 15+ mein params ko await karna compulsory hai
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDB();
    const { id } = await params; // Yahan await zaroori hai

    const note = await Note.findById(id);
    
    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDB();
    const { id } = await params;
    const { title, content, tag } = await req.json();

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, tag },
      { new: true }
    );

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Update Error" }, { status: 500 });
  }
}