import React from 'react';

const IconButton = ({ style, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        'cursor-pointer bg-blue-400 hover:bg-blue-700 text-white font-bold flex justify-center items-center p-2 rounded-full' +
        (style ? ` ${style}` : '')
      }>
      {icon}
    </button>
  );
};

export default IconButton;
