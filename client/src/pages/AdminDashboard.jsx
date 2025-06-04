import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white flex flex-col items-center p-6">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mt-10">
        <img
          src="/logo trademark.png" // Ensure this path matches your public folder or serve accordingly
          alt="Logo"
          className="w-24 h-24 mb-4 drop-shadow-lg"
        />
        <h1 className="text-3xl font-bold tracking-wide">Codespace Academy Hub</h1>
      </div>

      {/* Welcome Message Card */}
      <div className="mt-10 bg-white text-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2 text-center">
          Welcome to the Admin Dashboard
        </h3>
        <p className="text-center text-sm">
          Manage users, content, and settings from the centralized control panel.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
