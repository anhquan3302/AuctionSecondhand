import {Img, SelectBox, Heading, Text, InputDH} from "../../../components";
import {CloseSVG} from "../../../components/InputDH/close.jsx";
import {ReactTable} from "../../../components/ReactTable";
import {createColumnHelper} from "@tanstack/react-table";
import React, {useState} from 'react';
import {Button, Card, Option, Select, Typography} from "@material-tailwind/react";
import {Tag} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined} from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";

const dropDownOptions = [
    {value: 'waiting', label: 'Đang chờ', color: '#FFC107'},
    {value: 'shipping', label: 'Đang vận chuyển', color: '#2196F3'},
    {value: 'canceled', label: 'Đã Hủy', color: '#F44336'},
    {value: 'success', label: 'Thành Công', color: '#4CAF50'},
];


const tableData = [
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
];


const TABLE_HEAD = [
    "Number",
    "Sản phẩm",
    "Hình ảnh",
    "Thời gian",
    "Trạng thái",
    "Người bán",
    "Tổng doanh thu",
    "Lợi nhuận",
    "Tùy chỉnh"
];

const TABLE_ROWS = [
    {
        number: "#MS-415646",
        product: "Smartphone",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "31 Jan 2024",
        status: "Available",
        sellerHeader: "han so hee",
        totalHeader: "$500",
        profitHeader: "$100",
    },
    {
        number: "#MS-415647",
        product: "Laptop",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "24 Jan 2024",
        status: "pending",
        sellerHeader: "han so hee",
        totalHeader: "$1000",
        profitHeader: "$150",
    },
    {
        number: "#MS-415648",
        product: "Tablet",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "12 Jan 2024",
        status: "UnAvailable",
        sellerHeader: "han so hee",
        totalHeader: "$300",
        profitHeader: "$50",
    },
    {
        number: "#MS-415649",
        product: "Smartwatch",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "10 Jan 2024",
        status: "Fail",
        sellerHeader: "han so hee",
        totalHeader: "$200",
        profitHeader: "$20",
    },
];

export default function OrderManagementSection() {
    const [searchBarValue, setSearchBarValue] = React.useState("");

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
                            suffix={
                                searchBarValue?.length > 0 ? (
                                    <CloseSVG onClick={() => setSearchBarValue("")} height={16} width={18}
                                              fillColor="#626974ff"/>
                                ) : (
                                    <Img src="/images/img_search.svg" alt="Search" className="h-[16px] w-[18px]"/>
                                )
                            }
                            className="flex h-[40px] w-[20%] items-center justify-center gap-1.5 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs sm:w-full"
                        />
                        <div className="flex justify-between gap-5 sm:flex-col mt-2">
                            <Select size="lg" label="Select Version">
                                <Option>Tat ca</Option>
                                <Option>Dang cho</Option>
                                <Option>Dang van chuyen</Option>
                                <Option>Da huy</Option>
                                <Option>Thanh cong</Option>
                            </Select>
                        </div>
                    </div>
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
                            {TABLE_ROWS.map(({
                                                 number,
                                                 product,
                                                 image,
                                                 time,
                                                 status,
                                                 sellerHeader,
                                                 totalHeader,
                                                 profitHeader
                                             }) => (
                                <tr key={number}>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            {number}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600"
                                        >
                                            {product}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <img
                                            src={image}
                                            alt={product}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600"
                                        >
                                            {time}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        {status === "Available" && (
                                            <Tag icon={<CheckCircleOutlined/>} color="success">
                                                Available
                                            </Tag>
                                        )}
                                        {status === "pending" && (
                                            <Tag icon={<SyncOutlined spin/>} color="processing">
                                                Pending
                                            </Tag>
                                        )}
                                        {status === "UnAvailable" && (
                                            <Tag icon={<CloseCircleOutlined/>} color="error">
                                                UnAvailable
                                            </Tag>
                                        )}
                                        {status === "Fail" && (
                                            <Tag icon={<ExclamationCircleOutlined/>} color="warning">
                                                Fail
                                            </Tag>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600"
                                        >
                                            {sellerHeader}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600"
                                        >
                                            {totalHeader}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600"
                                        >
                                            {profitHeader}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Button color="blue">Chi tiết</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Card>
                    <div className="flex justify-center items-center mt-4">
                        <Pagination/>
                    </div>
                </div>
            </div>
        </div>
    );

}








