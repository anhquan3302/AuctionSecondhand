import React, {useState, useEffect} from 'react';
import {
    Button, Card, Typography, Select, Option,
    Dialog, DialogHeader, DialogBody, DialogFooter,
} from "@material-tailwind/react";
import {Empty, Skeleton, Tag} from "antd";
import {CheckCircleOutlined, ExclamationCircleOutlined, SyncOutlined} from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";
import {useGetTransactionWalletAdminQuery} from '../../../services/transactionWallet.service';
import useHookUploadImage from '../../../hooks/useHookUploadImage';
import {Upload} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {Image} from 'antd';
import {useUploadImageTransactionMutation} from '../../../services/transactionWallet.service';

const TABLE_HEAD = [
    "Mã giao dịch",
    "Số tiền",
    "Loại giao dịch",
    "Lời nhắn",
    "Ngày giao dịch",
    "Trạng thái",
    "Thao tác",
];

const dinhDangNgay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN'); // 'vi-VN' định dạng ngày thành dd/MM/yyyy
};

export default function QuanLyGiaoDich() {
    const [moDialog, setMoDialog] = useState(false);
    const [giaoDichDuocChon, setGiaoDichDuocChon] = useState(null);
    const [trang, setTrang] = useState(1);
    const [image, setImage] = useState(null); // state để lưu hình ảnh tải lên

    const [roleFilter, setRoleFilter] = useState(""); // State for role filter
    const [transactionTypeFilter, setTransactionTypeFilter] = useState(""); // State for transactionType filter

    const {data, error, isLoading, isError} = useGetTransactionWalletAdminQuery({
        page: trang - 1, limit: 10, role: roleFilter, transactionType: transactionTypeFilter
    });
    const {UploadImage} = useHookUploadImage();

    const moChiTiet = (transaction) => {
        setGiaoDichDuocChon(transaction);
        setMoDialog(!moDialog);
    };
    const danhSachGiaoDich = data?.data?.items || [];

    const totalPages1 = data?.data?.totalPages || 0;

    const handlePageChange = (newPage) => {
        setTrang(newPage);
    };

    const handleRoleChange = (value) => {
        setRoleFilter(value);
    };

    const handleTransactionTypeChange = (value) => {
        setTransactionTypeFilter(value);
    };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    // Function to handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // if (isLoading) return <p>Đang tải...</p>;
    // if (error) return <p>Lỗi khi tải danh sách giao dịch.</p>;

    return (
        <>
            {/* Dialog chi tiết giao dịch */}
            <Dialog open={moDialog} size="md">
                <DialogHeader className="text-xl font-semibold text-gray-800">Chi tiết giao dịch</DialogHeader>
                <DialogBody className="p-6 bg-white shadow-lg rounded-lg border border-gray-300 space-y-4">
                    {giaoDichDuocChon && (
                        <div className="space-y-3">
                            <p><strong className="text-gray-700">Mã giao dịch:</strong> <span
                                className="text-gray-600">{giaoDichDuocChon.transactionWalletCode}</span></p>
                            <p><strong className="text-gray-700">Số tiền:</strong> <span
                                className="text-green-600">{giaoDichDuocChon.amount.toLocaleString('vi-VN')} VND</span>
                            </p>
                            <p><strong className="text-gray-700">Loại giao dịch:</strong> <span
                                className="text-blue-600">{giaoDichDuocChon.transactionType}</span></p>
                            <p><strong className="text-gray-700">Người gửi:</strong> <span
                                className="text-gray-600">{giaoDichDuocChon.senderName}</span></p>
                            <p><strong className="text-gray-700">Người nhận:</strong> <span
                                className="text-gray-600">{giaoDichDuocChon.recipientName}</span></p>
                            <p><strong className="text-gray-700">Lời nhắn:</strong> <span
                                className="text-gray-600">{giaoDichDuocChon.description || "Không có nội dung"}</span>
                            </p>
                            <p><strong className="text-gray-700">Ngày giao dịch:</strong> <span
                                className="text-gray-600">{dinhDangNgay(giaoDichDuocChon.transactionDate)}</span></p>
                            <p><strong className="text-gray-700">Trạng thái:</strong> <span
                                className="text-green-600">{giaoDichDuocChon.transactionStatus}</span></p>
                            {/* Hình ảnh giao dịch */}
                            <p><strong className="text-gray-700">Hình ảnh:</strong></p>
                            {giaoDichDuocChon.imageUrl ? (
                                <img src={giaoDichDuocChon.imageUrl} alt="Hình ảnh giao dịch"
                                     className="w-full h-auto mt-2"/>
                            ) : (
                                <p className="text-gray-500">Không có hình ảnh.</p>
                            )}

                            {/* Phần thêm ảnh */}
                            <div className="relative mt-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:text-sm file:text-white file:bg-blue-500 file:hover:bg-blue-400"
                                />
                                <p className="mt-2 text-sm text-gray-500">Chọn một hình ảnh để tải lên</p>
                            </div>

                            {/* Xem trước ảnh */}
                            {image && (
                                <div className="mt-4 flex items-center space-x-4">
                                    <div
                                        className="relative w-32 h-32 bg-gray-200 border-2 border-dashed border-gray-300 rounded-md overflow-hidden">
                                        <img
                                            src={image}
                                            alt="Ảnh tải lên"
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    {/* Nút xóa ảnh */}
                                    <button
                                        onClick={() => setImage(null)}
                                        className="mt-4 text-sm text-red-500 hover:text-red-700"
                                    >
                                        Xóa ảnh
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </DialogBody>

                <DialogFooter className="space-x-4">
                    <Button variant="text" color="red" onClick={() => setMoDialog(false)} className="mr-1">
                        Đóng
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Tiêu đề */}
            <h1 className="text-3xl font-bold text-center mb-8">Quản lý giao dịch</h1>

            {/* Filters */}
            <div className="flex justify-between mb-4">
                <div className="w-1/3">
                    <Select label="Chọn Vai trò" onChange={handleRoleChange} value={roleFilter}>
                        <Option value="">Tất cả</Option>
                        <Option value="ADMIN">Admin</Option>
                        <Option value="BUYER">Người đấu giá</Option>
                        <Option value="SELLER">Người bán hàng</Option>
                    </Select>
                </div>
                <div className="w-1/3">
                    <Select label="Loại giao dịch" onChange={handleTransactionTypeChange} value={transactionTypeFilter}>
                        <Option value="">Tất cả</Option>
                        <Option value="DEPOSIT">Nạp tiền</Option>
                        <Option value="WITHDRAWAL">Rút tiền</Option>
                        <Option value="DEPOSIT_AUCTION">Nạp tiền đấu giá</Option>
                    </Select>
                </div>
            </div>

            {/* Danh sách giao dịch */}
            {isError ? (
                <Empty/>
            ) : (
                <Skeleton loading={isLoading} active>
                    <Card className="h-full w-full overflow-scroll">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="p-2 text-left text-sm font-medium">{head}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {danhSachGiaoDich.length > 0 ? (
                                danhSachGiaoDich.map((giaoDich) => (
                                    <tr key={giaoDich.transactionWalletCode}>
                                        <td className="p-2">{giaoDich.transactionWalletCode}</td>
                                        <td className="p-2">{giaoDich.amount.toLocaleString('vi-VN')} VND</td>
                                        <td className="p-4 w-[50px]">
                                            {giaoDich.transactionType === "DEPOSIT" && (
                                                <Tag color="green"
                                                     className="font-semibold w-[120px] h-[20px] text-center">Nạp
                                                    tiền</Tag>
                                            )}
                                            {giaoDich.transactionType === "WITHDRAWAL" && (
                                                <Tag color="red"
                                                     className="font-semibold w-[120px] h-[20px] text-center">Rút
                                                    tiền</Tag>
                                            )}
                                            {giaoDich.transactionType === "REFUND" && (
                                                <Tag color="geekblue-inverse"
                                                     className="font-semibold w-[120px] h-[20px] text-center">Hoàn
                                                    cọc</Tag>
                                            )}
                                            {giaoDich.transactionType === "TRANSFER" && (
                                                <Tag color="green-inverse"
                                                     className="font-semibold w-[120px] h-[20px] text-center">Chuyển
                                                    khoản</Tag>
                                            )}
                                            {giaoDich.transactionType === "DEPOSIT_AUCTION" && (
                                                <Tag color="blue"
                                                     className="font-semibold w-[120px] h-[20px] text-center">Tiền
                                                    cọc</Tag>
                                            )}
                                        </td>

                                        <td className="p-2">{giaoDich.description || "Không có"}</td>
                                        <td className="p-2">{dinhDangNgay(giaoDich.transactionDate)}</td>
                                        <td className="p-4">
                                            {giaoDich.transactionStatus === "COMPLETED" &&
                                                <Tag icon={<CheckCircleOutlined/>} color="success">Available</Tag>}
                                            {giaoDich.transactionStatus === "PENDING" &&
                                                <Tag icon={<SyncOutlined spin/>} color="processing">Pending</Tag>}
                                            {giaoDich.transactionStatus === "CANCELLED" &&
                                                <Tag icon={<ExclamationCircleOutlined/>}
                                                     color="error">Unavailable</Tag>}
                                            {giaoDich.transactionStatus === "FAILED" &&
                                                <Tag icon={<ExclamationCircleOutlined/>} color="warning">Failed</Tag>}
                                        </td>

                                        <td className="p-2">
                                            <Button onClick={() => moChiTiet(giaoDich)}
                                                    className="bg-blue-500 text-white">Xem chi tiết</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center p-4">Không có dữ liệu</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </Card>


                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-4">
                        <Pagination
                            currentPage={trang}
                            totalPages={totalPages1}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </Skeleton>
            )}

        </>
    );
}
