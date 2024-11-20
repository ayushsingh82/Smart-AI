import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="bg-gradient-to-b from-purple-900 to-blue-900 text-white flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! This quest doesn't exist.</p>
      <Link 
        to="/" 
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
      >
        Return Home
      </Link>
    </div>
  </div>
);

export default NotFound; 