'use server'

import { connectDB } from "@/lib/db"
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
    await connectDB();

    const heading = formData.get('heading')
    const content = formData.get('content')
    if (!heading || !content) return { error: 'all fields are required' }

    await Note.create({ 
        heading,
        content
    })
    revalidatePath('/')
}