import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useCreateBidSealedMutation } from "@/services/bid.service.js";
import { message, Spin } from "antd";
import { Button } from "@material-tailwind/react";

export default function SealedBidForm({
    dataItem,
    cancelModel,
    isRefetchWinningBid,
    isRefetchHighestBid,
}) {

    const selectedAuctionId = dataItem.auction.auction_id;
    const [maxBid, setMaxBid] = useState('');
    const [hasBid, setHasBid] = useState(false);
    const [createBid, { isLoading }] = useCreateBidSealedMutation();

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (hasBid) {
            message.error('Bạn đã đặt giá thầu rồi và không thể thay đổi.');
            return;
        }
    
        const numericBid = parseFloat(maxBid.replace(/[^\d]/g, '')); // Chỉ gửi số hợp lệ
        if (isNaN(numericBid)) {
            message.error('Vui lòng nhập giá hợp lệ.');
            return;
        }
    
        try {
            const createAuctionBid = await createBid({
                bidAmount: numericBid,
                auctionId: selectedAuctionId,
            }).unwrap();
    
            message.success(createAuctionBid?.message);
            setHasBid(true);
            setMaxBid("");
            isRefetchWinningBid();
            isRefetchHighestBid();
            cancelModel();
        } catch (error) {
            console.error("Error response:", error);
            message.error("Đã xảy ra lỗi.");
        }
    };

    // Lọc dữ liệu nhập vào
    const handleBidChange = (event) => {
        const value = event.target.value;

        // Xóa các ký tự không hợp lệ như dấu '.' hoặc các biểu tượng tiền tệ
        const cleanedValue = value.replace(/[^0-9]/g, ''); // Giữ chỉ số nguyên (0-9) hợp lệ
        setMaxBid(cleanedValue);
    };

    const handleClickSuggestion = (multiplier) => {
        const suggestedBid = Math.floor(dataItem.auction.buy_now_price * multiplier);
        setMaxBid(suggestedBid.toString());
    };

    return (
        <>
            <Helmet>
                <title>Đấu giá kín - Đặt giá thầu một lần duy nhất</title>
                <meta
                    name="description"
                    content="Tham gia đấu giá kín. Chỉ được phép đặt giá thầu một lần duy nhất và không thể thay đổi sau đó."
                />
            </Helmet>

            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <p className="block font-medium text-gray-700">
                    Giá mua ngay: {formatCurrency(dataItem.auction.buy_now_price)}
                </p>

                <div className="mt-6">
                    <label className="block font-medium text-gray-700">Đặt giá thầu</label>
                    <div className="flex mt-2">
                        <input
                            type="text"
                            placeholder="Nhập giá thầu"
                            value={maxBid}
                            onChange={handleBidChange} // Gọi hàm lọc tại đây
                            disabled={hasBid}
                            className="border border-gray-300 rounded-l px-4 py-2 w-full"
                        />
                        <Button
                            className={`px-4 py-2 rounded-r ${hasBid || isLoading
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                : 'bg-blue-500 text-white'
                                }`}
                            disabled={hasBid || isLoading}
                            onClick={handleSubmit}
                        >
                            {isLoading ? <Spin size="small" /> : 'Đặt giá'}
                        </Button>
                    </div>
                </div>

                {/* Giá gợi ý hiển thị trực tiếp */}
                <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-2">Giá gợi ý:</p>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleClickSuggestion(1.10)} 
                            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        >
                            {formatCurrency(Math.floor(dataItem.auction.buy_now_price * 1.10))}
                        </button>
                        <button
                            onClick={() => handleClickSuggestion(1.30)}
                            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        >
                            {formatCurrency(Math.floor(dataItem.auction.buy_now_price * 1.30))}
                        </button>
                        <button
                            onClick={() => handleClickSuggestion(1.50)}
                            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                        >
                            {formatCurrency(Math.floor(dataItem.auction.buy_now_price * 1.50))}
                        </button>
                    </div>
                </div>

                <p className="mt-6 text-sm text-gray-500" style={{ color: 'red' }}>
                    Lưu ý: Chỉ được phép đặt giá thầu một lần duy nhất. Sau khi đặt, bạn không thể thay đổi thông tin hoặc sửa đổi giá thầu.
                </p>
            </div>
        </>
    );
}
