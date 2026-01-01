import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null); // Track karne ke liye ki kaunsa note edit ho raha hai

  axios.defaults.withCredentials = true;

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/notes');
      setNotes(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchNotes(); }, []);

  // CREATE ya UPDATE handle karein
  const handleSaveNote = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update Logic
        await axios.put(`http://localhost:3000/api/notes/${editId}`, { title, content });
        setEditId(null);
      } else {
        // Create Logic
        await axios.post('http://localhost:3000/api/notes', { title, content });
      }
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err) { alert("Action failed"); }
  };

  // DELETE Logic
  const handleDelete = async (id) => {
    if (window.confirm("Kya aap ye note delete karna chahte hain?")) {
      try {
        await axios.delete(`http://localhost:3000/api/notes/${id}`);
        fetchNotes();
      } catch (err) { alert("Delete failed"); }
    }
  };

  // Edit Mode on karna
  const startEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo(0, 0); // Form upar hai toh screen scroll kardo
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My SaaS Notes</h1>
          <button onClick={() => { /* Logout logic yahan aayega */ }} className="text-red-500 font-semibold">Logout</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSaveNote} className="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-blue-500">
          <h2 className="text-sm font-bold text-blue-500 mb-2">{editId ? "EDITING NOTE" : "NEW NOTE"}</h2>
          <input 
            type="text" placeholder="Title..." className="w-full p-2 mb-2 text-lg font-semibold focus:outline-none"
            value={title} onChange={(e) => setTitle(e.target.value)} required
          />
          <textarea 
            placeholder="Content..." className="w-full p-2 mb-4 focus:outline-none"
            value={content} onChange={(e) => setContent(e.target.value)} rows="3" required
          ></textarea>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">
              {editId ? "Update Note" : "Save Note"}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setTitle(''); setContent(''); }} className="bg-gray-300 px-6 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div key={note._id} className="bg-white p-5 rounded shadow-sm border border-gray-200 hover:shadow-md transition">
              <h3 className="font-bold text-xl mb-2 text-gray-700">{note.title}</h3>
              <p className="text-gray-600 mb-4">{note.content}</p>
              <div className="flex justify-end gap-4 border-t pt-3">
                <button onClick={() => startEdit(note)} className="text-blue-500 text-sm font-medium hover:underline">Edit</button>
                <button onClick={() => handleDelete(note._id)} className="text-red-500 text-sm font-medium hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;