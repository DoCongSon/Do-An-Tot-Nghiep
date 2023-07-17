import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import DetailPage from '../pages/DetailPage';
import ManagePage from '../pages/ManagePage';

export const routesGen = {
  home: '/',
  person: (id) => `/person/${id}`,
};

const routes = [
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
    state: 'person.personId',
  },
];

export default routes;
