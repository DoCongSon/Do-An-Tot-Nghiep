import React from 'react';

const ManagePage = () => {
  return (
    <div className='p-5'>
      <div className='flex flex-row justify-end'>
        <button className='bg-blue-500 hover:bg-blue-200 hover:text-gray-800 text-white group font-bold py-2 px-4 rounded inline-flex items-center'>
          <svg
            className='w-[16px] h-[16px] group-hover:text-gray-800 mr-2 text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 18'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 8h6m-3 3V5m-6-.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z'
            />
          </svg>
          <span>Thêm bệnh nhân</span>
        </button>
      </div>
    </div>
  );
};

export default ManagePage;
