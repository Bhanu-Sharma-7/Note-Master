import { connectToDB } from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { userId, title, content, tag } = await req.json();

    const newNote = new Note({
      creator: userId,
      title,
      content,
      tag,
    });

    await newNote.save();
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create note" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json({ message: "User ID required" }, { status: 400 });

    const notes = await Note.find({ creator: userId, isTrash: false }).sort({ createdAt: -1 });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch notes" }, { status: 500 });
  }
}