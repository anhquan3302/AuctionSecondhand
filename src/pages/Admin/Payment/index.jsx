import React, { useState } from "react";
import { FaMoneyBillWave, FaCommentDots, FaExchangeAlt, FaTimes } from "react-icons/fa";
import { useWithdrawForSellerMutation } from "@/services/withdrawRequest.Service.js";
import { useParams } from "react-router-dom";
import  {message} from "antd";

export default function Payment() {
    const { id } = useParams();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [transactionType, setTransactionType] = useState('TRANSFER');
    const [withdrawForSeller, { isLoading, isError, isSuccess }] = useWithdrawForSellerMutation();

    // Format số tiền thành VND
    const formatCurrency = (value) => {
        return value
            .replace(/\D/g, "") // Loại bỏ tất cả ký tự không phải số
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Thêm dấu phẩy sau mỗi 3 chữ số
    };

    const handleAmountChange = (e) => {
        const formattedAmount = formatCurrency(e.target.value);
        setAmount(formattedAmount);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rawAmount = amount.replace(/,/g, ""); // Loại bỏ dấu phẩy trong số tiền

        try {
            const response = await withdrawForSeller({
                withdrawId: id, // ID từ useParams
                body: {
                    amount: parseFloat(rawAmount),
                    description,
                    transactionType,
                },
            }).unwrap(); // Lấy dữ liệu trả về từ mutation

            console.log("Transaction successful:", response);

            // Redirect đến cổng thanh toán VNPay
            if (response?.data?.paymentUrl) {
                console.log("Redirecting to VNPay:", response.data.paymentUrl);
                window.location.href = response.data.paymentUrl; // Chuyển hướng đến URL thanh toán của VNPay
            } else {
                alert("Không tìm thấy đường dẫn thanh toán!");
            }
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Giao dịch thất bại! Vui lòng thử lại.");
        }
    };





    const handleCancel = () => {
        setAmount('');
        setDescription('');
        setTransactionType('TRANSFER');
    };

    return (
        <div className="max-w-2xl mx-auto p-8">
            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-xl p-8"
            >
                <h2 className="text-2xl font-bold text-white text-center mb-6">Chuyển Tiền</h2>

                <div className="mb-6 flex items-center">
                    <FaMoneyBillWave className="mr-3 text-white text-2xl" />
                    <div className="flex-1">
                        <label
                            className="block text-white text-sm font-semibold mb-2"
                            htmlFor="amount"
                        >
                            Số tiền (VND)
                        </label>
                        <input
                            type="text"
                            id="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className="shadow-lg appearance-none border rounded-md w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập số tiền"
                            required
                        />
                    </div>
                </div>

                <div className="mb-6 flex items-center">
                    <FaExchangeAlt className="mr-3 text-white text-2xl" />
                    <div className="flex-1">
                        <label
                            className="block text-white text-sm font-semibold mb-2"
                            htmlFor="transactionType"
                        >
                            Loại giao dịch
                        </label>
                        <select
                            id="transactionType"
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                            className="shadow-lg appearance-none border rounded-md w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="TRANSFER">Chuyển tiền</option>
                            <option value="WITHDRAWAL">Rút tiền</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6 flex items-center">
                    <FaCommentDots className="mr-3 text-white text-2xl" />
                    <div className="flex-1">
                        <label
                            className="block text-white text-sm font-semibold mb-2"
                            htmlFor="description"
                        >
                            Mô tả
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow-lg appearance-none border rounded-md w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập mô tả (tùy chọn)"
                        />
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center py-2 px-6 text-sm bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none transition-all"
                    >
                        <FaTimes className="mr-1" /> Hủy
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-6 text-lg bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none transition-all"
                    >
                        Xác Nhận Chuyển Tiền
                    </button>
                </div>
            </form>
        </div>
    );
}
