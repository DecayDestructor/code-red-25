import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage2 from './pages/interfaces/HomePage2';
import LoginPage from './pages/interfaces/LoginPage';
import LayoutPage from './pages/interfaces/LayoutPage';
import TestLevel from './pages/interfaces/TestLevel';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage2 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/layout" element={<LayoutPage />} />
        <Route path="/testlevel" element={<TestLevel />} />
      </Routes>
    </Router>
  )
}

export default App