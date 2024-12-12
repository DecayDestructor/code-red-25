import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/interfaces/HomePage';
import LoginPage from './pages/interfaces/LoginPage';
// import TestLevel from './pages/levels/TestLevel';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/testlevel" element={<TestLevel />} /> */}
      </Routes>
    </Router>
  )
}

export default App