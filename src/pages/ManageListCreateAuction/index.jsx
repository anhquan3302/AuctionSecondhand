import React, {useState, useEffect} from 'react';
import {useGetItemAdminQuery} from '../../../services/item.service';
import {Table, Button, Image, Spin, Alert, Tag, Modal} from 'antd';
import Pagination from "@/components/Pagination/index.jsx";
import {useNavigate} from 'react-router-dom';
import DescriptionItem from "@/components/DescriptionItem/index.jsx";
import {Typography} from "@material-tailwind/react";

export default function ProductPending() {
    const [page, setPage] = useState(1);
    const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const navigate = useNavigate('');
    // Fetching data with currentPage and pageSize
    const {data, error, isLoading, refetch} = useGetItemAdminQuery({page: page - 1, limit: 10});
    // Re-fetch data whenever currentPage changes
    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return <Spin size="large"/>;
    }

    if (error) {
        return <Alert message="Error loading products." type="error"/>;
    }

    const pendingProducts = data?.data.items || [];
    const handleAppraisal = (itemId) => {
        navigate(`/dashboard/AppraisalForm/${itemId}`);
    };
    const handleOpenDescriptionModal = (itemDescription) => {
        setSelectedDescription(itemDescription); // Lưu thông tin đấu giá vào state handleOpenDescriptionModal
        setIsModalDescriptionVisible(true);
    };


    const handleCloseDescriptionModal = () => {
        setIsModalDescriptionVisible(false); // Đóng modal
        setSelectedDescription(null); // Reset thông tin đấu giá
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'itemId',
            key: 'itemId',
        },
        {
            title: 'Name',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Description',
            dataIndex: 'itemDescription',
            key: 'itemDescription',
            render: (itemDescription, record) => (
                <Button
                    onClick={() => handleOpenDescriptionModal(record.itemDescription)}
                    className="text-blue-500 hover:underline"
                >
                    Xem mô tả
                </Button>
            ),
        },
        {
            title: 'Brand',
            dataIndex: 'brandName',
            key: 'brand',
        },
        {
            title: 'Status',
            dataIndex: 'itemStatus',
            key: 'itemStatus',
            render: (status) => {
                let color;
                switch (status) {
                    case 'PENDING':
                        color = 'orange';
                        break;
                    case 'APPROVED':
                        color = 'green';
                        break;
                    case 'REJECTED':
                        color = 'red';
                        break;
                    default:
                        color = 'gray';
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (thumbnail, record) => (
                thumbnail ? (
                    <Image width={100} src={thumbnail} alt={record.itemName}/>
                ) : (
                    <span>No Image</span>
                )
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'create_at',
            key: 'createAt',
            render: (text) => text ? new Date(text).toLocaleDateString('vi-VN') : 'N/A',
        },
        {
            title: 'Created By',
            dataIndex: 'createBy',
            key: 'createBy',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="primary" size="small" onClick={() => handleAppraisal(record.itemId)} className="mr-2">Thẩm
                        định</Button>

                </>
            ),
        },
    ];

    return (
        <>
            <Modal
                title="Mô tả"
                visible={isModalDescriptionVisible}
                onCancel={handleCloseDescriptionModal}
                footer={[
                    <Button key="close" onClick={handleCloseDescriptionModal}
                            className="bg-red-500 text-white hover:bg-red-600">
                        Đóng
                    </Button>,
                ]}
                className="rounded-lg shadow-lg"
                width={1000}
            >
                <DescriptionItem selectedDescription={selectedDescription}/>
            </Modal>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Product Pending</h1>
                <Table
                    dataSource={pendingProducts}
                    columns={columns}
                    rowKey="itemId"
                    pagination={false}
                />
                <div className="flex justify-center items-center mt-4">
                    <Pagination
                        currentPage={page}
                        totalPages={data.data.totalPages || 1}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </>
    );
}
