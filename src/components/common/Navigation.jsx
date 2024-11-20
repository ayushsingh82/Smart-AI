import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-purple-900/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center transform transition-transform group-hover:scale-110">
              <span className="text-xl">🎮</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Code<span className="text-purple-400">Quest</span>
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex space-x-1">
            <NavLink to="/" current={location.pathname === "/"}>
              <span className="material-icons text-sm mr-1">home</span>
              Home
            </NavLink>
            <NavLink to="/quest" current={location.pathname === "/quest"}>
              <span className="material-icons text-sm mr-1">code</span>
              Quests
            </NavLink>
          </div>

          {/* User Menu - Can be expanded later */}
          <div className="flex items-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
              <span className="material-icons text-sm">person</span>
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Helper component for navigation links
const NavLink = ({ to, current, children }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center
      ${current 
        ? 'bg-purple-600 text-white' 
        : 'text-gray-300 hover:text-white hover:bg-purple-800/50'
      }`}
  >
    {children}
  </Link>
);

export default Navigation; 