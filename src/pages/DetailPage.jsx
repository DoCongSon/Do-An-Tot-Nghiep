import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../components/common/Modal';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import MedicalRecordsItem from '../components/common/MedicalRecordsItem';

const DetailPage = () => {
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [patientModalVisible, setPatientModalVisible] = useState(false);
  const [isPatientEdit, setIsPatientEdit] = useState(false);
  const user = useSelector((state) => state.user);
  const cardRef = useRef(null);
  const [qr, setQr] = useState('');
  const [dateString, setDateString] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateString(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, [dateString]);

  useEffect(() => {
    (async () => {
      if (user) {
        const userId = user.userId;
        const QRUrl = await QRCode.toDataURL(userId);
        setQr(QRUrl);
      }
    })();
  }, [user]);

  const handleDownloadCard = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, {});
    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    link.href = data;
    link.download = `Thẻ khám bệnh_${user.name}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='flex flex-col gap-5 md:gap-0 md:flex-row p-5'>
      {user.admin && (
        <div
          onClick={() => setPatientModalVisible(true)}
          className='fixed flex items-center gap-2 bottom-5 right-5 cursor-pointer opacity-50 hover:shadow-md shadow-green-300 bg-green-300 hover:opacity-100 px-4 py-2 rounded-full'>
          <svg
            className='w-6 h-6 text-green-700'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
          <p className='text-xl font-semibold text-green-700'>Khám mới</p>
        </div>
      )}
      {/* person information */}
      <div className='p-0 md:pr-2 md:basis-1/3 lg:basis-1/4 border-b-2 border-gray-600 pb-5 md:border-none md:pb-0'>
        <div onClick={() => setCardModalVisible(true)}>
          <img
            className='cursor-pointer hover:border-red-600 hover:shadow-red-600 bg-white object-contain max-w-[320px] w-full h-auto border-solid border-gray-900 border-4 rounded-xl mx-auto shadow-md shadow-black'
            src={user.QRCodeUrl}
            alt=''
          />
        </div>
        <div>
          <p className='text-center text-3xl font-sans font-medium mt-5 flex items-center justify-center gap-4'>
            {user.name}
            <div className='cursor-pointer p-2 group'>
              <svg
                className='w-6 h-6 text-gray-800 cursor-pointer group-hover:text-red-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 21 21'>
                <path
                  stroke='currentColor'
                  strokeLinecapinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279'
                />
              </svg>
            </div>
          </p>
          <p className='text-xl font-sans font-medium mt-5'>
            <span className='text-red-600 font-bold'>Tuổi: </span>
            {user.age}
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Giới tính: </span>
            {user.sex == 'male' ? 'Nam' : 'Nữ'}
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Ngày sinh: </span>
            {user.dateOfBirth}
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Địa chỉ: </span>
            {user.address}
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Số điện thoại: </span>
            {user.phoneNumber}
          </p>
        </div>
      </div>
      {/* person information */}

      {/* patient information */}
      <div className='md:basis-2/3 lg:basis-3/4'>
        <p className='text-center text-3xl font-sans font-medium'>Lịch sử khám bệnh</p>
        <div className='mt-5 overflow-scroll gap-5 flex flex-col'>
          <MedicalRecordsItem
            date='12/2/2023'
            doctor='Tèo Văn Tũn'
            symptom='ngáo, simp lỏ'
            diagnostic='nghiện'
            prescription='heroin, cần sa, thuốc lắc'
          />
        </div>
      </div>
      {/* patient information */}

      {/* card modal */}
      <Modal isVisible={cardModalVisible} onClose={() => setCardModalVisible(false)}>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>Thẻ khám bệnh</h3>
        <div
          ref={cardRef}
          className='overflow-hidden bg-blue-50 border-solid border-blue-800 border-4 mx-auto shadow-md shadow-blue-800 p-5'>
          <p className='text-3xl font-bold text-blue-900 pb-8 text-center'>Thẻ khám bệnh</p>
          <div className='flex'>
            <img
              className='object-contain w-40 h-40 border-blue-800 border-2 rounded-xl'
              src={qr}
            />
            <div className='ml-5'>
              <p className='text-lg font-semibold text-gray-900 mb-2'>Tên: {user.name}</p>
              <p className='text-lg font-semibold text-gray-900 mb-2'>Tuổi: {user.age}</p>
              <p className='text-lg font-semibold text-gray-900 mb-2'>
                Giới tính: {user.sex === 'male' ? 'Nam' : 'Nữ'}
              </p>
              <p className='text-lg font-semibold text-gray-900'>Địa chỉ: {user.address}</p>
            </div>
          </div>
        </div>
        <div className='flex justify-end mt-5'>
          <button
            onClick={handleDownloadCard}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            Tải về
          </button>
        </div>
      </Modal>
      {/* card modal */}

      <Modal isVisible={patientModalVisible} onClose={() => setPatientModalVisible(false)}>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>Thông tin khám bệnh</h3>
        <h3 className='block mb-6 text-sm font-medium text-gray-900'>{`Thời gian: ${dateString}`}</h3>
        <form onSubmit={() => {}}>
          <div className='relative z-0 w-full mb-6 group'>
            <label htmlFor='doctor' className='block mb-2 text-sm font-medium text-gray-900'>
              Bác sĩ
            </label>
            <input
              type='text'
              id='doctor'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
              placeholder='Nhập họ và tên bác sĩ...'></input>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <label htmlFor='symptom' className='block mb-2 text-sm font-medium text-gray-900'>
              Triệu chứng
            </label>
            <textarea
              id='symptom'
              rows='3'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
              placeholder='Nhập chi tiết các triệu chứng của bệnh nhân...'></textarea>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <label htmlFor='diagnostic' className='block mb-2 text-sm font-medium text-gray-900'>
              Chuẩn đoán
            </label>
            <textarea
              id='diagnostic'
              rows='3'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
              placeholder='Nhập các chuẩn đoán về bệnh...'></textarea>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <label htmlFor='prescription' className='block mb-2 text-sm font-medium text-gray-900'>
              Đơn thuốc
            </label>
            <textarea
              id='prescription'
              rows='4'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
              placeholder='Nhập chi tiết về đơn thuốc và cách sử dụng...'></textarea>
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

export default DetailPage;
