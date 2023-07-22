import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PageWrapper from './components/common/PageWrapper';
import routes from './routes/routes';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';

function App() {
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log('🚀 ~ file: App.jsx:21 ~ uid:', uid);
        // ...
      } else {
        setIsUser(false);
        console.log('no user');
        // User is signed out
        // ...
      }
    });
  }, [auth]);

  useEffect(() => {
    if (isUser) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  }, [isUser]);

  if (!isUser)
    return (
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {routes.map((route, index) =>
          route.index ? (
            <Route
              index
              key={index}
              element={
                route.state ? (
                  <PageWrapper state={route.state}>{route.element}</PageWrapper>
                ) : (
                  route.element
                )
              }
            />
          ) : (
            <Route
              path={route.path}
              key={index}
              element={
                route.state ? (
                  <PageWrapper state={route.state}>{route.element}</PageWrapper>
                ) : (
                  route.element
                )
              }
            />
          )
        )}
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
