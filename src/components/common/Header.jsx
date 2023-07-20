import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const navitems = [
  {
    name: 'Home',
    to: '/',
    icon: (
      <svg
        className='w-6 h-6 text-sky-400'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 20 20'>
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9'
        />
      </svg>
    ),
  },
  {
    name: 'Search',
    to: '/search',
    icon: (
      <svg
        className='w-6 h-6 text-sky-400'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 20 20'>
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
        />
      </svg>
    ),
  },
  {
    name: 'Manage',
    to: '/manage',
    icon: (
      <svg
        className='w-6 h-6 text-sky-400'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 17 18'>
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6'
        />
      </svg>
    ),
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { appState } = useSelector((state) => state.appState);

  return (
    <header>
      <nav className='bg-sky-950 border-gray-200 px-4 md:px-6 py-2.5'>
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
          <div className='flex items-center md:order-2'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-collapse-toggle='mobile-menu-2'
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
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
                    clipRule='evenodd'></path>
                </svg>
              )}
            </button>
          </div>
          <div
            className={
              (isMenuOpen ? '' : 'hidden ') +
              'justify-between items-center w-full md:flex md:w-auto md:order-1'
            }
            id='mobile-menu-2'>
            <ul className='flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0'>
              {navitems.map((item, index) => {
                return (
                  <li key={index} className='flex items-center'>
                    <Link
                      to={item.to}
                      className={
                        appState === item.name
                          ? 'select-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text py-2 pr-4 pl-3 flex justify-center items-center gap-3 rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 text-xl font-semibold hover:text-teal-500'
                          : 'select-none text-sky-400 py-2 pr-4 pl-3 rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 text-xl font-semibold hover:text-teal-500 flex justify-center items-center gap-3'
                      }
                      aria-current='page'>
                      {item.icon}
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
