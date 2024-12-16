import React, {useState} from 'react';
import FooterBK from '../../../components/FooterBK';
import Sidebar from '../../../partials/Sidebar';
import {Breadcrumb, Layout, theme} from 'antd';
import Header from "@/partials/Header.jsx";
import {message} from "antd"; // Ant Design message for notifications
import {useNavigate} from "react-router-dom";
import {useCreateWithdrawMutation} from '../../../services/withdrawRequest.Service'; // Update this hook
const {Content, Sider} = Layout;

export default function WithdrawMoney() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [withdraws, setWithdraws] = useState({
        requestAmount: "",
        bankAccount: "",
        bankNumber: '',
        note: "",
        bankName: "",
        paymentMethod: "",
    });

    // Use a mutation hook for creating a withdrawal request (POST request)
    const [createWithdraw, {data, error, isLoading}] = useCreateWithdrawMutation();
    const navigate = useNavigate(); // Initialize navigate hook

    // Handle form input changes
    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === "requestAmount") {
            // Chuyển đổi giá trị thành số nguyên
            const formattedValue = value.replace(/\D/g, "");

            setWithdraws((prevState) => ({
                ...prevState,
                [name]: formattedValue ? Number(formattedValue).toLocaleString("vi-VN") : "",
            }));
        } else {
            setWithdraws((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createWithdraw(withdraws);
            // Display success message
            message.success("Yêu cầu rút tiền đã được gửi thành công!");

            // Navigate to the desired page (e.g., withdrawal history)
            navigate("/Dashboard-Seller");
        } catch (err) {
            console.error("Error submitting withdrawal:", err);
            // Display error message
            message.error("Có lỗi xảy ra khi gửi yêu cầu rút tiền. Vui lòng thử lại.");
        }
    };

    return (
        <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            <Content
                style={{
                    padding: '0 48px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        flex: 1,
                    }}
                >
                    <Sider style={{background: colorBgContainer}} width={300}>
                        <Sidebar/>
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                            flex: 1,
                        }}
                    >
                        <div className="flex-1 p-6 bg-gray-50">
                            <h1 className="text-2xl font-bold mb-6">Yêu Cầu Rút Tiền</h1>

                            {/* Withdrawal Form */}
                            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto flex items-center">
                                {/* Left side: Form */}
                                <div className="w-full lg:w-1/2 pr-8">
                                    <form onSubmit={handleSubmit}>
                                        {/* Amount Input */}
                                        <div className="mb-6">
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Số
                                                Tiền</label>
                                            <input
                                                type="text" // Sử dụng type="text" thay vì number
                                                id="amount"
                                                name="requestAmount"
                                                value={withdraws.requestAmount}
                                                onChange={handleChange}
                                                placeholder="Nhập số tiền muốn rút"
                                                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                                                required
                                            />
                                        </div>


                                        {/* Payment Method Select */}
                                        <div className="mb-6">
                                            <label htmlFor="payment-method"
                                                   className="block text-sm font-medium text-gray-700">Phương Thức Thanh
                                                Toán</label>
                                            <select
                                                id="payment-method"
                                                name="paymentMethod"
                                                value={withdraws.paymentMethod}
                                                onChange={handleChange}
                                                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                                                required
                                            >
                                                <option value="">Chọn phương thức</option>
                                                <option value="BANK_TRANSFER">Chuyển khoản</option>
                                            </select>

                                        </div>

                                        {/* Account Number Input */}
                                        <div className="mb-6">
                                            <label htmlFor="bankNumber"
                                                   className="block text-sm font-medium text-gray-700">Số Tài
                                                Khoản</label>
                                            <input
                                                type="text"
                                                id="bankNumber"
                                                name="bankNumber"
                                                value={withdraws.bankNumber}
                                                onChange={handleChange}
                                                placeholder="Nhập số tài khoản"
                                                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                                                required
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="bankName"
                                                   className="block text-sm font-medium text-gray-700">Tên Ngân
                                                Hàng</label>
                                            <input
                                                type="text"
                                                id="bankName"
                                                name="bankName"
                                                value={withdraws.bankName}
                                                onChange={handleChange}
                                                placeholder="Nhập tên tài khoản thụ hưởng"
                                                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                                                required
                                            />
                                        </div>

                                        {/* Account Account Input */}
                                        <div className="mb-6">
                                            <label htmlFor="account-number"
                                                   className="block text-sm font-medium text-gray-700">Chủ Thẻ</label>
                                            <input
                                                type="text"
                                                id="account-number"
                                                name="bankAccount"
                                                value={withdraws.bankAccount}
                                                onChange={handleChange}
                                                placeholder="Nhập tên chủ thẻ"
                                                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                                                required
                                            />
                                        </div>

                                        {/* Note Input */}
                                        <div className="mb-6">
                                            <label htmlFor="note" className="block text-sm font-medium text-gray-700">Ghi
                                                Chú (Tuỳ Chọn)</label>
                                            <textarea
                                                id="note"
                                                name="note"
                                                value={withdraws.note}
                                                onChange={handleChange}
                                                placeholder="Nhập ghi chú nếu cần"
                                                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Đang Gửi Yêu Cầu...' : 'Gửi Yêu Cầu Rút Tiền'}
                                        </button>
                                    </form>
                                </div>

                                {/* Right side: Image */}

                                <div className="w-full lg:w-2/3 mt-8 lg:mt-0 flex justify-center">
                                    <img
                                        src="https://img.pikbest.com/wp/202405/atm-machine-isolated-3d-render-of-a-single-isometric-illustration_9852352.jpg!bw700"
                                        alt="Rút tiền"
                                        className="rounded-lg shadow-lg object-contain max-w-[80%] h-auto"
                                    />
                                </div>
                            </div>

                            {/* Additional Information Section */}
                            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Thông Tin Hỗ Trợ</h2>
                                <p className="text-gray-600">
                                    Nếu bạn có bất kỳ câu hỏi nào về quá trình rút tiền, vui lòng liên hệ với bộ
                                    phận hỗ trợ của chúng tôi.
                                </p>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Content>
            <FooterBK/>
        </Layout>
    );
}
