import {Img, Heading, InputDH} from "../../../components";
import {CloseSVG} from "../../../components/InputDH/close.jsx";
import React, {useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import {Link, useNavigate} from 'react-router-dom';
import {DocumentIcon} from "@heroicons/react/24/solid";
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";
import {Card, IconButton, Typography} from "@material-tailwind/react";
import Pagination from "@/components/Pagination/index.jsx";
import {useGetItemByUserQuery} from "../../../services/item.service.js";
import {CheckCircleOutlined, CloseCircleOutlined, SyncOutlined, HourglassOutlined} from '@ant-design/icons';
import {Tag, Breadcrumb, Layout, theme, Button, Empty, Skeleton} from 'antd';
import FooterBK from "@/components/FooterBK/index.jsx";
import {Modal} from 'antd';
import DescriptionItem from "@/components/DescriptionItem/index.jsx";

const {Content, Sider} = Layout;

const TABLE_HEAD = [
    "Number",
    "Sản phẩm",
    "Hình ảnh",
    "Mô tả",
    "Trạng thái",
    "Thông tin đấu giá",
    "Tùy chỉnh"
];

export default function ListOfSellerProductPage() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchBarValue1, setSearchBarValue1] = useState("");
    const [page, setPage] = useState(1);

    const pageSize = 10;
    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Ho_Chi_Minh'};
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const {data, isError, isLoading} = useGetItemByUserQuery(
        {page: page - 1, limit: pageSize}
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleOpenModal = (auction) => {
        setSelectedAuction(auction);
        setIsModalVisible(true);
    };

    const handleOpenDescriptionModal = (itemDescription) => {
        setSelectedDescription(itemDescription);
        setIsModalDescriptionVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedAuction(null);
    };

    const handleCloseDescriptionModal = () => {
        setIsModalDescriptionVisible(false);
        setSelectedDescription(null);
    };

    const handleUpdateItem = (itemId) => {
        console.log("Navigating to item with ID:", itemId); // Kiểm tra xem itemId có đúng không
        navigate(`/dashboard-seller/UpdateProduct/${itemId}`);
    };



    const renderTableRows = () => {

        return data?.items?.items.map(({itemId, itemName, thumbnail, itemDescription, auction, itemStatus}, index) => (
            <tr key={itemId}>
                <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold">
                        {itemId}
                    </Typography>
                </td>
                <td className="p-4">
                    <Typography variant="small" className="font-normal text-gray-600">
                        {itemName}
                    </Typography>
                </td>
                <td className="p-4">
                    <img src={thumbnail} alt={itemName} className="w-16 h-16 object-cover rounded"/>
                </td>
                <td className="p-4">
                    <Typography variant="small" className="font-normal text-gray-600">
                        {/*{itemDescription}*/}
                        <Button onClick={() => handleOpenDescriptionModal(itemDescription)}>Xem mô tả</Button>
                    </Typography>
                </td>
                <td className="p-4">
                    <Typography variant="small" className="font-normal text-gray-600">
                        <Button onClick={() => handleOpenModal(auction)}>Thông tin đấu giá</Button>
                    </Typography>
                </td>
                <td className="p-4">
                    {itemStatus === "ACCEPTED" && (
                        <Tag icon={<CheckCircleOutlined />} color="success">Hợp lệ</Tag>
                    )}
                    {itemStatus === "PENDING" && (
                        <Tag icon={<SyncOutlined spin />} color="processing">Đang chờ</Tag>
                    )}
                    {itemStatus === "REJECTED" && (
                        <Tag icon={<CloseCircleOutlined />} color="error">Từ chối</Tag>
                    )}
                    {itemStatus === "PENDING_AUCTION" && (
                        <Tag icon={<HourglassOutlined />} color="warning">Đang tạo phiên</Tag>
                    )}
                </td>

                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <IconButton variant="text" size="sm">
                            <DocumentIcon onClick={() => handleUpdateItem(itemId)}  className="h-4 w-4 text-gray-900"/>
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            <ArrowDownTrayIcon strokeWidth={3} className="h-4 w-4 text-gray-900"/>
                        </IconButton>
                    </div>
                </td>
            </tr>
        ));
    };

    return (
        <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            <Content style={{padding: '0 48px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    style={{padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG, flex: 1}}>
                    <Sider style={{background: colorBgContainer}} width={300}>
                        <Sidebar/>
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280, flex: 1}}>
                        <div className="w-full bg-gray-50_01">
                            <div className="mt-4 flex flex-col items-end">
                                <div className="w-[100%] md:w-full md:px-5">
                                    <div className="flex items-start">
                                        <div
                                            className="flex-1 self-center rounded-[16px] bg-[url(/images/img_group_46876.png)] bg-cover bg-no-repeat pt-[84px] md:h-auto md:py-5">
                                            <div className="flex flex-col gap-2">
                                                <div className="ml-1 flex md:ml-0">
                                                    <Heading size="headingxl" as="h1"
                                                             className="text-[30px] font-semibold uppercase text-gray-900_01 md:text-[44px] sm:text-[38px] -mt-[80px] ml-[20px]">
                                                        Danh sách sản phẩm
                                                    </Heading>
                                                </div>
                                                <div
                                                    className="mr-[38px] flex justify-between gap-5 md:mx-0 sm:flex-col -mt-[50px] ml-[15px]">
                                                    <InputDH
                                                        name="Search Field"
                                                        placeholder={`Tìm kiếm theo ID`}
                                                        value={searchBarValue1}
                                                        onChange={(e) => setSearchBarValue1(e.target.value)}
                                                        suffix={searchBarValue1?.length > 0 ? (
                                                            <CloseSVG onClick={() => setSearchBarValue1("")} height={18}
                                                                      width={18} fillColor="#626974ff"/>
                                                        ) : (
                                                            <Img src="/images/img_search.svg" alt="Search"
                                                                 className="h-[18px] w-[18px]"/>
                                                        )}
                                                        className="flex h-[40px] w-[24%] items-center justify-center gap-4 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs sm:w-full "
                                                    />
                                                    <Link to="/Dashboard-seller/registerproduct"
                                                          className="flex h-[40px] min-w-[152px] flex-row items-center justify-center gap-0.5 rounded-md"
                                                          style={{backgroundColor: '#28a745'}}>
                                                        Tạo sản phẩm
                                                    </Link>
                                                </div>
                                                {isError ? (
                                                    <Empty/>
                                                ) : (
                                                    <Skeleton loading={isLoading} active>
                                                        <Card className="h-full w-full overflow-scroll">
                                                            <table className="w-full min-w-max table-auto text-left">
                                                                <thead>
                                                                <tr>
                                                                    {TABLE_HEAD.map((head) => (
                                                                        <th key={head} className="p-4 pt-10">
                                                                            <Typography variant="small"
                                                                                        color="blue-gray"
                                                                                        className="font-bold leading-none">
                                                                                {head}
                                                                            </Typography>
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {renderTableRows()}
                                                                </tbody>
                                                            </table>
                                                        </Card>
                                                    </Skeleton>
                                                )}
                                                <div className="flex justify-center items-center mt-4">
                                                    {/*<Pagination*/}
                                                    {/*    current={currentPage}*/}
                                                    {/*    total={data?.total || 0} // Tổng số mục*/}
                                                    {/*    pageSize={pageSize}*/}
                                                    {/*    onChange={handlePageChange}*/}
                                                    {/*/>*/}
                                                    <Pagination
                                                        currentPage={page}
                                                        totalPages={data?.totalPages || 1}
                                                        onPageChange={setPage}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Content>
            <FooterBK/>
            <Modal
                title="Thông tin chi tiết đấu giá"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="close" onClick={handleCloseModal} className="bg-red-500 text-white hover:bg-red-600">
                        Đóng
                    </Button>,
                ]}
                className="rounded-lg shadow-lg"
            >
                {selectedAuction && (
                    <div className="space-y-4 p-4">
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <h4 className="text-lg font-bold">Mã sản phẩm: <span
                                className="text-blue-600">{selectedAuction.auction_id}</span></h4>
                            <p className="text-gray-700">Người thẩm định: <span
                                className="font-semibold">{selectedAuction.created_by}</span></p>
                            <p className="text-gray-700">Giá khởi điểm: <span
                                className="font-semibold">{selectedAuction.start_price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })}</span></p>
                            <p className="text-gray-700">Thời gian đấu giá: <span
                                className="font-semibold">{selectedAuction.start_time} - {selectedAuction.end_time}</span>
                            </p>
                            <p className="text-gray-700">Ngày đấu giá: <span
                                className="font-semibold">{formatDate(selectedAuction.startDate)} - {formatDate(selectedAuction.endDate)}</span>
                            </p>
                            <p className="text-gray-700">Ngày thẩm định sản phẩm: <span
                                className="font-semibold">{formatDate(selectedAuction.approved_at)}</span></p>
                            <p className="text-gray-700">Trạng thái phiên đấu giá: <span
                                className="font-semibold">{selectedAuction.status}</span></p>
                        </div>
                    </div>
                )}
            </Modal>
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
        </Layout>
    );
}