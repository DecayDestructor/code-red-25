import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Common from '../Common'
import axios from 'axios'
import ProtectedRoute from './protectedRoutes/ProtectedRoute'
import ErrorPage from './ErrorPage'
import Win from './Win'
axios.defaults.baseURL = 'http://localhost:5000'

const HomePage = lazy(() => import('./pages/interfaces/HomePage'))
const LoginPage = lazy(() => import('./pages/interfaces/LoginPage'))
const Backstory_1 = lazy(() => import('./pages/backstory/Backstory_1'))
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
const Backstory_Level_2 = lazy(() =>
  import('./pages/backstory/Backstory_Level_2')
)
const Level_2 = lazy(() => import('./pages/levels/Level_2'))
const Backstory_Level_3 = lazy(() =>
  import('./pages/backstory/Backstory_Level_3')
)
const Level_3 = lazy(() => import('./pages/levels/Level_3'))
const Backstory_Level_4 = lazy(() =>
  import('./pages/backstory/Backstory_Level_4')
)
const Options_Level_4 = lazy(() => import('./pages/options/Options_Level_4'))
const Backstory_Level_4A = lazy(() =>
  import('./pages/backstory/Backstory_Level_4A')
)
const Level_4A = lazy(() => import('./pages/levels/Level_4A'))
const Backstory_Level_5A = lazy(() =>
  import('./pages/backstory/Backstory_Level_5A')
)
const Backstory_Level_6_1 = lazy(() =>
  import('./pages/backstory/Backstory_Level_6_1')
)
const Level_6_1 = lazy(() => import('./pages/levels/Level_6_1'))
const Backstory_Level_7_1 = lazy(() =>
  import('./pages/backstory/Backstory_Level_7_1')
)
const Level_7_1 = lazy(() => import('./pages/levels/Level_7_1'))
const Options_Level_7A = lazy(() => import('./pages/options/Options_Level_7A'))
const Backstory_Level_7_1B = lazy(() =>
  import('./pages/backstory/Backstory_Level_7_1B')
)
const Level_7_1B = lazy(() => import('./pages/levels/Level_7_1B'))
const Backstory_Level_7_3 = lazy(() =>
  import('./pages/backstory/Backstory_Level_7_3')
)
const Level_7_3 = lazy(() => import('./pages/levels/Level_7_3'))
const Level_7_4 = lazy(() => import('./pages/levels/Level_7_4'))
const Backstory_Level_5B = lazy(() =>
  import('./pages/backstory/Backstory_Level_5B')
)
const Level_5B = lazy(() => import('./pages/levels/Level_5B'))
const Options_Level_5B = lazy(() => import('./pages/options/Options_Level_5B'))
const Backstory_Level_6_2 = lazy(() =>
  import('./pages/backstory/Backstory_Level_6_2')
)
const Level_6_2 = lazy(() => import('./pages/levels/Level_6_2'))
const Backstory_Level_7_1A = lazy(() =>
  import('./pages/backstory/Backstory_Level_7_1A')
)
const Level_7_1A = lazy(() => import('./pages/levels/Level_7_1A'))
const Jumpscare_6_2 = lazy(() => import('./pages/jumpscares/Jumpscare_6_2'))
const Jumpscare_7_1A = lazy(() => import('./pages/jumpscares/Jumpscare_7_1A'))

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Common />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/win" element={<Win />} />
          <Route path="/backstory_1" element={<Backstory_1 />} />
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
          <Route
            path="/level_1"
            element={<ProtectedRoute level={'level_1'} element={<Level_1 />} />}
          />

          <Route
            path="/backstory_level_1A"
            element={
              <ProtectedRoute
                level={'level_1a'}
                element={<Backstory_Level_1A />}
              />
            }
          />
          <Route
            path="/level_1A"
            element={
              <ProtectedRoute level={'level_1a'} element={<Level_1A />} />
            }
          />

          <Route
            path="/backstory_level_2"
            element={
              <ProtectedRoute
                level={'level_2'}
                element={<Backstory_Level_2 />}
              />
            }
          />
          <Route
            path="/level_2"
            element={<ProtectedRoute level={'level_2'} element={<Level_2 />} />}
          />

          <Route
            path="/backstory_level_3"
            element={
              <ProtectedRoute
                level={'level_3'}
                element={<Backstory_Level_3 />}
              />
            }
          />
          <Route
            path="/level_3"
            element={<ProtectedRoute level={'level_3'} element={<Level_3 />} />}
          />

          <Route
            path="/backstory_level_4"
            element={
              <ProtectedRoute
                level={'options_level_4'}
                element={<Backstory_Level_4 />}
              />
            }
          />
          <Route
            path="/options_level_4"
            element={
              <ProtectedRoute
                level={'options_level_4'}
                element={<Options_Level_4 />}
              />
            }
          />
          <Route
            path="/backstory_level_4A"
            element={
              <Backstory_Level_4A level={'level_4a'} element={<Level_4A />} />
            }
          />
          <Route
            path="/level_4A"
            element={
              <ProtectedRoute level={'level_4a'} element={<Level_4A />} />
            }
          />

          <Route
            path="/backstory_level_5A"
            element={
              <ProtectedRoute
                level={'level_5a'}
                element={<Backstory_Level_5A />}
              />
            }
          />
          <Route
            path="/backstory_level_5B"
            element={
              <ProtectedRoute
                level={'level_5b'}
                element={<Backstory_Level_5B />}
              />
            }
          />
          <Route
            path="/level_5B"
            element={
              <ProtectedRoute level={'level_5b'} element={<Level_5B />} />
            }
          />
          <Route
            path="/options_level_5B"
            element={
              <ProtectedRoute
                level={'options_level_5b'}
                element={<Options_Level_5B />}
              />
            }
          />

          <Route
            path="/backstory_level_6_1"
            element={
              <ProtectedRoute
                level={'level_6_1'}
                element={<Backstory_Level_6_1 />}
              />
            }
          />
          <Route
            path="/level_6_1"
            element={
              <ProtectedRoute level={'level_6_1'} element={<Level_6_1 />} />
            }
          />

          <Route
            path="/jumpscare_6_2"
            element={
              <ProtectedRoute
                level={'jumpscare_6_2'}
                element={<Jumpscare_6_2 />}
              />
            }
          />
          <Route
            path="/backstory_level_6_2"
            element={
              <ProtectedRoute
                level={'level_6_2'}
                element={<Backstory_Level_6_2 />}
              />
            }
          />
          <Route
            path="/level_6_2"
            element={
              <ProtectedRoute level={'level_6_2'} element={<Level_6_2 />} />
            }
          />

          <Route
            path="/backstory_level_7_1"
            element={
              <ProtectedRoute
                level={'level_7_1'}
                element={<Backstory_Level_7_1 />}
              />
            }
          />
          <Route
            path="/level_7_1"
            element={
              <ProtectedRoute level={'level_7_1'} element={<Level_7_1 />} />
            }
          />
          <Route path="/options_level_7A" element={<Options_Level_7A />} />
          <Route
            path="/backstory_level_7_1A"
            element={
              <ProtectedRoute
                level={'level_7_1a'}
                element={<Backstory_Level_7_1A />}
              />
            }
          />
          <Route
            path="/105_99_104_111_114_102_111_110_105_97_115"
            element={
              <ProtectedRoute level={'level_7_1a'} element={<Level_7_1A />} />
            }
          />
          <Route
            path="/jumpscare_7_1A"
            element={
              <ProtectedRoute
                level={'jumpscare_7_1a'}
                element={<Jumpscare_7_1A />}
              />
            }
          />

          <Route
            path="/backstory_level_7_1B"
            element={
              <ProtectedRoute
                level={'level_7_1b'}
                element={<Backstory_Level_7_1B />}
              />
            }
          />
          <Route
            path="/level_7_1B"
            element={
              <ProtectedRoute level={'level_7_1b'} element={<Level_7_1B />} />
            }
          />
          <Route
            path="/backstory_level_7_3"
            element={
              <ProtectedRoute
                level={'level_7_3'}
                element={<Backstory_Level_7_3 />}
              />
            }
          />

          <Route
            path="/level_7_3"
            element={
              <ProtectedRoute level={'level_7_3'} element={<Level_7_3 />} />
            }
          />
          <Route
            path="/level_7_4"
            element={
              <ProtectedRoute level={'level_7_4'} element={<Level_7_4 />} />
            }
          />
          {/* route for all other routes */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
