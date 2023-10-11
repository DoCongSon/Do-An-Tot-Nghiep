import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleClickQR = () => {
    navigate('/search');
  };

  const handleClickManager = () => {
    navigate('/manage');
  };

  return (
    <div className='p-10'>
      <div className='flex items-center justify-center gap-5'>
        <div className='h-20'>
          <img src='/logo-hvktmm.png' className='w-full h-full' />
        </div>
        <div>
          <p className='text-center text-xl font-sans font-bold'>Học viện Kĩ thuật Mật mã</p>
          <p className='text-center text-xl font-sans font-bold'>Khoa Điện tử - Viễn thông</p>
        </div>
      </div>
      <div className='flex items-center'>
        <div className='basis-1/2'>
          <p className='leading-normal text-2xl font-sans font-bold uppercase mb-10 text-red-800'>
            Đồ án tốt nghiệp
          </p>
          <p className='leading-normal text-5xl font-sans font-bold uppercase bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>
            Quản lý thông tin bệnh nhân bằng QrCode
          </p>
          <div className='flex gap-5'>
            <button
              onClick={handleClickQR}
              className='p-3 bg-emerald-300 hover:bg-emerald-500 cursor-pointer hover:text-white font-medium text-base rounded-md mt-10 shadow-md'>
              Quét QRCode ngay
            </button>
            <button
              onClick={handleClickManager}
              className='p-3 bg-emerald-300 hover:bg-emerald-500 cursor-pointer hover:text-white font-medium text-base rounded-md mt-10 shadow-md'>
              Trang quản lý
            </button>
          </div>
        </div>
        <div className='basis-1/2'>
          <img src='/healthcare.png' alt='healthcare' className='w-full h-full' />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
