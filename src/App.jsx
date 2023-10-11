import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PageWrapper from './components/common/PageWrapper';
import { routesAdmin, routesUser } from './routes/routes';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './apis/user.api';
import { clearUser, setAdmin, setUser } from './redux/features/userSlice';
import LoadingOverlay from './components/common/LoadingOverlay';
import { setGlobalLoading } from './redux/features/globalLoadingSlice';
import HomePage from './pages/HomePage';

function App() {
  const [isUser, setIsUser] = useState(false);
  const admin = useSelector((state) => state.user.admin);
  const globalLoading = useSelector((state) => state.globalLoading.globalLoading);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    dispatch(setGlobalLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
        const uid = user.uid;
        getUser(uid).then((data) => {
          if (data?.admin) {
            dispatch(setAdmin(true));
            console.log('🚀 ~ file: App.jsx:32 ~ setAdmin:', data?.admin);
          } else {
            dispatch(setAdmin(false));
            dispatch(setUser({ ...data, userId: uid }));
          }
          dispatch(setGlobalLoading(false));
        });
      } else {
        setIsUser(false);
        dispatch(setGlobalLoading(false));
      }
    });
  }, [auth, dispatch]);

  if (globalLoading) return <LoadingOverlay />;

  if (!isUser)
    return (
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    );

  const routes = admin ? routesAdmin : routesUser;
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
