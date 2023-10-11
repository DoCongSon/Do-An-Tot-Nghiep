import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import DetailPage from '../pages/DetailPage';
import ManagePage from '../pages/ManagePage';

const routesAdmin = [
  {
    index: true,
    element: <HomePage />,
    state: 'Home',
  },
  {
    path: '/search',
    element: <SearchPage />,
    state: 'Search',
  },
  {
    path: '/manage',
    element: <ManagePage />,
    state: 'Manage',
  },
  {
    path: '/person/:personId',
    element: <DetailPage />,
    state: 'person',
  },
];

const routesUser = [
  {
    index: true,
    element: <DetailPage />,
    state: 'Home',
  },
];

export { routesAdmin, routesUser };
