import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { QrPath } from '../../config';
import io from 'socket.io-client';

const SearchPage = () => {
  const [isCamera, setIsCamera] = useState(true);
  const [qrData, setQrData] = useState({ data: null, type: null });

  useEffect(() => {
    // Kết nối đến máy chủ thông qua WebSocket
    const socket = io(QrPath.socket);

    // Bắt sự kiện khi nhận được dữ liệu mới từ máy chủ
    socket.on('qr_data', (newData) => {
      setQrData(newData[0]); // Cập nhật dữ liệu mới vào state
    });

    // Xóa socket khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    console.log(qrData);
  }, [qrData]);
  const requestCamera = async () => {
    await fetch(QrPath.toggle, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: null,
    });
    setIsCamera(!isCamera);
  };

  return (
    <div className='flex flex-col md:flex-row gap-5 p-5 justify-center content-center'>
      <div className='md:basis-1/2 bg-white p-5 shadow-md shadow-gray-400 rounded-md md:max-w-xl flex flex-col'>
        <p className='text-2xl font-sans font-semibold text-center mb-5'>Tìm kiếm bằng QR Code</p>
        <div className='mb-5 overflow-hidden flex-1'>
          {isCamera && (
            <img
              src={QrPath.video}
              alt='QR Code'
              className='max-w-full h-auto object-cover object-center mx-auto border-2 border-red-500 rounded-md'
              onError={(e) => {
                console.log('Error camera');
              }}
            />
          )}
        </div>
        <div className='flex justify-center'>
          <Button
            icon={
              <svg
                className='w-6 h-6 text-gray-800 dark:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 14'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Zm7 11-6-2V4l6-2v10Z'
                />
              </svg>
            }
            label={isCamera ? 'Tắt camera' : 'Bật camera'}
            onClick={requestCamera}
          />
        </div>
      </div>
      <div className='md:basis-1/2 bg-white p-5 shadow-md shadow-gray-400 rounded-md md:max-w-xl flex flex-col'>
        <p className='text-2xl font-sans font-semibold text-center mb-5'>Tìm kiếm theo tên</p>
        <div className='flex-1'></div>
        <div className='flex justify-center '>
          <Button
            icon={
              <svg
                className='w-6 h-6 text-gray-800 dark:text-white'
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
            }
            label='Tìm kiếm'
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
