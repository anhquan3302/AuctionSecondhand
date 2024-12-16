import {Heading, Img} from "../../../components";
import React, {Suspense, useState} from "react";
import {Avatar, Carousel, Image, Modal} from "antd";
import {Button, Typography} from "@material-tailwind/react";
import {Descriptions} from 'antd';
import {useGetSellerQuery} from "@/services/item.service.js";
import {useGetUserByIdQuery} from "@/services/user.service.js";
import DescriptionItem from "@/components/DescriptionItem/index.jsx";

export default function AuctionCreationSection({itemDetail}) {


    const [selectedDescription, setSelectedDescription] = useState(null);
    const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);
    const { data: seller } = useGetSellerQuery({id: itemDetail?.itemId});
    const { data: staff } = useGetUserByIdQuery();
    const handleOpenDescriptionModal = (itemDescription) => {
        setSelectedDescription(itemDescription);
        setIsModalDescriptionVisible(true);
    };


    const handleCloseDescriptionModal = () => {
        setIsModalDescriptionVisible(false); // Đóng modal
        setSelectedDescription(null); // Reset thông tin đấu giá
    };

    const formatCurrency = (value) => {
        if (!value) return 'N/A';

        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const getItemStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'text-blue-500 bg-blue-100 border border-blue-400 rounded-md px-3 py-1 text-sm font-medium'; // Xanh cho "Đang chờ"
            case 'PENDING_AUCTION':
                return 'text-orange-500 bg-orange-100 border border-orange-400 rounded-md px-3 py-1 text-sm font-medium'; // Cam cho "Đang đấu giá"
            case 'ACCEPTED':
                return 'text-green-500 bg-green-100 border border-green-400 rounded-md px-3 py-1 text-sm font-medium'; // Xanh lá cho "Đã chấp nhận"
            case 'REJECTED':
                return 'text-red-500 bg-red-100 border border-red-400 rounded-md px-3 py-1 text-sm font-medium'; // Đỏ cho "Bị từ chối"
            case 'INACTIVE':
                return 'text-gray-500 bg-gray-100 border border-gray-400 rounded-md px-3 py-1 text-sm font-medium'; // Xám cho "Không hoạt động"
            default:
                return 'text-gray-600 bg-gray-100 border border-gray-400 rounded-md px-3 py-1 text-sm font-medium'; // Xám nếu không xác định trạng thái
        }
    };



    const formatItemStatus = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Đang chờ';
            case 'PENDING_AUCTION':
                return 'Đang tao phien dau gia';
            case 'ACCEPTED':
                return 'Đã chấp nhận';
            case 'REJECTED':
                return 'Bị từ chối';
            case 'INACTIVE':
                return 'Không hoạt động';
            default:
                return 'N/A';
        }
    };

    const items = [
        {
            key: '1',
            label: <span className="font-bold text-lg text-gray-800">Tên sản phẩm</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.itemName || 'N/A'}</span>,
            span: 4
        },
        {
            key: '2',
            label: <span className="font-bold text-lg text-gray-800">Danh mục phụ</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.scId.sub_category || 'N/A'}</span>,
            span: 2
        },
        {
            key: '3',
            label: <span className="font-bold text-lg text-gray-800">Trạng thái sản phẩm</span>,
            children: (
                <span className={`text-base ${getItemStatusClass(itemDetail?.itemStatus)}`}>
            {itemDetail?.itemStatus ? formatItemStatus(itemDetail.itemStatus) : 'N/A'}
        </span>
            ),
            span: 2
        },

        {
            key: '4',
            label: <span className="font-bold text-lg text-gray-800">Mức giá mong muốn</span>,
            children: <span className="text-base text-gray-600">{formatCurrency(itemDetail?.priceBuyNow) || 'N/A'}</span>,
            span: 2
        },

        {
            key: '5',
            label: <span className="font-bold text-lg text-gray-800">Mô tả sản phẩm</span>,
            children:
                <Button
                    onClick={() => handleOpenDescriptionModal(itemDetail?.itemDescription)}
                    className="ql-bg-blue-500 text-white hover:bg-yellow-600"
                >
                    Xem mô tả
                </Button>,
            span: 4
        }
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
                    <Heading
                        size="text2xl"
                        as="h1"
                        className="w-[28%] text-[30px] rounded-[12px] font-medium leading-[55px] text-black-900 md:w-full md:text-[28px] sm:text-[26px]"
                    >
                        TẠO PHIÊN ĐẤU GIÁ
                    </Heading>
                    <div className="self-stretch">
                        <div className="flex items-center w-full gap-[34px] md:flex-col">
                            <div className="flex-1 bg-green-50 rounded-2xl p-6 flex flex-col gap-4">
                                <Descriptions
                                    title={<div className="w-full text-center text-xl font-semibold">Thông tin sản
                                        phẩm</div>} layout="vertical" items={items}/>

                            </div>

                            <div className=" mx-auto bg-green-50 rounded-2xl p-6 ">
                                <div className="w-80">
                                    <Image.PreviewGroup
                                        preview={{
                                            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                        }}
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            {(itemDetail?.images || []).map((images, index) => (
                                                <div key={index} className="flex justify-center items-center">
                                                    <Image width={400} src={images.image}/>
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



