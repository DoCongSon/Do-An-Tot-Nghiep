import React from 'react';
import Button from '../components/common/Button';

const ManagePage = () => {
  return (
    <div className='p-5'>
      <div className='flex flex-row justify-end'>
        <Button
          label='Thêm bệnh nhân'
          icon={
            <svg
              className='w-[16px] h-[16px] text-white'
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
          }
          onClick={() => {
            console.log('Thêm bệnh nhân');
          }}
        />
      </div>
    </div>
  );
};

export default ManagePage;
