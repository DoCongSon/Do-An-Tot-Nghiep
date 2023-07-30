import React from 'react';

const CartUser = ({ name, dateOfBirth, address, QRCodeUrl, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='cursor-pointer hover:bg-blue-50 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-2'>
      <div className='flex gap-4 items-center'>
        <img className='w-24 h-24 rounded-md shadow-lg' src={QRCodeUrl} alt='QR image' />
        <div className='flex-1'>
          <p className='text-lg font-bold text-black'>{name}</p>
          <p className='text-md text-black'>{`Ngày sinh: ${dateOfBirth}`}</p>
          <p className='text-md text-black'>{`Địa chỉ: ${address}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CartUser;
