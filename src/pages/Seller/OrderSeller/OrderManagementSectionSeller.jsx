import { Img, SelectBox, Heading, Text, InputDH } from "../../../components";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import { ReactTable } from "../../../components/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState, useEffect } from 'react';
import { Button, Card, Option, Select, Typography, Modal, ModalHeader, ModalBody, ModalFooter } from "@material-tailwind/react";
import { Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";
import { useGetOrderSellerQuery } from "../../../services/order.service";

const TABLE_HEAD = [
    "Hình ảnh",
    "Sản phẩm",
    "Người mua",
    "Trạng thái",
    "Số tiền",
    "Số điện thoại",
    "Tùy chỉnh"
];

export default function OrderManagementSectionSeller({ orders }) {
    const [page, setPage] = useState(1); // Default page to 1 for proper pagination (as APIs often start from page 1)
    const { data: dataOrder, error } = useGetOrderSellerQuery({ page: page - 1, limit: 10 });
    console.log("data", dataOrder);
    const totalPages1 = orders?.totalPages || 1;

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const [openModal, setOpenModal] = useState(false); // Điều khiển modal
    const [selectedOrder, setSelectedOrder] = useState(null); // Lưu trữ thông tin đơn hàng được chọn

    const handleDetail = (orderDetails) => {
        // Gán thông tin đơn hàng vào state để hiển thị trong modal
        setSelectedOrder(orderDetails); // Giả sử setSelectedOrder là hàm set state cho selectedOrder
        setOpenModal(true); // Mở modal
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Đóng modal
        setSelectedOrder(null); // Xóa thông tin đơn hàng đã chọn
    };

    // Hiển thị các đơn hàng lấy từ dataOrder nếu có
    const ordersToDisplay = dataOrder?.auctionOrder || orders;

    return (
        <div className="flex w-full flex-col items-center">
            <div className="mx-auto flex w-full max-w-[1294px] flex-col gap-10 self-stretch">
                <Card className="h-full w-full overflow-auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="p-4 pt-10">
                                        <Typography variant="small" color="blue-gray" className="font-bold leading-none">
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(ordersToDisplay) && ordersToDisplay.length > 0 ? (
                                ordersToDisplay.map(({ orderId, createBy, item, orderStatus, totalPrice, phoneNumber, paymentMethod, shippingType, auctionOrder }) => (
                                    <tr key={orderId}>
                                        <td className="p-4">
                                            {item ? (
                                                <img src={item.thumbnail || ''} alt={item.itemName || 'No image'} className="w-16 h-16 object-cover rounded" />
                                            ) : (
                                                <div>No image</div>
                                            )}
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {item?.itemName || 'No name'}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {createBy || 'Người mua'}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-center text-gray-600">
                                                {orderStatus === "ready_to_pick" && (
                                                    <Tag
                                                        icon={<SyncOutlined spin />}
                                                        color="blue"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đang chờ
                                                    </Tag>
                                                )}
                                                {orderStatus === "picking" && (
                                                    <Tag
                                                        icon={<SyncOutlined spin />}
                                                        color="orange"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đang lấy hàng
                                                    </Tag>
                                                )}
                                                {orderStatus === "money_collect_picking" && (
                                                    <Tag
                                                        icon={<DollarCircleOutlined />}
                                                        color="cyan"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Lấy hàng và thu tiền
                                                    </Tag>
                                                )}
                                                {orderStatus === "picked" && (
                                                    <Tag
                                                        icon={<CheckCircleOutlined />}
                                                        color="green"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đã lấy hàng
                                                    </Tag>
                                                )}
                                                {orderStatus === "delivering" && (
                                                    <Tag
                                                        icon={<SyncOutlined spin />}
                                                        color="yellow"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đang giao hàng
                                                    </Tag>
                                                )}
                                                {orderStatus === "delivered" && (
                                                    <Tag
                                                        icon={<CheckCircleOutlined />}
                                                        color="purple"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đã giao
                                                    </Tag>
                                                )}
                                                {orderStatus === "delivery_fail" && (
                                                    <Tag
                                                        icon={<CloseCircleOutlined />}
                                                        color="red"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Giao thất bại
                                                    </Tag>
                                                )}
                                                {orderStatus === "returning" && (
                                                    <Tag
                                                        icon={<RollbackOutlined />}
                                                        color="orange"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đang hoàn trả
                                                    </Tag>
                                                )}
                                                {orderStatus === "returned" && (
                                                    <Tag
                                                        icon={<CheckCircleOutlined />}
                                                        color="gray"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đã trả lại
                                                    </Tag>
                                                )}
                                                {orderStatus === "cancel" && (
                                                    <Tag
                                                        icon={<CloseCircleOutlined />}
                                                        color="red"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đã hủy
                                                    </Tag>
                                                )}
                                                {orderStatus === "exception" && (
                                                    <Tag
                                                        icon={<ExclamationCircleOutlined />}
                                                        color="red"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Có sự cố
                                                    </Tag>
                                                )}
                                            </Typography>

                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {totalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice) : 'No amount'}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {phoneNumber || 'No phone'}
                                            </Typography>
                                        </td>

                                      

                                        <td className="p-4">
                                            <Button color="blue" onClick={() => handleDetail({
                                                orderId,
                                                createBy,
                                                item,
                                                orderStatus,
                                                totalPrice,
                                                phoneNumber,
                                                paymentMethod,
                                                shippingType,
                                                auctionOrder
                                            })}>
                                                Chi tiết
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                                        Không có đơn hàng nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>

                <div className="flex justify-center items-center mt-4">
                    <Pagination currentPage={page} totalPages={totalPages1} onPageChange={handlePageChange} />
                </div>
            </div>


            {openModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-100">
                    <div className="bg-white p-6 rounded-lg w-full sm:w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-auto shadow-lg">
                        <h2 className="text-xl font-bold mb-6 text-center">Thông tin chi tiết đơn hàng</h2>

                        {/* Khung thông tin đơn hàng */}
                        <div className="mb-6 p-6 border-b border-gray-300 rounded-lg">
                            <Typography variant="h6" className="font-bold mb-4 text-center text-blue-600">Thông tin đơn hàng</Typography>

                            <div className="space-y-6">
                                <div className="flex justify-between">
                                    <Typography variant="body1" className="font-semibold">Sản phẩm:</Typography>
                                    <Typography variant="body1">{selectedOrder.item?.itemName}</Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="body1" className="font-semibold">Hình ảnh:</Typography>
                                    <img src={selectedOrder.item?.thumbnail || ''} alt={selectedOrder.item?.itemName} className="w-32 h-32 object-cover mt-2 rounded-md" />
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="body1" className="font-semibold">Người mua:</Typography>
                                    <Typography variant="body1">{selectedOrder.createBy}</Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="body1" className="font-semibold">Trạng thái:</Typography>
                                    <Typography variant="body1">{selectedOrder.orderStatus}</Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="body1" className="font-semibold">Số tiền:</Typography>
                                    <Typography variant="body1">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.totalPrice)}</Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="body1" className="font-semibold">Số điện thoại:</Typography>
                                    <Typography variant="body1">{selectedOrder.phoneNumber}</Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="body1" className="font-semibold">Phương thức thanh toán:</Typography>
                                    <Typography variant="body1">{selectedOrder.paymentMethod}</Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="body1" className="font-semibold">Loại vận chuyển:</Typography>
                                    <Typography variant="body1">{selectedOrder.shippingType}</Typography>
                                </div>
                            </div>
                        </div>

                        {/* Khung thông tin đấu giá */}
                        {selectedOrder.auctionOrder && (
                            <div className="mb-6 p-6 border-b border-gray-300 rounded-lg">
                                <Typography variant="h6" className="font-bold mb-4 text-center text-green-600">Thông tin đấu giá</Typography>

                                <div className="space-y-6">
                                    <div className="flex justify-between">
                                        <Typography variant="body1" className="font-semibold">Mã đấu giá:</Typography>
                                        <Typography variant="body1">{selectedOrder.auctionOrder?.auctionId}</Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography variant="body1" className="font-semibold">Bước giá:</Typography>
                                        <Typography variant="body1">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.auctionOrder?.priceStep)}
                                        </Typography>
                                    </div>

                                    <div className="flex justify-between">
                                        <Typography variant="body1" className="font-semibold">Trạng thái đấu giá:</Typography>
                                        <Typography variant="body1">{selectedOrder.auctionOrder?.priceStep || 'Chưa xác định'}</Typography>
                                    </div>

                                    <div className="flex justify-between">
                                        <Typography variant="body1" className="font-semibold">Điều khoản đấu giá:</Typography>
                                        <Typography variant="body1">{selectedOrder.auctionOrder?.termConditions}</Typography>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Nút đóng modal */}
                        <div className="flex justify-center mt-6">
                            <Button onClick={handleCloseModal} color="red" className="w-full">
                                Đóng
                            </Button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}
