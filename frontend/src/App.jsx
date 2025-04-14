import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DataPage from './pages/DataPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DataPage/>} />
      <Route path="/dashboard/:fileId" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
