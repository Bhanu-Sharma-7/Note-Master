import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min.js';


const Editor = () => {
  const { id } = useParams(); // URL se project ID nikaalna
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  // Project ka purana data load karo
  useEffect(() => {
    const getProjectData = async () => {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`http://localhost:8080/api/projects`, config);
      const current = data.find(p => p._id === id);
      if (current) {
        setTitle(current.title);
        setContent(current.content);
      }
    };
    getProjectData();
  }, [id, user]);

  // Save Function
  const handleSave = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:8080/api/projects/${id}`, { title, content }, config);
      alert("Project Saved!");
    } catch (err) {
      console.error("Save failed", err);
    }
  };
  const downloadPDF = () => {
    const element = document.querySelector('.ql-editor'); // Quill editor ka content select karo
    const options = {
      margin: 1,
      filename: `${title || 'document'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  };


  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input
          className="text-3xl font-bold outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded">Save</button>
        <button
          onClick={downloadPDF}
          className="bg-red-600 text-white px-6 py-2 rounded ml-2"
        >
          Download PDF
        </button>
      </div>
      <ReactQuill theme="snow" value={content} onChange={setContent} className="h-[70vh] mb-12" />
    </div>
  );
};

export default Editor;