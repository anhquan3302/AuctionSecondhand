import {Text, Heading} from "../../../components";
import {Badge, Space, Table, Rate} from 'antd';
import React from "react";


const expandDataSource = [
    {
        key: '1',
        date: '2023-01-13 11:00:00',
        name: 'Product A',
        upgradeNum: 'Feedback: Great quality!',
        rate: 5, // Đánh giá 5 sao
    },
    {
        key: '2',
        date: '2023-02-16 15:30:00',
        name: 'Product B',
        upgradeNum: 'Feedback: Fast shipping, good service.',
        rate: 4, // Đánh giá 4 sao
    },
    {
        key: '3',
        date: '2023-03-21 10:45:00',
        name: 'Product C',
        upgradeNum: 'Feedback: Could be better, received late.',
        rate: 3, // Đánh giá 3 sao
    },
];

const dataSource = [
    {
        key: '1',
        name: 'Shop A',
        platform: 'Web',
        rating: 4,  // Thêm trường rate thay vì version
        upgradeNum: 100,
        creator: 'Alice',
        createdAt: '2023-01-12 10:30:00',
    },
    {
        key: '2',
        name: 'Shop B',
        platform: 'Mobile',
        rating: 5,  // Thêm trường rate thay vì version
        upgradeNum: 150,
        creator: 'Bob',
        createdAt: '2023-02-15 14:45:00',
    },
    {
        key: '3',
        name: 'Shop C',
        platform: 'Web',
        rating: 3,  // Thêm trường rate thay vì version
        upgradeNum: 200,
        creator: 'Charlie',
        createdAt: '2023-03-20 09:20:00',
    },
];

const expandColumns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Feedback',
        dataIndex: 'upgradeNum',
        key: 'upgradeNum',
    },
    {
        title: 'Rating',
        dataIndex: 'rate',
        key: 'rate',
        render: (rate) => (
            <Rate
                disabled
                defaultValue={rate}
                style={{ fontSize: '14px' }} // Thay đổi kích thước ngôi sao
            />
        ),
    },
    {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Reviewed" />,
    },
    {
        title: 'Action',
        key: 'operation',
        render: () => (
            <Space size="middle">
                <a>Reply</a>
                <a>Delete</a>
            </Space>
        ),
    },
];


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Platform',
        dataIndex: 'platform',
        key: 'platform',
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        render: (rating) => <Rate disabled defaultValue={rating} style={{ fontSize: '14px' }} />, // Hiển thị ngôi sao
    },
    {
        title: 'Upgraded',
        dataIndex: 'upgradeNum',
        key: 'upgradeNum',
    },
    {
        title: 'Creator',
        dataIndex: 'creator',
        key: 'creator',
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Action',
        key: 'operation',
        render: () => <a>Publish</a>,
    },
];

const expandedRowRender = () => (
    <Table columns={expandColumns} dataSource={expandDataSource} pagination={false}/>
);

export default function ManageFeedback() {


    return (
        <>
            <div className="flex w-full ">
                <div className="mx-auto mb-1 flex w-full max-w-[988px] flex-col gap-8">
                    <div className="flex flex-col items-start">
                        <Heading
                            size="textxl"
                            as="h1"
                            className="text-[28px] font-medium text-blue_gray-900 md:text-[26px] sm:text-[24px]"
                        >
                            Khách hàng
                        </Heading>
                        <Text size="textlg" as="p" className="text-[16px] font-normal text-blue_gray-900">
                            Danh sách phản hồi của khách hàng
                        </Text>
                    </div>
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender,
                            defaultExpandedRowKeys: ['0'],
                        }}
                        dataSource={dataSource}
                    />
                </div>
            </div>
        </>
    );
}






