import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { addUser } from '../apis/user.api';
import { uploadDataURL } from '../apis/storage.api';
import { deleteApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config';
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';

const ManagePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setAge(age);
    }
  }, [dateOfBirth]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const tempApp = initializeApp(firebaseConfig, 'tempApp');
    const tempAppAuth = getAuth(tempApp);
    try {
      const userCredential = await createUserWithEmailAndPassword(tempAppAuth, email, password);
      const user = userCredential.user;
      const userId = user.uid;
      const QRUrl = await QRCode.toDataURL(userId);
      const QRCodeUrl = await uploadDataURL({ data: QRUrl, path: `/${userId}/QRcode` });
      await addUser({
        name,
        age,
        sex,
        address,
        phoneNumber,
        dateOfBirth,
        QRCodeUrl,
        userId,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("can't create", { errorCode, errorMessage });
    }
    await signOut(tempAppAuth);
    await deleteApp(tempApp);
    setIsModalVisible(false);
  };

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
            setIsModalVisible(true);
          }}
        />
      </div>
      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>Thêm bệnh nhân mới</h3>
        <form onSubmit={handleAddUser}>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='floating_email'
              id='floating_email'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
            />
            <label
              htmlFor='floating_email'
              className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Email
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              name='floating_password'
              id='floating_password'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
            />
            <label
              htmlFor='floating_password'
              className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Mật khẩu
            </label>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              name='floating_name'
              id='floating_name'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
            />
            <label
              htmlFor='floating_name'
              className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Họ và tên
            </label>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type='text'
              name='floating_address'
              id='floating_address'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
            />
            <label
              htmlFor='floating_address'
              className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Địa chỉ
            </label>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6'>
            <div className='flex gap-6 mb-6 items-center'>
              <p className='text-sm text-gray-500'>Giới tính:</p>
              <div className='flex items-center'>
                <input
                  onChange={(e) => setSex(e.target.value)}
                  checked={sex === 'male'}
                  id='male'
                  type='radio'
                  name='sex'
                  value='male'
                  className='border-gray-300'
                />
                <label htmlFor='male' className='block ml-2 text-sm font-medium text-gray-500'>
                  Nam
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  onChange={(e) => setSex(e.target.value)}
                  checked={sex === 'female'}
                  id='female'
                  type='radio'
                  name='sex'
                  value='female'
                  className='border-gray-300'
                />
                <label htmlFor='female' className='block ml-2 text-sm font-medium text-gray-500'>
                  Nữ
                </label>
              </div>
            </div>
          </div>
          <div className='grid md:grid-cols-2 md:gap-6'>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type='tel'
                name='floating_tel'
                id='floating_tel'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required
              />
              <label
                htmlFor='floating_tel'
                className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                Số điện thoại
              </label>
            </div>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                type='date'
                name='floating_date_of_birth'
                id='floating_date_of_birth'
                className='block py-[9px] px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required
              />
              <label
                htmlFor='floating_date_of_birth'
                className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                Ngày sinh
              </label>
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              Thêm
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManagePage;
