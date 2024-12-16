import React, {useState} from 'react';
import {useGetSellerQuery} from "@/services/item.service.js";
import {useGetUserByIdQuery} from "@/services/user.service.js";
import {Button, Typography} from "@material-tailwind/react";
import {Avatar, Descriptions, Image, Modal, Tag} from "antd";
import DescriptionItem from "@/components/DescriptionItem/index.jsx";
import {Heading} from "@/components/index.jsx";
import {useGetOrderDetailQuery} from "@/services/order.service.js";
import {SyncOutlined} from "@ant-design/icons";

function DrawerDetailOrder({orderId}) {
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);

    const {data: orderDetail, error: errorOrderDetail, isLoading: loadingOrderDetail, isError: isErrorOrderDetail}
        = useGetOrderDetailQuery(orderId);
    const orderData = orderDetail?.data;
    console.log("selectedOrderId", orderId)
    console.log("selectedOrderId", orderDetail)

    const {data: seller} = useGetSellerQuery({id: orderData?.item.itemId});
    const {data: staff} = useGetUserByIdQuery();
    const handleOpenDescriptionModal = (itemDescription) => {
        setSelectedDescription(itemDescription);
        setIsModalDescriptionVisible(true);
    };


    const handleCloseDescriptionModal = () => {
        setIsModalDescriptionVisible(false); // Đóng modal
        setSelectedDescription(null); // Reset thông tin đấu giá
    };

    const order = [
        {
            key: '1',
            label: 'Tên',
            children: orderData?.fullName,
        },
        {
            key: '2',
            label: 'Số điện thoại',
            children: orderData?.phoneNumber,
        },
        {
            key: '3',
            label: 'Email',
            children: orderData?.email,
        },
        {
            key: '4',
            label: 'Phương thức thanh toán',
            children: orderData?.paymentMethod,
            span: 1,
        },
        {
            key: '5',
            label: 'Tổng số tiền',
            children: orderData?.totalAmount,
            span: 3,
        },
        {
            key: '5',
            label: 'Trạng thái',
            children:
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <Tag icon={<SyncOutlined spin/>} color="processing">
                        {orderData?.status}
                    </Tag>
                    <Button
                        type="primary"
                        // onClick={() => handleUpdateStatus(orderData?.id)}
                        className="px-2 py-1 text-sm h-auto"
                    >
                        Cập nhật
                    </Button>
                </div>
            ,
            span: 3,
        },
        {
            key: '5',
            label: 'Phương thức vận chuyển',
            children: orderData?.shippingMethod,
        },
        {
            key: '5',
            label: 'Địa chỉ',
            children: orderData?.address,
            span: 2,
        },
        {
            key: '5',
            label: 'Ghi chú',
            children: orderData?.note,

        },
    ];

    const items = [
        {
            key: '1',
            label: <span className="font-bold text-lg text-gray-800">Tên sản phẩm</span>,
            children: <span className="text-base text-gray-600">{orderData?.item.itemName || 'N/A'}</span>,
            span: 4
        },
        {
            key: '2',
            label: <span className="font-bold text-lg text-gray-800">Danh mục phụ</span>,
            children: <span className="text-base text-gray-600">{orderData?.item.scId.sub_category || 'N/A'}</span>,
            span: 2
        },
        {
            key: '3',
            label: <span className="font-bold text-lg text-gray-800">Trạng thái sản phẩm</span>,
            children: <span className="text-base text-gray-600">{orderData?.item.itemStatus || 'N/A'}</span>,
            span: 2
        },
        {
            key: '4',
            label: <span className="font-bold text-lg text-gray-800">Mô tả sản phẩm</span>,
            children: <Button
                onClick={() => handleOpenDescriptionModal(orderData?.item.itemDescription)}
                className="ql-bg-blue-500 text-white hover:bg-yellow-600"
            >
                Xem mô tả
            </Button>,
            span: 4
        }
    ];

    const itemDescription = [
        {key: '4', label: 'Phần trăm', children: orderData?.item.itemSpecific?.percent || 'N/A', span: 2},
        {key: '5', label: 'Loại', children: orderData?.item.itemSpecific?.type || 'N/A', span: 2},
        {key: '6', label: 'Màu sắc', children: orderData?.item.itemSpecific?.color || 'N/A', span: 2},
        {key: '7', label: 'Trọng lượng', children: orderData?.item.itemSpecific?.weight || 'N/A', span: 2},
        {key: '8', label: 'Kích thước', children: orderData?.item.itemSpecific?.dimension || 'N/A', span: 2},
        {key: '9', label: 'Xuất xứ', children: orderData?.item.itemSpecific?.original || 'N/A', span: 2},
        {key: '10', label: 'Ngày sản xuất', children: orderData?.item.itemSpecific?.manufactureDate || 'N/A', span: 2},
        {key: '11', label: 'Chất liệu', children: orderData?.item.itemSpecific?.material || 'N/A', span: 2}
    ];
    return (
        <>
            <Modal
                title="Mô tả"
                visible={isModalDescriptionVisible}
                onCancel={handleCloseDescriptionModal}
                footer={[
                    // eslint-disable-next-line react/jsx-key
                    <Button color="blue" onClick={handleCloseDescriptionModal}
                            className="bg-red-500 text-white hover:bg-red-600"
                    >
                        Đóng
                    </Button>,
                ]}
                className="rounded-lg shadow-lg"
                width={1000}
            >
                <DescriptionItem selectedDescription={selectedDescription}/>
            </Modal>
            {/* auction creation section */}
            <div className="mt-[26px] flex flex-col items-center">
                <div className="container-xs flex flex-col items-center gap-[78px] md:gap-[58px] md:px-5 sm:gap-[39px]">
                    <Descriptions title="Order Info" items={order}/>
                    <div className="self-stretch">

                        <div className="flex items-center w-full gap-[34px] md:flex-col">
                            <div className="flex-1 bg-green-50 rounded-2xl p-6 flex flex-col gap-4">
                                <Descriptions
                                    title={<div className="w-full text-center text-xl font-semibold">Thông tin sản
                                        phẩm</div>} layout="vertical" items={items}/>
                                <Descriptions
                                    title={<div className="w-full text-center text-xl font-semibold">Mô tả sản
                                        phẩm</div>}
                                    items={itemDescription} className="mt-4"/>
                            </div>

                            <div className=" mx-auto bg-green-50 rounded-2xl p-6 ">
                                <div className="w-80">
                                    <Image.PreviewGroup
                                        preview={{
                                            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                        }}
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            {orderData?.item.images?.map((images, index) => (
                                                <div key={index} className="flex justify-center items-center">
                                                    <Image width={400}
                                                           src={images.image}/>
                                                </div>
                                            ))}
                                        </div>
                                    </Image.PreviewGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full justify-between gap-8 mt-5">
                {/* Người bán */}
                <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                    <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người
                        bán</Heading>
                    <div className="w-full flex justify-center">
                        <div
                            className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl giới hạn chiều rộng của phần tử con */}
                            <div className="flex items-center gap-4">
                                <Avatar src={seller?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
                                        alt="avatar" variant="rounded" className="w-16 h-16"/>
                                <div>
                                    <Typography variant="h6"
                                                className="font-medium text-gray-800">{seller?.fullName || 'N/A'}</Typography>
                                    <Typography variant="small" color="gray"
                                                className="font-normal">{seller?.role || 'N/A'}</Typography>
                                </div>
                            </div>
                            <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện
                                thoại: {seller?.phoneNumber || 'N/A'}</Heading>
                            <Heading size="textxs" as="p"
                                     className="text-sm font-medium text-gray-700">Email: {seller?.email || 'N/A'}</Heading>
                        </div>
                    </div>

                </div>

                {/* Người thẩm định */}
                <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                    <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người thẩm
                        định</Heading>
                    <div className="w-full flex justify-center">
                        <div
                            className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl sẽ giới hạn chiều rộng tối đa */}
                            <div className="flex items-center gap-4">
                                <Avatar src={staff?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
                                        alt="avatar" variant="rounded" className="w-16 h-16"/>
                                <div>
                                    <Typography variant="h6"
                                                className="font-medium text-gray-800">{staff?.fullName || 'N/A'}</Typography>
                                    <Typography variant="small" color="gray"
                                                className="font-normal">{staff?.role || 'N/A'}</Typography>
                                </div>
                            </div>
                            <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện
                                thoại: {staff?.phoneNumber || 'N/A'}</Heading>
                            <Heading size="textxs" as="p"
                                     className="text-sm font-medium text-gray-700">Email: {staff?.email || 'N/A'}</Heading>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default DrawerDetailOrder;