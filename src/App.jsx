import React from 'react';
import Navigation from './components/common/Navigation';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default App; 