import React from 'react';
import Navigation from './components/common/Navigation';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App; 