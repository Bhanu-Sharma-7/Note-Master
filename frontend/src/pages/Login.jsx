import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Axios ko batana padega ki cookies (token) ko save kare
  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', formData);
      alert("Login Successful!");
      
      // Login ke baad Dashboard/Notes page par bhej do
      navigate('/dashboard'); 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
        
        <input 
          type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded focus:outline-blue-400"
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required
        />
        <input 
          type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded focus:outline-blue-400"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required
        />
        
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
        
        <p className="mt-4 text-sm text-center">
          Account nahi hai? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/register')}>Register karein</span>
        </p>
      </form>
    </div>
  );
};

export default Login;