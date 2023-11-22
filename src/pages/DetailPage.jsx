import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../components/common/Modal';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import MedicalRecordsItem from '../components/common/MedicalRecordsItem';
import {
  addMedicalRecord,
  deleteMedicalRecord,
  updateMedicalRecord,
} from '../apis/medicalRecord.api';
import { collection, onSnapshot, orderBy, query, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { updateUser } from '../apis/user.api';

const DetailPage = () => {
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [patientModalVisible, setPatientModalVisible] = useState(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [isPatientEdit, setIsPatientEdit] = useState(false);
  const [user, setUser] = useState(null);
  const isAdmin = useSelector((state) => state.user.admin);
  const userIdProfile = useSelector((state) => state.user.userId);
  const cardRef = useRef(null);
  const [qr, setQr] = useState('');
  const [dateString, setDateString] = useState(new Date().toLocaleString());
  const [inputDoctor, setInputDoctor] = useState('');
  const [inputSymptom, setInputSymptom] = useState('');
  const [inputDiagnostic, setInputDiagnostic] = useState('');
  const [inputPrescription, setInputPrescription] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [medicalRecordId, setMedicalRecordId] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState('');
  const [sex, setSex] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    let userId;
    if (isAdmin) {
      userId = window.location.pathname.split('/')[2];
    } else {
      userId = userIdProfile;
    }
    const unsub = onSnapshot(doc(db, 'users', userId), { includeMetadataChanges: true }, (doc) => {
      if (doc.exists()) {
        setUser({ ...doc.data(), userId: doc.id });
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateString(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, [dateString]);

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

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, `users/${user.userId}/medicalRecords`), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), medicalRecordId: doc.id });
      });
      setMedicalRecords(data);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    (async () => {
      if (user) {
        const userId = user.userId;
        const QRUrl = await QRCode.toDataURL(userId);
        setQr(QRUrl);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (user) {
        setName(user.name);
        setAddress(user.address);
        setDateOfBirth(user.dateOfBirth);
        setPhoneNumber(user.phoneNumber);
        setSex(user.sex);
      }
    })();
  }, [user, editUserModalVisible]);

  const handleEditUser = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      address,
      dateOfBirth,
      phoneNumber,
      age,
      sex,
    };
    await updateUser({ userId: user.userId, data: newUser });
    toast.success('Cập nhật thông tin thành công!');
    setEditUserModalVisible(false);
  };

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

  const handleAddMedicalRecord = async (e) => {
    e.preventDefault();
    const medicalRecord = {
      date: dateString,
      doctor: inputDoctor,
      symptom: inputSymptom,
      diagnostic: inputDiagnostic,
      prescription: inputPrescription,
    };
    await addMedicalRecord(user.userId, medicalRecord);
    toast.success('Thêm hồ sơ thành công!');
    setInputDoctor('');
    setInputSymptom('');
    setInputDiagnostic('');
    setInputPrescription('');
    setMedicalRecordId(null);
    setPatientModalVisible(false);
  };

  const handleUpdateMedicalRecord = async (e) => {
    e.preventDefault();
    const medicalRecord = {
      date: dateString,
      doctor: inputDoctor,
      symptom: inputSymptom,
      diagnostic: inputDiagnostic,
      prescription: inputPrescription,
    };
    await updateMedicalRecord(user.userId, medicalRecordId, medicalRecord);
    toast.success('Cập nhật hồ sơ thành công!');
    setInputDoctor('');
    setInputSymptom('');
    setInputDiagnostic('');
    setInputPrescription('');
    setMedicalRecordId(null);
    setPatientModalVisible(false);
  };

  const handleDeleteMedicalRecord = async (medicalRecordId) => {
    await deleteMedicalRecord(user.userId, medicalRecordId);
    toast.success('Xóa hồ sơ thành công!');
  };

  const handleClickMedicalRecord = (medicalRecord) => {
    setInputDoctor(medicalRecord.doctor);
    setInputSymptom(medicalRecord.symptom);
    setInputDiagnostic(medicalRecord.diagnostic);
    setInputPrescription(medicalRecord.prescription);
    setInputDate(medicalRecord.date);
    setMedicalRecordId(medicalRecord.medicalRecordId);
    setIsPatientEdit(true);
    setPatientModalVisible(true);
  };

  const handleCloseModalPatient = () => {
    setInputDoctor('');
    setInputSymptom('');
    setInputDiagnostic('');
    setInputPrescription('');
    setMedicalRecordId(null);
    setIsPatientEdit(false);
    setPatientModalVisible(false);
  };

  return (
    <div className='flex flex-col gap-5 md:gap-0 md:flex-row p-5'>
      {isAdmin && (
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
            src={user?.QRCodeUrl}
            alt=''
          />
        </div>
        <div>
          <div className='text-center text-3xl font-sans font-medium mt-5 flex items-center justify-center gap-4'>
            {user?.name}
            <div className='cursor-pointer p-2 group' onClick={() => setEditUserModalVisible(true)}>
              <svg
                className='w-6 h-6 text-gray-800 cursor-pointer group-hover:text-red-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 21 21'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279'
                />
              </svg>
            </div>
          </div>
          <p className='text-xl font-sans font-medium mt-5'>
            <span className='text-red-600 font-bold'>Tuổi: </span>
            {user?.age}
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Giới tính: </span>
            {user?.sex == 'male' ? 'Nam' : 'Nữ'}
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Ngày sinh: </span>
            {user?.dateOfBirth}
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Địa chỉ: </span>
            {user?.address}
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Số điện thoại: </span>
            {user?.phoneNumber}
          </p>
        </div>
      </div>
      {/* person information */}

      {/* patient information */}
      <div className='md:basis-2/3 lg:basis-3/4'>
        <p className='text-center text-3xl font-sans font-medium'>Lịch sử khám bệnh</p>
        <div className='mt-5 overflow-scroll gap-5 flex flex-col'>
          {medicalRecords.map((medicalRecord) => (
            <MedicalRecordsItem
              onClick={() => handleClickMedicalRecord(medicalRecord)}
              onDelete={() => handleDeleteMedicalRecord(medicalRecord.medicalRecordId)}
              key={medicalRecord.medicalRecordId}
              {...medicalRecord}
            />
          ))}
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
              <p className='text-lg font-semibold text-gray-900 mb-2'>Tên: {user?.name}</p>
              <p className='text-lg font-semibold text-gray-900 mb-2'>Tuổi: {user?.age}</p>
              <p className='text-lg font-semibold text-gray-900 mb-2'>
                Giới tính: {user?.sex === 'male' ? 'Nam' : 'Nữ'}
              </p>
              <p className='text-lg font-semibold text-gray-900'>Địa chỉ: {user?.address}</p>
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

      {/* patient modal */}
      <Modal isVisible={patientModalVisible} onClose={handleCloseModalPatient}>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>
          {isPatientEdit ? 'Chỉnh sửa thông tin khám bệnh' : 'Thêm thông tin khám bệnh'}
        </h3>
        <h3 className='block mb-6 text-sm font-medium text-gray-900'>{`Thời gian: ${
          isPatientEdit ? inputDate : dateString
        }`}</h3>
        <form onSubmit={isPatientEdit ? handleUpdateMedicalRecord : handleAddMedicalRecord}>
          <div className='relative z-0 w-full mb-6 group'>
            <label htmlFor='doctor' className='block mb-2 text-sm font-medium text-gray-900'>
              Bác sĩ
            </label>
            <input
              value={inputDoctor}
              onChange={(e) => setInputDoctor(e.target.value)}
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
              onChange={(e) => setInputSymptom(e.target.value)}
              value={inputSymptom}
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
              onChange={(e) => setInputDiagnostic(e.target.value)}
              value={inputDiagnostic}
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
              onChange={(e) => setInputPrescription(e.target.value)}
              value={inputPrescription}
              id='prescription'
              rows='4'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
              placeholder='Nhập chi tiết về đơn thuốc và cách sử dụng...'></textarea>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              {isPatientEdit ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
        </form>
      </Modal>
      {/* patient modal */}

      {/* edit user modal */}
      <Modal isVisible={editUserModalVisible} onClose={() => setEditUserModalVisible(false)}>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>Chỉnh sửa thông tin cá nhân</h3>
        <form onSubmit={handleEditUser}>
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
                type='number'
                maxLength={10}
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
              Xác nhận
            </button>
          </div>
        </form>
      </Modal>
      {/* edit user modal */}
    </div>
  );
};

export default DetailPage;
