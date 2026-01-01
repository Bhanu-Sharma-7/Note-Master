import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Register page se email yahan pass ho raha hai
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/verify-otp', { email, otp });
      alert(res.data.message);
      navigate('/login'); // Verify hone ke baad login par bhejo
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleVerify} className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
        <p className="text-sm text-gray-600 mb-6">OTP sent to: <b>{email}</b></p>
        
        <input 
          type="text" 
          placeholder="Enter 6-digit OTP" 
          maxLength="6"
          className="w-full p-2 mb-4 border rounded text-center tracking-widest"
          onChange={(e) => setOtp(e.target.value)} 
        />
        
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;