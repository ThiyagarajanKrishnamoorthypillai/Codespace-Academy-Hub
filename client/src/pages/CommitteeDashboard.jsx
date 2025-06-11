import React from 'react';

const CommitteeDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo trademark.png"
            alt="Codespace Logo"
            className="w-24 h-24 mb-4 drop-shadow-xl rounded-full border-2 border-white"
          />
          <h1 className="text-4xl font-bold tracking-wide text-success drop-shadow-lg">
            Committee Panel
          </h1>
        </div>

        {/* Welcome Message Card */}
        <div className="bg-white text-gray-800 rounded-3xl shadow-2xl px-8 py-6">
          <h3 className="text-2xl font-semibold mb-2">Welcome to the Committee Dashboard</h3>
          <p className="text-sm text-gray-600">
            Review and monitor committee-related activities and decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommitteeDashboard;
