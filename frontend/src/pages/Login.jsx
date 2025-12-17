import React from 'react';

const NoteMasterSplitLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      
      {/* Main Container */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden">
        
        <div className="flex flex-col md:flex-row min-h-75">
          
          {/* Left Panel */}
          <div className="bg-blue-600 p-8 md:w-1/3 text-white rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
            <h2 className="text-3xl font-bold mt-2">Login</h2>
          </div>

          {/* Right Panel */}
          <form
            className="p-10 md:w-2/3 bg-gray-50 flex flex-col justify-start pt-16"
            onSubmit={(e) => e.preventDefault()}
          >

            {/* Email or Username */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email or Username
              </label>
              <input
                type="text"
                required
                placeholder="Enter email or username"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>

            {/* App Name */}
            <p className="text-xs text-gray-500 text-right mt-4">
              NoteMaster • My Application
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteMasterSplitLogin;
