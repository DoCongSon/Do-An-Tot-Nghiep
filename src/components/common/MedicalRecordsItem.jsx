import React from 'react';
import IconButton from './IconButton';
import { useSelector } from 'react-redux';

const MedicalRecordsItem = ({ date, doctor, symptom, diagnostic, prescription }) => {
  const isAdmin = useSelector((state) => state.user.admin);

  return (
    <div className='bg-white p-5 shadow-md rounded-md hover:border-2 hover:border-red-400 cursor-pointer'>
      <div className='flex items-center'>
        <div className='flex-1 flex'>
          <p className='font-bold'>Ngày khám: {date}</p>
          <p className='font-bold ml-10'>Bác sĩ: {doctor}</p>
        </div>
        {isAdmin && (
          <IconButton
            style='bg-red-200 hover:bg-red-300'
            icon={
              <svg
                class='w-6 h-6 text-red-700'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'>
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
            }
          />
        )}
      </div>
      <div className='flex mt-3 gap-5'>
        <div className='flex-1'>
          <span className='font-bold'>Triệu chứng:</span>
          <p className='bg-yellow-100 p-2 shadow mt-2'>{symptom}</p>
        </div>
        <div className='flex-1'>
          <span className='font-bold'>Chuẩn đoán:</span>
          <p className='bg-yellow-100 p-2 shadow mt-2'>{diagnostic}</p>
        </div>
      </div>
      <div className='mt-3'>
        <span className='font-bold'>Đơn thuốc:</span>
        <p className='bg-yellow-100 p-2 shadow mt-2'>{prescription}</p>
      </div>
    </div>
  );
};

export default MedicalRecordsItem;
