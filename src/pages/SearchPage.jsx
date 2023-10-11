import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { QrPath } from '../../config';
import io from 'socket.io-client';
import CartUser from '../components/common/CartUser';
import { getUser, queryUser } from '../apis/user.api';
import { getStatusCamera, toggleCamera } from '../apis/camera.api';
import Modal from '../components/common/Modal';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchDataQR, setSearchDataQR] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isCamera, setIsCamera] = useState(false);
  const [qrData, setQrData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    queryUser(searchValue).then((data) => {
      setSearchData(data);
    });
  }, [searchValue]);

  useEffect(() => {
    const socket = io(QrPath.socket, { autoConnect: true });
    socket.on('qr_data', (newData) => {
      setQrData(newData);
    });

    // Xóa socket khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (qrData.length > 0) {
        const userId = qrData[0].data;
        const data = await getUser(userId);
        if (data) {
          setSearchDataQR({ ...data, userId });
        } else {
          toast.warning('QR code không hợp lệ', { toastId: 'qr-code' });
        }
      }
    })();
  }, [qrData]);

  useEffect(() => {
    if (searchDataQR) {
      setIsModalVisible(true);
    }
  }, [searchDataQR]);

  useEffect(() => {
    getStatusCamera().then((data) => {
      setIsCamera(data.camera);
    });
  }, []);

  const handleToggleCamera = async () => {
    const ok = await toggleCamera();
    if (ok) {
      setIsCamera(!isCamera);
    }
  };

  const handleClickUser = (user) => {
    dispatch(setUser(user));
    navigate(`/person/${user.userId}`);
  };

  return (
    <div className='flex flex-col md:flex-row gap-5 p-5 justify-center'>
      <div className='md:basis-1/2 bg-white p-5 shadow-md shadow-gray-400 rounded-md md:max-w-xl flex flex-col'>
        <p className='text-2xl font-sans font-semibold text-center mb-5'>Tìm kiếm bằng QR Code</p>
        <div className='mb-5 overflow-hidden flex-1'>
          <img
            src={isCamera ? QrPath.video : '/no-camera.jpg'}
            alt='QR Code'
            className='max-w-full h-auto object-cover object-center mx-auto border-2 border-red-500 rounded-md'
            onError={(e) => {
              console.log('Error camera');
            }}
          />
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
            onClick={handleToggleCamera}
          />
        </div>
      </div>
      <div className='md:basis-1/2 bg-white p-5 shadow-md shadow-gray-400 rounded-md md:max-w-xl flex flex-col'>
        <p className='text-2xl font-sans font-semibold text-center mb-5'>Tìm kiếm theo tên</p>
        <div className=''>
          <label
            htmlFor='default-search'
            className='mb-2 text-sm font-medium text-gray-900 sr-only'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 '
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
            </div>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type='search'
              id='default-search'
              className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Nhập tên để tìm kiếm'
              required
            />
          </div>
        </div>
        <div className='mt-5 flex flex-col items-center gap-5 max-h-96 overflow-scroll'>
          {searchData.map((user) => (
            <CartUser
              onClick={() => handleClickUser(user)}
              key={user.userId}
              address={user.address}
              name={user.name}
              dateOfBirth={user.dateOfBirth}
              QRCodeUrl={user.QRCodeUrl}
            />
          ))}
        </div>
      </div>
      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>Đã tìm thấy bệnh nhân</h3>
        <div className='flex items-center justify-center'>
          {searchDataQR && (
            <CartUser
              key={searchDataQR.userId}
              address={searchDataQR.address}
              name={searchDataQR.name}
              dateOfBirth={searchDataQR.dateOfBirth}
              QRCodeUrl={searchDataQR.QRCodeUrl}
              onClick={() => handleClickUser(searchDataQR)}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SearchPage;
