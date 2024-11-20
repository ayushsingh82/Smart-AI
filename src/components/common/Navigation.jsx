import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-purple-900/50 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl">🎮</span>
            <span className="text-white font-bold text-xl">Code Quest</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className={`text-white px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' ? 'bg-purple-700' : 'hover:bg-purple-700/50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/quest" 
              className={`text-white px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/quest' ? 'bg-purple-700' : 'hover:bg-purple-700/50'
              }`}
            >
              Quests
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 