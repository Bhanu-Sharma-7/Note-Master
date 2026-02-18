import NoteForm from '@/components/NoteForm'
import { connectDB } from '@/lib/db'
import Note from '@/models/Note'
import { deleteNote } from './actions/noteActions'
import Link from 'next/link'

const Home = async () => {
  await connectDB()
  const notes = await Note.find().sort({ createdAt: -1 }).lean()
  return (
    <>
      <NoteForm />
      <div>
        {notes.map((note: any) => (
          <div key={note._id.toString()}>

            <h2>{note.heading}</h2>
            <p>{note.content}</p>
            <Link href={`/edit/${note._id.toString()}`} className='bg-green-500'>
              update
            </Link>
            <form action={deleteNote}>
              <input type="hidden" name='id' value={note._id.toString()} />
              <button
                type='submit'
                className='bg-red-500'
              >
                delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
