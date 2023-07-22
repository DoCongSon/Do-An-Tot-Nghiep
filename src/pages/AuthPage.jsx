import React, { useState } from 'react';
import QRCode from 'qrcode';
import { uploadDataURL } from '../apis/storage.api';
import { addUser } from '../apis/user.api';
import { signin, signup } from '../apis/auth.api';

const AuthPage = () => {
  const [isSignin, setIsSignin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handelSignup = async (e) => {
    e.preventDefault();
    const user = await signup({ email, password });
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
  };

  const handelSignin = async (e) => {
    e.preventDefault();
    await signin({ email, password });
  };

  if (isSignin)
    return (
      <div className='bg-slate-200 flex items-center justify-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full'>
        <div className='relative w-full max-w-xl max-h-full'>
          <div className='relative bg-white rounded-lg shadow'>
            <div className='px-6 py-6 lg:px-8'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Nhập email và mật khẩu để đăng nhập
              </h3>
              <form onSubmit={handelSignin}>
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
                <div className='relative z-0 w-full mb-6 group'>
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
                <div className='flex justify-center'>
                  <button
                    type='submit'
                    className='text-white bg-blue-700 hover:bg-blue-800 my-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-xs px-5 py-2.5 text-center'>
                    Đăng Nhập
                  </button>
                </div>
                <p className='text-sm font-light text-gray-500 mt-8'>
                  Bạn chưa có tài khoản?
                  <span
                    onClick={() => setIsSignin(false)}
                    className='cursor-pointer p-2 inline-block font-medium text-blue-600 hover:underline'>
                    Đăng ký
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className='bg-slate-200 flex items-center justify-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full'>
      <div className='relative w-full max-w-3xl max-h-full'>
        <div className='relative bg-white rounded-lg shadow'>
          <div className='px-6 py-6 lg:px-8'>
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>Tạo tài khoản mới</h3>
            <form onSubmit={handelSignup}>
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
              <div className='relative z-0 w-full mb-6 group'>
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
                <div className='relative z-0 w-full mb-6 group'>
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type='number'
                    min={0}
                    max={150}
                    name='floating_age'
                    id='floating_age'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='floating_age'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                    Tuổi
                  </label>
                </div>
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
                    <label htmlFor='male' className='block ml-2 text-sm font-medium text-gray-900'>
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
                    <label
                      htmlFor='female'
                      className='block ml-2 text-sm font-medium text-gray-900'>
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
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='text-white bg-blue-700 hover:bg-blue-800 my-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-xs px-5 py-2.5 text-center'>
                  Đăng kí
                </button>
              </div>
              <p className='text-sm font-light text-gray-500 mt-8'>
                Bạn đã có tài khoản?
                <span
                  onClick={() => setIsSignin(true)}
                  className='cursor-pointer p-2 inline-block font-medium text-blue-600 hover:underline'>
                  Đăng nhập
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
