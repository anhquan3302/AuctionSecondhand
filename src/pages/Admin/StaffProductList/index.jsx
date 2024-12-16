import { Helmet } from "react-helmet";
import { Img, InputDH } from "../../../components";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { Empty, Skeleton, Tag, Drawer, Space } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useGetItemDetailQuery, useGetItemsQuery } from "../../../services/item.service";
import DrawerDetailItem from "@/components/DrawerDetailItem/index.jsx";

const TABLE_HEAD = [
    "Number",
    "Sản phẩm",
    "Hình ảnh",
    "Thời gian",
    "Trạng thái",
    "Người bán",
    "Tùy chỉnh"
];

export default function StaffProductListPage() {

    const [searchBarValue, setSearchBarValue] = useState("");
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const [selectedItemId, setSelectedItemId] = useState(null);
    const { data = {}, isLoading, isError, error } = useGetItemsQuery({
        page: page - 1, // API thường dùng chỉ số 0-based
        limit: 10
    });
    console.log(data)

    const TABLE_ROWS = data?.items?.map((item) => ({
        number: item?.itemId,
        product: item?.itemName,
        image: item?.thumbnail || "https://via.placeholder.com/150",
        time: item?.auction?.approved_at,
        status: item?.itemStatus,
        sellerHeader: item?.auction?.created_by || "Unknown Seller",
    })) || [];

    const showDefaultDrawer = (itemId) => {
        setSize('default');
        setOpen(true);
        setSelectedItemId(itemId);
    };
    const showLargeDrawer = (itemId) => {
        setSize('large');
        setOpen(true);
        setSelectedItemId(itemId);
    };
    const onClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    const handleButtonClick = (itemId) => {
        navigate(`/ListOfBuyerBidsAdmin/15`); // Dẫn đến URL mới
      };
    
    return (
        <>

            <div className="flex w-full flex-col items-start justify-center gap-10 bg-
            bg-white md:p-5">
                <InputDH
                    name="Search Box"
                    placeholder={`Tìm kiếm theo ID`}
                    value={searchBarValue}
                    onChange={(e) => setSearchBarValue(e.target.value)}
                    suffix={
                        searchBarValue?.length > 0 ? (
                            <CloseSVG onClick={() => setSearchBarValue("")} height={18} width={18}
                                fillColor="#626974ff" />
                        ) : (
                            <Img src="/images/img_search.svg" alt="Search" className="h-[18px] w-[18px]" />
                        )
                    }
                    className=" flex h-[40px] w-[24%] items-center justify-center gap-4 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs md:ml-0"
                />
                <div className="w-full md:w-full">
                    {isError ? (
                        <Empty />
                    ) : (
                        <Skeleton loading={isLoading} active>
                            <Card className="h-full w-full overflow-scroll">
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
                                            sellerHeader
                                        }) => {
                                            return (
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
                                                        {status === "ACCEPTED" && (
                                                            <Tag icon={<CheckCircleOutlined />}
                                                                color="success">
                                                                {status}
                                                            </Tag>
                                                        )}
                                                        {status === "pending" && (
                                                            <Tag icon={<SyncOutlined spin />}
                                                                color="processing">
                                                                Pending
                                                            </Tag>
                                                        )}
                                                        {status === "UnAvailable" && (
                                                            <Tag icon={<CloseCircleOutlined />}
                                                                color="error">
                                                                UnAvailable
                                                            </Tag>
                                                        )}
                                                        {status === "Fail" && (
                                                            <Tag icon={<ExclamationCircleOutlined />}
                                                                color="warning">
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
                                                        {/*{sellerHeader === "Available" && (*/}
                                                        {/*    <Tag icon={<CheckCircleOutlined/>}*/}
                                                        {/*         color="success">*/}
                                                        {/*        Available*/}
                                                        {/*    </Tag>*/}
                                                        {/*)}*/}
                                                    </td>
                                                    <td className="p-4">

                                                        <div className="flex items-center gap-2">
                                                            <Button onClick={() => showDefaultDrawer(number)} color="blue">Chi
                                                                tiết</Button>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">

                                                        <div className="flex items-center gap-2">
                                                            <Button onClick={handleButtonClick} color="green">
                                                                Danh sách đấu giá
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Card>
                        </Skeleton>
                    )}

                    <div className="flex justify-center items-center mt-4">
                        <Pagination
                            currentPage={page}
                            totalPages={data.totalPages || 1}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>

            <Drawer
                title={"Chi tiết sản phẩm"}
                placement="right"
                size={size}
                width={1200}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <DrawerDetailItem itemIds={selectedItemId} />
            </Drawer>
        </>
    );
}
