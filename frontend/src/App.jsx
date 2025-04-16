import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataPage from './pages/DataPage';
import DashboardPage from './pages/DashboardPage';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';

function App() {
  return (
    <DataProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<DataPage/>} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
        </Router>
    </DataProvider>
  );
}

export default App;
