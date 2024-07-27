import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components/header';
<Nav />
const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-20">Welcome to Travel Journal</h1>
        <div className="space-x-4 mt-10">
          <Link to="/signup" className="px-6 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Sign Up
          </Link>
          <Link to="/login" className="px-6 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
