import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
} from "@material-tailwind/react";
import {MagnifyingGlassIcon, DocumentMagnifyingGlassIcon, FlagIcon} from "@heroicons/react/24/solid";
import Pagination from "@/components/Pagination/index.jsx";
import {Breadcrumb, Layout, Menu, theme, Descriptions, Statistic, Skeleton, Empty} from 'antd';
import {useParams} from "react-router-dom";
import CartItemBid from "@/components/CartItem/CartItemBid.jsx";
import {useGetItemDetailQuery} from "@/services/item.service.js";
import {useGetAllBidsQuery, useGetBidDetailQuery} from "@/services/bid.service.js";

const {Countdown} = Statistic;
const TABLE_HEAD = [
    {head: "Khách hàng", customeStyle: "!text-left"},
    {head: "Giá thầu", customeStyle: "text-right"},
    {head: "Ngày", customeStyle: "text-right"},
    {head: "Trạng thái", customeStyle: "text-right"},
];
const {Content, Sider} = Layout;
export default function ListOfBuyerBids() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const {id} = useParams();
    const [page, setPage] = useState(1);
    const {data, error, isLoading, isError} = useGetAllBidsQuery({auctionId: id, page: page - 1});
    const {
        data: bidInfo,
        isError: bidInfoError,
        isLoading: loadingBidInfo,
        refetch: isRefetchBidInfo
    } = useGetBidDetailQuery(id);
    const auctionEndDate = bidInfo?.data?.endDate || null;
    const auctionEndTime = bidInfo?.data?.end_time || null;
    const auctionStartDate = bidInfo?.data?.startDate || null;
    const auctionStartTime = bidInfo?.data?.start_time || null;
    const startDateTime = new Date(`${auctionStartDate}T${auctionStartTime}`).getTime();
    const endDateTime = new Date(`${auctionEndDate}T${auctionEndTime}`).getTime();
    const now = new Date().getTime();
    const [isAuctionStarted, setIsAuctionStarted] = useState(false);
    useEffect(() => {
        setIsAuctionStarted(now >= startDateTime);
    }, [now, startDateTime]);
    const {
        data: itemDetail,
        isError: itemDetailError,
        isLoading: itemDetailLoading,
        isSuccess,
        refetch
    } = useGetItemDetailQuery({id});
    //console.log("itemDetail", itemDetail);
    const bidIF = bidInfo?.data;
    // if (isLoading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    //console.log("bidIF", bidIF)
    const infoItem = [
        {
            key: '1',
            children: <CartItemBid bidIF={bidIF}/>,
            span: 4
        },
    ];
    const items = [
        {
            key: '1',
            label: 'Giá thầu hiện tại',
            children: bidIF?.priceCurrent,
        },
        {
            key: '2',
            label: 'Mã Mặt hàng',
            children: bidIF?.itemId,
        },
        {
            key: '3',
            label: 'số giá đã được đặt',
            children: bidIF?.numberOfBid,
        },
        {
            key: '4',
            label: 'Số người đặt',
            children: bidIF?.numberOfBider,
        },
        {
            key: '5',
            label: 'Rút lại',
            children: 'CHUA CO DU LIEU',
        },
        {
            key: '5',
            label: 'Thời gian kết thúc',
            children:
                <>
                    {isAuctionStarted ? (
                        <div>
                            Thời gian kết thúc đấu giá sau:{" "}
                            <Countdown
                                value={endDateTime}
                                format="D Ngày H giờ m phút s giây"
                                valueStyle={{fontWeight: "bolder", fontSize: "15px", color: "green"}}
                            />
                        </div>
                    ) : (
                        <div>
                            Thời gian bắt đầu đấu giá sau:{" "}
                            <Countdown
                                value={startDateTime}
                                format="D Ngày H giờ m phút s giây"
                                valueStyle={{fontWeight: "bolder", fontSize: "15px", color: "#CD853F"}}
                            />
                        </div>
                    )}
                </>
            ,
        },
    ];
    return (
        <>
            <Helmet>
                <title>Danh sách người đấu giá</title>
                <meta
                    name="description"
                    content="Xem lại lịch sử đấu giá của sản phẩm với các thông tin chi tiết về giá thầu, khách hàng và ngày tháng."
                />
            </Helmet>
            <Layout>
                <Header2/>
                <Content
                    style={{
                        padding: '0 48px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: 24,
                            borderRadius: borderRadiusLG,
                        }}
                    >

                        <div className="w-full">
                            <section className="m-10">
                                <Card className="h-full w-full">
                                    <CardHeader
                                        floated={false}
                                        shadow={false}
                                        className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
                                    >
                                        {bidInfoError ? (
                                            <Empty/>
                                        ) : (
                                            <Skeleton loading={loadingBidInfo} active>
                                                <Descriptions title="Dánh sách đấu giá" items={infoItem}/>
                                                <Descriptions items={items}/>
                                            </Skeleton>
                                        )}
                                        <div>
                                            <Typography variant="h6" color="blue-gray">
                                                Danh sách người đấu giá
                                            </Typography>
                                        </div>

                                    </CardHeader>
                                    {isError ? (
                                        <Empty/>
                                    ) : (
                                        <Skeleton loading={isLoading} active>
                                            <CardBody className="overflow-scroll !px-0 py-2">
                                                <table className="w-full min-w-max table-auto">
                                                    <thead>
                                                    <tr>
                                                        {TABLE_HEAD.map(({head, customeStyle}) => (
                                                            <th
                                                                key={head}
                                                                className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle}`}
                                                            >
                                                                <Typography
                                                                    color="blue-gray"
                                                                    variant="small"
                                                                    className="!font-bold"
                                                                >
                                                                    {head}
                                                                </Typography>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {data?.data.map((bid, index) => {
                                                        const {username, bidAmount, winBid, bidTime} = bid;
                                                        const isLast = index === data.data.length - 1;
                                                        const classes = isLast
                                                            ? "!p-4"
                                                            : "!p-4 border-b border-gray-300";

                                                        return (
                                                            <tr key={username}>
                                                                <td className={classes}>
                                                                    <Typography variant="small" color="blue-gray"
                                                                                className="!font-semibold">
                                                                        {username.length > 8
                                                                            ? username.slice(0, 3) + '*****' + username.slice(-3)
                                                                            : username}
                                                                    </Typography>

                                                                </td>


                                                                <td className={classes}>
                                                                    <Typography
                                                                        variant="small"
                                                                        className="!font-normal text-gray-600 text-right"
                                                                    >
                                                                        {bidAmount.toLocaleString()} VNĐ
                                                                    </Typography>
                                                                </td>
                                                                <td className={classes}>
                                                                    <Typography
                                                                        variant="small"
                                                                        className="!font-normal text-gray-600 text-right"
                                                                    >
                                                                        {new Date(bidTime).toLocaleString("vi-VN", {
                                                                            timeZone: "Asia/Ho_Chi_Minh",
                                                                            year: "numeric",
                                                                            month: "2-digit",
                                                                            day: "2-digit",
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                            second: "2-digit"
                                                                        })}
                                                                    </Typography>
                                                                </td>
                                                                <td className={classes}>
                                                                    <Typography
                                                                        variant="small"
                                                                        className={`!font-normal text-right ${winBid ? "text-green-500" : "text-gray-600"}`} // Chỉ hiển thị chữ "Giá cao nhất hiện tại" và màu xanh khi winBid là true
                                                                    >
                                                                        {winBid ? "Giá cao nhất hiện tại" : null}
                                                                    </Typography>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    </tbody>
                                                </table>
                                            </CardBody>
                                        </Skeleton>
                                    )}

                                    <div className="flex justify-center items-center mt-4">
                                        {/*<Pagination*/}
                                        {/*    currentPage={page}*/}
                                        {/*    totalPages={data?.totalPages || 1}*/}
                                        {/*    onPageChange={(newPage) => setPage(newPage)}*/}
                                        {/*/>*/}
                                        <Pagination currentPage={page}
                                                    totalPages={data?.totalPages || 1}
                                                    onPageChange={setPage}
                                        />
                                    </div>
                                </Card>
                            </section>
                        </div>
                    </div>
                </Content>
                <FooterBK
                    className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"/>
            </Layout>
        </>
    );
}
