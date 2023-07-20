import React from 'react';

const DetailPage = () => {
  console.log(location);
  return (
    <div className='flex flex-row p-5'>
      {/* person information */}
      <div className='basis-1/3'>
        <div>
          <img
            className='w-60 h-80 border-solid border-gray-900 border-4 rounded-xl mx-auto shadow-md shadow-black'
            src='https://i.pinimg.com/750x/41/0b/a0/410ba00d86532bd9f7baa72ab6fa1dd9.jpg'
            alt=''
          />
        </div>
        <div>
          <p className='text-center text-3xl font-sans font-medium mt-2'>Đỗ Công Sơn - BN1234</p>
          <p className='text-xl font-sans font-medium mt-5'>
            <span className='text-red-600 font-bold'>Tuổi: </span>21
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Giới tính: </span>Nam
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Ngày sinh: </span>01/10/2001
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Địa chỉ: </span>Hoàng Văn Thụ, Chương Mỹ, Hà
            Nội
          </p>
          <p className='text-xl font-sans font-medium mt-2'>
            <span className='text-red-600 font-bold'>Số điện thoại: </span>0123456789
          </p>
        </div>
      </div>
      {/* person information */}

      {/* patient information */}
      <div className='basis-2/3'>
        <p className='text-center text-3xl font-sans font-medium'>Lịch sử khám bệnh</p>
        <div className='mt-10 overflow-y-auto max-h-[600px]'>
          <div className='mb-10'>
            <p className='text-xl font-sans font-medium mt-2'>
              <span className='text-red-600 font-bold'>Lần khám: </span>1
            </p>
            <p className='text-xl font-sans font-medium mt-2'>
              <span className='text-red-600 font-bold'>Ngày khám: </span>01/10/2023
              <span className='text-red-600 font-bold ml-10 inline-block'>Giờ khám:</span> 09:00 -
              17:00
            </p>
            <p className='text-xl font-sans font-medium mt-2'>
              <span className='text-red-600 font-bold'>Chuẩn đoán: </span>Đau đầu
            </p>
            <div className='p-5 bg-white border-2 border-green-500 rounded-lg mt-2'>
              <p className='text-xl font-sans font-medium'>
                <span className='text-red-600 font-bold'>Đơn thuốc & cách điều trị: </span>
              </p>
              <p className='text-xl font-sans font-medium mt-2 leading-8'>
                Nghỉ ngơi trong một căn phòng tối, yên tĩnh. Chườm nóng hoặc lạnh lên thái dương
                hoặc trán. Uống nhiều nước. Tập thể dục thường xuyên. Giảm căng thẳng. Nếu cơn đau
                đầu dữ dội hoặc không đáp ứng với các biện pháp điều trị không dùng thuốc, bạn có
                thể dùng thuốc giảm đau không kê đơn như acetaminophen (Tylenol), ibuprofen (Advil,
                Motrin) hoặc naproxen (Aleve).
              </p>
            </div>
          </div>
          <div className='mb-10'>
            <p className='text-xl font-sans font-medium mt-2'>
              <span className='text-red-600 font-bold'>Lần khám: </span>1
            </p>
            <p className='text-xl font-sans font-medium mt-2'>
              <span className='text-red-600 font-bold'>Ngày khám: </span>01/10/2023
              <span className='text-red-600 font-bold ml-10 inline-block'>Giờ khám:</span> 09:00 -
              17:00
            </p>
            <p className='text-xl font-sans font-medium mt-2'>
              <span className='text-red-600 font-bold'>Chuẩn đoán: </span>Đau đầu
            </p>
            <div className='p-5 bg-white border-2 border-green-500 rounded-lg mt-2'>
              <p className='text-xl font-sans font-medium'>
                <span className='text-red-600 font-bold'>Đơn thuốc & cách điều trị: </span>
              </p>
              <p className='text-xl font-sans font-medium mt-2 leading-8'>
                Nghỉ ngơi trong một căn phòng tối, yên tĩnh. Chườm nóng hoặc lạnh lên thái dương
                hoặc trán. Uống nhiều nước. Tập thể dục thường xuyên. Giảm căng thẳng. Nếu cơn đau
                đầu dữ dội hoặc không đáp ứng với các biện pháp điều trị không dùng thuốc, bạn có
                thể dùng thuốc giảm đau không kê đơn như acetaminophen (Tylenol), ibuprofen (Advil,
                Motrin) hoặc naproxen (Aleve).
              </p>
            </div>
          </div>
          <div className='mb-10'>
            <p className='text-xl font-sans font-medium mt-2'>
              <span className='text-red-600 font-bold'>Lần khám: </span>1
            </p>
            <p className='text-xl font-sans font-medium mt-2'>
              <span className='text-red-600 font-bold'>Ngày khám: </span>01/10/2023
              <span className='text-red-600 font-bold ml-10 inline-block'>Giờ khám:</span> 09:00 -
              17:00
            </p>
            <p className='text-xl font-sans font-medium mt-2'>
              <span className='text-red-600 font-bold'>Chuẩn đoán: </span>Đau đầu
            </p>
            <div className='p-5 bg-white border-2 border-green-500 rounded-lg mt-2'>
              <p className='text-xl font-sans font-medium'>
                <span className='text-red-600 font-bold'>Đơn thuốc & cách điều trị: </span>
              </p>
              <p className='text-xl font-sans font-medium mt-2 leading-8'>
                Nghỉ ngơi trong một căn phòng tối, yên tĩnh. Chườm nóng hoặc lạnh lên thái dương
                hoặc trán. Uống nhiều nước. Tập thể dục thường xuyên. Giảm căng thẳng. Nếu cơn đau
                đầu dữ dội hoặc không đáp ứng với các biện pháp điều trị không dùng thuốc, bạn có
                thể dùng thuốc giảm đau không kê đơn như acetaminophen (Tylenol), ibuprofen (Advil,
                Motrin) hoặc naproxen (Aleve).
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* patient information */}
    </div>
  );
};

export default DetailPage;
