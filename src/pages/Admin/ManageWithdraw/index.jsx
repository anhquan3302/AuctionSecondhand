import React, {useState} from 'react';
import {ArrowDownTrayIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Card, CardHeader, Typography, CardBody, Chip, Avatar, Input, Button} from "@material-tailwind/react";
import {Drawer, Descriptions, Badge, Space, Empty, Skeleton} from 'antd';
import Pagination from "@/components/Pagination/index.jsx";
import {useGetWithdrawsQuery} from '../../../services/withdrawRequest.Service';
import {useNavigate} from "react-router-dom";

const TABLE_HEAD = ["Name", "Amount", "Date", "Status", "Account", "Reason", "Detail", ""];

const ManagementWithdrawOfSeller = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const onClose = () => {
        setOpen(false);
    };
    const [page, setPage] = useState(1);
    const {
        data: withdrawResponse,
        isError: withdrawError,
        isLoading: withdrawLoading
    } = useGetWithdrawsQuery({page: page - 1, limit: 10});

    const totalPages = withdrawResponse?.data?.totalPages;
    console.log(totalPages);

    const list = withdrawResponse?.data?.data || [];
    console.log("List", list);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const [selectedWithdraw, setSelectedWithdraw] = useState(null);
    const showDrawer = (withdraw) => {
        setSelectedWithdraw(withdraw);
        setOpen(true);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    }

    const handleCreate = () => {
        if (selectedWithdraw) {
            const { withdrawId } = selectedWithdraw;
            navigate(`/dashboard/payments/${withdrawId}`);
            console.log(`Navigating to payment page with ID: ${withdrawId}`);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <Drawer
                width={1100}
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
            >
                {selectedWithdraw && (
                    <Descriptions
                        title="Yêu Cầu Rút Tiền"
                        bordered
                        column={1}
                        extra={
                            <Space>
                                <Button danger onClick={handleCloseDrawer}>Hủy Yêu Cầu</Button>
                                <Button type="primary" onClick={handleCreate}>Xác Nhận</Button>
                            </Space>
                        }
                    >
                        <Descriptions.Item label="Tên Người Rút">{selectedWithdraw.bankAccount}</Descriptions.Item>
                        <Descriptions.Item label="Số Tài Khoản">{selectedWithdraw.accountNumber}</Descriptions.Item>
                        <Descriptions.Item label="Số Tiền">{formatCurrency(selectedWithdraw.requestAmount)}</Descriptions.Item>
                        <Descriptions.Item label="Trạng Thái">{selectedWithdraw.requestStatus}</Descriptions.Item>
                        <Descriptions.Item label="Ghi Chú">{selectedWithdraw.note}</Descriptions.Item>
                        <Descriptions.Item label="Phương Thức Thanh Toán">{selectedWithdraw.paymentMethod}</Descriptions.Item>
                        <Descriptions.Item label="Ngân Hàng">{selectedWithdraw.bankName}</Descriptions.Item>
                        <Descriptions.Item label="Ngày Rút">{new Date(selectedWithdraw.processAt).toLocaleString()}</Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>

            <h1 className="text-3xl font-bold text-center mb-8">Withdrawal Requests Management</h1>
            {withdrawError ? (
                <Empty/>
            ) : (
                <Skeleton loading={withdrawLoading} active>
                    <Card className="h-full w-full">
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                                <div>
                                    <Typography variant="h5" color="blue-gray">Recent Transactions</Typography>
                                    <Typography color="gray" className="mt-1 font-normal">These are details about the
                                        last transactions</Typography>
                                </div>
                                <div className="flex w-full shrink-0 gap-2 md:w-max">
                                    <div className="w-full md:w-72">
                                        <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5"/>}/>
                                    </div>
                                    <Button variant="gradient" className="flex items-center gap-3" size="sm">
                                        <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4"/> Download
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-scroll px-0">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <Typography variant="small" color="blue-gray"
                                                        className="font-normal leading-none opacity-70">{head}</Typography>
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {list.map((withdraw, index) => {
                                    const {
                                        requestAmount,
                                        requestStatus,
                                        processAt,
                                        bankAccount,
                                        accountNumber,
                                        note,
                                        avtar
                                    } = withdraw;
                                    const isLast = index === list.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={accountNumber}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src="https://static.vecteezy.com/system/resources/previews/006/487/917/original/man-avatar-icon-free-vector.jpg" alt={bankAccount} size="md"
                                                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"/>
                                                    <Typography variant="small" color="blue-gray"
                                                                className="font-bold">{bankAccount}</Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray"
                                                            className="font-normal">{formatCurrency(requestAmount)}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray"
                                                            className="font-normal">{new Date(processAt).toLocaleString()}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={requestStatus}
                                                        color={requestStatus === "PAID" ? "green" : requestStatus === "PENDING" ? "amber" : "red"}
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray"
                                                            className="font-normal capitalize">{bankAccount}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray"
                                                            className="font-normal truncate" style={{
                                                    maxWidth: '110px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {note}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Button
                                                    key={withdraw.withdrawId}
                                                    onClick={() => showDrawer(withdraw)}
                                                    style={{ marginBottom: '10px', display: 'block' }}
                                                >
                                                    Xem Chi Tiết
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                    <div className="flex justify-center items-center mt-4">
                        <Pagination totalPages={totalPages} setPage={setPage}/>
                    </div>
                </Skeleton>
            )}
        </div>
    );
};

export default ManagementWithdrawOfSeller;