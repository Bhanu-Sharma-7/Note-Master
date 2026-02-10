import { createNote, getNotes } from "../actions/noteActions";

export default async function Dashboard() {
  const result = await getNotes();
  const notes = result.success ? result.data : [];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📝 Note-Master Dashboard</h1>

      {/* Form to Create Note */}
      <form action={createNote} className="flex flex-col gap-4 mb-10 p-4 border rounded-lg">
        <input 
          name="title" 
          placeholder="Note Title" 
          className="p-2 border rounded text-black" 
          required 
        />
        <textarea 
          name="content" 
          placeholder="Write your note here..." 
          className="p-2 border rounded text-black" 
          rows={4}
          required 
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Save Note
        </button>
      </form>

      {/* List of Notes */}
      <div className="grid gap-4">
        {notes.map((note: any) => (
          <div key={note._id} className="p-4 border rounded shadow-sm bg-white text-black">
            <h3 className="font-bold text-lg">{note.title}</h3>
            <p className="text-gray-600">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}