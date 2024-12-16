import React, {useState, useEffect} from 'react';
import {Table, Button, Space, Popconfirm, message, Empty, Skeleton} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {useGetAllUserQuery, useDeleteUserMutation} from '../../../services/user.service';
import Pagination from "@/components/Pagination/index.jsx";

export default function ManageUser() {
    const [users, setUsers] = useState([]); // Lưu danh sách người dùng
    const [page, setPage] = useState(1); // Trang hiện tại
    const [total, setTotal] = useState(0);

    // Gọi API lấy danh sách người dùng
    const {data, isLoading, isError} = useGetAllUserQuery({limit: 10, page: page - 1});
    const [deleteUser, {isLoading: isLoadingDelete}] = useDeleteUserMutation();
    const totalPages1 = data?.totalPages || 1;

    useEffect(() => {
        if (data) {
            setUsers(data.items.list || []);
            setTotal(data.total || 0);
        }
    }, [data]);

    const handleDelete = async (userId) => {
        console.log("Xóa người dùng có ID:", userId); // Thông báo ID người dùng đang xóa
        try {
            const result = await deleteUser(userId).unwrap();
            console.log("Kết quả từ API khi xóa người dùng:", result);
            message.success(`Đã xóa người dùng với ID: ${userId}`);
            setUsers(users.filter((u) => u.id !== userId)); // Cập nhật lại danh sách sau khi xóa
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
            message.error(`Không thể xóa người dùng với ID: ${userId}`);
        }
    };

    // Cấu hình các cột của bảng
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <img
                    src={avatar}
                    alt="Avatar"
                    style={{width: 40, height: 40, borderRadius: '50%'}}
                />
            ),
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                const roleStyles = {
                    ADMIN: {backgroundColor: '#F44336', color: '#fff'},
                    SELLER: {backgroundColor: '#4CAF50', color: '#fff'},
                    BUYER: {backgroundColor: '#2196F3', color: '#fff'},
                    STAFF: {backgroundColor: '#FF9800', color: '#fff'},
                    DEFAULT: {backgroundColor: '#FF5722', color: '#fff'},
                };

                const style = roleStyles[role] || roleStyles.DEFAULT;
                const roleText = {
                    ADMIN: 'Quản trị viên',
                    SELLER: 'Người bán',
                    BUYER: 'Người đấu giá',
                    STAFF: 'Nhân viên',
                }[role] || 'Chưa xác định';

                return (
                    <span
                        style={{
                            ...style,
                            padding: '5px 10px',
                            borderRadius: '5px',
                            display: 'inline-block',
                            textAlign: 'center',
                            width: '120px',
                        }}
                    >
                        {roleText}
                    </span>
                );
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span style={{color: status ? '#4CAF50' : '#9E9E9E'}}>
                    {status ? 'Hoạt động' : 'Không hoạt động'}
                </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, user) => (
                <Space size="middle">
                    <Popconfirm
                        title={`Bạn có chắc chắn muốn xóa người dùng ${user.fullName}?`}
                        onConfirm={() => handleDelete(user.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button icon={<DeleteOutlined/>} type="danger">
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Xử lý khi thay đổi trang
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>

            {isError ? (
                <Empty/>
            ) : (
                <Skeleton loading={isLoading} active>
                    <h1>Quản lý người dùng</h1>
                    <Table
                        columns={columns}
                        dataSource={users}
                        //loading={isLoading}
                        pagination={false} // Sử dụng phân trang tùy chỉnh
                        rowKey="id"
                    />
                    {/* Phân trang tùy chỉnh */}
                    <div className="flex justify-center items-center mt-4">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages1} // Tổng số trang
                            onPageChange={handlePageChange}
                        />
                    </div>
                </Skeleton>
            )}
        </div>
    );
}
