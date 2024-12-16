import React from 'react';
import Header2 from '../../components/Header2';

export default function Policy() {
  return (
    <>
      <Header2 />
      <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-blue-300 to-teal-200 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-white mb-12">Chính Sách & Quy Định</h1>

          {/* Privacy Policy Section */}
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Chính Sách Bảo Mật</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Chúng tôi cam kết bảo mật thông tin cá nhân của bạn. Mọi thông tin thu thập từ bạn sẽ chỉ được sử dụng
              cho mục đích phục vụ nhu cầu giao dịch và hỗ trợ dịch vụ.
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-lg mb-4 space-y-2">
              <li>Chúng tôi không chia sẻ thông tin cá nhân với bên thứ ba.</li>
              <li>Tất cả dữ liệu được lưu trữ an toàn trên hệ thống của chúng tôi.</li>
              <li>Quyền truy cập vào thông tin được kiểm soát chặt chẽ.</li>
            </ul>
          </div>

          {/* Return Policy Section */}
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Chính Sách Đổi Trả</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Chính sách đổi trả của chúng tôi giúp bạn yên tâm khi mua hàng. Nếu sản phẩm bị lỗi hoặc không đúng mô tả,
              bạn có thể yêu cầu đổi trả trong vòng 30 ngày.
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-lg mb-4 space-y-2">
              <li>Đảm bảo sản phẩm còn nguyên vẹn, chưa sử dụng.</li>
              <li>Đổi trả sản phẩm có thể được thực hiện tại cửa hàng hoặc qua đường bưu điện.</li>
              <li>Chi phí vận chuyển đổi trả sẽ được chúng tôi hỗ trợ.</li>
            </ul>
          </div>

          {/* Service Terms Section */}
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Điều Khoản Dịch Vụ</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Trước khi sử dụng dịch vụ của chúng tôi, vui lòng đọc kỹ các điều khoản dịch vụ. Việc sử dụng dịch vụ đồng
              nghĩa với việc bạn đã đồng ý với các điều khoản và chính sách của chúng tôi.
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-lg mb-4 space-y-2">
              <li>Chúng tôi cam kết cung cấp dịch vụ chất lượng và minh bạch.</li>
              <li>Bạn phải tuân thủ các quy định về thanh toán và sử dụng dịch vụ.</li>
              <li>Chúng tôi có quyền thay đổi các điều khoản dịch vụ mà không thông báo trước.</li>
            </ul>
          </div>

          {/* Commission and Deposit Policy Section */}
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Chính Sách Hoa Hồng và Cọc</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              - Hoa hồng sẽ được tính là 5% trên mức giá cuối cùng mà khách hàng trả.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              - Cọc (đặt cọc) sẽ được tính là 10% của giá khởi điểm, được yêu cầu khi thực hiện tham gia đấu giá.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              - Cả hoa hồng và cọc sẽ được tính và thông báo cho khách hàng trước khi hoàn tất giao dịch.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
