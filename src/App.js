import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Layout from './components/Layout';
import MapPage from './components/MapPage';
import Payroll from './components/Payroll';
import Attendance from './components/Attendance';
import Leave from './components/Leave';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MapPage />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<Leave />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
