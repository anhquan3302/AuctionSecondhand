import { ButtonDH, TextArea, Heading, InputDH } from "../../../components";
import React, { useState, useEffect } from "react";
import { Button, Input, message } from 'antd';
import { useApproveItemAdminMutation, useGetItemDetailQuery } from "../../../services/item.service";
import { useNavigate } from "react-router-dom";
export default function StaffAssessmentSection({ itemId }) {
    const { data: itemDetail, isLoading, isError } = useGetItemDetailQuery({ id: itemId });
    const [approveItem] = useApproveItemAdminMutation();
    const [status, setStatus] = useState('PENDING');
    const [reason, setReason] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (itemDetail) {
            setStatus(itemDetail.itemStatus || 'PENDING');
        }
    }, [itemDetail]);

    const handleApprove = async () => {
        try {
            const response = await approveItem({ itemId, status: 'PENDING_AUCTION', reason });
            console.log("Approve response:", response);
            setStatus('ACCEPTED');
            navigate('/dashboard/ProductPending');
            message.success("Sản phẩm đã được phê duyệt.");
        } catch (error) {
            console.error("Error approving item:", error);
            message.error("Có lỗi xảy ra khi phê duyệt sản phẩm.");

        }
    };

    const handleReject = async () => {
        try {
            const response = await approveItem({ itemId, status: 'REJECTED', reason });
            console.log("Reject response:", response);
            setStatus('REJECTED');
            message.success("Sản phẩm đã bị từ chối.");
            navigate('/dashboard/ProductPending');
        } catch (error) {
            console.error("Error rejecting item:", error);
            message.error("Có lỗi xảy ra khi từ chối sản phẩm.");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading item details.</div>;
    }

    return (
        <>
            {/* staff assessment section */}
            <div className="mt-[76px] flex justify-center w-full">
                <div className="container-xs flex justify-center md:px-5 w-full">
                    <div className="flex w-full max-w-4xl flex-col items-center">
                        {/* Kết quả thẩm định */}
                        <Heading
                            size="textxl"
                            as="h2"
                            className="bg-green-a700_01 px-[34px] pb-1 text-[25px] font-medium text-white-a700 md:text-[23px] sm:px-5 sm:text-[21px] rounded-md text-center w-full"
                        >
                            Kết quả thẩm định
                        </Heading>
                        <div className="mt-5 flex w-full items-center">
                            <Heading
                                size="textxs"
                                as="h5"
                                className="text-[15px] font-medium text-black-900"
                            >
                                {/* Giấy thẩm định */}
                            </Heading>
                        </div>
                        <div className="mt-[18px] w-full">
                            <div className="flex flex-col items-center w-full">
                                <Heading
                                    size="texts"
                                    as="h6"
                                    className="self-start font-jost text-[16px] font-medium text-blue_gray-900"
                                >
                                    Ghi chú
                                </Heading>
                                <textarea
                                    name="Reason"
                                    placeholder="Lý do"
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-8 font-jost text-blue_gray-600 sm:pt-5 resize-none"  // resize-none để không thể thay đổi kích thước của textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)} // Cập nhật giá trị lý do khi người dùng nhập
                                />



                                {/* Buttons */}
                                <div className="mt-[66px] flex w-full justify-between gap-5 max-w-lg">
                                    <ButtonDH
                                        shape="round"
                                        className="w-full max-w-[200px] rounded-md px-[34px] bg-green-500 text-white hover:bg-green-600"
                                        onClick={handleApprove}
                                    >
                                        Phê duyệt
                                    </ButtonDH>
                                    <ButtonDH
                                        shape="round"
                                        className="w-full max-w-[200px] rounded-md px-[34px] bg-red-500 text-white hover:bg-red-600"
                                        onClick={handleReject}
                                    >
                                        Từ chối
                                    </ButtonDH>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
