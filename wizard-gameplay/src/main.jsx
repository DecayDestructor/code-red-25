import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import SignupPage from './components/LoginPage.jsx'
import Backstory_1 from './pages/levels/Backstory_1.jsx'
import Level4 from './pages/levels/Level4.jsx'
import Level3 from './pages/levels/Level3.jsx'
import Level2 from './pages/levels/Level2.jsx'
import Level1 from './pages/levels/Level1.jsx'
import Level5 from './pages/levels/Level5.jsx'
import Level6 from './pages/levels/Level6.jsx'
import Level7_1 from './pages/levels/Level7_1_Puzzle.jsx'
import Level7_2 from './pages/levels/Level7_2.jsx'
import Level1_Puzzle from './pages/levels/Level1_Puzzle.jsx'
import Level2_Puzzle from './pages/levels/Level2_Puzzle.jsx'
import Level3_Puzzle from './pages/levels/Level3_Puzzle.jsx'
import Level4_Puzzle from './pages/levels/Level4_Puzzle.jsx'
import Level6_Puzzle from './pages/levels/Level6_Puzzle.jsx'
import Level7_2pre from './pages/levels/Level7_2pre.jsx'
import Level7_1pre from './pages/levels/Level7_1.jsx'
import Win from './components/Win.jsx'
import Lose from './components/Lose.jsx'
import { Provider } from 'react-redux'
import store from './protectedRoutes/store.js'
import ProtectedRoute from './protectedRoutes/ProtectedRoute.jsx'
import ErrorPage from './ErrorPage.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <title>Wizard</title>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<SignupPage />} />
          <Route path="/backstory" element={<Backstory_1 />} />
          <Route
            path="/level1"
            element={<ProtectedRoute level={'level1'} element={<Level1 />} />}
          />
          <Route
            path="/level1_puzzle"
            element={
              <ProtectedRoute level={'level1'} element={<Level1_Puzzle />} />
            }
          />

          <Route
            path="/level2"
            element={<ProtectedRoute level={'level2'} element={<Level2 />} />}
          />
          <Route
            path="/level2_puzzle"
            element={
              <ProtectedRoute level={'level2'} element={<Level2_Puzzle />} />
            }
          />

          <Route
            path="/level3"
            element={<ProtectedRoute level={'level3'} element={<Level3 />} />}
          />
          <Route
            path="/level3_puzzle"
            element={
              <ProtectedRoute level={'level3'} element={<Level3_Puzzle />} />
            }
          />

          <Route
            path="/level4"
            element={<ProtectedRoute level={'level4'} element={<Level4 />} />}
          />
          <Route
            path="/level4_puzzle"
            element={
              <ProtectedRoute level={'level4'} element={<Level4_Puzzle />} />
            }
          />

          <Route
            path="/level5"
            element={<ProtectedRoute level={'level5'} element={<Level5 />} />}
          />

          <Route
            path="/level6"
            element={<ProtectedRoute level={'level6'} element={<Level6 />} />}
          />
          <Route
            path="/level6_puzzle"
            element={
              <ProtectedRoute level={'level6'} element={<Level6_Puzzle />} />
            }
          />

          <Route
            path="/level7_1"
            element={
              <ProtectedRoute level={'level7_1'} element={<Level7_1pre />} />
            }
          />
          <Route
            path="/level7_1_puzzle"
            element={
              <ProtectedRoute level={'level7_1'} element={<Level7_1 />} />
            }
          />

          <Route
            path="/level7_2pre"
            element={
              <ProtectedRoute level={'level7_2'} element={<Level7_2pre />} />
            }
          />
          <Route
            path="/level7_2"
            element={
              <ProtectedRoute level={'level7_2'} element={<Level7_2 />} />
            }
          />

          <Route path="levels"></Route>

          <Route path="/win" element={<Win />} />
          <Route path="/lose" element={<Lose />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
