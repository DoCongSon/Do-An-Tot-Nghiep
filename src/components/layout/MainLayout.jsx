import { Outlet } from 'react-router-dom';
import Header from '../common/Header';

const MainLayout = () => {
  return (
    <div className='bg-slate-200 min-h-screen'>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
