import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Backstory_1 from './Backstory_1.jsx';
import Level4 from './Level4.jsx';
import Level3 from './Level3.jsx';
import Level2 from './Level2.jsx';
import Level1 from './Level1.jsx';
import Level6 from './Level6.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/backstory" element={<Backstory_1 />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level3" element={<Level3 />} />
        <Route path="/level4" element={<Level4 />} />
        <Route path="/level6" element={<Level6 />} />
        <Route path="levels">
          
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
