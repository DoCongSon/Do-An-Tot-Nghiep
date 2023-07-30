import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className='bg-slate-200 flex justify-center items-center w-screen h-screen'>
      <div className='rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute'></div>
    </div>
  );
};

export default LoadingOverlay;
