import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Common from '../Common'

// Lazy load components
const HomePage = lazy(() => import('./pages/interfaces/HomePage'))
const LoginPage = lazy(() => import('./pages/interfaces/LoginPage'))
const Backstory_1 = lazy(() => import('./pages/backstory/Backstory_1'))
const Backstory_2 = lazy(() => import('./pages/backstory/Backstory_2'))
const Backstory_Level_1_1 = lazy(() =>
  import('./pages/backstory/Backstory_Level_1_1')
)
const Backstory_Level_1_2 = lazy(() =>
  import('./pages/backstory/Backstory_Level_1_2')
)
const Backstory_Level_1_3 = lazy(() =>
  import('./pages/backstory/Backstory_Level_1_3')
)
const Level_1 = lazy(() => import('./pages/levels/Level_1'))
const Backstory_Level_1A = lazy(() =>
  import('./pages/backstory/Backstory_Level_1A')
)
const Level_1A = lazy(() => import('./pages/levels/Level_1A'))
const Level_2 = lazy(() => import('./pages/levels/Level_2'))
const Backstory_Level_3 = lazy(() =>
  import('./pages/backstory/Backstory_Level_3')
)
const Level_3 = lazy(() => import('./pages/levels/Level_3'))
const Backstory_Level_4 = lazy(() =>
  import('./pages/backstory/Backstory_Level_4')
)
const Level_4A = lazy(() => import('./pages/levels/Level_4A'))
const Backstory_Level_5A = lazy(() =>
  import('./pages/backstory/Backstory_Level_5A')
)
const Level_5_1 = lazy(() => import('./pages/levels/Level_5_1'))
const Backstory_Level_5B = lazy(() =>
  import('./pages/backstory/Backstory_Level_5B')
)
const Level_6_1 = lazy(() => import('./pages/levels/Level_6_1'))
const Level_6_2 = lazy(() => import('./pages/levels/Level_6_2'))
const Level_7_1 = lazy(() => import('./pages/levels/Level_7_1'))
const Level_7_1A = lazy(() => import('./pages/levels/Level_7_1A'))

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Common />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/backstory_1" element={<Backstory_1 />} />
          <Route path="/backstory_2" element={<Backstory_2 />} />
          <Route
            path="/backstory_level_1_1"
            element={<Backstory_Level_1_1 />}
          />
          <Route
            path="/backstory_level_1_2"
            element={<Backstory_Level_1_2 />}
          />
          <Route
            path="/backstory_level_1_3"
            element={<Backstory_Level_1_3 />}
          />
          <Route path="/level_1" element={<Level_1 />} />
          <Route path="/backstory_level_1A" element={<Backstory_Level_1A />} />
          <Route path="/level_1A" element={<Level_1A />} />
          <Route path="/level_2" element={<Level_2 />} />
          <Route path="/backstory_level_3" element={<Backstory_Level_3 />} />
          <Route path="/level_3" element={<Level_3 />} />
          <Route path="/backstory_level_4" element={<Backstory_Level_4 />} />
          <Route path="/level_4A" element={<Level_4A />} />
          <Route path="/backstory_level_5A" element={<Backstory_Level_5A />} />
          <Route path="/level_5_1" element={<Level_5_1 />} />
          <Route path="/backstory_level_5B" element={<Backstory_Level_5B />} />
          <Route path="/level_6_1" element={<Level_6_1 />} />
          <Route path="/level_6_2" element={<Level_6_2 />} />
          <Route path="/level_7_1" element={<Level_7_1 />} />
          <Route
            path="/105_99_104_111_114_102_111_110_105_97_115"
            element={<Level_7_1A />}
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
