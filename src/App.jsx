import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import EditClient from './components/forms/EditClient';
import Clients from './components/pages/client/Clients';
import Dashboard from './components/pages/dashboard/Dashboard';
import Home from './components/pages/home/Home';
import Inbox from './components/pages/inbox/Inbox';
import Projects from './components/pages/project/Projects';
import SingleProject from './components/pages/project/SingleProject';
import SignIn from './components/pages/sign-in/SignIn';
import SignUp from './components/pages/sign-up/SignUp';
import EditUser from './components/pages/user/EditUser';
import Users from './components/pages/user/Users';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className='overflow-hidden overflow-y-scroll no-scrollbar'>
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
