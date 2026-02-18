import { updateNote } from "@/app/actions/noteActions"
import { connectDB } from "@/lib/db"
import Note from "@/models/Note"
import { redirect } from "next/navigation"

const updatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = await params;
    const id = resolvedParams.id
    const note = await Note.findById(id).lean()
    await connectDB()
    if (!note) {
        redirect('/')
    }
    return (
        <>
            <form action={updateNote}>
                <input
                type="hidden"
                    name="id"
                    value={note._id.toString()}
                />
                <input
                    name="heading"
                    defaultValue={note.heading}
                />
                <textarea
                    name="content"
                    defaultValue={note.content}
                />
                <button type="submit">update</button>
            </form>
        </>
    )
}

export default updatePage
