import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import QuestScreen from '../game/QuestScreen';
import NotFound from '../pages/NotFound';
import App from '../../App';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="quest" element={<QuestScreen />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes; 