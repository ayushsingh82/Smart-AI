import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="bg-gradient-to-b from-purple-900 to-blue-900 text-white p-8 min-h-[calc(100vh-4rem)]">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6">Code Quest Adventure</h1>
      <p className="text-xl mb-8">Begin your coding journey through interactive challenges!</p>
      <Link 
        to="/quest" 
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors duration-200"
      >
        Start Adventure
      </Link>
    </div>
  </div>
);

export default Home; 