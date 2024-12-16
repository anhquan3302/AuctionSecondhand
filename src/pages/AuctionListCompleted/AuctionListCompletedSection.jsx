import {Img, InputDH} from "../../components/index.jsx";
import {Button, Card, Typography, Select, Option} from "@material-tailwind/react";
import {Badge, Descriptions, Tag, Modal, Statistic, Skeleton, Empty} from "antd";
import Pagination from "@/components/Pagination/index.jsx";
import React, {useState, useEffect} from 'react';
import {SyncOutlined} from "@ant-design/icons";
import {useGetAuctionCompletedItemQuery, useGetAuctionProcessDetailQuery} from "@/services/item.service.js";

const TABLE_HEAD = [
    "Số Đăng Ký",
    "Hình ảnh",
    "Sản phẩm",
    "Thời gian còn lại",
    "Trạng thái",
    "Giá Hiện Tại",
    "Giá của bạn",
    "Tùy chỉnh"
];

export default function AuctionListCompletedSection() {
    const [searchBarValue, setSearchBarValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const {Countdown} = Statistic;
    const [selectedArId, setSelectedArId] = useState(null);

    const {
        data: dataAuctionCompleted,
        isLoading: isLoadingAuctionCompleted,
        isError: isErrorAuctionCompleted,
        error: errorAuctionCompleted
    } = useGetAuctionCompletedItemQuery({
        page: page - 1, // API thường dùng chỉ số 0-based
        limit: 10
    });
    const {
        data: dataAuctionProcessDetail,
        isLoading: isLoadingAuctionProcessDetail,
        isError: isErrorAuctionProcessDetail,
        error: errorAuctionProcessDetail,
    } = useGetAuctionProcessDetailQuery(selectedArId ? {id: selectedArId} : null, {
        skip: !selectedArId,
    });

    console.log("DATA: ", dataAuctionCompleted);

    const auctionItems = dataAuctionCompleted?.items || [];

    const TABLE_ROWS = auctionItems.map((item) => {
        const {auction, itemName, thumbnail, itemId} = item;
        const {auction_id, endDate, end_time, status, start_price} = auction || {};

        let deadline = null;
        if (endDate && end_time) {
            const dateTimeString = `${endDate}T${end_time}`;
            deadline = new Date(dateTimeString).getTime();
            if (isNaN(deadline)) {
                console.error("Invalid Date Format!");
            }
        }

        return {
            number: `#AU-${auction_id}`,
            product: itemName || "Không xác định",
            image: thumbnail,
            endTime: deadline ? (
                <Countdown
                    value={deadline}
                    format="D Ngày H giờ m phút s giây"
                    valueStyle={{fontWeight: "bolder", fontSize: "15px", color: "green"}}
                />
            ) : (
                "Không xác định"
            ),
            status: status === "PENDING" ? "Đang đấu giá" : "Đã kết thúc",
            currentPrice: start_price,
            yourPrice: start_price,
            action: <Button color="blue" onClick={() => showModal(itemId)}>Chi tiết</Button>,
        };
    });
    const items = dataAuctionProcessDetail ? [

        {
            key: '1',
            label: 'Sản Phẩm',
            children: dataAuctionProcessDetail?.itemName || "Không xác định",
            span: 2,
        },
        {
            key: '2',
            label: 'Hình Ảnh',
            children: (
                <img
                    src={dataAuctionProcessDetail?.thumbnail}
                    alt="Product"
                    className="w-[30%] h-48 object-cover rounded"
                />
            ),
            span: 3,
        },
        {
            key: '3',
            label: 'Số Đăng Ký',
            children: `#AU-${dataAuctionProcessDetail?.itemId}`,
        },
        {
            key: '4',
            label: 'Thời Gian Đấu Giá',
            children: (dataAuctionProcessDetail?.auction?.endDate && dataAuctionProcessDetail?.auction?.end_time) ? (
                <Countdown
                    value={new Date(`${dataAuctionProcessDetail.auction?.endDate}T${dataAuctionProcessDetail.auction?.end_time}`).getTime()}
                    format="D Ngày H giờ m phút s giây"
                    valueStyle={{fontWeight: "bolder", fontSize: "15px", color: "green"}}
                />
            ) : (
                "Không xác định"
            ),
            span: 2,
        },
        {
            key: '5',
            label: 'Trạng Thái',
            children: <Badge status="processing" text={dataAuctionProcessDetail?.auction?.status || "Chưa đăng ký"}/>,
            span: 3,
        },
        {
            key: '6',
            label: 'Người Bán',
            children: dataAuctionProcessDetail?.auction?.created_by || "Chưa có người bán",
        },
        {
            key: '7',
            label: 'Tiền Cọc',
            children: `$${dataAuctionProcessDetail?.auction?.start_price || "0"}`,
        },
    ] : [];


    const showModal = (itemId) => {
        setSelectedArId(itemId);
        setIsModalOpen(true);
    };

    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    return (
        <div>
            <div className="flex w-full flex-col items-center">
                <div className="mx-auto flex w-full max-w-[1294px] flex-col gap-10 self-stretch">
                    <div className="flex justify-between gap-5 sm:flex-col">
                        <InputDH
                            name="Search InputDH"
                            placeholder={`Tìm kiếm theo ID`}
                            value={searchBarValue}
                            onChange={(e) => setSearchBarValue(e.target.value)}
                            className="flex h-[40px] w-[20%] items-center justify-center gap-1.5 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs sm:w-full"
                        />
                        <div className="flex justify-between gap-5 sm:flex-col mt-2">
                            <Select size="lg" label="Chọn Trạng Thái">
                                <Option>Tất cả</Option>
                            </Select>
                        </div>
                    </div>
                    {isErrorAuctionCompleted ? (
                        <Empty/>
                    ) : (
                        <Skeleton loading={isLoadingAuctionCompleted} active>
                            <Card className="h-full w-full overflow-auto">
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="p-4 pt-10">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold leading-none"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {TABLE_ROWS.map((row) => (
                                        <tr key={row.number}>
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-bold">
                                                    {row.number}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <img src={row.image} alt={row.product}
                                                     className="w-16 h-16 object-cover rounded"/>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="font-normal text-gray-600">
                                                    {row.product}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="font-normal text-gray-600">
                                                    {row.endTime} {/* Hiển thị thời gian còn lại */}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Tag icon={<SyncOutlined spin/>} color="processing">
                                                    {row.status}
                                                </Tag>
                                            </td>
                                            <td className="p-4">
                                                <Typography variant="small" className="font-normal text-gray-600">
                                                    ${row.currentPrice}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    className={`font-normal ${row.yourPrice >= row.currentPrice ? 'text-green-500' : 'text-red-500'}`}
                                                >
                                                    ${row.yourPrice}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                {row.action}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </Card>
                        </Skeleton>
                    )}
                    <div className="flex justify-center items-center mt-4">
                        <Pagination
                            currentPage={page}
                            totalPages={dataAuctionCompleted?.totalPages || 1}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>
            <Modal footer={null} width={1000} title="Auction Process Detail" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <Descriptions title="Infomation Info" layout="vertical" bordered items={items}/>
            </Modal>
        </div>
    );
}

