import { Helmet } from "react-helmet";
import React, { useState } from "react"; // Import useState
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import { Breadcrumb, Layout, theme, Table, Spin, Alert, Button, Modal, Skeleton, Empty, Tag, Statistic } from "antd";
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { useGetOrderQuery } from "../../services/order.service";
import { FaShoppingCart, FaProductHunt, FaGavel } from 'react-icons/fa';
import FeedbackForm from "../../components/FeedbackForm";
import { useCheckFeedbackQuery } from "../../services/feedback.service";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';


const { Content, Sider } = Layout;
export default function OrderManagementBuyer() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { data, error, isLoading } = useGetOrderQuery({ page: 0, limit: 10 });
    console.log(data);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isFeedbackSellerModalVisible, setIsFeedbackSellerModalVisible] = useState(false);



    const statusStyles = {
        PENDING: 'bg-gray-500 text-white',
        CONFIRMED: 'bg-green-500 text-white',
        CANCELED: 'bg-red-500 text-white',
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
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
            title: 'Số tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice) => (
                <Statistic value={totalPrice} />
            ),
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => (
                <Tag icon={<SyncOutlined spin />} color="processing">
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold mr-2"
                        onClick={() => handleDetailClick(record)}
                    >
                        Chi tiết
                    </Button>
                    {record.feedback ? (
                        <Button
                            type="default"
                            className="bg-yellow-700 hover:bg-gray-600 text-white font-bold"
                            onClick={() => handleViewFeedbackClick(record)}
                        >
                            Xem Đánh Giá
                        </Button>
                    ) : (
                        record.status === "delivered" && (
                            <Button
                                type="default"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold"
                                onClick={() => handleReviewClick(record)}
                            >
                                Đánh Giá
                            </Button>
                        )
                    )}
                </>
            ),
        },
    ];


    const handleDetailClick = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true); // Open the order details modal
    };

    const handleReviewClick = (order) => {
        setSelectedOrder(order);
        setIsFeedbackModalVisible(true);
    };

    const handleViewFeedbackClick = (order) => {
        setSelectedOrder(order);
        setIsFeedbackSellerModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    const handleFeedbackModalClose = () => {
        setIsFeedbackModalVisible(false);
        setSelectedOrder(null);
    };

    const handleFeedbackSellerModalClose = () => {
        setIsFeedbackSellerModalVisible(false);
        setSelectedOrder(null);
    };

    const dataSource = data?.data.map(order => ({
        key: order.id,
        id: order.orderId,
        email: order.email,
        phoneNumber: order.phoneNumber,
        totalPrice: order.totalPrice,
        status: order.orderStatus,
        note: order.note,
        quantity: order.quantity,
        paymentMethod: order.paymentMethod,
        shippingType: order.shippingType,
        itemId: order.item.itemId,
        itemName: order.item.itemName,
        sellerName: order.item.sellerName,
        thumbnail: order.item.thumbnail,
        auctionId: order.auctionOrder.auctionId,
        auctionTypeName: order.auctionOrder.auctionTypeName,
        priceStep: order.auctionOrder.priceStep,
        auctionstatus: order.auctionOrder.status,
        termConditions: order.auctionOrder.termConditions,
        feedback: order.feedback
    })) || [];





    return (
        <>
            <Helmet>
                <title>Order Management</title>
            </Helmet>
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header2 />
                <Content
                    style={{
                        padding: '0 48px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>Orders</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1,
                        }}
                    >
                        <Sider
                            style={{
                                background: colorBgContainer,
                            }}
                            width={300}
                        >
                            <SiderUserBK />
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1,
                            }}
                        >
                            {isLoading ? (
                                // <Spin size="large"/>
                                <Skeleton active avatar={true} title={true} round={true} paragraph={true}
                                />
                            ) : error ? (
                                <Empty />
                            ) : (
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    pagination={{ pageSize: 10 }}
                                    rowClassName="align-middle"
                                />
                            )}
                        </Content>
                    </Layout>
                </Content>
                <FooterBK
                    className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"
                />

                {/* Modal to display order details */}


                <Modal
                    title="Chi tiết đơn hàng"
                    visible={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                    width={600} // Set a width for the modal
                    bodyStyle={{ padding: '20px' }} // Add padding to modal body
                >
                    {selectedOrder && (
                        <div>
                            {/* Order Details Section */}
                            <div style={{
                                backgroundColor: '#f0f8ff',
                                padding: '15px',
                                borderRadius: '5px',
                                marginBottom: '15px'
                            }}>
                                <h3 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <FaShoppingCart style={{ marginRight: '10px', color: '#007bff' }} /> {/* Order Icon */}
                                    Thông tin đơn hàng
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>ID:</strong>
                                    <span>{selectedOrder.id}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Email:</strong>
                                    <span>{selectedOrder.email}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Số điện thoại:</strong>
                                    <span>{selectedOrder.phoneNumber}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Số tiền:</strong>
                                    <span>{selectedOrder.totalPrice}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Trạng thái:</strong>
                                    <span>{selectedOrder.status}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Ghi chú:</strong>
                                    <span>{selectedOrder.note}</span>
                                </div>
                            </div>

                            {/* Item Details Section */}
                            <div style={{
                                backgroundColor: '#fff8dc',
                                padding: '15px',
                                borderRadius: '5px',
                                marginBottom: '15px'
                            }}>
                                <h3 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <FaProductHunt
                                        style={{ marginRight: '10px', color: '#ff7f50' }} /> {/* Product Icon */}
                                    Thông tin sản phẩm
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Số lượng:</strong>
                                    <span>{selectedOrder.quantity}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Phương thức thanh toán:</strong>
                                    <span>{selectedOrder.paymentMethod}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Phương thức vận chuyển:</strong>
                                    <span>{selectedOrder.shippingType}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Mã sản phẩm:</strong>
                                    <span>{selectedOrder.itemId}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Tên sản phẩm:</strong>
                                    <span>{selectedOrder.itemName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Tên người bán:</strong>
                                    <span>{selectedOrder.sellerName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong>Hình ảnh:</strong>
                                    <img src={selectedOrder.thumbnail} alt="Product thumbnail" width="100"
                                        style={{ borderRadius: '5px', marginLeft: '10px' }} />
                                </div>
                            </div>

                            {/* Auction Details Section */}
                            <div style={{ backgroundColor: '#ffe4e1', padding: '15px', borderRadius: '5px' }}>
                                <h3 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <FaGavel style={{ marginRight: '10px', color: '#ff4500' }} /> {/* Auction Icon */}
                                    Thông tin đấu giá
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Mã đấu giá:</strong>
                                    <span>{selectedOrder.auctionId}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Kiểu dấu giá:</strong>
                                    <span>{selectedOrder.auctionTypeName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Bước giá:</strong>
                                    <span>{selectedOrder.priceStep}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Trạng thái :</strong>
                                    <span>{selectedOrder.status}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Điều khoản :</strong>
                                    <span>{selectedOrder.termConditions}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Modal to handle create feedback */}
                <Modal
                    title="Đánh giá sản phẩm"
                    visible={isFeedbackModalVisible}
                    onCancel={handleFeedbackModalClose}
                    footer={null}
                    width={600}
                    bodyStyle={{ padding: '20px' }}
                >
                    {selectedOrder && (
                        <div>

                            {/* Item Details Section (again) */}
                            <div style={{
                                backgroundColor: '#fff8dc',
                                padding: '15px',
                                borderRadius: '5px',
                                marginTop: '20px' // Adding a margin to separate it from the feedback form
                            }}>
                                <h3 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <FaProductHunt style={{ marginRight: '10px', color: '#ff7f50' }} /> {/* Product Icon */}
                                    Thông tin sản phẩm
                                </h3>


                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Tên sản phẩm:</strong>
                                    <span>{selectedOrder.itemName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Tên người bán:</strong>
                                    <span>{selectedOrder.sellerName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong>Hình ảnh:</strong>
                                    <img src={selectedOrder.thumbnail} alt="Product thumbnail" width="100"
                                        style={{ borderRadius: '5px', marginLeft: '10px' }} />
                                </div>
                            </div>

                            {/* Feedback Form */}
                            <FeedbackForm order={selectedOrder} />
                        </div>
                    )}
                </Modal>


                {/* Modal to handle show feedback */}
                <Modal
                    title="Xem đánh giá"
                    visible={isFeedbackSellerModalVisible}
                    onCancel={handleFeedbackSellerModalClose}
                    footer={null}
                    width={600}
                    bodyStyle={{ padding: '20px', overflowY: 'auto' }}
                >
                    {selectedOrder && selectedOrder.feedback ? (
                        <div>
                            {/* Feedback Section */}
                            <div
                                style={{
                                    backgroundColor: '#fff',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {/* User Info Section */}
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                    <img
                                        src="/images/user.png"
                                        alt="User Avatar"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                                        {selectedOrder.feedback.username}
                                    </div>
                                </div>

                                {/* Rating Section - Stars Below Username */}
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                    <div style={{ fontSize: '24px', color: '#ff8c00' }}>
                                        {/* Display stars based on rating */}
                                        {Array(selectedOrder.feedback.rating)
                                            .fill('★')
                                            .join('')}
                                        {Array(5 - selectedOrder.feedback.rating)
                                            .fill('☆')
                                            .join('')}
                                    </div>
                                </div>

                                {/* Comment Section */}
                                <div style={{ marginBottom: '15px' }}>
                                    <p style={{ fontStyle: 'italic', color: '#555', fontSize: '14px' }}>
                                        {selectedOrder.feedback.comment}
                                    </p>
                                </div>

                                {/* Timestamp Section */}
                                <div
                                    style={{
                                        marginBottom: '15px',
                                        fontSize: '12px',
                                        color: '#888',
                                        textAlign: 'left',
                                    }}
                                >
                                    {new Date(selectedOrder.feedback.createAt).toLocaleString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>

                                {/* Reply from Seller Section */}
                                {selectedOrder.feedback.replyComment && (
                                    <div
                                        style={{
                                            backgroundColor: '#f1f8ff',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            marginTop: '20px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <strong>Phản hồi từ người bán:</strong>
                                        <p
                                            style={{
                                                fontStyle: 'italic',
                                                color: '#007bff',
                                                fontSize: '14px',
                                                marginTop: '5px',
                                            }}
                                        >
                                            {selectedOrder.feedback.replyComment}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <Empty description="Không có đánh giá nào." />
                    )}
                </Modal>





            </Layout>
        </>
    );
}
