import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import HomePage from './pages/interfaces/HomePage';
import LoginPage from './pages/interfaces/LoginPage';
import Backstory_1 from './pages/backstory/Backstory_1';
import Backstory_2 from './pages/backstory/Backstory_2';
import Backstory_Level_1_1 from './pages/backstory/Backstory_Level_1_1';
import Backstory_Level_1_2 from './pages/backstory/Backstory_Level_1_2';
import Backstory_Level_1_3 from './pages/backstory/Backstory_Level_1_3';
import Level_1 from './pages/levels/Level_1';
import Backstory_Level_1A from './pages/backstory/Backstory_Level_1A';
import Dialogues_Level_1A from './pages/dialogues/Dialogues_Level_1A';
import Level_1A from './pages/levels/Level_1A';
import Level_2 from './pages/levels/Level_2';
import Backstory_Level_3 from './pages/backstory/Backstory_Level_3';
import Level_3 from './pages/levels/Level_3';
import Backstory_Level_4 from './pages/backstory/Backstory_Level_4';
// import Options_Level_4 from './pages/options/Options_Level_4'; // Koi toh karlo
// import Dialogues_Level_4A from './pages/dialogues/Dialogues_Level_4A'; // Soham Bhosale
// import Level_4A from './pages/levels/Level_4A'; // Yash Dharamshi
import Backstory_Level_5A from './pages/backstory/Backstory_Level_5A';
// import Level_5_1 from './pages/levels/Level_5_1'; // Soham Bhosale
import Backstory_Level_5B from './pages/backstory/Backstory_Level_5B';
// import Options_Level_5B from './pages/options/Options_Level_5B'; // Koi toh karlo
// import Level_5_2A from './pages/levels/Level_5_2A'; // Tattva Jain
import Level_6_1 from './pages/levels/Level_6_1';
import Level_6_2 from './pages/levels/Level_6_2'; 
// import Level_7_1 from './pages/levels/Level_7_1'; // Aayush Kolte
// import Options_Level_7A from './pages/options/Options_Level_7A'; // Koi toh karlo
import Level_7_1A from './pages/levels/Level_7_1A';
// import Level_7_1B from './pages/levels/Level_7_1B'; // Sanyogeeta Pradhan - RGB code remaining
// import Level_7_3 from './pages/levels/Level_7_3'; // Vinisha Bhagwani
// import Level_7_4 from './pages/levels/Level_7_4'; // Akshat Patil

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/backstory_1" element={<Backstory_1 />} />
        <Route path="/backstory_2" element={<Backstory_2 />} />
        <Route path="/backstory_level_1_1" element={<Backstory_Level_1_1 />} />
        <Route path="/backstory_level_1_2" element={<Backstory_Level_1_2 />} />
        <Route path="/backstory_level_1_3" element={<Backstory_Level_1_3 />} />
        <Route path="/level_1" element={<Level_1 />} />
        <Route path="/backstory_level_1A" element={<Backstory_Level_1A />} /> 
        <Route path="/dialogues_level_1A" element={<Dialogues_Level_1A />} />
        <Route path="/level_1A" element={<Level_1A />} />
        <Route path="/level_2" element={<Level_2 />} />
        <Route path="/backstory_level_3" element={<Backstory_Level_3 />} />
        <Route path="/level_3" element={<Level_3 />} />
        <Route path="/backstory_level_4" element={<Backstory_Level_4 />} />
        {/* <Route path="/options_level_4" element={<Options_Level_4 />} /> */}
        {/* <Route path="/dialogues_level_4A" element={<Dialogues_Level_4A />} /> */}
        {/* <Route path="/level_4A" element={<Level_4A />} /> */}
        <Route path="/backstory_level_5A" element={<Backstory_Level_5A />} />
        {/* <Route path="/level_5_1" element={<Level_5_1 />} /> */}
        <Route path="/backstory_level_5B" element={<Backstory_Level_5B />} />
        {/* <Route path="/options_level_5B" element={<Options_Level_5B />} /> */}
        {/* <Route path="/level_5_2A" element={<Level_5_2A />} /> */}
        <Route path="/level_6_1" element={<Level_6_1 />} />
        <Route path="/level_6_2" element={<Level_6_2 />} />
        {/* <Route path="/level_7_1" element={<Level_7_1 />} /> */}
        {/* <Route path="/options_level_7A" element={<Options_Level_7A />} /> */}
        <Route path="/105_99_104_111_114_102_111_110_105_97_115" element={<Level_7_1A />} />
        {/* <Route path="/level_7_1B" element={<Level_7_1B />} /> */}
        {/* <Route path="/level_7_3" element={<Level_7_3 />} /> */}
        {/* <Route path="/level_7_4" element={<Level_7_4 />} /> */}
      </Routes>
    </Router>
  )
}

export default App