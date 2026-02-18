'use server'

import { connectDB } from "@/lib/db"
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNote(prevState: any, formData: FormData) {
    await connectDB();

    const heading = formData.get('heading')
    const content = formData.get('content')
    if (!heading || !content || typeof heading !== 'string' || typeof content !== 'string') {
        return { message: 'all fields are required', status: 'error' }
    }

    try {
        await Note.create({
            heading,
            content
        })
        revalidatePath('/')
        return { message: 'note created successfully', status: 'success' }
    } catch (error) {
        return { message: 'failed to save note', status: 'error' }
    }
}

export async function deleteNote(formData: FormData) {
    await connectDB()
    const id = formData.get('id') as string
    if(!id) return;
    await Note.findByIdAndDelete(id)
    revalidatePath('/')
}

export async function updateNote(formData: FormData) {
    await connectDB()
    const id = formData.get('id') as string
    const heading = formData.get('heading') as string
    const content = formData.get('content') as string
    if(!id) return;
    const newUpdatedNote = await Note.findByIdAndUpdate(id, { heading, content})
    console.log(newUpdatedNote)
    revalidatePath('/')
    redirect('/')
}