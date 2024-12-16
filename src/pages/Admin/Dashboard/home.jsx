import React, {useEffect, useState} from "react";
import {useGetOrderRevenueQuery, useGetOrderUserByMonthQuery} from "@/services/order.service.js";
import {useGetUserComparisonQuery, useGetCountUserByWeekQuery} from "@/services/user.service.js";
import {useGetAuctionCreatedTodayQuery, useGetAuctionCreatedMonthQuery} from "@/services/auction.service.js";
import {BanknotesIcon, PresentationChartBarIcon, UsersIcon, ChartBarIcon} from "@heroicons/react/24/solid";
import {ArrowUpIcon, ClockIcon} from "@heroicons/react/24/outline";
import {Card, CardHeader, CardBody, Typography} from "@material-tailwind/react";
import {StatisticsChart} from "@/widgets/charts/index.js";
import {chartsConfig} from "@/configs/charts-config";
import {format} from "date-fns"

import statisticsChartsData from "@/data/statistics-charts-data.jsx";
import ordersOverviewData from "../../../data/orders-overview-data";


export function Home() {
    const {data: orderRevenueData, isLoading, isError} = useGetOrderRevenueQuery();
    const {data: userData} = useGetUserComparisonQuery();
    const {data: auctionData} = useGetAuctionCreatedTodayQuery()
    const {data: countUser, isLoading: isLoadingCountUser} = useGetCountUserByWeekQuery();
    const {data: auctionMonth, isLoading: isLoadingAuctionMonth} = useGetAuctionCreatedMonthQuery();
    const {data: orderMonth} = useGetOrderUserByMonthQuery();
    const currentDate = format(new Date(), "dd/MM/yyyy"); // Định dạng ngày hiện tại

    console.log(orderMonth)
    const weeklyData = countUser?.data
        ? ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map(
            (day) => countUser.data[day] || 0
        )
        : [];
    const months1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const orderData = months1.map((months1, index) => {
        const monthData = orderMonth?.data.find((item) => item.month === index + 1);
        return monthData ? monthData.totalOrders : 0; // Nếu không có dữ liệu thì trả về 0
    });

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const auctionDataMonth = auctionMonth || []; // Dữ liệu từ API
    const categories = auctionDataMonth.map((item) => months[item.month - 1]); // Lấy tên tháng từ chỉ số
    const seriesData = auctionDataMonth.map((item) => item.count);
    const [statisticsData, setStatisticsData] = useState([]);
    useEffect(() => {
        if (orderRevenueData) {
            setStatisticsData([
                {
                    color: "gray",
                    icon: BanknotesIcon,
                    title: "Số dư",
                    value: `${new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(orderRevenueData?.data?.balance ?? 0)} `,
                    footer: {
                        color: "text-green-500",
                        value: "",
                        label: "",
                    },
                },

                {
                    color: "gray",
                    icon: UsersIcon,
                    title: "Tổng số người dùng",
                    value: orderRevenueData?.data?.totalUser ?? "0",
                    footer: {
                        color: userData?.change >= 0 ? "text-green-500" : "text-red-500",
                        value: "",
                        label: (
                            <div className="flex items-center space-x-2">
                                <ArrowUpIcon
                                    className={`h-5 w-5 ${userData?.change >= 0 ? "text-green-500" : "text-red-500"}`}
                                />
                                <span className="text-sm font-medium">
                {`${userData?.change >= 0 ? "Thêm" : "Giảm"} ${Math.abs(userData?.change)} người dùng`}
            </span>
                            </div>
                        ),
                    },

                },
                {
                    color: "gray",
                    icon: PresentationChartBarIcon,
                    title: "Tổng số phiên đấu",
                    value: orderRevenueData?.data?.totalAuction ?? "0",
                    footer: {
                        color: userData?.change >= 0 ? "text-green-500" : "text-red-500",
                        value: "",
                        label: (
                            <div className="flex items-center space-x-2">
                                <ArrowUpIcon
                                    className={`h-5 w-5 ${auctionData >= 0 ? "text-green-500" : "text-red-500"}`}
                                />
                                <span className="text-sm font-medium">
                {`${auctionData >= 0 ? "Thêm" : "Giảm"} ${Math.abs(auctionData)} phiên đấu`}
            </span>
                            </div>
                        ),
                    },
                },
                {
                    color: "gray",
                    icon: ChartBarIcon,
                    title: "Tổng số giao dịch",
                    value: `${orderRevenueData?.data?.totalTransaction ?? "0"}`,
                    footer: {
                        color: "text-green-500",
                        value: "",
                        label: "",
                    },
                },
            ]);
        }
    }, [orderRevenueData]);
    const statisticsChartsData = [
        {
            color: "white",
            title: "Số lượng người bán",
            description: "Số người đăng ký theo tuần",
            footer: `Cập nhật ngày ${currentDate}`,
            chart: {
                type: "bar",
                height: 220,
                series: [
                    {
                        name: "Views",
                        data: weeklyData || [],
                    },
                ],
                options: {
                    colors: ["#388e3c"],
                    plotOptions: {
                        bar: {
                            columnWidth: "16%",
                            borderRadius: 5,
                        },
                    },
                    xaxis: {
                        categories: ["M", "T", "W", "T", "F", "S", "S"],
                    },
                },
            },
        },
        {
            color: "white",
            title: "Số lượng đấu giá",
            description: "Số lượng phiên đấu giá theo tháng",
            footer: `Cập nhật đến tháng ${months[new Date().getMonth()]}`,
            chart: {
                type: "line",
                height: 220,
                series: [
                    {
                        name: "Số phiên",
                        data: seriesData, // Dữ liệu `count`
                    },
                ],
                options: {
                    colors: ["#4ade80"],
                    stroke: {
                        curve: "smooth",
                        width: 2,
                    },
                    markers: {
                        size: 4,
                    },
                    xaxis: {
                        categories: categories.length > 0 ? categories : months, // Tên tháng
                    },
                },
            },
        },
        {
            color: "white",
            title: "Số lượng đơn hàng",
            description: "Số lượng đơn hàng theo tháng",
            footer: `Cập nhật đến tháng ${months[new Date().getMonth()]}`,
            chart: {
                type: "line",
                height: 220,
                series: [
                    {
                        name: "Đơn hàng",
                        data: orderData, // Dữ liệu số đơn hàng cho mỗi tháng
                    },
                ],
                options: {
                    colors: ["#388e3c"],
                    stroke: {
                        lineCap: "round",
                    },
                    markers: {
                        size: 5,
                    },
                    xaxis: {
                        categories: months1, // Các tháng trong năm
                    },
                },
            },
        },

    ];
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <div className="mt-12">
            {/* Statistics Cards */}
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {statisticsData.length > 0 ? (
                    statisticsData.map((card, index) => (
                        <div key={index} className={`bg-${card.color}-100 p-6 rounded-lg shadow-lg`}>
                            <div className="flex items-center">
                                <div className="h-8 w-8 text-gray-500">
                                    <card.icon/>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">{card.title}</h3>
                                    <p className="text-2xl font-bold">{card.value}</p>
                                    <div className={`text-sm ${card.footer.color}`}>
                                        <span>{card.footer.value}</span> {card.footer.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No data available...</div>
                )}
            </div>

            {/* Statistics Charts */}
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                {statisticsChartsData.map((props) => (
                    <StatisticsChart
                        key={props.title}
                        {...props}
                        footer={
                            <Typography variant="small" className="flex items-center font-normal text-blue-gray-600">
                                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400"/>
                                &nbsp;{props.footer}
                            </Typography>
                        }
                    />
                ))}
            </div>


        </div>
    );
}

export default Home;