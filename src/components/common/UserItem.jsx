import React from 'react';

const UserItem = ({ name, dateOfBirth, address, QRCodeUrl, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-2'>
      <div className='flex gap-4 items-center'>
        <img className='w-36 h-36 rounded-md border-2' src={QRCodeUrl} alt='QR image' />
        <div className='flex-1'>
          <p className='text-lg font-bold text-black'>{name}</p>
          <p className='text-md text-black'>{`Ngày sinh: ${dateOfBirth}`}</p>
          <p className='text-md text-black'>{`Địa chỉ: ${address}`}</p>
          <div className='flex justify-end gap-2 mt-5'>
            <button className='cursor-pointer bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-2 flex justify-center items-center w-10 h-10 rounded-full'>
              <svg
                class='w-[20px] h-[20px] text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 19'>
                <path d='M7.324 9.917A2.479 2.479 0 0 1 7.99 7.7l.71-.71a2.484 2.484 0 0 1 2.222-.688 4.538 4.538 0 1 0-3.6 3.615h.002ZM7.99 18.3a2.5 2.5 0 0 1-.6-2.564A2.5 2.5 0 0 1 6 13.5v-1c.005-.544.19-1.072.526-1.5H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h7.687l-.697-.7ZM19.5 12h-1.12a4.441 4.441 0 0 0-.579-1.387l.8-.795a.5.5 0 0 0 0-.707l-.707-.707a.5.5 0 0 0-.707 0l-.795.8A4.443 4.443 0 0 0 15 8.62V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.12c-.492.113-.96.309-1.387.579l-.795-.795a.5.5 0 0 0-.707 0l-.707.707a.5.5 0 0 0 0 .707l.8.8c-.272.424-.47.891-.584 1.382H8.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1.12c.113.492.309.96.579 1.387l-.795.795a.5.5 0 0 0 0 .707l.707.707a.5.5 0 0 0 .707 0l.8-.8c.424.272.892.47 1.382.584v1.12a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1.12c.492-.113.96-.309 1.387-.579l.795.8a.5.5 0 0 0 .707 0l.707-.707a.5.5 0 0 0 0-.707l-.8-.795c.273-.427.47-.898.584-1.392h1.12a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM14 15.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z' />
              </svg>
            </button>
            <button className='cursor-pointer bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-2 w-10 h-10 rounded-full flex justify-center items-center'>
              <svg
                class='w-[20px] h-[20px] text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'>
                <path d='M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
