import React, { useState, useEffect } from 'react';
import { Input, Select, Button, message, Spin } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CreditCardOutlined, BankOutlined } from '@ant-design/icons';
import Header2 from '../../components/Header2';
import FooterBK from '../../components/FooterBK';
import { useCreateOrderMutation } from '../../services/order.service';
import { useGetAuctionByIdQuery } from '../../services/auction.service';
import { useParams } from 'react-router-dom';
import { useGetAddressOrderQuery } from '../../services/address.service';
const { TextArea } = Input;
import { useNavigate } from "react-router-dom"; // Nếu dùng React Router v6


export default function CreateOrder() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        shippingMethod: '',
        note: '',
        auctionId: id, // Trường auctionId sẽ lấy giá trị từ URL
    });
    const navigate = useNavigate();
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Lấy thông tin đấu giá từ API
    const { data: auctionData, error: auctionError, isLoading: auctionLoading } = useGetAuctionByIdQuery(id);
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    console.log(userId);

    const { data: addressData, error: addressError, isLoading: addressLoading } = useGetAddressOrderQuery(userId);
    console.log("Data", addressData);



    useEffect(() => {
        if (auctionLoading) {
            console.log("Loading auction data...");
        }

        if (auctionError) {
            console.error("Error fetching auction data:", auctionError);
            message.error('Lỗi khi tải thông tin đấu giá');
        }

        // if (addressError) {
        //     console.error("Error fetching address data:", addressError);
        //     message.error('Lỗi khi tải địa chỉ');
        // }
    }, [auctionData, auctionError, auctionLoading]);

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [paymentMethod, setPaymentMethod] = useState('');
    // const [addressOptions, setAddressOptions] = useState([]);

    // Kiểm tra auctionData và amount để tính hoa hồng và tổng số tiền
    const auctionAmount = auctionData?.data?.amount || 0; // Nếu không có amount, đặt giá trị mặc định là 0
    const commission = auctionAmount * 0.05; // Hoa hồng là 5% của giá đấu
    const totalAmount = auctionAmount + commission; // Tổng số tiền là giá đấu cộng hoa hồng

    const handleSubmit = async () => {
        try {
            const result = await createOrder({
                ...orderDetails,
                paymentMethod,
            }).unwrap();

            message.success('Đơn hàng đã được tạo thành công!');
            console.log("Order created:", result);

            // Chuyển trang sau 5 giây
            setTimeout(() => {
                navigate('/OrderManagementBuyer'); // Đường dẫn bạn muốn chuyển đến
            }, 5000);

        } catch (error) {
            message.error('Lỗi khi tạo đơn hàng. Vui lòng thử lại.');
            console.error("Create order error:", error);
        }
    };

    return (
        <div>
            <Header2 />
           <div className="max-w-screen-xl mx-auto p-4 flex flex-col lg:flex-row gap-4">
                {/* Bên trái - Thông tin đơn hàng */}
                <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Thông tin đơn hàng</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Họ và tên</label>
                            <Input
                                prefix={<UserOutlined />}
                                value={orderDetails.fullName}
                                onChange={(e) => setOrderDetails({ ...orderDetails, fullName: e.target.value })}
                                placeholder="Nhập họ và tên"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <Input
                                prefix={<MailOutlined />}
                                type="email"
                                value={orderDetails.email}
                                onChange={(e) => setOrderDetails({ ...orderDetails, email: e.target.value })}
                                placeholder="Nhập email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Số điện thoại</label>
                            <Input
                                prefix={<PhoneOutlined />}
                                type="tel"
                                value={orderDetails.phoneNumber}
                                onChange={(e) => setOrderDetails({ ...orderDetails, phoneNumber: e.target.value })}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Phương thức giao hàng</label>
                            <Select
                                className="w-full"
                                value={orderDetails.shippingMethod}
                                onChange={(value) => setOrderDetails({ ...orderDetails, shippingMethod: value })}
                                placeholder="Chọn phương thức giao hàng"
                            >
                                <Select.Option value="standard">Giao hàng tiêu chuẩn</Select.Option>
                                <Select.Option value="express">Giao hàng nhanh</Select.Option>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Ghi chú</label>
                            <TextArea
                                rows={3}
                                value={orderDetails.note}
                                onChange={(e) => setOrderDetails({ ...orderDetails, note: e.target.value })}
                                placeholder="Thêm ghi chú nếu có"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Địa chỉ</label>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-4 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300 hover:shadow-2xl rounded-full p-4 transition-all duration-300 ease-in-out transform hover:scale-105">
                                    {/* Dấu chấm nhỏ - với hiệu ứng lấp lánh */}
                                    <div className="w-5 h-5 bg-gradient-to-tl from-blue-500 to-indigo-500 rounded-full mr-4 transform transition-all duration-300 hover:scale-110"></div>
                                    {/* Hiển thị địa chỉ với màu chữ và hiệu ứng */}
                                    <span className="text-gray-900 text-lg font-semibold tracking-tight hover:text-indigo-600">
                                        {addressData?.address_name || 'Địa chỉ mặc định'},
                                        {addressData?.ward_name || 'Phường mặc định'},
                                        {addressData?.district_name || 'Quận/Huyện mặc định'},
                                        {addressData?.province_name || 'Tỉnh/Thành mặc định'}
                                    </span>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {/* Bên phải - Hình ảnh sản phẩm và phương thức thanh toán */}
                <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg">
                    {/* Thông tin sản phẩm */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin sản phẩm</h3>
                        <div className="flex flex-wrap sm:flex-nowrap mb-6 border-b pb-6 border-gray-200">
                            <div className="w-full sm:w-1/3 lg:w-1/4 mb-4 sm:mb-0">
                                <img
                                    src={auctionData?.data.thumbnail}
                                    alt={auctionData?.data.itemName}
                                    className="w-full h-auto object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div className="w-full sm:w-2/3 lg:w-3/4 pl-0 sm:pl-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">{auctionData?.data.itemName}</h4>
                                <p className="text-sm text-gray-600 mb-4">{auctionData?.data.description}</p>
                                <p className="text-gray-700 font-medium mb-2">Người bán: {auctionData?.data.seller}</p>
                                <p className="text-gray-700 font-medium">{formatCurrency(auctionAmount)}</p>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn phương thức thanh toán</h3>
                    <div className="mb-6">
                        <Select
                            className="w-full"
                            value={paymentMethod}
                            onChange={(value) => setPaymentMethod(value)}
                            placeholder="Chọn phương thức thanh toán"
                        >
                            <Select.Option value="WALLET_PAYMENT">
                                <CreditCardOutlined /> Ví hệ thống
                            </Select.Option>
                        </Select>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-lg text-gray-800">Tổng số tiền</span>
                            <span className="font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
                        </div>
                    </div>

                    {/* Thanh toán */}
                    <div className="flex items-center gap-4">
                        <Button
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
                            onClick={handleSubmit}
                            loading={isLoading || auctionLoading}
                        >
                            {isLoading || auctionLoading ? 'Đang xử lý' : 'Tạo đơn hàng'}
                        </Button>
                    </div>
                </div>
            </div>
            <FooterBK />
        </div>
    );
}
