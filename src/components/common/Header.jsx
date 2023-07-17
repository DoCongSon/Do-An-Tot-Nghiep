import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const navitems = [
  { name: 'Home', to: '/' },
  {
    name: 'Search',
    to: '/search',
  },
  {
    name: 'Manage',
    to: '/manage',
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { appState } = useSelector((state) => state.appState);
  console.log('🚀 ~ file: Header.jsx:10 ~ appState:', appState);

  return (
    <header>
      <nav className='bg-sky-950 border-gray-200 px-4 lg:px-6 py-2.5'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <Link to='/' className='flex items-center select-none'>
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              className='mr-3 h-6 sm:h-9'
              alt='Flowbite Logo'
            />
            <span className='font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
              Patient management
            </span>
          </Link>
          <div className='flex items-center lg:order-2'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-collapse-toggle='mobile-menu-2'
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
              aria-controls='mobile-menu-2'
              aria-expanded='false'>
              <span className='sr-only'>Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'></path>
                </svg>
              ) : (
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipTule='evenodd'></path>
                </svg>
              )}
            </button>
          </div>
          <div
            className={
              (isMenuOpen ? '' : 'hidden ') +
              'justify-between items-center w-full lg:flex lg:w-auto lg:order-1'
            }
            id='mobile-menu-2'>
            <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
              {navitems.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className={
                        appState === item.name
                          ? 'select-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 text-xl font-semibold hover:text-teal-500'
                          : 'select-none text-white block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 text-xl font-semibold hover:text-teal-500'
                      }
                      aria-current='page'>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
