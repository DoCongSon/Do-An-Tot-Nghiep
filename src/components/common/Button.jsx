import React from 'react';

const Button = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='bg-blue-500 hover:bg-blue-200 hover:text-gray-800 text-white group font-bold py-2 px-4 rounded inline-flex items-center shadow-sm shadow-gray-400 hover:shadow'>
      {icon}
      <span className='ml-3'>{label}</span>
    </button>
  );
};

export default Button;
