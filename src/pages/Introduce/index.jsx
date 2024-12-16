import React from 'react';
import Header2 from '../../components/Header2'; // Assuming Header2 is your custom header component
import { useNavigate } from 'react-router-dom';

export default function AboutAuction() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/product');
    }
    
    return (
        <>
            <Header2 />
            <div className="min-h-screen bg-gradient-to-r from-blue-300 via-teal-400 to-sky-500 py-12">
                <div className="container mx-auto px-4">

                    {/* Page Header */}
                    <h1 className="text-5xl font-extrabold text-center text-white mb-12">
                        Giới Thiệu Hệ Thống Đấu Giá
                    </h1>

                    {/* About Auction System Section */}
                    <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Về Hệ Thống Đấu Giá</h2>
                        <p className="text-gray-800 text-lg leading-relaxed mb-4">
                            Chào mừng bạn đến với hệ thống đấu giá trực tuyến của chúng tôi! Nơi bạn có thể tham gia đấu giá các sản phẩm đa dạng, từ hàng hóa, sản phẩm công nghệ, đến những món đồ quý giá. Chúng tôi mang đến cho bạn một nền tảng đấu giá đơn giản, minh bạch và an toàn.
                        </p>
                        <p className="text-gray-800 text-lg leading-relaxed mb-4">
                            Hệ thống của chúng tôi hỗ trợ đấu giá thời gian thực, nơi mà người tham gia có thể đặt giá và theo dõi các cuộc đấu giá ngay lập tức. Bạn chỉ cần tạo tài khoản, tham gia đấu giá và bạn có thể sở hữu các sản phẩm yêu thích với giá cả hợp lý.
                        </p>
                    </div>

                    {/* How It Works Section */}
                    <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Cách Thức Hoạt Động</h2>
                        <p className="text-gray-800 text-lg leading-relaxed mb-4">
                            Đấu giá trên hệ thống của chúng tôi rất đơn giản. Dưới đây là các bước tham gia:
                        </p>
                        <ul className="list-decimal pl-5 text-gray-800 text-lg mb-4">
                            <li>Đăng ký tài khoản hoặc đăng nhập vào hệ thống.</li>
                            <li>Chọn sản phẩm bạn muốn tham gia đấu giá.</li>
                            <li>Đặt giá của bạn và theo dõi cuộc đấu giá trong thời gian thực.</li>
                            <li>Khi hết thời gian đấu giá, người có giá cao nhất sẽ thắng và nhận được sản phẩm.</li>
                        </ul>
                    </div>

                    {/* Why Participate Section */}
                    <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Lý Do Nên Tham Gia Đấu Giá</h2>
                        <ul className="list-disc pl-5 text-gray-800 text-lg mb-4 space-y-2">
                            <li>Tham gia các cuộc đấu giá với giá bắt đầu thấp và cơ hội có thể sở hữu sản phẩm giá trị.</li>
                            <li>Hệ thống đấu giá minh bạch và công bằng.</li>
                            <li>Có thể theo dõi cuộc đấu giá trực tiếp và dễ dàng tham gia.</li>
                            <li>Được đảm bảo quyền lợi người thắng đấu giá với các chính sách bảo mật và thanh toán an toàn.</li>
                        </ul>
                    </div>

                    {/* Auction Products Section */}
                    <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Sản Phẩm Đấu Giá</h2>
                        <p className="text-gray-800 text-lg leading-relaxed mb-4">
                            Chúng tôi có rất nhiều sản phẩm đang được đấu giá. Dưới đây là một số ví dụ về các sản phẩm bạn có thể tham gia đấu giá:
                        </p>
                        <ul className="list-disc pl-5 text-gray-800 text-lg mb-4">
                            <li>Điện thoại thông minh, máy tính bảng, laptop.</li>
                            <li>Đồng hồ cao cấp và trang sức.</li>
                            <li>Sản phẩm điện tử, thiết bị gia dụng, đồ công nghệ.</li>
                            <li>Sản phẩm thể thao, đồ gia dụng, đồ chơi trẻ em.</li>
                        </ul>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <button onClick={handleClick} className="bg-blue-600 text-white text-lg py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300">
                            Tham Gia Đấu Giá Ngay
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
