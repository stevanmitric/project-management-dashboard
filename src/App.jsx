import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import Clients from './components/pages/Clients';
import Dashboard from './components/pages/Dashboard';
import EditClient from './components/pages/EditClient';
import EditUser from './components/pages/EditUser';
import Home from './components/pages/Home';
import Inbox from './components/pages/Inbox';
import Projects from './components/pages/Projects';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import SingleProject from './components/pages/SingleProject';
import Users from './components/pages/Users';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className='overflow-hidden'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            >
              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/inbox'
                element={
                  <ProtectedRoute>
                    <Inbox />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/users'
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/projects'
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/project/:id'
                element={
                  <ProtectedRoute>
                    <SingleProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/user/:id'
                element={
                  <ProtectedRoute>
                    <EditUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/client/:id'
                element={
                  <ProtectedRoute>
                    <EditClient />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/clients'
                element={
                  <ProtectedRoute>
                    <Clients />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/login' element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
