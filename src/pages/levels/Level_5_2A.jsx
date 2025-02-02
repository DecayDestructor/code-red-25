import React from 'react';
import { useNavigate } from 'react-router-dom';

const YourComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Your Current Page</h1>
      <button
        onClick={() => navigate('/level_6_1')}
        className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Next
      </button>
    </div>
  );
};

export default YourComponent;
