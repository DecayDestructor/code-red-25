import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Level5 from './pages/levels/Level5.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="levels">
          <Route path="level_5" element={<Level5 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
