import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import PageWrapper from './components/common/PageWrapper';
import routes from './routes/routes';
import ErrorPage from './pages/ErrorPage';
function App() {
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
