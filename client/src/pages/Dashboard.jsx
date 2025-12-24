import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Saare projects fetch karne ke liye
  useEffect(() => {
    const fetchProjects = async () => {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:8080/api/projects', config);
      setProjects(data);
    };
    fetchProjects();
  }, [user]);

  // Naya project banane ke liye
  const createNewProject = async () => {
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    const { data } = await axios.post('http://localhost:8080/api/projects', { title: "New Workspace" }, config);
    navigate(`/editor/${data._id}`); // Seedha editor pe le jao
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">My Workspaces</h1>
        <button onClick={createNewProject} className="bg-blue-600 text-white px-4 py-2 rounded">+ New Project</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map(p => (
          <div key={p._id} onClick={() => navigate(`/editor/${p._id}`)} className="p-4 bg-white shadow rounded cursor-pointer hover:shadow-lg transition">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500">Last updated: {new Date(p.updatedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;