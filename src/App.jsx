import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage2 from './pages/interfaces/HomePage2';
import LoginPage from './pages/interfaces/LoginPage';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage2 />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App